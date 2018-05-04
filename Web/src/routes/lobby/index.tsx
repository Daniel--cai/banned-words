import { h, Component } from 'preact';
import Header from '../../components/header';
import classnames from 'classnames'
import linkState from 'linkstate';

import { connect } from 'redux-zero/preact';
import actions from './actions'
import { route } from 'preact-router'

enum MenuState {
    Default = 0,
    New,
    Join
}

interface State {
    status: MenuState
}

class Lobby extends Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: MenuState.Default
        }
    }
    handleClick = (status: MenuState) => (event) => {
        this.setState({ status })
    }

    renderNewGame() {
        return (
            <div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Enter your name" />
                    </div>
                </div>
                <div class="field">
                    <button class="button ">Create</button>&nbsp;
                    <button class="button" onClick={this.handleClick(MenuState.Default)}>Back</button>
                </div>
            </div>
        )
    }
    renderJoinGame() {
        return (
            <div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Enter an access Code" maxLength={5} />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Name your name" />
                    </div>
                </div>
                <div class="field">
                    <button class="button ">Join</button>&nbsp;
                    <button class="button" onClick={this.handleClick(MenuState.Default)}>Back</button>
                </div>
            </div>
        )
    }

    menuState() {
        switch (this.state.status) {
            case MenuState.New:
                return this.renderNewGame()
            case MenuState.Join:
                return this.renderJoinGame()
            default:
                return (
                    <div class="field">
                        <button class="button" onClick={this.handleClick(MenuState.New)} >New Game</button>&nbsp;
                        <button class="button" onClick={this.handleClick(MenuState.Join)}>Join Game</button>
                    </div>
                )
        }
    }

    render({ username, loading, guid }) {
        const bodyClass = classnames('')
        return (
            <section class={classnames('hero', 'is-fullheight')}>

                <div class="hero-body">
                    <div class="container has-text-centered">
                        {/* <img src="../../assets/images/box.jpg" alt=""/> */}
                        <p class="title is-3">Banned Words</p>
                        {
                            this.menuState()
                        }
                    </div>
                </div>
                {/* <div class="footer">
                    Banned Words designed by Forrest-Pruzan Creative published by <a href="http://www.wonderforge.com/">Wonder Forge</a>

                </div> */}
            </section >


        );
    }
}


const mapToProps = ({ username, loading, guid }) => ({ username, loading, guid });
export default connect(mapToProps, actions)(Lobby);