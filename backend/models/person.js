const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PersonSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		family_name: { type: String, require: true },
		found: { type: Boolean, default: false },
		whereabouts: { type: String, default: "לא יודע" },
		evacuated: { type: String, default: "no" },
		id_last: { type: Number, require: true, length: 4 },
	},
	{ timestamps: true }
);

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
