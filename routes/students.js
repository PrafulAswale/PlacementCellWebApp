const express = require("express");
const router = express.Router();

const {
  update,
  addStudent,
  editStudent,
  create,
  destroy,
} = require("../controllers/students");

router.post("/update/:id", update);

router.get("/add-student", addStudent);
router.get("/edit-student/:id", editStudent);

router.post("/create", create);
router.get("/destroy/:studentId", destroy);

module.exports = router;
