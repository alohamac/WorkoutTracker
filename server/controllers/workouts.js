import pool from "../db";

export const insertNewWorkout = async (req, res) => {
  const items = req.params;
  try {
    console.log(items)
    const startTime = new Date(parseInt(items.startTime)).toLocaleString().replace(',', '');
    const endTime = new Date(parseInt(items.endTime)).toLocaleString().replace(',', '');
    res.json(201);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
