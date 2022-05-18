const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const port = 8081;

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	next();
});

app.listen({ port }, () => {
	console.log(`Course server running at http://localhost:${port}`);
});
