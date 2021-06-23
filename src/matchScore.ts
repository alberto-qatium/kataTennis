import { Score } from "./score";
import { Team } from "./team";

export class MatchScore{
    private scores: Map<Team, Score>
    constructor(homeTeam: Team, forageinTeam: Team){
        this.scores = new Map()
        this.scores.set(homeTeam, new Score())
        this.scores.set(forageinTeam, new Score())
    }

    setScore(points: number, games: number, sets: number, team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.setScore(points,games,sets);
    }

    getScore(team: Team): { points: number; games: number; sets: number; } {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        return teamScore.getScore();
    }

    getTeams(){
        return this.scores.keys()
    }

    scoresAPoint(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.scoresAPoint();
    }

    scoresAGame(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.scoresAGame();
    }

    scoresASet(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.scoresASet();
    }

    losesAGame(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.losesAGame();
    }

    losesASet(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) throw new Error(`The team ${team} is not playing the match`)
        teamScore.losesASet();
    }
}