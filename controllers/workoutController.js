const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const postWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  return res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  return res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  return res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  return res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  postWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
