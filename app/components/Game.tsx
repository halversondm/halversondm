/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { GameService } from './GameService'
import { type ReactNode } from 'react'

export interface IGameState {
  gameSuccess: boolean
  gameDraw: boolean
  gameLose: boolean
  explanation: string
  winner: string
  rock: string
  paper: string
  scissors: string
  lizard: string
  spock: string
  rock2: string
  paper2: string
  scissors2: string
  lizard2: string
  spock2: string
}

export class Game extends React.Component<unknown, IGameState> {
  public state: IGameState
  private readonly gameService: GameService

  constructor () {
    super({})
    this.state = this.initialState()
    this.human = this.human.bind(this)
    this.setPlayer1Class = this.setPlayer1Class.bind(this)
    this.setPlayer2Class = this.setPlayer2Class.bind(this)
    this.gameService = new GameService()
  }

  render (): ReactNode {
    return (
            <div>
                <h2 className="text-primary">Rock, Paper, Scissors, Lizard, Spock</h2>
                <p>Play the popular game with your computer! In this version, you&apos;ll be
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
                        <p>Computers Pick</p>
                        <button id="Rock2" type="button" className={this.state.rock2}
                                disabled={true}>
                            <img src="../images/rock.jpg"/>
                        </button>
                        <button id="Paper2" type="button" className={this.state.paper2}
                                disabled={true}>
                            <img src="../images/paper.jpg"/>
                        </button>
                        <button id="Scissors2" type="button" className={this.state.scissors2}
                                disabled={true}>
                            <img src="../images/scissors.jpg"/>
                        </button>
                        <button id="Lizard2" type="button" className={this.state.lizard2}
                                disabled={true}>
                            <img src="../images/lizard.jpg"/>
                        </button>
                        <button id="Spock2" type="button" className={this.state.spock2}
                                disabled={true}>
                            <img src="../images/spock.jpg"/>
                        </button>
                    </div>
                </div>
            </div>
    )
  }

  private initialState (): IGameState {
    return {
      explanation: '',
      gameDraw: true,
      gameLose: true,
      gameSuccess: true,
      lizard: 'btn btn-default',
      lizard2: 'btn btn-default',
      paper: 'btn btn-default',
      paper2: 'btn btn-default',
      rock: 'btn btn-default',
      rock2: 'btn btn-default',
      scissors: 'btn btn-default',
      scissors2: 'btn btn-default',
      spock: 'btn btn-default',
      spock2: 'btn btn-default',
      winner: ''
    }
  }

  private human (event): void {
    this.setState(this.initialState())
    const choice = event.currentTarget.dataset.choice
    const player2 = this.gameService.getPick()
    this.setPlayer1Class(choice)
    this.setPlayer2Class(player2)
    this.gameService.setPlayer1(choice)
    this.gameService.setPlayer2(player2)
    try {
      this.gameService.takeTurn()
    } catch (Error) {
      // no winner
    }
    if (this.gameService.getWinner() === 'Player 1') {
      this.setState({
        winner: 'You win!',
        gameSuccess: false,
        gameDraw: true,
        gameLose: true,
        explanation: this.gameService.getResult()
      })
    } else if (this.gameService.getWinner() === 'Player 2') {
      this.setState({
        winner: 'The computer wins!',
        gameLose: false,
        gameSuccess: true,
        gameDraw: true,
        explanation: this.gameService.getResult()
      })
    } else {
      this.setState({
        winner: this.gameService.getWinner(),
        gameDraw: false,
        gameLose: true,
        gameSuccess: true,
        explanation: this.gameService.getResult()
      })
    }
  }

  private setPlayer1Class (choice): void {
    switch (choice) {
      case 'rock':
        this.setState({ rock: 'btn btn-default btn-success' })
        break
      case 'spock':
        this.setState({ spock: 'btn btn-default btn-success' })
        break
      case 'lizard':
        this.setState({ lizard: 'btn btn-default btn-success' })
        break
      case 'scissors':
        this.setState({ scissors: 'btn btn-default btn-success' })
        break
      case 'paper':
        this.setState({ paper: 'btn btn-default btn-success' })
        break
      default:
        throw new Error('error with choice')
    }
  }

  private setPlayer2Class (choice): void {
    switch (choice) {
      case 'rock':
        this.setState({ rock2: 'btn btn-default btn-danger' })
        break
      case 'spock':
        this.setState({ spock2: 'btn btn-default btn-danger' })
        break
      case 'lizard':
        this.setState({ lizard2: 'btn btn-default btn-danger' })
        break
      case 'scissors':
        this.setState({ scissors2: 'btn btn-default btn-danger' })
        break
      case 'paper':
        this.setState({ paper2: 'btn btn-default btn-danger' })
        break
      default:
        throw new Error('error with choice')
    }
  }
}
