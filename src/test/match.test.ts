import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";

describe("a match in tennis", () => {

    it("a team can win a match", () => {
      const teamA = new Team(["Paco"],[3,5,1])
      const teamB = new Team(["Lamo"],[2,4,1])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 5 1\nLamo Thirty 4 1")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 2\nLamo Love 0 1")
    })

    it("should be able to end", () => {
        const teamA = new Team(["Paco"],[3,5,1])
        const teamB = new Team(["Lamo"],[2,4,1])
        const tennisMatch = new TennisMatch(teamA,teamB)
    
        expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 5 1\nLamo Thirty 4 1")
        tennisMatch.scoresAPointTeam1()
        expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 2\nLamo Love 0 1")
        tennisMatch.scoresAPointTeam1()
        expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 2\nLamo Love 0 1")
      })
  })