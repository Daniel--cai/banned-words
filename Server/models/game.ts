import { Player } from './player';

export interface Game {
    id: string
    banned: Array<Array<string>>
    keywords: Array<Array<string>>
    players: Array<Player>
    teams: Array<string>
}