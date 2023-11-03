import GameService from "../../app/components/GameService";

test("Draw", () => {
    const gameService = GameService();
    gameService.setPlayer1("spock");
    gameService.setPlayer2("spock");
    try {
        gameService.takeTurn();
    } catch (e) {
        expect(gameService.getWinner()).toEqual("Draw");
    }

});

test("Player 1 Winner", () => {
    const gameService = GameService();
    gameService.setPlayer1("spock");
    gameService.setPlayer2("rock");
    try {
        gameService.takeTurn();
    } catch (e) {
        expect(gameService.getWinner()).toEqual("Player 1");
    }

});

test("Player 2 Winner", () => {
    const gameService = GameService();
    gameService.setPlayer1("rock");
    gameService.setPlayer2("spock");
    try {
        gameService.takeTurn();
    } catch (e) {
        expect(gameService.getWinner()).toEqual("Player 2");
    }

});