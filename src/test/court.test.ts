import { TennisMatch } from "../tennisMatch"
import { Team } from "../team";
import { Player } from "../player"

describe("court of tennis", () => {

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

  it("A teams can not have more than 2 players", () =>{
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

    expect(tennisMatch.printScoreBoard()).toEqual("Paco Love 0 0\nLamo Love 0 0")
  })
})
