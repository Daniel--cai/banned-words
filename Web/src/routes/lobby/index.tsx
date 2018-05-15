import { h, Component } from 'preact';
import Header from '../../components/header';
import classnames from 'classnames'
import linkState from 'linkstate';

import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import { route } from 'preact-router'
import { Player } from '../../store/'

interface State {
}

interface Props {
    id: string
    name: string
    guid: string
    players: Player[]
}

class Lobby extends Component<Props & Action, State> {

    handleChangeTeams = (team) => (event) => {

    }

    componentWillMount() {
        console.log(this.props.guid)
        //if (this.props.id == "" || this.props.id != this.props.guid) {
        //route('/')
        //}
    }

    async componentDidMount() {
        console.log(this.props.id)
        const players = await this.props.getPlayers(this.props.id);
        this.props.subscribePlayers(this.props.id);
        //const players = await this.props.getPlayers("97291");
        console.log(players)
    }

    renderTeams() {
        return (
            <table class="table is-bordered  is-fullwidth">
                <tr>
                    <th class="is-info">Blue</th>
                    <th class="is-danger">Red</th>
                </tr>
                {
                    (Array(8).fill(""))
                        .map((_, index) => {
                            if (index % 2 != 0) return
                            // const next = this.props.taboos[index + 1]
                            const players = this.props.players;
                            const word = players[index] ? players[index].name : ""
                            const next = players[index + 1] ? players[index + 1].name : ""
                            return (
                                <tr >

                                    <td class="is-half">
                                        <span >{word || '\u200E'}</span>
                                    </td>
                                    <td class="is-half">
                                        <span >{next}</span>
                                    </td>
                                </tr>
                            )
                            //}
                        })
                }
            </table>
        )
    }

    renderStart() {
        return (
            <button class="button is-fullwidth">Start</button>
        )
    }

    renderLobbyDetails() {
        return (
            <p class="title is-2">{this.props.id.toUpperCase()}</p>
        )
    }

    render() {
        return (
            <section class="hero is-fullheight">

                <div class="hero-body">
                    <div class="container has-text-centered">
                        {this.renderLobbyDetails()}
                        {this.renderTeams()}
                        {this.renderStart()}
                    </div>
                </div>
            </section >


        );
    }
}


const mapToProps = ({ name, guid, id, players }) => ({ name, guid, id, players });
export default connect(mapToProps, actions)(Lobby);