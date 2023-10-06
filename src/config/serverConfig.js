const http = require("http");
const app = require("../../app")
const { connectToDatabase } = require("./db");



function startServer(){
    const port = process.env.PORT ||  3000; // Example port number

    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
}

connectToDatabase()
    .then(()=>{
        console.log('Database connection successfully');
        startServer(); //Start the server after successful database connection
    })
    .catch((error)=>{
        console.log(`Database connection error ${error}`)
    })

