import pool from "../db";

export const getExercises = async (req, res) => {
    const userId= req.params.userId;

    try{
        var {rows} = await pool.query(`SELECT * FROM Exercises WHERE userid = '${userId}';`)
        res.json(rows)
    }
    catch(error){
        error.message = 'Invalid User.'
        res.json(error)
    }
}