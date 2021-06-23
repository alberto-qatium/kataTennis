import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";


describe("a match of tennis", () => {
    it("There are two teams facing each other.", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
    
        expect(tennisMatch.numberOfPlayers()).toEqual(2)
    })
    
    it("The teams can be made up of two members", () =>{
        const teamA = new Team([new Player("Paco"),new Player("Lamo")])
        const teamB = new Team([new Player("Martin"),new Player("Obrador")])
        const tennisMatch = new TennisMatch(teamA, teamB)

        expect(tennisMatch.numberOfPlayers()).toEqual(4)
    })

    it("A team must have at least 1 player", () =>{
        expect(() =>{new Team([])}).toThrow( new Error("Your team must have at least 1 player"))
    })

    it("A team can not have more than 2 players", () =>{
        const playerA = new Player("A")
        const playerB = new Player("B")
        const playerC = new Player("C")

        expect(() =>{new Team([playerA,playerB,playerC])}).toThrow( new Error("Your team can not have more than 2 tennist players"))
    })

    it("Each team has the same number of members", () => {
        const teamA = new Team([new Player("Paco"),new Player("Lamo")])
        const teamB = new Team([new Player("Martin")])
        
        expect(() => {new TennisMatch(teamA,teamB)}).toThrow( new Error("Each team must have the same number of members"))
    })

    it("Each team starts with 0 points, 0 sets and 0 games", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)

        expect(tennisMatch.matchScore.getScore(teamA)).toEqual({points: 0, games: 0,sets: 0})
        expect(tennisMatch.matchScore.getScore(teamB)).toEqual({points: 0, games: 0,sets: 0})
    })

    it("When at least three points have been scored by each team, and the scores are equal, the game is at Deuce", () => {
        const teamA = new Team([new Player("Paco")]);
        const teamB = new Team([new Player("Lamo")]);
        const tennisMatch = new TennisMatch(teamA,teamB);

        tennisMatch.setScoreForHomeTeam(2,0,0);
        tennisMatch.setScoreForForageinTeam(3,0,0);

        tennisMatch.scoresAPointHomeTeam();
        expect(tennisMatch.isAtDeuce()).toEqual(true);
    })

    it("When each team is at Deuce and one of them scores a point, the score is Advantage for the team in the lead ", () => {
        const teamA = new Team([new Player("Paco")]);
        const teamB = new Team([new Player("Lamo")]);
        const tennisMatch = new TennisMatch(teamA,teamB);

        tennisMatch.setScoreForHomeTeam(3,0,0)
        tennisMatch.setScoreForForageinTeam(3,0,0)

        expect(tennisMatch.isInAdventage(teamA)).toEqual(false)
        tennisMatch.scoresAPointHomeTeam()
        expect(tennisMatch.isInAdventage(teamA)).toEqual(true)
    })

    it("Each team is able to return to Deuce", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)

        tennisMatch.setScoreForHomeTeam(4,0,0)
        tennisMatch.setScoreForForageinTeam(3,0,0)

        expect(tennisMatch.isAtDeuce()).toEqual(false)
        tennisMatch.scoresAPointForageinTeam()
        expect(tennisMatch.isAtDeuce()).toEqual(true)
    })

    it("A team can win a match", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)

        tennisMatch.setScoreForHomeTeam(2,0,0)
        tennisMatch.setScoreForForageinTeam(3,0,0)

        tennisMatch.scoresAPointForageinTeam()
        expect(tennisMatch.matchScore.getScore(teamB)).toEqual({points: 0, games: 1, sets: 0})
    })

    it("A match can be in a tie-break", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
        tennisMatch.setScoreForHomeTeam(3,6,0)
        tennisMatch.setScoreForForageinTeam(2,6,0)
  
        expect(tennisMatch.isAtTieBreak()).toEqual(true)
        tennisMatch.scoresAPointHomeTeam()
        expect(tennisMatch.isAtTieBreak()).toEqual(false)
    })

    it("A team can win a set", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)

        tennisMatch.setScoreForHomeTeam(3,5,0)
        tennisMatch.setScoreForForageinTeam(0,0,0)

        tennisMatch.scoresAPointHomeTeam()
        expect(tennisMatch.matchScore.getScore(teamA)).toEqual({points: 0, games: 0, sets: 1})
    })

    it("a team can win a match", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
        tennisMatch.setScoreForHomeTeam(3,5,1)
        tennisMatch.setScoreForForageinTeam(2,4,1)
    
        tennisMatch.scoresAPointHomeTeam()
        expect(tennisMatch.hasWonMatch(teamA)).toEqual(true)
    })
})

