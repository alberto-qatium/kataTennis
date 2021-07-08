import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";


describe("a match of tennis", () => {
    it("Each team has the same number of members", () => {
        const local = new Team([new Player("Paco"),new Player("Lamo")])
        const visitor = new Team([new Player("Martin")])
        
        expect(() => {
            new TennisMatch(local,visitor)
        }).toThrow("Each team must have the same number of members")
    })

    it("Each team starts with 0 points, 0 sets and 0 games", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])

        const match = new TennisMatch(local,visitor)

        expect(match.getScore(local)).toEqual({points: 0, games: 0,sets: 0})
        expect(match.getScore(visitor)).toEqual({points: 0, games: 0,sets: 0})
    })

    it("A team can win a game", () => {
        const { match, local, visitor } = aMatch();
        match.setScoreFor(local, 2,0,0)
        match.setScoreFor(visitor, 3,0,0)

        match.scoresAPoint(visitor)
        
        expect(match.getScore(visitor)).toEqual({points: 0, games: 1, sets: 0})
    })

    it("a match can be in a tie-break", () => {
        const { match, local, visitor } = aMatch();
        
        match.setScoreFor(local, 3,6,0)
        match.setScoreFor(visitor, 2,6,0)
  
        expect(match.isAtTieBreak()).toBeTruthy()
    })

    it("a team can win a tie-break", () => {
        const { match, local, visitor } = aMatch();
        match.setScoreFor(local, 3,6,0)
        match.setScoreFor(visitor, 2,6,0)
        
        match.scoresAPoint(local)

        expect(match.isAtTieBreak()).toBeFalsy()
    })

    it("a team can win a set", () => {
        const { match, local, visitor } = aMatch();
        match.setScoreFor(local, 3,5,0)
        match.setScoreFor(visitor, 0,0,0)

        match.scoresAPoint(local)

        expect(match.getScore(local)).toEqual({points: 0, games: 0, sets: 1})
    })

    it("a team can win a match", () => {
        const { match, local, visitor } = aMatch();
        match.setScoreFor(local, 3,5,1)
        match.setScoreFor(visitor, 2,4,1)
    
        match.scoresAPoint(local)

        expect(match.hasWonMatch(local)).toBeTruthy()
    })
})

function aMatch() {
    const local = new Team([new Player("Paco")]);
    const visitor = new Team([new Player("Lamo")]);
    const match = new TennisMatch(local, visitor);
    return { match, local, visitor };
}

