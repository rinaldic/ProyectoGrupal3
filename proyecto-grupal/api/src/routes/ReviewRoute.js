const { Router } = require("express");
const router = Router();

const {
  getComments,
  postComments,
  deleteComments,
} = require("../controllers/reviewController");

//localhost:3001/review

router.get("/:id", getComments);
router.post("/", postComments);
router.delete("/:id", deleteComments);

module.exports = router;
