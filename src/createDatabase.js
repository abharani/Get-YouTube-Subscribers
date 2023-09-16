require('dotenv').config(); 
const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')

// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/yt-subs";
console.log(DATABASE_URL)
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// Create a connection to the database
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))
// Function to refresh the database with new data
const refreshAll = async () => {
    await subscriberModel.deleteMany({})
    // console.log(connection)
    await subscriberModel.insertMany(data)
    await mongoose.disconnect();
}
// Invoke the refreshAll function to perform the data refresh
refreshAll()