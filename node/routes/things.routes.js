const router = require("express").Router();
const things = require("../controllers/things.controllers");

router.get("/", things.getAllController);
router.post("/", things.createController);
router.put("/:id", things.updateController);

module.exports = router;