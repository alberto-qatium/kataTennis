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
    
    numberOfPlayers(){
        return this.teamMates.length
    }
    
    printPlayers(){
        return this.teamMates.toString()
    }
    // Todo: Porqué necesitamos saber si dos equipos son iguales?
    equals(homeTeam: Team) : boolean {
        return this.numberOfPlayers() == homeTeam.numberOfPlayers() && 
        homeTeam.teamMates.includes(this.teamMates[1]) && this.teamMates[2] ?
        homeTeam.teamMates.includes(this.teamMates[2]) : true
    }

    private validatePlayerNumber(players: Player[]){
        if( players.length === NO_PLAYERS ) throw new Error("Your team must have at least 1 player");
        if( players.length > MAX_PLAYERS_ALLOWED ) throw new Error("Your team can not have more than 2 tennist players");
    }
}