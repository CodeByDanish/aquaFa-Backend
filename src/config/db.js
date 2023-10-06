const mongoose = require("mongoose");
function connectToDatabase() {
    console.log('Establishing the connection to mongoDB')
    return new Promise((resolve, reject) => {
    // aquafa
    // bEJBWlLwWLHeqsqE
    // mongodb+srv://aquafa:bEJBWlLwWLHeqsqE@cluster0.xtygx6m.mongodb.net/?retryWrites=true&w=majority
        
    // Database connection configuration add use environment variables
    const dbURI = process.env.DATABASE_URI; // mongodb database URI
    const dbName =  process.env.DBNAME;
    const pass =  process.env.PASSWORD;
    const user =  process.env.USER;
    mongoose.connect(dbURI,
        {
            dbName: dbName,
            pass: pass,
            user: user,
            useNewUrlParser: true
        }
    )
    // Event handlers for successful connection and error
    mongoose.connection.on('connected', () => {
        resolve(); // Resolve the promise if the connection is successful
    });

    mongoose.connection.on('error', (err) => {
        console.error('Database connection error:', err);
        reject(err); // Reject the promise if there is an error
    });
})
}
module.exports = { connectToDatabase }


