/**
 * Created by Daniel on 1/26/2016.
 */
export class GameService {
  static SPOCK_VAPORIZES_ROCK: string = 'Spock Vaporizes Rock'
  static ROCK_CRUSHES_LIZARD: string = 'Rock Crushes Lizard'
  static ROCK_SMASHES_SCISSORS: string = 'Rock Crushes Scissors'
  static LIZARD_POISONS_SPOCK: string = 'Lizard Poisons Spock'
  static SPOCK_BENDS_SCISSORS: string = 'Spock Smashes Scissors'
  static SCISSORS_DECAPITATE_LIZARD: string = 'Scissors Decapitate Lizard'
  static PLAYER_1: string = 'Player 1'
  static PLAYER_2: string = 'Player 2'
  static PAPER_DISPROVES_SPOCK: string = 'Paper Disproves Spock'
  static LIZARD_EATS_PAPER: string = 'Lizard Eats Paper'
  static SCISSORS_CUT_PAPER: string = 'Scissors Cuts Paper'
  static PAPER_COVERS_ROCK: string = 'Paper Covers Rock'
  pick: string = ''
  player1: string = ''
  player2: string = ''
  roundResult: string = ''
  winner: string = ''

  public setPlayer1 (val: string): void {
    this.player1 = val
  }

  public setPlayer2 (val: string): void {
    this.player2 = val
  }

  public getWinner (): string {
    return this.winner
  }

  public getResult (): string {
    return this.roundResult
  }

  private paper (): void {
    switch (this.player2) {
      case 'spock':
        this.roundResult = GameService.PAPER_DISPROVES_SPOCK
        this.winner = GameService.PLAYER_1
        break
      case 'lizard':
        this.roundResult = GameService.LIZARD_EATS_PAPER
        this.winner = GameService.PLAYER_2
        break
      case 'scissors':
        this.roundResult = GameService.SCISSORS_CUT_PAPER
        this.winner = GameService.PLAYER_2
        break
      case 'rock':
        this.roundResult = GameService.PAPER_COVERS_ROCK
        this.winner = GameService.PLAYER_1
        break
      default:
        throw new Error('error with choice')
    }
  }

  private rock (): void {
    switch (this.player2) {
      case 'spock':
        this.roundResult = GameService.SPOCK_VAPORIZES_ROCK
        this.winner = GameService.PLAYER_2
        break
      case 'lizard':
        this.roundResult = GameService.ROCK_CRUSHES_LIZARD
        this.winner = GameService.PLAYER_1
        break
      case 'scissors':
        this.roundResult = GameService.ROCK_SMASHES_SCISSORS
        this.winner = GameService.PLAYER_1
        break
      case 'paper':
        this.roundResult = GameService.PAPER_COVERS_ROCK
        this.winner = GameService.PLAYER_2
        break
      default:
        throw new Error('error with choice')
    }
  }

  private spock (): void {
    switch (this.player2) {
      case 'rock':
        this.roundResult = GameService.SPOCK_VAPORIZES_ROCK
        this.winner = GameService.PLAYER_1
        break
      case 'lizard':
        this.roundResult = GameService.LIZARD_POISONS_SPOCK
        this.winner = GameService.PLAYER_2
        break
      case 'scissors':
        this.roundResult = GameService.SPOCK_BENDS_SCISSORS
        this.winner = GameService.PLAYER_1
        break
      case 'paper':
        this.roundResult = GameService.PAPER_DISPROVES_SPOCK
        this.winner = GameService.PLAYER_2
        break
      default:
        throw new Error('error with choice')
    }
  }

  private lizard (): void {
    switch (this.player2) {
      case 'rock':
        this.roundResult = GameService.ROCK_CRUSHES_LIZARD
        this.winner = GameService.PLAYER_2
        break
      case 'spock':
        this.roundResult = GameService.LIZARD_POISONS_SPOCK
        this.winner = GameService.PLAYER_1
        break
      case 'scissors':
        this.roundResult = GameService.SCISSORS_DECAPITATE_LIZARD
        this.winner = GameService.PLAYER_2
        break
      case 'paper':
        this.roundResult = GameService.LIZARD_EATS_PAPER
        this.winner = GameService.PLAYER_1
        break
      default:
        throw new Error('error with choice')
    }
  }

  private scissors (): void {
    switch (this.player2) {
      case 'rock':
        this.roundResult = GameService.ROCK_SMASHES_SCISSORS
        this.winner = GameService.PLAYER_2
        break
      case 'spock':
        this.roundResult = GameService.SPOCK_BENDS_SCISSORS
        this.winner = GameService.PLAYER_2
        break
      case 'lizard':
        this.roundResult = GameService.SCISSORS_DECAPITATE_LIZARD
        this.winner = GameService.PLAYER_1
        break
      case 'paper':
        this.roundResult = GameService.SCISSORS_CUT_PAPER
        this.winner = GameService.PLAYER_1
        break
      default:
        throw new Error('error with choice')
    }
  }

  public takeTurn (): void {
    this.winner = 'Draw'
    this.roundResult = 'No winner. Please try again.'
    switch (this.player1) {
      case 'spock':
        this.spock()
        break
      case 'rock':
        this.rock()
        break
      case 'paper':
        this.paper()
        break
      case 'lizard':
        this.lizard()
        break
      case 'scissors':
        this.scissors()
        break
      default:
        throw new Error('error with choice')
    }
  }

  public getPick (): string {
    this.randomPick()
    return this.pick
  }

  private randomPick (): void {
    const picks = ['spock', 'lizard', 'scissors', 'paper', 'rock']
    const randomNumber = Math.floor((Math.random() * 5))
    this.pick = picks[randomNumber]
  }
}
