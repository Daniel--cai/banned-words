import { h, Component } from 'preact';
import Header from '../../components/header';
import classnames from 'classnames'
import linkState from 'linkstate';

import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import { route } from 'preact-router'

enum MenuState {
    Default = 0,
    New,
    Join
}

interface State {
    status: MenuState
    name: string,
    id: string
}

interface Props {
    name: string
    guid: string
}

class Home extends Component<Props & Action, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: MenuState.Default,
            name: "",
            id: ""
        }
    }
    handleClick = (status: MenuState) => (event) => {
        this.setState({ status })
    }

    handleNewGame = async (event) => {
        await this.props.createLobby(this.state.name)
        console.log(this.props.guid)
        route(`/lobby?id=${this.props.guid}`)
    }

    handleJoinGame = async (event) => {
        await this.props.joinLobby(this.state.name, this.state.id)
        console.log(this.state.id);
        route(`/lobby?id=${this.state.id}`)
    }

    renderNewGame() {
        return (
            <div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Enter your name" value={this.state.name} onInput={linkState(this, "name")} />
                    </div>
                </div>
                <div class="field">
                    <button class="button" onClick={this.handleNewGame}>Create</button>&nbsp;
                    <button class="button" onClick={this.handleClick(MenuState.Default)}>Back</button>
                </div>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderJoinGame() {
        return (
            <div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" name="id" value={this.state.id} onChange={this.handleChange} placeholder="Enter an access Code" maxLength={5} />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name your name" />
                    </div>
                </div>
                <div class="field">
                    <button class="button" onClick={this.handleJoinGame}>Join</button>&nbsp;
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

    render() {
        return (
            <section class="hero is-fullheight">

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


const mapToProps = ({ name, guid }) => ({ name, guid });
export default connect(mapToProps, actions)(Home);