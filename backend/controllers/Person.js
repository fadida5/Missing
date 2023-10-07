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
	}
};
