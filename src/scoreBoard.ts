import { Team } from "./team";
import { TennisMatch } from "./tennisMatch";
const tennisArgot: string[] = [
    "Love",
    "Fifteen",
    "Thirty",
    "Forty"
]

export class ScoreBoard{
    private tennisMatch: TennisMatch
    constructor(match: TennisMatch){
        this.tennisMatch = match
    }

    render() {
        const homeTeamBoard = this.printBoardWithSlang(this.tennisMatch.homeTeam)
        const forageinTeamBoard = this.printBoardWithSlang(this.tennisMatch.forageinTeam)
        return `${homeTeamBoard}\n${forageinTeamBoard}` 
    }

    private printBoardWithSlang(team: Team) {
        let {points, games, sets} = this.tennisMatch.matchScore.getScore(team);
        let slang = this.transformToSlang(points);
        if(this.tennisMatch.isAtDeuce()){
            slang = "Deuce"
        }else if(this.tennisMatch.isInAdventage(team)){
            slang = "Advantage"
        }

        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private transformToSlang(points: number){
        return tennisArgot[points] || `${points}`
    }
}