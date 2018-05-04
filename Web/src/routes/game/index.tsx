import { h, Component } from 'preact';
//let styles = require('./style.css');
import './style.css'
import classnames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import isDoubleTap from '../../framework/DoubleTap';
import * as Guid from 'guid';
import linkState from 'linkstate'
import ScoreHeader from './ScoreHeader'
import KeywordHeader from '../../components/KeywordHeader'

const DefaultTimerCountdown = 5

enum GameState {
	Ready,
	Guessing,
	TimesUp
}

interface IProps {
	taboos: string[]
	keywords: string[]
}

interface State {
	score: number[]
	penalties: Penalty[];
	submission: string;
	correct: string[];
	gameState: GameState;
	countdown: number;
	timer: any,
}

interface Penalty {
	word: string;
	count: number
}

class Game extends Component<IProps & Action, State> {
	constructor(props) {
		super(props);
		this.state = {
			score: [0, 0],
			penalties: this.props.taboos.map(word => ({ word, count: 0 })),
			submission: "",
			correct: [],
			gameState: GameState.Ready,
			countdown: -1,
			timer: null,
		}
	}

	handleDoubleClick = (word: string) => (event) => {
		if (isDoubleTap(event)) {
			const score = this.state.score.map((current, index) =>
				index == 0 ? current : ++current
			)
			const penalties = this.state.penalties.map(penalty => ({ word: penalty.word, count: (penalty.word == word ? penalty.count + 1 : penalty.count) }))
			const state = { ...this.state, score, penalties }
			this.setState(state)
		}

	}

	startTimer() {
		let timer = setInterval(this.handleTimerTick, 1000);
		this.setState({ timer, countdown: DefaultTimerCountdown });
	}

	handleTimerTick = () => {
		const countdown = --this.state.countdown;
		if (countdown == 0) {
			this.setState({ gameState: GameState.TimesUp })
			clearInterval(this.state.timer);
		} else {
			this.setState({ countdown });
		}
	}

	renderTiles() {
		return (
			<table class="table is-bordered  is-fullwidth">
				{
					this.state.penalties.map((penalty, index) => {

						if (index % 2 == 0) {
							const next = this.state.penalties[index + 1]
							return (
								<tr >

									<td onClick={this.handleDoubleClick(penalty.word)}>
										<span class={classnames("tag is-light is-rounded", { 'is-invisible': penalty.count == 0 })}>{penalty.count}</span>
										<strong> {penalty.word.toLocaleUpperCase()}</strong>
									</td>
									<td onClick={this.handleDoubleClick(next.word)}>
										<span class={classnames("tag is-light is-rounded", { 'is-invisible': next.count == 0 })}>{next.count}</span>
										<strong> {next.word.toLocaleUpperCase()}</strong>
									</td>
								</tr>
							)
						}
					})
				}
			</table>
		)
	}

	renderPendingTiles() {
		return (
			<table class="table is-bordered  is-fullwidth">
				{
					this.props.taboos.map((word, index) => {


						if (index % 2 == 0) {
							const next = this.props.taboos[index + 1]
							return (
								<tr >

									<td onClick={this.handleDoubleClick(word)}>
										<span class="tag is-white ">{word}</span>
									</td>
									<td onClick={this.handleDoubleClick(next)}>
										<span class="tag is-white">{next}</span>
									</td>
								</tr>
							)
						}
					})
				}
			</table>
		)
	}

	handleAddWord = (event) => {
		event.preventDefault()
		this.props.addWord(this.state.submission, "team");
		this.setState({ submission: "" })
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	isAnswered(word: string) {
		return this.state.correct.findIndex(correct => correct == word) != -1
	}

	handleCorrect = (word: string) => (event) => {
		if (!isDoubleTap(event) || this.isAnswered(word)) return
		const score = this.state.score.map((current, index) =>
			index == 0 ? current : ++current
		)
		const answered = [...this.state.correct, word]
		this.setState({ score, correct: answered })
	}

	renderKeywords() {

		return this.props.keywords.map(keyword => {
			const answered = this.state.correct.indexOf(keyword) != -1
			return (
				<div class={classnames("box", { 'is-answered': answered })} onClick={this.handleCorrect(keyword)}>
					<b>{keyword.toUpperCase()}</b>
				</div>
			)
		})
	}

	handleGameState = (gameState: GameState) => (event) => {
		this.setState({ gameState });
	}

	handleTimeout = () => {
		console.log(this.state)
		this.setState({ countdown: --this.state.countdown })
		if (this.state.countdown == 0) {
			this.startTimer()
			this.setState({ gameState: GameState.Guessing })
		}
		else {
			setTimeout(this.handleTimeout, 1000);
		}
	}

	handleCountdown = (event) => {
		this.setState({ countdown: 3 })
		setTimeout(this.handleTimeout, 1000);
	}

	renderReady() {
		return (
			<section class="hero is-success is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						<p class="title is-1">
							Ready
							</p>
						<br />
						{this.state.countdown == -1 &&
							<p>
								<span class="icon" onClick={this.handleCountdown}>
									<i class="fas fa-3x fa-play-circle"></i>
								</span>
							</p>
						}
						{this.state.countdown > 0 &&
							<p class="title is-1">{this.state.countdown}</p>
						}
					</div>
				</div>
			</section >
		)
	}

	renderTimesUp() {
		return (
			<section class="hero is-danger is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						<p class="title is-1">
							Time's up!
						</p>
						<br />
						{
							<span class="icon" >
								<i class="fas fa-3x fa-sign-out-alt"></i>
							</span>
						}
					</div>
				</div>
			</section >

		)
	}
	renderGame() {
		return (
			<div class="hero is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						<ScoreHeader score={this.state.score} countdown={this.state.countdown} />
						<KeywordHeader keywords={this.props.keywords} correct={this.state.correct}/>
						{/* {this.renderKeywords()} */}
						{this.renderTiles()}
					</div>
				</div>

			</div>
		)
	}


	render() {
		return this.renderGame();
		// switch (this.state.gameState) {
		// 	case GameState.Ready:
		// 		return this.renderReady()
		// 	case GameState.Guessing:
		// 		return this.renderGame()
		// 	case GameState.TimesUp:
		// 		return this.renderTimesUp()
		// 	default:
		// 		return this.renderGame()
		// }
	}
}

const mapToProps = ({ taboos, keywords }) => ({ taboos, keywords });
export default connect(mapToProps, actions)(Game)