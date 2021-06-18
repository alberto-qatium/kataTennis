import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";

describe("a set in tennis", () => {

    it("a team can win a set", () => {
      const teamA = new Team(["Paco"],[3,5,0])
      const teamB = new Team(["Lamo"],[2,4,0])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 5 0\nLamo Thirty 4 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 1\nLamo Love 0 0")
    })

    it("a team can win a tie-break", () => {
        const teamA = new Team(["Paco"],[3,6,0])
        const teamB = new Team(["Lamo"],[2,6,0])
        const tennisMatch = new TennisMatch(teamA,teamB)
    
        expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 6 0\nLamo Thirty 6 0")
        tennisMatch.scoresAPointTeam1()
        expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 1\nLamo Love 0 0")
    })
    
  })