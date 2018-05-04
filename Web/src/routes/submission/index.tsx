import { h, Component } from 'preact';
import './style.css'
import classnames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import isDoubleTap from '../../framework/DoubleTap';
import * as Guid from 'guid';
import linkState from 'linkstate'

interface IProps {
	taboos: string[]
	keywords: string[]
}

interface State {
	penalties: Penalty[];
	submission: string;
}

interface Penalty {
	word: string;
	count: number
}

class Submission extends Component<IProps & Action, State> {
	constructor(props) {
		super(props);
		this.state = {
			penalties: this.props.taboos.map(word => ({ word, count: 0 })),
			submission: ""
		}
	}

	handleDoubleClick = (word: string) => (event) => {
		if (isDoubleTap(event)) {
			this.props.removeWord(word);
		}

	}

	renderPendingTiles() {
		const length = this.props.taboos.length
		return (
			<table class="table is-bordered  is-fullwidth">
				{
					this.props.taboos.concat(Array(16 - length).fill(""))
						.map((word, index) => {


							if (index % 2 == 0) {
								const next = this.props.taboos[index + 1]
								return (
									<tr >

										<td class="is-half" onClick={this.handleDoubleClick(word)}>
											<span >{word || '\u200E'}</span>
										</td>
										<td class="is-half" onClick={this.handleDoubleClick(next)}>
											<span >{next}</span>
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

	disabled() {
		return this.props.taboos.length >= 16
	}

	exists() {
		return this.props.taboos.findIndex(taboo => taboo == this.state.submission) != -1
	}

	renderSelectTiles() {
		const placeholder = !this.disabled() ? "Enter a banned word" : "Double tap a word to unban"
		return (
			<form onSubmit={this.handleAddWord}>
				<div class="field has-addons">
					<p class="control is-expanded">
						<input disabled={this.disabled()} class="input" type="text" value={this.state.submission} onInput={linkState(this, 'submission')} placeholder={placeholder} />
					</p>
					<p class="control">
						<button class="button" disabled={this.disabled() || this.state.submission == "" || this.exists()} onClick={this.handleAddWord}>Ban</button>
					</p>
				</div>
			</form>
		)
	}

	renderTimer() {
		return (
			<p class="title is-1">
				- 60 -
			</p>
		)
	}

	renderKeywords() {
		return (
			<div class="box is">
				{this.props.keywords.map(keyword => {
					return (
						<strong> {keyword.toLocaleUpperCase()} </strong>
					)
				})}
			</div>
		)
	}

	render() {

		return (
			<section class="hero is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						{this.renderTimer()}
						{this.renderKeywords()}
						{this.renderPendingTiles()}
						{this.renderSelectTiles()}
					</div>
				</div>
			</section >

		);
	}
}

const mapToProps = ({ taboos, keywords }) => ({ taboos, keywords });
export default connect(mapToProps, actions)(Submission)