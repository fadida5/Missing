//* for backend
const final = [];

function removeDuplicatesButKeepNull(arr) {
	const seen = new Set();
	const result = [];

	for (const item of arr) {
		if (item === null || item === true || item === false || item == 0) {
			result.push(item);
		} else if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}

	return result;
}
//* recusive function that take a nusted object and returns an array of values
function flat_object_calc(obj) {
	if (
		Object.values(obj)
			.map((value) => typeof value)
			.includes("object")
	) {
		Object.values(obj).forEach((key) => {
			if (typeof key == "object" && key != undefined && key != null) {
				flat_object_calc(key);
			} else {
				final.push(key);
			}
		});
	} else {
		Object.values(obj).forEach((key) => {
			final.push(key);
		});
	}
}
//* recusive function that take a nusted object and returns a flat object (much like flat() for arrays)
function flat_object_calc_with_key(obj) {
	if (
		Object.values(obj)
			.map((value) => typeof value)
			.includes("object")
	) {
		const keys = Object.keys(obj);
		Object.values(obj).forEach((key, index) => {
			if (
				typeof key == "object" &&
				!Array.isArray(key) &&
				key != undefined &&
				key != null
			) {
				flat_object_calc_with_key(key);
			} else {
				final.push({ [keys[index]]: key });
			}
		});
	} else {
		const keys = Object.keys(obj);
		Object.values(obj).forEach((key, index) => {
			final.push({ [keys[index]]: key });
		});
	}
}

module.exports = function flat_object(obj) {
	//* for flat_object_calc we just return final (but we call flat_object_calc first)
	// console.log(obj);
	flat_object_calc_with_key(obj);
	// console.log(final);
	// * marge the objects so it sould become one flat object
	return final.reduce((merged, obj) => {
		return { ...merged, ...obj };
	}, {});
};
