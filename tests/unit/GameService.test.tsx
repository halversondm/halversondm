import GameService from "../../app/components/GameService";

const testData = [
    {
        name: "Game Service Test for Spock",
        scenarios: [{
            type: "Draw",
            player1: "spock",
            player2: "spock",
            name: "Should result in a Draw"
        }, {
            type: "Player 1",
            player1: "spock",
            player2: "rock",
            name: "Should result in a Player 1 Winner"
        }, {
            type: "Player 2",
            player1: "spock",
            player2: "lizard",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 2",
            player1: "spock",
            player2: "paper",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 1",
            player1: "spock",
            player2: "scissors",
            name: "Should result in a Player 1 Winner"
        }]
    }, {
        name: "Game Service Test for Paper",
        scenarios: [{
            type: "Draw",
            player1: "paper",
            player2: "paper",
            name: "Should result in a Draw"
        }, {
            type: "Player 1",
            player1: "paper",
            player2: "rock",
            name: "Should result in a Player 1 Winner"
        }, {
            type: "Player 2",
            player1: "paper",
            player2: "lizard",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 2",
            player1: "paper",
            player2: "scissors",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 1",
            player1: "paper",
            player2: "spock",
            name: "Should result in a Player 1 Winner"
        }]
    }, {
        name: "Game Service Test for Lizard",
        scenarios: [{
            type: "Draw",
            player1: "lizard",
            player2: "lizard",
            name: "Should result in a Draw"
        }, {
            type: "Player 1",
            player1: "lizard",
            player2: "spock",
            name: "Should result in a Player 1 Winner"
        }, {
            type: "Player 2",
            player1: "lizard",
            player2: "rock",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 2",
            player1: "lizard",
            player2: "scissors",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 1",
            player1: "lizard",
            player2: "paper",
            name: "Should result in a Player 1 Winner"
        }]
    }, {
        name: "Game Service Test for Rock",
        scenarios: [{
            type: "Draw",
            player1: "rock",
            player2: "rock",
            name: "Should result in a Draw"
        }, {
            type: "Player 1",
            player1: "rock",
            player2: "scissors",
            name: "Should result in a Player 1 Winner"
        }, {
            type: "Player 2",
            player1: "rock",
            player2: "paper",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 2",
            player1: "rock",
            player2: "spock",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 1",
            player1: "rock",
            player2: "lizard",
            name: "Should result in a Player 1 Winner"
        }]
    }, {
        name: "Game Service Test for Scissors",
        scenarios: [{
            type: "Draw",
            player1: "scissors",
            player2: "scissors",
            name: "Should result in a Draw"
        }, {
            type: "Player 1",
            player1: "scissors",
            player2: "paper",
            name: "Should result in a Player 1 Winner"
        }, {
            type: "Player 2",
            player1: "scissors",
            player2: "rock",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 2",
            player1: "scissors",
            player2: "spock",
            name: "Should result in a Player 2 Winner"
        }, {
            type: "Player 1",
            player1: "scissors",
            player2: "lizard",
            name: "Should result in a Player 1 Winner"
        }]
    },
]

for (let i = 0; i < testData.length; i++) {
    describe(testData[i].name, () => {
        for (let j = 0; j < testData[i].scenarios.length; j++) {
            it(testData[i].scenarios[j].name, () => {
                const gameService = GameService();
                gameService.setPlayer1(testData[i].scenarios[j].player1);
                gameService.setPlayer2(testData[i].scenarios[j].player2);
                gameService.takeTurn();
                expect(gameService.getWinner()).toEqual(testData[i].scenarios[j].type);
            });
        }
    });
}

