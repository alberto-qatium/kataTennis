import { Player } from "./player";

const NO_PLAYERS = 0;
const MAX_PLAYERS_ALLOWED = 2;

export class Team {
    private teamMates: Player[]
    constructor(players: Player[]) {
        this.validatePlayerNumber(players)
        
        this.teamMates = players
    }

    isBalancedWith(team: Team): boolean{
        return this.numberOfPlayers() === team.numberOfPlayers()
    }

    printPlayers(){
        return this.teamMates.toString()
    }
    
    private numberOfPlayers(){
        return this.teamMates.length
    }

    private validatePlayerNumber(players: Player[]){
        if( players.length === NO_PLAYERS ) throw new Error("Your team must have at least 1 player");
        if( players.length > MAX_PLAYERS_ALLOWED ) throw new Error("Your team can not have more than 2 tennist players");
    }
}