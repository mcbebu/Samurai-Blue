const tmi = require('tmi.js');
const { Client } = require('pg')
const axios = require('axios');

const dbClient = new Client({
	host: '119.8.165.76',
	port: 5432,
	user: 'root',
	password: 'P@ssw0rdninjavan',
	database: 'ninjavan'
})

dbClient.connect()

// create an async func
async function connect(message, displayName, userId) {
	var timestamp = Math.floor(Date.now() / 1000)
	var message = Buffer.from(message).toString('base64')
	var userid = userId
	var username = displayName

	try {
		const res = await dbClient.query(`INSERT INTO Messages (timestamp, msg, username, userid, platform) VALUES ('${timestamp}', '${message}', '${username}', '${userid}', 'twitch');`);
	} catch (err) {
		console.log(err.stack)
	}
}

async function checkAPI(message) {
	await axios.post('http://159.138.108.231:8080/message', {
		'message': message
	})
	.then(async function (response) {
		console.log(response.data[0]);
		console.log(response.data[1]);

		if (response.data[0] != '') {
			await axios.post('http://119.8.175.110:4242/create-checkout-session', {
				'quantity': response.data[1],
				'username': 'xianxiang',
				'platform': 'twitch',
				'sessionname': 'S3',
				'product_code': 'COCO',
				"connected_account": "acct_1Hq5ZpJZ2Z2Z2Z2Z"
			})
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const channel = 'AstraI24';

const client = new tmi.Client({
	channels: [ channel ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Stores into database
	connect(message, tags['display-name'], tags['user-id']);
	// Checks for right keywords
	// Call API to send message
	checkAPI(message)	

	console.log(`name:${tags['display-name']} user_id:${tags['user-id']} msg:${message}`);
});

// curl -X POST 'https://id.twitch.tv/oauth2/token' \
// -H 'Content-Type: application/x-www-form-urlencoded' \
// -d 'client_id=pqdy1yojxvt28y46cqwol6iu9821dz&client_secret=ecwoz1yj32delihqg1hwak5z06s33q&grant_type=client_credentials'
// Client ID
// pqdy1yojxvt28y46cqwol6iu9821dz
// Client Secret
// ecwoz1yj32delihqg1hwak5z06s33q

// curl -X POST 'https://api.twitch.tv/helix/whispers?from_user_id=37231100&to_user_id=229080069' \
// -H 'Authorization: Bearer 0y7mtruyvteq7b2e3t1rmg5x9r0ysd' \
// -H 'Client-Id: pqdy1yojxvt28y46cqwol6iu9821dz' \
// -H 'Content-Type: application/json' \
// -d '{"message":"hello"}'