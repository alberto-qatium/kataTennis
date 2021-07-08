const MINIM_POINTS = 0
const MINIM_GAMES = 0
const MINIM_SETS = 0

export class Score{
    private point: number
    private game: number
    private set: number

    constructor(){
        this.point = MINIM_POINTS
        this.game = MINIM_GAMES
        this.set = MINIM_SETS
    }
    
    getScore(){
        return {
            points: this.point,
            games: this.game, 
            sets: this.set
        };
    }

    setScore(point: number,game: number,set: number){
        validateScore(point, game, set) 

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
        this.point = MINIM_POINTS
    }

    private resetGames(){
        this.resetPoints()
        this.game = MINIM_GAMES
    }
}

function validateScore(point: number, game: number, set: number) {
    if( point < MINIM_POINTS || game < MINIM_GAMES || set < MINIM_SETS ) throw new Error("You can not put a negative score") 
}
