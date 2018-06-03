
export const GetPlayersEvent = `
    query GetPlayers($id: ID!) {
        getPlayers(id: $id){
            name
            team
        }
    }
`


// export const AddedPlayerEvent = `
// subscription AddedPlayerEvent {
//     addedPlayer {
//         name
//         team
//     }
// }
// `

export const AddedPlayerEvent = `
subscription AddedPlayerEvent($id: String! ) {
    addedPlayer(id: $id) {
        name
        team
    }
}
`

export const ChangeTeamEvent = `
mutation ChangeTeamEvent($id: String!, $player: String!, $team: number) {
    changeTeam(id: $id, player: $player, team: $team){
        id,
        name,
        team
    }
}
`