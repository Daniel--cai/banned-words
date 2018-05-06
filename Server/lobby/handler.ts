import { Target } from '../models/target';
import dbprovider from '../framework/dbprovider';
const dynamoDb = dbprovider();


const params = {
	TableName: process.env.BANNED_WORDS_LIST_TABLE,
}

export const getWords = (event, context, cb) => {

	dynamoDb.scan(params, function (err, data) {
		if (err) {
			cb(err, null)
		} else {
			const keywords = data.Items.map((item: Target) => item.Value)
			const response = {
				statusCode: 200,
				body: JSON.stringify(keywords),
			}
			cb(null, response);
		}

	});
}


// module.exports.create = (event, context, callback) => {

// 	console.log(event.body)
// 	const data = JSON.parse(event.body)
// 	if (typeof data.name !== 'string' || typeof data.email !== 'string') {
// 		callback(new Error("Name or Email cannot be empty"))
// 		console.log('empty')
// 		return;
// 	}

// 	var params = {
// 		Item: {
// 			id: uuid.v1(),
// 			name: data.name,
// 			email: data.email
// 		},
// 		TableName: process.env.DYNAMODB_TABLE
// 	};


// 	dynamoDb.put(params, function (err, data) {
// 		if (err) {
// 			callback(err, null);
// 		} else
// 			console.log(data)
// 		const response = {
// 			statusCode: 200,
// 			body: JSON.stringify(params.Item)
// 		}
// 		callback(null, response);
// 	})
// };
