import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";
import { ScoreBoard } from "../scoreBoard";


describe("a scoreBoard in tennis", () => {
    
    it("shows the score with slang", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)
        const scoreBoard = new ScoreBoard(match);

        match.setScoreFor(local, 1,3,0)
        match.setScoreFor(visitor, 0,0,0)
  
        expect(scoreBoard.render()).toEqual("Paco Fifteen 3 0\nLamo Love 0 0")
        match.scoresAPoint(local)
        expect(scoreBoard.render()).toEqual("Paco Thirty 3 0\nLamo Love 0 0")
      })

      it("shows deuce when match is at Deuce", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)
        const scoreBoard = new ScoreBoard(match);

        match.setScoreFor(local, 3,3,0)
        match.setScoreFor(visitor, 2,0,0)
        
        expect(scoreBoard.render()).toEqual("Paco Forty 3 0\nLamo Thirty 0 0")
        match.scoresAPoint(visitor)
        expect(scoreBoard.render()).toEqual("Paco Deuce 3 0\nLamo Deuce 0 0")
      })

      it("shows Advantage when a team is at Advantage", () => {
        const local = new Team([new Player("Paco")])
        const visitor = new Team([new Player("Lamo")])
        const match = new TennisMatch(local,visitor)
        const scoreBoard = new ScoreBoard(match);

        match.setScoreFor(local, 3,3,0)
        match.setScoreFor(visitor, 3,0,0)
  
        expect(scoreBoard.render()).toEqual("Paco Deuce 3 0\nLamo Deuce 0 0")
        match.scoresAPoint(local)
        expect(scoreBoard.render()).toEqual("Paco Advantage 3 0\nLamo Forty 0 0")
      })
});