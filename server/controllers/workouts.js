import pool from "../db";

export const insertNewWorkout = async (req, res) => {
  const items = req.params;
  try {
    await pool.query("BEGIN");
    console.log(items);
    const startTime = new Date(parseInt(items.startTime)).toLocaleString().replace(",", "");
    const endTime = new Date(parseInt(items.endTime)).toLocaleString().replace(",", "");

    const workoutResults =
      await pool.query(`INSERT INTO Workouts (UserID, PlanName, StartTime, EndTime) 
                      VALUES (${items.userid}, '${items.workoutName}', '${startTime}', '${endTime}')
                      RETURNING WorkoutID`);
    const { workoutid } = workoutResults.rows[0];
    const exercises = JSON.parse(items.exercises);

    const insertionErrors = [];
    for (const { key, sets } of exercises) {
      try {
        await pool.query(`
          INSERT INTO WorkoutExercise (UserID, ExerciseID, WorkoutID, Sets)
          VALUES (${items.userid}, ${key}, ${workoutid}, '${JSON.stringify(sets)}')
        `);
      } catch (error) {
        insertionErrors.push(error);
      }
    }
    if (insertionErrors.length > 0) {
      throw new Error(`Errors occurred during insertion: ${insertionErrors.map(error => error.message).join(', ')}`);
    }
    await pool.query("COMMIT");
    res.json(201);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    res.json(error);
  }
};
