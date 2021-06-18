export class Team {
    teamMates: string[]
    score: number[]
    constructor(players: string[], score?: number[]) {
        if( players.length === 0 ) throw new Error("Your team must have at least 1 player");
        if( players.length > 2 ) throw new Error("Your team can not have more than 2 tennist players");
        
        this.teamMates = players
        this.score = score || [0,0,0]
    }
    
    numberOfPlayers(){
        return this.teamMates.length
    }
    
    printPlayers(){
        return this.teamMates.toString()
    }
    
    getScore(){
        return {
            points: this.score[0],
            games: this.score[1], 
            sets: this.score[2]
        };
    }
    
    getPoints(){
        return this.score[0]
    }
    
    getGames() {
        return this.score[1]
    }

    getSets(){
        return this.score[2]
    }
    
    scoresAPoint(){
        return this.score[0]++
    }
    
    scoresAGame(){
        this.resetPoints()
        this.score[1]++
    }
    
    scoresASet() {
        this.resetGames()
        this.score[2]++
    }

    losesAGame(){
        this.resetPoints()
    }

    losesASet() {
        this.resetGames()
    }
    
    private resetPoints() {
        this.score[0] = 0
    }

    private resetGames(){
        this.resetPoints()
        this.score[1] = 0
    }
}