
export const GetPlayersEvent = `
    query GetPlayers($id: ID!) {
        getPlayers(id: $id){
            name
            team
        }
    }
    `

