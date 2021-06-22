export class Score{
    point: number
    game: number
    set: number
    constructor(){
        this.point = 0
        this.game = 0
        this.set = 0
    }
    getScore(){
        return {
            points: this.point,
            games: this.game, 
            sets: this.set
        };
    }

    setScore(point: number,game: number,set: number){
        if(point < 0 || game < 0 || set < 0 ) 
            throw new Error("You can not put a negative score")
        this.point = point
        this.game = game
        this.set = set
    }
    
    getPoints(){
        return this.point
    }
    
    getGames() {
        return this.game
    }

    getSets(){
        return this.set
    }
    
    scoresAPoint(){
        return this.point++
    }
    
    scoresAGame(){
        this.resetPoints()
        this.game++
    }
    
    scoresASet() {
        this.resetGames()
        this.set++
    }

    losesAGame(){
        this.resetPoints()
    }

    losesASet() {
        this.resetGames()
    }
    
    private resetPoints() {
        this.point = 0
    }

    private resetGames(){
        this.resetPoints()
        this.game = 0
    }
}