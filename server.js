/* Import libraries */
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
/* Create a new instance of express */
const app = express();
/* Use dependencies in app */
app.use(parser.urlencoded({extended : false}));
app.use(parser.json());
app.use(cors());
/* Set your website location for the app */
app.use(express.static('website'));
/* Set Port */
const port = 3030;
/* Start your server */
const server = app.listen(port, serverReady());
/* Variable to store project data */
let projectData={};

/* Display messages in your terminal when server is ready */
function serverReady(){
	console.log('Server is running and ready');
	console.log(`Server running on port: ${port}`);
}

/* Set get route for the app */
app.get('/all', function(req, res){
	res.send(projectData);
})
/* Set post route for the app */
app.post('/all', function(req, res){
	projectData = req.body;
	console.log(projectData);
})