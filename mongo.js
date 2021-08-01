const mongoose = require('mongoose');
const mongoPath = 'mongodb+srv://OMCS:hX0aUCOOYtO3bgXf@mongodb-omcs.58jqk.mongodb.net/test-db?retryWrites=true&w=majority';

module.exports = async() => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
	    useUnifiedTopology: true,
	    useCreateIndex: true
	})
	return mongoose;
}