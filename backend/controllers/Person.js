const typecheck = require("../call_functions/typecheck.js");
const Person = require("../models/person.js");

types = {
	_id: ObjectId,
	name: "string",
	family_name: "string",
	found: "boolean",
	whereabouts: "string",
	evacuated: "string",
	id_last: "number",
};

exports.save = async (req, res) => {
	const data = typecheck(types, req, res);
	if (data !== false) {
		const newPerson = new Person(data);
		newPerson.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}
			res.json(result);
		});
	} else {
		res.status(400).json(" input types are invalid");
	}
};

exports.getall = async (req, res) => {
	Person.find()
		.then((ramam) => res.json(ramam))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.findbyname = async (req, res) => {
	const name = req.params.name;
	Person.find({ name: name })
		.then((ps) => res.json(ps))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.findbyid_last = async (req, res) => {
	const id_last = req.params.id_last;
	Person.find({ id_last: id_last })
		.then((ps) => res.json(ps))
		.catch((err) => res.status(400).json("Error: " + err));
};
