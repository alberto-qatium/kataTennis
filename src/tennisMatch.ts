import { Score } from "./score";
import { Team } from "./team";

const defaultScore ={
    points: 0,
    games: 0,
    sets: 0
}
const SETS_TO_WIN_MATCH = 2
const MIN_POINTS_TO_WIN_GAME = 3
const MIN_GAMES_TO_WIN_SET = 6
const DIFF_TO_WIN_GAME = 2
const DIFF_TO_WIN_SET = 2

const tennisArgot: Map<number,string> = new Map()
tennisArgot.set(0,"Love");
tennisArgot.set(1,"Fifteen")
tennisArgot.set(2,"Thirty")
tennisArgot.set(3,"Forty")

export class TennisMatch {

    homeTeam: Team;
    forageinTeam: Team;
    scores: Map<Team, Score>;
    constructor(homeTeam: Team, forageinTeam: Team) {
        if (homeTeam.numberOfPlayers() != forageinTeam.numberOfPlayers()) 
            throw new Error("Each team must have the same number of members");

        this.homeTeam = homeTeam
        this.forageinTeam = forageinTeam
        this.scores = this.initializeScores();
    }

    numberOfPlayers() {
        return this.homeTeam.numberOfPlayers() + this.forageinTeam.numberOfPlayers()
    }

    printScoreBoard() {     
        const team1Board = this.printBoardWithSlang(this.homeTeam)
        const team2Borad = this.printBoardWithSlang(this.forageinTeam)
        return `${team1Board}\n${team2Borad}`
    }

    scoresAPointTeam1() {
        this.scoresAPoint(this.homeTeam, this.forageinTeam)
    }

    scoresAPointTeam2() {
        this.scoresAPoint(this.forageinTeam, this.homeTeam)
    }

    setScoreForHomeTeam(points: number,games: number,sets: number){
        this.scores.get(this.homeTeam)?.setScore(points,games,sets)
    }

    setScoreForForageinTeam(points: number,games: number,sets: number){
        this.scores.get(this.forageinTeam)?.setScore(points,games,sets)
    }

    private scoresAPoint(teamWins: Team, teamLoses: Team) {
        if(!this.matchHasEnded() && this.scores.has(teamWins)){
            this.scores.get(teamWins)?.scoresAPoint()
            const pointsTeam1 = this.scores.get(teamWins)?.getPoints() || 0
            const pointsTeam2 = this.scores.get(teamLoses)?.getPoints() || 0
            if (this.hasWonAGame(pointsTeam1, pointsTeam2)) {
                this.scoresAGame(teamWins, teamLoses);
            }
        }
    }

    private scoresAGame(teamWins: Team, teamLoses: Team) {
        this.scores.get(teamWins)?.scoresAGame();
        const gamesTeamWins = this.scores.get(teamWins)?.getGames() || 0
        const gamesTeamLoses = this.scores.get(teamLoses)?.getGames() || 0
        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            this.scores.get(teamWins)?.scoresASet();
            this.scores.get(teamLoses)?.losesASet();
        } else {
            this.scores.get(teamLoses)?.losesAGame();
        }
    }

    private printBoardWithSlang(team: Team) {
        let {points, games, sets} = this.scores.get(team)?.getScore() || defaultScore;
        let slang = tennisArgot.get(points) || `${points}`;
        if(this.isDeuce()){
            slang = "Deuce"
        }else if(this.isInAdventage(team)){
            slang = "Advantage"
        }
        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private initializeScores(){
        let scoreMap = new Map<Team, Score>()
        scoreMap.set(this.homeTeam, new Score())
        scoreMap.set(this.forageinTeam, new Score())
        return scoreMap
    }

    private isDeuce() {
        const pointsteam1 = this.scores.get(this.homeTeam)?.getPoints() || 0 
        const pointsteam2 = this.scores.get(this.forageinTeam)?.getPoints() || 0
        return pointsteam1 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam2 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam1 === pointsteam2 
    }

    private isInAdventage(team: Team){
        const pointsTeam = this.scores.get(team)?.getPoints() || 0 
        const pointsOtherTeam = 
            team === this.homeTeam ? 
            this.scores.get(this.forageinTeam)?.getPoints() || 0 : 
            this.scores.get(this.homeTeam)?.getPoints() || 0  
        return pointsTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsOtherTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsTeam > pointsOtherTeam
    }

    private hasWonAGame(pointsTeam1: number, pointsTeam2: number) {
        return pointsTeam1 > MIN_POINTS_TO_WIN_GAME 
            && pointsTeam1 - pointsTeam2 >= DIFF_TO_WIN_GAME;
    }

    private hasWonASet(gamesTeamWins: number, gamesTeamLoses: number) {
        return gamesTeamWins >= MIN_GAMES_TO_WIN_SET 
            && gamesTeamWins - gamesTeamLoses >= DIFF_TO_WIN_SET 
            || this.hasWonATieBreak(gamesTeamWins, gamesTeamLoses);
    }

    private hasWonATieBreak(gamesTeamWins: number, gamesTeamLoses: number): boolean {
        return (gamesTeamWins == 7 && gamesTeamLoses == 6);
    }

    private hasWonMatch(team: Team){
        return this.scores.get(team)?.getSets() == SETS_TO_WIN_MATCH 
    }

    private matchHasEnded(){
        return this.hasWonMatch(this.homeTeam) || this.hasWonMatch(this.forageinTeam)
    }
}

