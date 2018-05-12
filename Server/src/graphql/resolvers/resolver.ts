import { Target } from '../../../models/target';
import dbprovider from '../../../framework/dbprovider';
import { Game } from '../../../models/game';
import { Player } from '../../../models/player';
import { DocumentClient, GetItemInput, UpdateExpression } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';
import { addPlayer, getPlayers } from './player';

export const handler = async (event, context, callback) => {
    switch (event.field) {
        case 'addPlayer': {
            try {
                const result = await addPlayer(event.arguments.id, event.arguments.name)
                callback(null, result)
            } catch (ex) {
                console.log(ex)
                callback(null, null)
            }
            break;
        }

        case 'getPlayers': {
            try {
                const result = await getPlayers(event.arguments.id)
                console.log('success getPlayers')
                console.log(result)
                callback(null, result)
            } catch (ex) {
                console.log('error getPlayers')
                console.log(ex)
                callback(null, null)
            }
            break;
        }
        default: {
            callback(`Unknown field, unable to resolve ${event.field}`, null);
            break;
        }
    }
}