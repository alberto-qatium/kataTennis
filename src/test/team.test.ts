import { Player } from "../player"
import { Team } from "../team"

describe("Team", () => {
    it("it can be made up of two members", () =>{
        const team = new Team([new Player("Paco"),new Player("Lamo")])
        

        expect(team.numberOfPlayers()).toEqual(2)
    })
})