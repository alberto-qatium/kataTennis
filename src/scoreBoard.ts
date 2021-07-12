import { Team } from "./team";
import { MIN_POINTS_TO_WIN_GAME, TennisMatch } from "./tennisMatch";

const tennisArgot: string[] = [
    "Love",
    "Fifteen",
    "Thirty",
    "Forty"
]

export class ScoreBoard{
    private match: TennisMatch;
    private local: Team;
    private visitor: Team;


    constructor(match: TennisMatch){
        this.match = match
        this.local = match.getLocalTeam();
        this.visitor = match.getVisitorTeam();
    }

    render() {
        const localBoard = this.printBoard(this.local)
        const visitorBoard = this.printBoard(this.visitor)
        return `${localBoard}\n${visitorBoard}` 
    }

    private printBoard(team: Team) {
        let {points, games, sets} = this.match.getScore(team);
        let slang = this.transformToSlang(points, team);

        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private transformToSlang(points: number, team: Team){
        let slang = tennisArgot[points] || `${points}`

        if(this.isAtDeuce()){
            slang = "Deuce"
        }else if(this.isInAdventage(team)){
            slang = "Advantage"
        }
        
        return slang
    }

    private isAtDeuce() {
        const {points: pointsteam1} = this.match.getScore(this.local)
        const {points: pointsteam2} = this.match.getScore(this.visitor)

        return pointsteam1 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam2 >= MIN_POINTS_TO_WIN_GAME 
            && pointsteam1 === pointsteam2 
    }

    private isInAdventage(team: Team){
        const {points: pointsTeam} = this.match.getScore(team)
        const otherTeam = this.getOppositeTeam(team)
        const {points: pointsOtherTeam} = this.match.getScore(otherTeam)

        return pointsTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsOtherTeam >= MIN_POINTS_TO_WIN_GAME 
            && pointsTeam > pointsOtherTeam
    }

    private getOppositeTeam(team: Team){
        if(team === this.visitor) return this.local // Todo: huele a que esto podría ser responsabilidad de una clase Teams?
        return this.visitor
    }
}