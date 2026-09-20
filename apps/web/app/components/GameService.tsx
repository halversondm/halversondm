/**
 * Created by Daniel on 1/26/2016.
 */

export interface IGameService {
  setPlayer1: (value: string) => void;
  setPlayer2: (value: string) => void;
  getWinner: () => string;
  getResult: () => string;
  takeTurn: () => void;
  getPick: () => string;
}

export default function GameService(): IGameService {
  const SPOCK_VAPORIZES_ROCK: string = "Spock Vaporizes Rock";
  const ROCK_CRUSHES_LIZARD: string = "Rock Crushes Lizard";
  const ROCK_SMASHES_SCISSORS: string = "Rock Crushes Scissors";
  const LIZARD_POISONS_SPOCK: string = "Lizard Poisons Spock";
  const SPOCK_BENDS_SCISSORS: string = "Spock Smashes Scissors";
  const SCISSORS_DECAPITATE_LIZARD: string = "Scissors Decapitate Lizard";
  const PLAYER_1: string = "Player 1";
  const PLAYER_2: string = "Player 2";
  const PAPER_DISPROVES_SPOCK: string = "Paper Disproves Spock";
  const LIZARD_EATS_PAPER: string = "Lizard Eats Paper";
  const SCISSORS_CUT_PAPER: string = "Scissors Cuts Paper";
  const PAPER_COVERS_ROCK: string = "Paper Covers Rock";
  let pick: string = "";
  let player1: string = "";
  let player2: string = "";
  let roundResult: string = "";
  let winner: string = "";

  function setPlayer1(val: string): void {
    player1 = val;
  }

  function setPlayer2(val: string): void {
    player2 = val;
  }

  function getWinner(): string {
    return winner;
  }

  function getResult(): string {
    return roundResult;
  }

  function paper(): void {
    switch (player2) {
      case "spock":
        roundResult = PAPER_DISPROVES_SPOCK;
        winner = PLAYER_1;
        break;
      case "lizard":
        roundResult = LIZARD_EATS_PAPER;
        winner = PLAYER_2;
        break;
      case "scissors":
        roundResult = SCISSORS_CUT_PAPER;
        winner = PLAYER_2;
        break;
      case "rock":
        roundResult = PAPER_COVERS_ROCK;
        winner = PLAYER_1;
        break;
    }
  }

  function rock(): void {
    switch (player2) {
      case "spock":
        roundResult = SPOCK_VAPORIZES_ROCK;
        winner = PLAYER_2;
        break;
      case "lizard":
        roundResult = ROCK_CRUSHES_LIZARD;
        winner = PLAYER_1;
        break;
      case "scissors":
        roundResult = ROCK_SMASHES_SCISSORS;
        winner = PLAYER_1;
        break;
      case "paper":
        roundResult = PAPER_COVERS_ROCK;
        winner = PLAYER_2;
        break;
    }
  }

  function spock(): void {
    switch (player2) {
      case "rock":
        roundResult = SPOCK_VAPORIZES_ROCK;
        winner = PLAYER_1;
        break;
      case "lizard":
        roundResult = LIZARD_POISONS_SPOCK;
        winner = PLAYER_2;
        break;
      case "scissors":
        roundResult = SPOCK_BENDS_SCISSORS;
        winner = PLAYER_1;
        break;
      case "paper":
        roundResult = PAPER_DISPROVES_SPOCK;
        winner = PLAYER_2;
        break;
    }
  }

  function lizard(): void {
    switch (player2) {
      case "rock":
        roundResult = ROCK_CRUSHES_LIZARD;
        winner = PLAYER_2;
        break;
      case "spock":
        roundResult = LIZARD_POISONS_SPOCK;
        winner = PLAYER_1;
        break;
      case "scissors":
        roundResult = SCISSORS_DECAPITATE_LIZARD;
        winner = PLAYER_2;
        break;
      case "paper":
        roundResult = LIZARD_EATS_PAPER;
        winner = PLAYER_1;
        break;
    }
  }

  function scissors(): void {
    switch (player2) {
      case "rock":
        roundResult = ROCK_SMASHES_SCISSORS;
        winner = PLAYER_2;
        break;
      case "spock":
        roundResult = SPOCK_BENDS_SCISSORS;
        winner = PLAYER_2;
        break;
      case "lizard":
        roundResult = SCISSORS_DECAPITATE_LIZARD;
        winner = PLAYER_1;
        break;
      case "paper":
        roundResult = SCISSORS_CUT_PAPER;
        winner = PLAYER_1;
        break;
    }
  }

  function takeTurn(): void {
    winner = "Draw";
    roundResult = "No winner. Please try again.";
    switch (player1) {
      case "spock":
        spock();
        break;
      case "rock":
        rock();
        break;
      case "paper":
        paper();
        break;
      case "lizard":
        lizard();
        break;
      case "scissors":
        scissors();
        break;
      default:
        throw new Error("error with choice");
    }
  }

  function getPick(): string {
    randomPick();
    return pick;
  }

  function randomPick(): void {
    const picks = ["spock", "lizard", "scissors", "paper", "rock"];
    const randomNumber = Math.floor(Math.random() * 5);
    pick = picks[randomNumber];
  }

  return {
    setPlayer1,
    setPlayer2,
    getWinner,
    getResult,
    takeTurn,
    getPick,
  };
}
