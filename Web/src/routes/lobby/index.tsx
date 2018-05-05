import { h, Component } from 'preact';
import Header from '../../components/header';
import classnames from 'classnames'
import linkState from 'linkstate';

import { connect } from 'redux-zero/preact';
import actions, { Action } from './actions';
import { route } from 'preact-router'


interface State {
}

interface Props {
    name: string
    guid: string
}

class Lobby extends Component<Props & Action, State> {

    handleChangeTeams = (team) => (event) => {

    }

    renderTeams() {
        return (
            <table class="table is-bordered  is-fullwidth">
                <tr>
                    <th class="is-info">Blue</th>
                    <th class="is-danger">Red</th>
                </tr>
                {
                    (Array(8 - length).fill(""))
                        .map((player, index) => {

                            // if (index % 2 == 0) {
                            // const next = this.props.taboos[index + 1]
                            const word = "sdfsdf"
                            const next = "sdfsdf"
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
            <p>{this.props.guid}</p>
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


const mapToProps = ({ name, guid }) => ({ name, guid });
export default connect(mapToProps, actions)(Lobby);