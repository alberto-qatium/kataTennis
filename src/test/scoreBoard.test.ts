import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";
import { ScoreBoard } from "../scoreBoard";


describe("a scoreBoard in tennis", () => {
    
    it("shows the score with slang", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
        const scoreBoard = new ScoreBoard(tennisMatch);

        tennisMatch.setScoreForHomeTeam(1,3,0)
        tennisMatch.setScoreForForageinTeam(0,0,0)
  
        expect(scoreBoard.render()).toEqual("Paco Fifteen 3 0\nLamo Love 0 0")
        tennisMatch.scoresAPointHomeTeam()
        expect(scoreBoard.render()).toEqual("Paco Thirty 3 0\nLamo Love 0 0")
      })

      it("shows deuce when match is at Deuce", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
        const scoreBoard = new ScoreBoard(tennisMatch);

        tennisMatch.setScoreForHomeTeam(3,3,0)
        tennisMatch.setScoreForForageinTeam(2,0,0)
  
        expect(scoreBoard.render()).toEqual("Paco Forty 3 0\nLamo Thirty 0 0")
        tennisMatch.scoresAPointForageinTeam()
        expect(scoreBoard.render()).toEqual("Paco Deuce 3 0\nLamo Deuce 0 0")
      })

      it("shows Advantage when a team is at Advantage", () => {
        const teamA = new Team([new Player("Paco")])
        const teamB = new Team([new Player("Lamo")])
        const tennisMatch = new TennisMatch(teamA,teamB)
        const scoreBoard = new ScoreBoard(tennisMatch);

        tennisMatch.setScoreForHomeTeam(3,3,0)
        tennisMatch.setScoreForForageinTeam(3,0,0)
  
        expect(scoreBoard.render()).toEqual("Paco Deuce 3 0\nLamo Deuce 0 0")
        tennisMatch.scoresAPointHomeTeam()
        expect(scoreBoard.render()).toEqual("Paco Advantage 3 0\nLamo Forty 0 0")
      })
});