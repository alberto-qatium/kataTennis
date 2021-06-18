import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";

describe("a game in tennis", () => {

    it("a team can win a game", () => {
      const teamA = new Team(["Paco"],[3,3,0])
      const teamB = new Team(["Lamo"],[2,0,0])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Forty 3 0\nLamo Thirty 0 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 4 0\nLamo Love 0 0")
    })

    it("when at least three points have been scored by each team, and the scores are equal, the score is Deuce", () => {
      const teamA = new Team(["Paco"],[2,0,0])
      const teamB = new Team(["Lamo"],[3,0,0])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Thirty 0 0\nLamo Forty 0 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Deuce 0 0\nLamo Deuce 0 0")
    })

    it("when each team is at Deuce and one of them scores a point, the score is Advantage for the team in the lead ", () => {
      const teamA = new Team(["Paco"],[3,0,0])
      const teamB = new Team(["Lamo"],[3,0,0])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Deuce 0 0\nLamo Deuce 0 0")
      tennisMatch.scoresAPointTeam1()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Advantage 0 0\nLamo Forty 0 0")
    })

    it("each team is able to return to Deuce", () => {
      const teamA = new Team(["Paco"],[4,0,0])
      const teamB = new Team(["Lamo"],[3,0,0])
      const tennisMatch = new TennisMatch(teamA,teamB)
  
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Advantage 0 0\nLamo Forty 0 0")
      tennisMatch.scoresAPointTeam2()
      expect(tennisMatch.printScoreBoard()).toEqual("Paco Deuce 0 0\nLamo Deuce 0 0")
    })
  })