import { Player } from "./player";

export class Team {
    private teamMates: Player[]
    constructor(players: Player[]) {
        if( players.length === 0 ) throw new Error("Your team must have at least 1 player");
        if( players.length > 2 ) throw new Error("Your team can not have more than 2 tennist players");
        
        this.teamMates = players
    }
    
    numberOfPlayers(){
        return this.teamMates.length
    }
    
    printPlayers(){
        return this.teamMates.toString()
    }

    equals(homeTeam: Team) : boolean {
        return this.numberOfPlayers() == homeTeam.numberOfPlayers() && 
        homeTeam.teamMates.includes(this.teamMates[1]) && this.teamMates[2] ?
        homeTeam.teamMates.includes(this.teamMates[2]) : true
    }
}