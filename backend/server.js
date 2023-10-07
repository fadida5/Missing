const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = "mongodb://localhost:27017/Missing"; //change!!!

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

const PersonRoutes = require("./routes/person.js");
app.use("/api", PersonRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
