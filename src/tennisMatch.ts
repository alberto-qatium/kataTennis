import { Score } from "./score";
import { Team } from "./team";

export const SETS_TO_WIN_MATCH = 2
export const MIN_POINTS_TO_WIN_GAME = 3
export const MIN_GAMES_TO_WIN_SET = 6
export const DIFF_TO_WIN_GAME = 2
export const DIFF_TO_WIN_SET = 2

export class TennisMatch {
    private score: Map<Team,Score>;
    private local: Team;
    private visitor: Team;
    
    constructor(local: Team, visitor: Team) {
        if (!local.isBalancedWith(visitor)) throw new Error("Each team must have the same number of members");

        this.local = local
        this.visitor = visitor

        this.score = new Map()
        this.score.set(local, new Score())
        this.score.set(visitor, new Score())
    }

    // Todo: Esta debería ser la única manera de interactuar con los puntos
    scoresAPoint(team: Team) {
        this.scoreFor(team).scoresAPoint()

        this.checkIfGameIsWon(team)
    }
    // Todo: Esto sólo está para los tests.
    setScoreFor(team: Team, points: number, games: number, sets: number){
        this.scoreFor(team).setScore(points,games,sets)
    }

    getScore(team: Team){
        return this.scoreFor(team).getScore()
    }

    getVisitorTeam(): Team {
        return this.visitor
    }
    getLocalTeam(): Team {
        return this.local
    }

    hasWonMatch(team: Team){
        const {sets: setsWon} = this.scoreFor(team).getScore()
        return setsWon == SETS_TO_WIN_MATCH 
    }

    isAtTieBreak(){
        const {games: homeTeamGames} = this.scoreFor(this.local).getScore();
        const {games: foreignTeamGames} = this.scoreFor(this.visitor).getScore();
        
        return homeTeamGames == MIN_GAMES_TO_WIN_SET && foreignTeamGames == MIN_GAMES_TO_WIN_SET
    }

    private scoreFor(team: Team){
        return this.score.get(team) as Score
    }
    
    private getOppositeTeam(team: Team){
        if(team === this.visitor) return this.local // Todo: huele a que esto podría ser responsabilidad de una clase Teams?
        return this.visitor
    }

    private scoresAGame(winner: Team, loser: Team) {
        this.scoreFor(winner).scoresAGame();

        this.checkIfSetIsWon(winner, loser)
    }

    private checkIfGameIsWon(winner: Team){
        const loser = this.getOppositeTeam(winner)
        const {points: pointsTeamWins} = this.scoreFor(winner).getScore();
        const {points: pointsTeamLoses} = this.scoreFor(loser).getScore();
        if (this.hasWonAGame(pointsTeamWins, pointsTeamLoses)) {
            this.scoresAGame(winner, loser);
        }
    }

    private checkIfSetIsWon(winner: Team, loser: Team){
        const {games: gamesTeamWins} = this.scoreFor(winner).getScore()
        const {games: gamesTeamLoses} = this.scoreFor(loser).getScore()

        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            this.scoreFor(winner).scoresASet();
            this.scoreFor(loser).losesASet();
        } else {
            this.scoreFor(loser).losesAGame();
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

