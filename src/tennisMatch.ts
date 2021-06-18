import { Team } from "./team";
export class TennisMatch {

    team1: Team;
    team2: Team;
    constructor(team1: Team, team2: Team) {
        if (team1.numberOfPlayers() != team2.numberOfPlayers()) 
            throw new Error("Each team must have the same number of members");

        this.team1 = team1
        this.team2 = team2
    }

    numberOfPlayers() {
        return this.team1.numberOfPlayers() + this.team2.numberOfPlayers()
    }

    printScoreBoard() {     
        const team1Board = this.printBoardWithSlang(this.team1)
        const team2Borad = this.printBoardWithSlang(this.team2)
        return `${team1Board}\n${team2Borad}`
    }

    scoresAPointTeam1() {
        this.scoresAPoint(this.team1, this.team2)
    }

    scoresAPointTeam2() {
        this.scoresAPoint(this.team2, this.team1)
    }

    private scoresAPoint(teamWins: Team, teamLoses: Team) {
        if(!this.matchHasEnded()){
            teamWins.scoresAPoint()
            const pointsTeam1 = teamWins.getPoints()
            const pointsTeam2 = teamLoses.getPoints()
            if (this.hasWonAGame(pointsTeam1, pointsTeam2)) {
                this.scoresAGame(teamWins, teamLoses);
            }
        }
    }

    private scoresAGame(teamWins: Team, teamLoses: Team) {
        teamWins.scoresAGame();
        const gamesTeamWins = teamWins.getGames();
        const gamesTeamLoses = teamLoses.getGames();
        if (this.hasWonASet(gamesTeamWins, gamesTeamLoses)) {
            teamWins.scoresASet();
            teamLoses.losesASet();
        } else {
            teamLoses.losesAGame();
        }
    }

    private printBoardWithSlang(team: Team) {
        let {points, games, sets} = team.getScore();
        let slang = `${points}`;
        if(this.isDeuce()){
            slang = "Deuce"
        }else if(this.isInAdventage(team)){
            slang = "Advantage"
        }else{
            switch (points) {
                case 0:
                    slang = "Love";
                    break;
                case 1:
                    slang = "Fifteen";
                    break;
                case 2:
                    slang = "Thirty";
                    break;
                case 3:
                    slang = "Forty";
                    break;
            }
        }
        
        return `${team.printPlayers()} ${slang} ${games} ${sets}`
    }

    private isDeuce() {
        const pointsteam1 = this.team1.getPoints() 
        const pointsteam2 = this.team2.getPoints() 
        return pointsteam1 >= 3 && pointsteam2 >= 3 && pointsteam1 === pointsteam2 
    }

    private isInAdventage(team: Team){
        const pointsTeam = team.getPoints()
        const pointsOtherTeam = team === this.team1 ? this.team2.getPoints() : this.team1.getPoints() 
        return pointsTeam >= 3 && pointsOtherTeam >= 3 && pointsTeam > pointsOtherTeam
    }

    private hasWonAGame(pointsTeam1: number, pointsTeam2: number) {
        return pointsTeam1 > 3 && pointsTeam1 - pointsTeam2 >= 2;
    }

    private hasWonASet(gamesTeamWins: number, gamesTeamLoses: number) {
        return (gamesTeamWins >= 6 && gamesTeamWins - gamesTeamLoses >= 2) || (gamesTeamLoses == 6 && gamesTeamWins == 7);
    }

    private team1HasWonMatch(){
        return this.team1.getSets() == 2 
    }

    private team2HasWonMatch(){
        return this.team2.getSets() == 2
    }

    private matchHasEnded(){
        return this.team1HasWonMatch() || this.team2HasWonMatch()
    }
}

