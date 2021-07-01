import { Team } from "./team";
import { TennisMatch } from "./tennisMatch";
const tennisArgot: string[] = [
    "Love",
    "Fifteen",
    "Thirty",
    "Forty"
]

export class ScoreBoard{
    private match: TennisMatch
    constructor(match: TennisMatch){
        this.match = match
    }

    render() {
        const homeTeamBoard = this.printBoardWithSlang(this.match.getLocalTeam())
        const foreignTeamBoard = this.printBoardWithSlang(this.match.getVisitorTeam())
        return `${homeTeamBoard}\n${foreignTeamBoard}` 
    }

    private printBoardWithSlang(team: Team) {
        let {points, games, sets} = this.match.getScore(team);
        let slang = this.transformToSlang(points);
        if(this.match.isAtDeuce()){
            slang = "Deuce"
        }else if(this.match.isInAdventage(team)){
            slang = "Advantage"
        }

        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private transformToSlang(points: number){
        return tennisArgot[points] || `${points}`
    }
}