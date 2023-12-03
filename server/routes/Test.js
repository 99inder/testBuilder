const {
    createTest,
    fetchTestsList,
    fetchTest,
} = require("../controllers/Test");

const router = require("express").Router();

router.post("/create", createTest);
router.get("/fetchTestsList", fetchTestsList);
router.get("/fetchTest/:testId", fetchTest);

module.exports = router;