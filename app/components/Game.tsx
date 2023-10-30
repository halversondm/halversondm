/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import GameService, { type IGameService } from "./GameService";
import { type ReactNode, useState } from "react";

export interface IGameState {
  gameSuccess: boolean;
  gameDraw: boolean;
  gameLose: boolean;
  explanation: string;
  winner: string;
  rock: string;
  paper: string;
  scissors: string;
  lizard: string;
  spock: string;
  rock2: string;
  paper2: string;
  scissors2: string;
  lizard2: string;
  spock2: string;
}

export default function Game(): ReactNode {
  const [state, setState] = useState<IGameState>(initialState());
  const gameService: IGameService = GameService();

  function initialState(): IGameState {
    return {
      explanation: "",
      gameDraw: true,
      gameLose: true,
      gameSuccess: true,
      lizard: "btn btn-default",
      lizard2: "btn btn-default",
      paper: "btn btn-default",
      paper2: "btn btn-default",
      rock: "btn btn-default",
      rock2: "btn btn-default",
      scissors: "btn btn-default",
      scissors2: "btn btn-default",
      spock: "btn btn-default",
      spock2: "btn btn-default",
      winner: "",
    };
  }

  function human(event): void {
    let state = initialState();
    const choice = event.currentTarget.dataset.choice;
    const player2 = gameService.getPick();
    state = setPlayer1Class(choice, state);
    state = setPlayer2Class(player2, state);
    gameService.setPlayer1(choice);
    gameService.setPlayer2(player2);
    try {
      gameService.takeTurn();
    } catch (Error) {
      // no winner
    }
    if (gameService.getWinner() === "Player 1") {
      setState({
        ...state,
        winner: "You win!",
        gameSuccess: false,
        gameDraw: true,
        gameLose: true,
        explanation: gameService.getResult(),
      });
    } else if (gameService.getWinner() === "Player 2") {
      setState({
        ...state,
        winner: "The computer wins!",
        gameLose: false,
        gameSuccess: true,
        gameDraw: true,
        explanation: gameService.getResult(),
      });
    } else {
      setState({
        ...state,
        winner: gameService.getWinner(),
        gameDraw: false,
        gameLose: true,
        gameSuccess: true,
        explanation: gameService.getResult(),
      });
    }
  }

  function setPlayer1Class(choice, state): IGameState {
    switch (choice) {
      case "rock":
        state.rock = "btn btn-default btn-success";
        break;
      case "spock":
        state.spock = "btn btn-default btn-success";
        break;
      case "lizard":
        state.lizard = "btn btn-default btn-success";
        break;
      case "scissors":
        state.scissors = "btn btn-default btn-success";
        break;
      case "paper":
        state.paper = "btn btn-default btn-success";
        break;
      default:
        throw new Error("error with choice");
    }
    return state;
  }

  function setPlayer2Class(choice, state): IGameState {
    switch (choice) {
      case "rock":
        state.rock2 = "btn btn-default btn-danger";
        break;
      case "spock":
        state.spock2 = "btn btn-default btn-danger";
        break;
      case "lizard":
        state.lizard2 = "btn btn-default btn-danger";
        break;
      case "scissors":
        state.scissors2 = "btn btn-default btn-danger";
        break;
      case "paper":
        state.paper2 = "btn btn-default btn-danger";
        break;
      default:
        throw new Error("error with choice");
    }
    return state;
  }

  return (
    <div>
      <h2 className="text-primary">Rock, Paper, Scissors, Lizard, Spock</h2>
      <p>
        Play the popular game with your computer! In this version, you&apos;ll
        be playing with Lizard and Spock too.
      </p>
      <div className="row">
        <div
          className="col-xs-12 col-sm-6 col-md-8 btn-group img-responsive"
          role="group"
          id="human"
        >
          <p>Your Pick</p>
          <button
            id="rock"
            onClick={human}
            data-choice="rock"
            type="button"
            className={state.rock}
          >
            <img src="../images/rock.jpg" />
          </button>
          <button
            id="paper"
            onClick={human}
            data-choice="paper"
            type="button"
            className={state.paper}
          >
            <img src="../images/paper.jpg" />
          </button>
          <button
            id="scissors"
            onClick={human}
            data-choice="scissors"
            type="button"
            className={state.scissors}
          >
            <img src="../images/scissors.jpg" />
          </button>
          <button
            id="lizard"
            onClick={human}
            data-choice="lizard"
            type="button"
            className={state.lizard}
          >
            <img src="../images/lizard.jpg" />
          </button>
          <button
            id="spock"
            onClick={human}
            data-choice="spock"
            type="button"
            className={state.spock}
          >
            <img src="../images/spock.jpg" />
          </button>
        </div>
        <div className="col-xs-6 col-md-4">
          <p>Who wins?</p>
          <div id="alert_placeholder">
            <div
              className="alert alert-success"
              role="alert"
              hidden={state.gameSuccess}
            >
              <b>{state.winner}</b>
              <br />
              {state.explanation}
            </div>
            <div
              className="alert alert-warning"
              role="alert"
              hidden={state.gameDraw}
            >
              <b>{state.winner}</b>
              <br />
              {state.explanation}
            </div>
            <div
              className="alert alert-danger"
              role="alert"
              hidden={state.gameLose}
            >
              <b>{state.winner}</b>
              <br />
              {state.explanation}
            </div>
          </div>
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-8 btn-group img-responsive"
          role="group"
          id="computer"
        >
          <p>Computers Pick</p>
          <button
            id="Rock2"
            type="button"
            className={state.rock2}
            disabled={true}
          >
            <img src="../images/rock.jpg" />
          </button>
          <button
            id="Paper2"
            type="button"
            className={state.paper2}
            disabled={true}
          >
            <img src="../images/paper.jpg" />
          </button>
          <button
            id="Scissors2"
            type="button"
            className={state.scissors2}
            disabled={true}
          >
            <img src="../images/scissors.jpg" />
          </button>
          <button
            id="Lizard2"
            type="button"
            className={state.lizard2}
            disabled={true}
          >
            <img src="../images/lizard.jpg" />
          </button>
          <button
            id="Spock2"
            type="button"
            className={state.spock2}
            disabled={true}
          >
            <img src="../images/spock.jpg" />
          </button>
        </div>
      </div>
    </div>
  );
}
