const { Router } = require("express");
const router = Router();
const {
  getWorkout,
  getWorkouts,
  postWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.route("/").get(getWorkouts).post(postWorkout);
router.route("/:id").get(getWorkout).delete(deleteWorkout).patch(updateWorkout);

module.exports = router;
