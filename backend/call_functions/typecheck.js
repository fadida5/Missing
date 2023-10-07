const flat_object = require("./objects");

//* compare types between the type of the value of each field from the req.body to the type of the same field from the types object we made from the module (the schema for the mongo)
function type(value, type) {
	//* we can expect multiple types for a value like in getting ogdas from a multiple pikod and getting ogdas from only one pikod (multi and single select)
	if (Array.isArray(type)) {
		type.map((subtype) => {
			if (value == undefined || typeof value === subtype) {
				return value;
			} else {
				console.log(value);
				console.log(type);
				return false;
			}
		});
	} else {
		// console.log(value);
		if (value == undefined || typeof value === type) {
			return value;
		} else {
			console.log(value);
			console.log(type);
			return false;
		}
	}
}
function check(data, module, path) {
	try {
		//* making sure to check only on the fields that are corolated with the schema
		const module_fillter = Object.keys(data).filter((item) => {
			return Object.keys(module).includes(item);
		});
		if (
			//* checking if a type check has failed by looking for false, if not found false continue
			!module_fillter.map((key) => type(data[key], module[key])).includes(false)
		) {
			//* fillter out all data that is not should be in said request by using the same logic from type
			// console.warn(path);
			// console.group("deleted");
			Object.keys(data)
				.filter((item) => {
					return !Object.keys(module).includes(item);
				})
				.map((key) => {
					//* logging the values that were dropped (good for debugging)
					// console.error(
					// 	key +
					// 		" = " +
					// 		data[key] +
					// 		" was deleted because it's not in the model"
					// );
					//* ----------------------------------------------------------------
					delete data[key];
				});
			//* returning filtered data
			// console.log(data);
			return data;
		} else {
			//* type check failed, will result in ==> res.status(400).json(" input types are invalid");
			console.log(module_fillter.map((key) => type(data[key], module[key])));
			return false;
		}
	} catch (error) {
		console.error("unexpected error" + error);
	}
}

module.exports = function typeCheck(module, req) {
	// console.log(req.body);
	if (Array.isArray(req.body) && req.body.length > 0) {
		let tmp = [];
		req.body.map((item) => {
			tmp.push(check(flat_object(item), module, req.path));
		});
		return tmp;
	} else if (typeof req.body === "object") {
		let data = flat_object(req.body);
		return check(data, module, req.path);
	} else {
		// todo: need to double check on that
		if (Object.values(module).includes(typeof req.body)) {
			return req.body;
		} else {
			console.log(req.body);
			return false;
		}
	}
};
