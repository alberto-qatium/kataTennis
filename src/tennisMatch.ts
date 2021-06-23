import { MatchScore } from "./matchScore";
import { Team } from "./team";

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
    private homeTeam: Team;
    private forageinTeam: Team;
    private scores: MatchScore;

    constructor(homeTeam: Team, forageinTeam: Team) {
        if (homeTeam.numberOfPlayers() != forageinTeam.numberOfPlayers()) 
            throw new Error("Each team must have the same number of members");

        this.homeTeam = homeTeam
        this.forageinTeam = forageinTeam
        this.scores =  new MatchScore(this.homeTeam, this.forageinTeam);
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
        this.scores.setScore(points,games,sets, this.homeTeam)
    }

    setScoreForForageinTeam(points: number,games: number,sets: number){
        this.scores.setScore(points,games,sets, this.forageinTeam)
    }

    private scoresAPoint(teamWins: Team, teamLoses: Team) {
        if(!this.matchHasEnded()){
            this.scores.scoresAPoint(teamWins)
            const {points: pointsTeamWins} = this.scores.getScore(teamWins)
            const {points: pointsTeamLoses} = this.scores.getScore(teamLoses)
            if (this.hasWonAGame(pointsTeamWins, pointsTeamLoses)) {
                this.scoresAGame(teamWins, teamLoses);
            }
        }
    }

    private scoresAGame(teamWins: Team, teamLoses: Team) {
        this.scores.scoresAGame(teamWins);
        const {games: gamesTeamWins} = this.scores.getScore(teamWins)
        const {games: gamesTeamLoses} = this.scores.getScore(teamLoses)
        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            this.scores.scoresASet(teamWins);
            this.scores.losesASet(teamLoses);
        } else {
            this.scores.losesAGame(teamLoses);
        }
    }

    private printBoardWithSlang(team: Team) {
        let {points, games, sets} = this.scores.getScore(team);
        let slang = tennisArgot.get(points) || `${points}`;
        if(this.isDeuce()){
            slang = "Deuce"
        }else if(this.isInAdventage(team)){
            slang = "Advantage"
        }
        
        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private isDeuce() {
        const {points: pointsteam1} = this.scores.getScore(this.homeTeam)
        const {points: pointsteam2} = this.scores.getScore(this.forageinTeam)

        return pointsteam1 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam2 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam1 === pointsteam2 
    }

    private isInAdventage(team: Team){
        const {points: pointsTeam} = this.scores.getScore(team)
        const {points: pointsOtherTeam} = 
            team.equals(this.homeTeam) ? 
            this.scores.getScore(this.forageinTeam) : 
            this.scores.getScore(this.homeTeam)  

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
        const {sets: setsWon} = this.scores.getScore(team)
        return setsWon == SETS_TO_WIN_MATCH 
    }

    private matchHasEnded(){
        return this.hasWonMatch(this.homeTeam) || this.hasWonMatch(this.forageinTeam)
    }
}

