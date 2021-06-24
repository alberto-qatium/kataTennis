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
        if(!teamScore) this.showError(team);
        teamScore!.setScore(points,games,sets);
    }

    getScore(team: Team): { points: number; games: number; sets: number; } {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        return teamScore!.getScore();
    }

    scoresAPoint(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        teamScore!.scoresAPoint();
    }

    scoresAGame(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        teamScore!.scoresAGame();
    }

    scoresASet(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        teamScore!.scoresASet();
    }

    private showError(team: Team) {
        this.showError(team);;
    }

    losesAGame(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        teamScore!.losesAGame();
    }

    losesASet(team: Team) {
        const teamScore = this.scores.get(team)
        if(!teamScore) this.showError(team);
        teamScore!.losesASet();
    }
}