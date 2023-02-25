const express = require('express')
const app = express()

const { Client } = require('pg')

const dbClient = new Client({
	host: '119.8.165.76',
	port: 5432,
	user: 'root',
	password: 'P@ssw0rdninjavan',
	database: 'ninjavan'
})

dbClient.connect()

async function connect() {
	try {
        // Query messages descending o
        

		const res = await dbClient.query(`SELECT * FROM messages ORDER BY timestamp DESC LIMIT 10;`);
        // Stringify the result
        var result = JSON.stringify(res.rows)
        // console.log(result)
        // console.log(res.rows[0])
	} catch (err) {
		console.log(err.stack)
	}

    return result
}

var cors = require('cors')
app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.get('/messages', async (req, res) => {
    var result = await connect()

    res.setHeader('Content-Type', 'application/json');
    res.send(result);
})

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
