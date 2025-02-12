const pool = require('../db')


const getAllTasks = async (req, res, next) => {
    try {
        const allTaks = await pool.query('SELECT * FROM task')
        res.json(allTaks.rows)
    } catch (error) {
        next(error)
    }
};
const getTasks = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM task WHERE id= $1 ', [id])

        if (result.rows.length === 0) return res.status(404).json({ message: "Task not found" })

        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};
const createTasks = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  
      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
      }
  
      const results = await pool.query(
        "INSERT INTO task (title, description, image_url) VALUES ($1, $2, $3) RETURNING *",
        [title, description, image_url]
      );
  
      res.json(results.rows[0]);
    } catch (error) {
      next(error);
    }
  };


const deleteTasks = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM task WHERE id=$1 RETURNING * ', [id])
        if (result.rowCount === 0) return res.status(404).json({
            message: "Task not found"
        })
        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }

};

const updateTasks = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  
      const result = await pool.query(
        'UPDATE task SET title= $1, description = $2, image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
        [title, description, image_url, id]
      );
  
      if (result.rows.length === 0) return res.status(404).json({ message: "Task not found" });
  
      return res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { getAllTasks, getTasks, createTasks, deleteTasks, updateTasks };
  