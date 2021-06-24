import { MatchScore } from "./matchScore";
import { Team } from "./team";

export const SETS_TO_WIN_MATCH = 2
export const MIN_POINTS_TO_WIN_GAME = 3
export const MIN_GAMES_TO_WIN_SET = 6
export const DIFF_TO_WIN_GAME = 2
export const DIFF_TO_WIN_SET = 2

export class TennisMatch {
    homeTeam: Team;
    forageinTeam: Team;
    matchScore: MatchScore;
    
    constructor(homeTeam: Team, forageinTeam: Team) {
        if (homeTeam.numberOfPlayers() != forageinTeam.numberOfPlayers()) 
            throw new Error("Each team must have the same number of members");

        this.homeTeam = homeTeam
        this.forageinTeam = forageinTeam
        this.matchScore =  new MatchScore(this.homeTeam, this.forageinTeam);
    }

    numberOfPlayers() {
        return this.homeTeam.numberOfPlayers() + this.forageinTeam.numberOfPlayers()
    }

    scoresAPointHomeTeam() {
        this.scoresAPoint(this.homeTeam, this.forageinTeam)
    }

    scoresAPointForageinTeam() {
        this.scoresAPoint(this.forageinTeam, this.homeTeam)
    }

    setScoreForHomeTeam(points: number,games: number,sets: number){
        this.matchScore.setScore(points,games,sets, this.homeTeam)
    }

    setScoreForForageinTeam(points: number,games: number,sets: number){
        this.matchScore.setScore(points,games,sets, this.forageinTeam)
    }

    isAtDeuce() {
        const {points: pointsteam1} = this.matchScore.getScore(this.homeTeam)
        const {points: pointsteam2} = this.matchScore.getScore(this.forageinTeam)

        return pointsteam1 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam2 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam1 === pointsteam2 
    }

    isInAdventage(team: Team){
        const {points: pointsTeam} = this.matchScore.getScore(team)
        const {points: pointsOtherTeam} = 
            team.equals(this.homeTeam) ? 
            this.matchScore.getScore(this.forageinTeam) : 
            this.matchScore.getScore(this.homeTeam)  

        return pointsTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsOtherTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsTeam > pointsOtherTeam
    }
    isAtTieBreak(){
        const {games: homeTeamGames} = this.matchScore.getScore(this.homeTeam);
        const {games: forageinTeamGames} = this.matchScore.getScore(this.forageinTeam);
        
        return homeTeamGames == MIN_GAMES_TO_WIN_SET && forageinTeamGames == MIN_GAMES_TO_WIN_SET
    }

    hasWonMatch(team: Team){
        const {sets: setsWon} = this.matchScore.getScore(team)
        return setsWon == SETS_TO_WIN_MATCH 
    }

    matchHasEnded(){
        return this.hasWonMatch(this.homeTeam) || this.hasWonMatch(this.forageinTeam)
    }

    private scoresAPoint(teamWins: Team, teamLoses: Team) {
        if(!this.matchHasEnded()){
            this.matchScore.scoresAPoint(teamWins)
            const {points: pointsTeamWins} = this.matchScore.getScore(teamWins)
            const {points: pointsTeamLoses} = this.matchScore.getScore(teamLoses)
            if (this.hasWonAGame(pointsTeamWins, pointsTeamLoses)) {
                this.scoresAGame(teamWins, teamLoses);
            }
        }
    }

    private scoresAGame(teamWins: Team, teamLoses: Team) {
        this.matchScore.scoresAGame(teamWins);
        const {games: gamesTeamWins} = this.matchScore.getScore(teamWins)
        const {games: gamesTeamLoses} = this.matchScore.getScore(teamLoses)
        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            this.matchScore.scoresASet(teamWins);
            this.matchScore.losesASet(teamLoses);
        } else {
            this.matchScore.losesAGame(teamLoses);
        }
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
}

