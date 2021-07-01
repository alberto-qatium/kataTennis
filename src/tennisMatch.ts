import { MatchScore } from "./matchScore";
import { Team } from "./team";

export const SETS_TO_WIN_MATCH = 2
export const MIN_POINTS_TO_WIN_GAME = 3
export const MIN_GAMES_TO_WIN_SET = 6
export const DIFF_TO_WIN_GAME = 2
export const DIFF_TO_WIN_SET = 2

export class TennisMatch {
    private local: Team;
    private visitor: Team;
    matchScore: MatchScore; // Todo: rename a score. No podemos cambiarlo aún porque está expuesto
    
    constructor(local: Team, visitor: Team) {
        if (!local.isBalancedWith(visitor)) throw new Error("Each team must have the same number of members");

        this.local = local
        this.visitor = visitor
        this.matchScore = new MatchScore(this.local, this.visitor);
    }

    // Todo: Esta debería ser la única manera de interactuar con los puntos
    scoresAPoint(team: Team) {
        this.matchScore.scoresAPoint(team)

        this.checkIfGameIsWon(team)
    }

    // Todo: Esto sólo está para los tests.
    setScoreFor(team: Team, points: number, games: number, sets: number){
        this.matchScore.setScore(points,games,sets, team)
    }

    isAtDeuce() {
        const {points: pointsteam1} = this.matchScore.getScore(this.local)
        const {points: pointsteam2} = this.matchScore.getScore(this.visitor)

        return pointsteam1 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam2 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam1 === pointsteam2 
    }

    isInAdventage(team: Team){
        const {points: pointsTeam} = this.matchScore.getScore(team)
        const {points: pointsOtherTeam} = 
            team.equals(this.local) ? 
            this.matchScore.getScore(this.visitor) : 
            this.matchScore.getScore(this.local)  

        return pointsTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsOtherTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsTeam > pointsOtherTeam
    }

    isAtTieBreak(){
        const {games: homeTeamGames} = this.matchScore.getScore(this.local);
        const {games: foreignTeamGames} = this.matchScore.getScore(this.visitor);
        
        return homeTeamGames == MIN_GAMES_TO_WIN_SET && foreignTeamGames == MIN_GAMES_TO_WIN_SET
    }

    hasWonMatch(team: Team){
        const {sets: setsWon} = this.matchScore.getScore(team)
        return setsWon == SETS_TO_WIN_MATCH 
    }

    getScore(team: Team){
        return this.matchScore.getScore(team)
    }

    // Todo: Nyapa temporal para quitar acople.
    getLocalTeam(){
        return this.local
    }

    getVisitorTeam(){
        return this.visitor
    }

    private getOppositeTeam(team: Team){
        if(team === this.visitor) return this.local // Todo: huele a que esto podría ser responsabilidad de una clase Teams?
        return this.visitor
    }

    private scoresAGame(winner: Team, loser: Team) {
        this.matchScore.scoresAGame(winner);

        this.checkIfSetIsWon(winner, loser)
    }

    private checkIfGameIsWon(winner: Team){
        const loser = this.getOppositeTeam(winner)
        const {points: pointsTeamWins} = this.matchScore.getScore(winner)
        const {points: pointsTeamLoses} = this.matchScore.getScore(loser)
        if (this.hasWonAGame(pointsTeamWins, pointsTeamLoses)) {
            this.scoresAGame(winner, loser);
        }
    }

    private checkIfSetIsWon(winner: Team, loser: Team){
        const {games: gamesTeamWins} = this.matchScore.getScore(winner)
        const {games: gamesTeamLoses} = this.matchScore.getScore(loser)

        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            this.matchScore.scoresASet(winner);
            this.matchScore.losesASet(loser);
        } else {
            this.matchScore.losesAGame(loser);
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

