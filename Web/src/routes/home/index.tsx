import { h, Component } from 'preact';
import Header from '../../components/header';
import classnames from 'classnames'
import linkState from 'linkstate';

import { connect } from 'redux-zero/preact';
import actions from './actions'

import { route } from 'preact-router'



class Home extends Component<any,any> {
	handleClick = async (event) => {
		await this.props.setUsername({
			name: this.state.name,
			email: this.state.email
		})
		route('/game')
	}

	render({ username, loading, guid }, { name, email }) {
		const bodyClass = classnames('')
		return (
			<div>
				<section class={classnames('hero', 'is-fullheight')}>
					< div class="hero-head " >
						<Header />
					</div >
					<div class="hero-body">
						<div class="container has-text-centered">
							<h1 class="title is-1 ">
								Banned Words
						</h1>
							<h2 class="subtitle is-2">
						</h2>
						</div>
					</div>
				</section >
				<section class={classnames('hero', 'is-dark', 'is-medium')}>
					<div class="hero-body">
						<div class="container has-text-centered">
							<p class="title is-3 ">
								How To Play
							</p>
						</div>
					</div>
				</section >
				<section class={classnames('section')}>
					<div class="hero-body">
						<div class="container ">
							<p class="title is-3 ">
								Join Now! ({username})
							</p>
							<div class="field">
								<input class="input" onInput={linkState(this, 'name')} placeholder="Display Name" />
							</div>
							<div class="field">
								<input class="input" onInput={linkState(this, 'email')} placeholder="Email" />
							</div>
							<div class="field">
								<textarea class="textarea" placeholder="Description" />
							</div>
							<div class="field ">
								<div class="control ">
									<button class="button is-link is-fullwidth" onClick={this.handleClick}>Join</button>
								</div>

							</div>
						</div>
					</div>
				</section >
			</div>
		);
	}
}


const mapToProps = ({ username, loading, guid }) => ({ username, loading, guid });
export default connect(mapToProps, actions)(Home);