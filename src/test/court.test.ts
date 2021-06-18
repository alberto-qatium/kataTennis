import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";

describe("court of tennis", () => {

  it("There are two teams facing each other.", () => {
    const teamA = new Team(["Paco"])
    const teamB = new Team(["Lamo"])
    const tennisMatch = new TennisMatch(teamA,teamB)

    expect(tennisMatch.numberOfPlayers()).toEqual(2)
  })

  it("The teams can be made up of two members", () =>{
    const teamA = new Team(["Paco","Lamo",])
    const teamB = new Team(["Marton","Novoa"])
    const tennisMatch = new TennisMatch(teamA, teamB)

    expect(tennisMatch.numberOfPlayers()).toEqual(4)
  })

  it("A team must have at least 1 player", () =>{
    expect(() =>{new Team([])}).toThrow( new Error("Your team must have at least 1 player"))
  })

  it("A teams can not have more than 2 players", () =>{
    expect(() =>{new Team(["A","B","C"])}).toThrow( new Error("Your team can not have more than 2 tennist players"))
  })

  it("Each team has the same number of members", () => {
    const teamA = new Team(["Paco","Lamo",])
    const teamB = new Team(["Novoa"])
    
    expect(() => {new TennisMatch(teamA,teamB)}).toThrow( new Error("Each team must have the same number of members"))
  })

  it("Each team starts with 0 points, 0 sets and 0 games", () => {
    const teamA = new Team(["Paco"])
    const teamB = new Team(["Lamo"])
    const tennisMatch = new TennisMatch(teamA,teamB)

    expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 0\nLamo Love 0 0")
  })
})
