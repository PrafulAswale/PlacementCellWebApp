const express = require("express");
const router = express.Router();

const {
  addInterview,
  create,
  enrollInInterview,
  deallocate,
  destroyInterview,
} = require("../controllers/interviews");

router.get("/add-interview", addInterview);

router.post("/create", create);

router.post("/enroll-in-interview/:id", enrollInInterview);

router.get("/deallocate/:studentId/:interviewId", deallocate);
router.get("/destroyinterview/:interviewId", destroyInterview);

module.exports = router;
