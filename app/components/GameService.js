/**
 * Created by Daniel on 1/26/2016.
 */
"use strict";

class GameService {

  constructor() {
    this.pick = "";
    this.player1 = "";
    this.player2 = "";
    this.result = "";
    this.winner = "";
    this.PAPER_DISPROVES_SPOCK = "Paper Disproves Spock";
    this.LIZARD_EATS_PAPER = "Lizard Eats Paper";
    this.SCISSORS_CUT_PAPER = "Scissors Cuts Paper";
    this.PAPER_COVERS_ROCK = "Paper Covers Rock";
    this.init();
  }

  init() {
    this.SPOCK_VAPORIZES_ROCK = "Spock Vaporizes Rock";
    this.ROCK_CRUSHES_LIZARD = "Rock Crushes Lizard";
    this.ROCK_SMASHES_SCISSORS = "Rock Crushes Scissors";
    this.LIZARD_POISONS_SPOCK = "Lizard Poisons Spock";
    this.SPOCK_BENDS_SCISSORS = "Spock Smashes Scissors";
    this.SCISSORS_DECAPITATE_LIZARD = "Scissors Decapitate Lizard";
    this.PLAYER_1 = "Player 1";
    this.PLAYER_2 = "Player 2";
  }

  setPlayer1(val) {
    this.player1 = val;
  }

  setPlayer2(val) {
    this.player2 = val;
  }

  getWinner() {
    return this.winner;
  }

  getResult() {
    return this.result;
  }

  paper() {
    switch (this.player2) {
      case "spock":
        this.result = this.PAPER_DISPROVES_SPOCK;
        this.winner = this.PLAYER_1;
        break;
      case "lizard":
        this.result = this.LIZARD_EATS_PAPER;
        this.winner = this.PLAYER_2;
        break;
      case "scissors":
        this.result = this.SCISSORS_CUT_PAPER;
        this.winner = this.PLAYER_2;
        break;
      case "rock":
        this.result = this.PAPER_COVERS_ROCK;
        this.winner = this.PLAYER_1;
        break;
      default:
        throw new Error("error with choice");
    }
  }

  rock() {
    switch (this.player2) {
      case "spock":
        this.result = this.SPOCK_VAPORIZES_ROCK;
        this.winner = this.PLAYER_2;
        break;
      case "lizard":
        this.result = this.ROCK_CRUSHES_LIZARD;
        this.winner = this.PLAYER_1;
        break;
      case "scissors":
        this.result = this.ROCK_SMASHES_SCISSORS;
        this.winner = this.PLAYER_1;
        break;
      case "paper":
        this.result = this.PAPER_COVERS_ROCK;
        this.winner = this.PLAYER_2;
        break;
      default:
        throw new Error("error with choice");
    }
  }

  spock() {
    switch (this.player2) {
      case "rock":
        this.result = this.SPOCK_VAPORIZES_ROCK;
        this.winner = this.PLAYER_1;
        break;
      case "lizard":
        this.result = this.LIZARD_POISONS_SPOCK;
        this.winner = this.PLAYER_2;
        break;
      case "scissors":
        this.result = this.SPOCK_BENDS_SCISSORS;
        this.winner = this.PLAYER_1;
        break;
      case "paper":
        this.result = this.PAPER_DISPROVES_SPOCK;
        this.winner = this.PLAYER_2;
        break;
      default:
        throw new Error("error with choice");
    }
  }

  lizard() {
    switch (this.player2) {
      case "rock":
        this.result = this.ROCK_CRUSHES_LIZARD;
        this.winner = this.PLAYER_2;
        break;
      case "spock":
        this.result = this.LIZARD_POISONS_SPOCK;
        this.winner = this.PLAYER_1;
        break;
      case "scissors":
        this.result = this.SCISSORS_DECAPITATE_LIZARD;
        this.winner = this.PLAYER_2;
        break;
      case "paper":
        this.result = this.LIZARD_EATS_PAPER;
        this.winner = this.PLAYER_1;
        break;
      default:
        throw new Error("error with choice");
    }
  }

  scissors() {
    switch (this.player2) {
      case "rock":
        this.result = this.ROCK_SMASHES_SCISSORS;
        this.winner = this.PLAYER_2;
        break;
      case "spock":
        this.result = this.SPOCK_BENDS_SCISSORS;
        this.winner = this.PLAYER_2;
        break;
      case "lizard":
        this.result = this.SCISSORS_DECAPITATE_LIZARD;
        this.winner = this.PLAYER_1;
        break;
      case "paper":
        this.result = this.SCISSORS_CUT_PAPER;
        this.winner = this.PLAYER_1;
        break;
      default:
        throw new Error("error with choice");
    }
  }

  takeTurn() {
    this.winner = "Draw";
    this.result = "No winner. Please try again.";
    switch (this.player1) {
      case "spock":
        this.spock();
        break;
      case "rock":
        this.rock();
        break;
      case "paper":
        this.paper();
        break;
      case "lizard":
        this.lizard();
        break;
      case "scissors":
        this.scissors();
        break;
      default:
        throw new Error("error with choice");
    }
  }

  getPick() {
    this.randomPick();
    return this.pick;
  }

  randomPick() {
    var picks = ["spock", "lizard", "scissors", "paper", "rock"];
    var randomNumber = Math.floor((Math.random() * 5));
    this.pick = picks[randomNumber];
  }
}

export default GameService;
