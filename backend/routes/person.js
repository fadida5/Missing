const express = require("express");
const {
	save,
	getall,
	findbyname,
	findbyid_last,
} = require("../controllers/Person");
const router = express.Router();

router.post("/add", save);
router.get("/getall", getall);
router.get("/findbyname/:name", findbyname);
router.get("/findbyid_last/:id_last", findbyid_last);

module.exports = router;
