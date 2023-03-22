//model is always capitalized, in every language
const FlightModel = require('../models/flight');

module.exports = {
	new: newMovie,
    create,
	index,
	show
}

function show(req, res) {
	
	FlightModel.findById(req.params.id)
			  .then(function(flightDoc){
				// console.log(flightDoc.departs.split(''), '<-------departs')
				console.log(flightDoc, '<<<<<flightDoc')
				console.log(req.body.airport, '<<<airport destinaiton value')
				res.render('flights/show', { flight: flightDoc });
			  }).catch((err) =>{
				console.log(err);
				res.send(err)
			  })
}

function index(req, res){

	FlightModel.find({})
			  .then(function(allFlights){

				console.log(allFlights, " <_ data from the db")
				// respond to the client in the .then, we have to wait 
				// for the data to come back from the database
				res.render('flights/index', {flights: allFlights})
			  }).catch(function(err){
				console.log(err);
				res.send(err)
			  })
}

function create(req, res){
	console.log(req.body.departs, '<<<departure date input')
	// req.body.departs = req.body.departs
	// console.log(req.body, " <- contents of the form, req.body");
	// Asynchronous, The model, has to travel to talk to the database, 
	// database is one another port, so it takes times for this to happen
	FlightModel.create(req.body)
			  .then(function(flightWeCreatedInTheDb){
			
				// This function is the callback, to the create method, 
				// so this functions gets called after we get a response from the database
				// that we added the contents of the form (req.body) to the database
				console.log(flightWeCreatedInTheDb, " <- movie document")
				// Always respond to the client, in the cb function of the model
				// because we want to make sure the database performed its job before 
				// we respond to the client
				res.redirect('/flights'); // 404 because we haven't made the index route yet
		
			}).catch((err) => {
				console.log(err);
				res.send('There was an error check the terminal, or log the err object')
			})
	// I like to use res.send just to check if I'm able to make an 
	// http request to my POST, 
	// res.send('Hitting the Post Route, check the terminal for the contents of the form')

}


// brings us to the views/flights/new.ejs page with a form
function newMovie(req, res){
	// Render looks in the views folder
	res.render('flights/new')
}