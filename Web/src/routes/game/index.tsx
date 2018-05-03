import { h, Component } from 'preact';
let styles = require('./style.css');
import classnames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import isDoubleTap from '../../framework/DoubleTap';
import * as Guid from 'guid';

interface IProps {
	taboo: string[]
}

interface State {
	toggleTips: boolean;
	score: number[]
	penalties: Penalty[];
}

interface Penalty {
	word: string;
	count: number
}

class Game extends Component<IProps & Action, State> {
	constructor(props) {
		super(props);
		this.state = {
			toggleTips: false,
			score: [0, 0],
			penalties: this.props.taboo.map(word => ({ word, count: 0 }))
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
										<span class="tag is-light is-rounded ">{penalty.count}</span>
										<span class="tag is-white ">{penalty.word}</span>
									</td>
									<td onClick={this.handleDoubleClick(next.word)}>
										<span class="tag is-rounded is-light">{next.count}</span>
										<span class="tag is-white">{next.word}</span>
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
		this.props.addWord({name: "word", team:"team"})
	}

	renderSelectTiles() {
		return (
			<div class="field has-addons">
				<p class="control is-expanded">
					<input class="input" type="text" placeholder="Enter a banned word" />
				</p>
				<p class="control">
					<a class="button" onClick={this.handleAddWord}>Ban</a>
				</p>
			</div>
		)
	}

	renderScore() {
		return (
			<div class="columns is-mobile">
				<div class="column is-half-mobile">
					<article class="message is-info">
						<div class="message-header">
							<p class="title is-1 has-text-centered is-white">{this.state.score[0]}</p>
						</div>
					</article>
				</div>
				<div class="column is-half-mobile">
					<article class="message is-danger">
						<div class="message-header">
							<p class="title is-1 has-text-centered">{this.state.score[1]}</p>
						</div>
					</article>
				</div>
			</div>
		)
	}

	renderTip() {
		return (
			<article class="message is-small is-warning">
				<div class="message-header">
					<p>Double tap a word to unban</p>
					<button class="delete is-small" onClick={() => this.setState({ toggleTips: true })}></button>
				</div>
			</article>
		)

	}

	renderTimer() {
		return (
			<p class="title is-1">
				- 60 -
			</p>
		)
	}

	render() {

		return (
			<section class="hero is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						{this.renderTimer()}
						{this.renderScore()}
						{this.renderTiles()}
						{!this.state.toggleTips && this.renderTip()}
						{this.renderSelectTiles()}
					</div>
				</div>
			</section >

		);
	}
}

const mapToProps = ({ taboo }) => ({ taboo });
export default connect(mapToProps, actions)(Game)