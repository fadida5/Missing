const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

const app = express();

app.use(bodyParser.json());
app.use(express.json());

const db = "mongodb://127.0.0.1/Missing"; //change!!!

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("Mongo connected"))
	.catch((err) => console.log(err));

const mongo = mongoose.connection;

// Handle MongoDB connection errors
mongo.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
