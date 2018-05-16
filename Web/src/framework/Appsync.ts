import Amplify, { API, graphqlOperation } from 'aws-amplify';
import aws_config from '../../secret/AppSync';
Amplify.configure(aws_config)

export default class GraphQLClient {
    static async query(query: string, parameter?: Object) {
        console.log(parameter)
        console.log(query)
        const response = await API.graphql(graphqlOperation(query, parameter));
        return response as any;
    }

    static async subscribe(query: string, callback: any, parameter?: Object, ) {
        console.log("setup sub")

        const subscription = API.graphql(graphqlOperation(query, parameter)) as any;
        subscription.subscribe({ next: (event) => { 
            console.log("new even!")
            callback(event) 
        } })
    }
}