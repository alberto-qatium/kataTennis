import { Player } from "./player";

export class Team {
    teamMates: Player[]
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
}