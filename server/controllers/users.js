import express from "express";
import pool from "../db.js";

export const getUser = async (req, res) => {
    const info = req.params;
    try{
        var {rows} = await pool.query(`SELECT * FROM Users WHERE username = '${info.username}';`)
        res.json(rows)
    } catch(error){
        error.message = 'Invalid username or password.'
        res.json(error)
    }
}

export const logInUser = async (req, res) =>{
    const {username, password} = req.params;
    try {
        var {rows} = await pool.query(`SELECT userid, username, email, dateofbirth, height, weight 
                                       FROM Users 
                                       WHERE username = '${username}' and passwordhash = '${password}';`);
        /*TODO: Authentication*/
        var length = Object.keys(rows).length;
        if (length==0) throw new Error("Somethings up")
        res.json(rows[0])
    } catch (error){
        error.message = 'Invalid username or password.'
        
        res.status(404).send("INVALID")
    }
}