import uuid from 'uuid'
import * as AWS from 'aws-sdk';
import bodyParser from 'body-parser';
//let dynamoDb = dbprovider();

export const create = (event, context, cb) => {
	const body = {
		message: "Hello from Typescript!"
	};
	const response = {
		statusCode: 200,
		body: JSON.stringify(body)
	};
	return cb(null, response);
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
