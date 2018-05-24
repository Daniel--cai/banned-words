
export const GetPlayersEvent = `
    query GetPlayers($id: ID!) {
        getPlayers(id: $id){
            name
            team
        }
    }
`


export const AddedPlayerEvent = `
subscription AddedPlayerEvent {
    addedPlayer {
        name
        team
    }
}
`

// export const AddedPlayerEvent = `
// subscription AddedPlayerEvent($id: String! ) {
//     addedPlayer(id: $id) {
//         name
//         team
//     }
// }
// `