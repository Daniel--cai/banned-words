export const AddPlayerEvent = `mutation AddPlayer($id: String!, $name: String!) {
    addPlayer(id: $id, name: $name) {
        name
        team
    }
}`;