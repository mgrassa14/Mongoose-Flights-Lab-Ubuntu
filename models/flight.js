const mongoose = require('mongoose');

// Define the Emedded Schema (NOT MODEL)
const destinationSchema = new mongoose.Schema({
	airport: {
	    type: String,
		enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    }, 
    arrival: {
        type: Date
    }
}, {
	timestamps: true
});

// Schema is a guard on our collection that says
// everytime we want to add a document (object) to our collection 
// in mongodb, it must have this shape, 
// keys must be the same name, and the values must be of the type Specified below (String, Number, Boolean, etc)
const flightSchema = new mongoose.Schema({
	airline: {
		type: String,  // String, is from Mongoose
		enum: ['American', 'Southwest', 'United'],
        required: true
	},
    airport: {
		type: String,
		enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
	},
    flightNo: {
		type: Number,  //Number, is from Mongoose
		min: 11,
        max: 9998,
        required: true
	},
    departs: {
		type: Date,  //Number, is from Mongoose
        // default: new Date()
		default: function (){
            return new Date() + 365*24*60*60*60000  //<- will only show the date when created, still need to add 1 year from then
        }
            // required: true
    },
    destinations: [destinationSchema]

}, {
    timestamps: true 
});

module.exports = mongoose.model('Flight', flightSchema);
// mongoose.model method does two things
// 1. Creates a collection (The bucket) in mongodb named movies, and it says that all the movie Documents
// that we create need to have the shape of our schema

// 2. Returns an object which is our "Model", which we will use in our controller to perform CRUD operations
// on our database, when our server recieves an http request