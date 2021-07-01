import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";


describe("a match of tennis", () => {
    it("A team must have at least 1 player", () =>{
        expect(() =>{new Team([])}).toThrow( new Error("Your team must have at least 1 player"))
    })

    it("A team can not have more than 2 players", () =>{
        const aPlayer = new Player("A")

        expect(() =>{new Team([aPlayer, aPlayer, aPlayer])}).toThrow( new Error("Your team can not have more than 2 tennist players"))
    })

    it("Each team has the same number of members", () => {
        const local = new Team([new Player("Paco"),new Player("Lamo")])
        const visitor = new Team([new Player("Martin")])
        
        expect(() => {new TennisMatch(local,visitor)}).toThrow( new Error("Each team must have the same number of members"))
    })

    it("Each team starts with 0 points, 0 sets and 0 games", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)

        expect(match.getScore(local)).toEqual({points: 0, games: 0,sets: 0})
        expect(match.getScore(visitor)).toEqual({points: 0, games: 0,sets: 0})
    })

    it("When at least three points have been scored by each team, and the scores are equal, the game is at Deuce", () => {
        const local = new Team([new Player("Paco")]);
        const visitor = new Team([new Player("Lamo")]);
        const match = new TennisMatch(local,visitor);

        match.setScoreFor(local, 2,0,0);
        match.setScoreFor(visitor, 3,0,0);

        match.scoresAPoint(local);
        expect(match.isAtDeuce()).toBeTruthy();
    })

    it("When each team is at Deuce and one of them scores a point, the score is Advantage for the team in the lead ", () => {
        const local = new Team([new Player("Paco")]);
        const visitor = new Team([new Player("Lamo")]);
        const match = new TennisMatch(local,visitor);

        match.setScoreFor(local, 3,0,0)
        match.setScoreFor(visitor, 3,0,0)

        expect(match.isInAdventage(local)).toBeFalsy()
        match.scoresAPoint(local)
        expect(match.isInAdventage(local)).toBeTruthy()
    })

    it("Each team is able to return to Deuce", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)

        match.setScoreFor(local, 4,0,0)
        match.setScoreFor(visitor, 3,0,0)

        expect(match.isAtDeuce()).toBeFalsy()
        match.scoresAPoint(visitor)
        expect(match.isAtDeuce()).toBeTruthy()
    })

    it("A team can win a match", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)

        match.setScoreFor(local, 2,0,0)
        match.setScoreFor(visitor, 3,0,0)

        match.scoresAPoint(visitor)
        expect(match.matchScore.getScore(visitor)).toEqual({points: 0, games: 1, sets: 0})
    })

    it("A match can be in a tie-break", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)
        match.setScoreFor(local, 3,6,0)
        match.setScoreFor(visitor, 2,6,0)
  
        expect(match.isAtTieBreak()).toBeTruthy()
        match.scoresAPoint(local)
        expect(match.isAtTieBreak()).toBeFalsy()
    })

    it("A team can win a set", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)

        match.setScoreFor(local, 3,5,0)
        match.setScoreFor(visitor, 0,0,0)

        match.scoresAPoint(local)
        expect(match.matchScore.getScore(local)).toEqual({points: 0, games: 0, sets: 1})
    })

    it("a team can win a match", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)
        match.setScoreFor(local, 3,5,1)
        match.setScoreFor(visitor, 2,4,1)
    
        match.scoresAPoint(local)
        expect(match.hasWonMatch(local)).toBeTruthy()
    })
})

