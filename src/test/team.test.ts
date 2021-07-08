import { Player } from "../player"
import { Team } from "../team"

describe("Team", () => {
    it("must have at least 1 player", () =>{
        expect(() =>{
            new Team([])
        }).toThrow("Your team must have at least 1 player")
    })

    it("can not have more than 2 players", () =>{
        const aPlayer = new Player("A")

        expect(() =>{
            new Team([aPlayer, aPlayer, aPlayer])
        }).toThrow("Your team can not have more than 2 tennist players")
    })

    it("can be made up of two members", () =>{
        const aName = "Paco"
        const anotherName = "Lamo"

        const team = new Team([new Player(aName),new Player(anotherName)])

        expect(team.printPlayers()).toContain(aName)
        expect(team.printPlayers()).toContain(anotherName)
    })
})