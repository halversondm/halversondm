/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";
import GameService from "./GameService";

const gameService = new GameService();

const RPSLS = React.createClass({
  getInitialState() {
    return {
      gameSuccess: true,
      gameDraw: true,
      gameLose: true,
      explanation: "",
      winner: "",
      rock: "btn btn-default",
      paper: "btn btn-default",
      scissors: "btn btn-default",
      lizard: "btn btn-default",
      spock: "btn btn-default",
      rock2: "btn btn-default",
      paper2: "btn btn-default",
      scissors2: "btn btn-default",
      lizard2: "btn btn-default",
      spock2: "btn btn-default"
    };
  },
  human(event) {
    this.setState(this.getInitialState());
    const choice = event.currentTarget.dataset.choice;
    const player2 = gameService.getPick();
    this.setPlayer1Class(choice);
    this.setPlayer2Class(player2);
    gameService.setPlayer1(choice);
    gameService.setPlayer2(player2);
    try {
      gameService.takeTurn();
    } catch (Error) {
      // no winner
    }
    if (gameService.getWinner() === "Player 1") {
      this.setState({
        winner: "You win!",
        gameSuccess: false,
        gameDraw: true,
        gameLose: true,
        explanation: gameService.getResult()
      });
    } else if (gameService.getWinner() === "Player 2") {
      this.setState({
        winner: "The computer wins!",
        gameLose: false,
        gameSuccess: true,
        gameDraw: true,
        explanation: gameService.getResult()
      });
    } else {
      this.setState({
        winner: gameService.getWinner(),
        gameDraw: false,
        gameLose: true,
        gameSuccess: true,
        explanation: gameService.getResult()
      });
    }
  },
  setPlayer1Class(choice) {
    switch (choice) {
      case "rock":
        this.setState({rock: "btn btn-default btn-success"});
        break;
      case "spock":
        this.setState({spock: "btn btn-default btn-success"});
        break;
      case "lizard":
        this.setState({lizard: "btn btn-default btn-success"});
        break;
      case "scissors":
        this.setState({scissors: "btn btn-default btn-success"});
        break;
      case "paper":
        this.setState({paper: "btn btn-default btn-success"});
        break;
      default:
        throw new Error("error with choice");
    }
  },
  setPlayer2Class(choice) {
    switch (choice) {
      case "rock":
        this.setState({rock2: "btn btn-default btn-danger"});
        break;
      case "spock":
        this.setState({spock2: "btn btn-default btn-danger"});
        break;
      case "lizard":
        this.setState({lizard2: "btn btn-default btn-danger"});
        break;
      case "scissors":
        this.setState({scissors2: "btn btn-default btn-danger"});
        break;
      case "paper":
        this.setState({paper2: "btn btn-default btn-danger"});
        break;
      default:
        throw new Error("error with choice");
    }
  },
  render() {
    return <div>
      <h2 className="text-primary">Rock, Paper, Scissors, Lizard, Spock</h2>
      <p>Play the popular game with your computer! In this version, you'll be
        playing with Lizard and Spock too.</p>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-8 btn-group img-responsive"
             role="group" id="human">
          <p>Your Pick</p>
          <button id="rock" onClick={this.human} data-choice="rock"
                  type="button" className={this.state.rock}>
            <img src="../images/rock.jpg"/>
          </button>
          <button id="paper" onClick={this.human} data-choice="paper"
                  type="button" className={this.state.paper}>
            <img src="../images/paper.jpg"/>
          </button>
          <button id="scissors" onClick={this.human} data-choice="scissors"
                  type="button" className={this.state.scissors}>
            <img src="../images/scissors.jpg"/>
          </button>
          <button id="lizard" onClick={this.human} data-choice="lizard"
                  type="button" className={this.state.lizard}>
            <img src="../images/lizard.jpg"/>
          </button>
          <button id="spock" onClick={this.human} data-choice="spock"
                  type="button" className={this.state.spock}>
            <img src="../images/spock.jpg"/>
          </button>
        </div>
        <div className="col-xs-6 col-md-4">
          <p>Who wins?</p>
          <div id="alert_placeholder">
            <div className="alert alert-success" role="alert"
                 hidden={this.state.gameSuccess}><b>{this.state.winner}</b>
              <br/>{this.state.explanation}
            </div>
            <div className="alert alert-warning" role="alert"
                 hidden={this.state.gameDraw}><b>{this.state.winner}</b>
              <br/>{this.state.explanation}
            </div>
            <div className="alert alert-danger" role="alert"
                 hidden={this.state.gameLose}><b>{this.state.winner}</b>
              <br/>{this.state.explanation}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8 btn-group img-responsive"
             role="group" id="computer">
          <p>Computer's Pick</p>
          <button id="Rock2" type="button" className={this.state.rock2}
                  disabled>
            <img src="../images/rock.jpg"/>
          </button>
          <button id="Paper2" type="button" className={this.state.paper2}
                  disabled>
            <img src="../images/paper.jpg"/>
          </button>
          <button id="Scissors2" type="button" className={this.state.scissors2}
                  disabled>
            <img src="../images/scissors.jpg"/>
          </button>
          <button id="Lizard2" type="button" className={this.state.lizard2}
                  disabled>
            <img src="../images/lizard.jpg"/>
          </button>
          <button id="Spock2" type="button" className={this.state.spock2}
                  disabled>
            <img src="../images/spock.jpg"/>
          </button>
        </div>
      </div>
    </div>;
  }
});

export default RPSLS;
