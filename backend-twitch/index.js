const tmi = require('tmi.js');

const channel = 'singsing';

const client = new tmi.Client({
	channels: [ channel ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
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