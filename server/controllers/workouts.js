import pool from "../db";

export const insertNewWorkout = async (req, res) => {
  const items = req.params;
  try {
    console.log(items.exerciseSet)
    res.json(201);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
