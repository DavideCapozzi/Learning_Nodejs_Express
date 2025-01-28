// Import Express and user routes, create an instance of Express
const express = require('express');
const routes = require('./routes/users.js');
const app = express();
const PORT = 5000;

console.log("Server starting...");

// Use JSON parsing middleware and user routes
app.use(express.json());

console.log("Mounting routes at /user");
app.use("/user", routes);

// Start the server and log a message when it's running
app.listen(PORT, () => console.log("Server is running at port " + PORT));
