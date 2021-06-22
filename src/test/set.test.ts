import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player";

describe("a set in tennis", () => {

    it("a team can win a set", () => {
      const teamA = new Team([new Player("Paco")])
      const teamB = new Team([new Player("Lamo")])
      const tennisMatch = new TennisMatch(teamA,teamB)  
      tennisMatch.setScoreForHomeTeam(3,5,0)
      tennisMatch.setScoreForForageinTeam(2,4,0)

      expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 5 0\nLamo Thirty 4 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 1\nLamo Love 0 0")
    })

    it("a team can win a tie-break", () => {
      const teamA = new Team([new Player("Paco")])
      const teamB = new Team([new Player("Lamo")])
      const tennisMatch = new TennisMatch(teamA,teamB)
      tennisMatch.setScoreForHomeTeam(3,6,0)
      tennisMatch.setScoreForForageinTeam(2,6,0)

      expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 6 0\nLamo Thirty 6 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 1\nLamo Love 0 0")
    })
  })