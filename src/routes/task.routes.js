// src/routes/task.routes.js
const { Router } = require('express');
const { getAllTasks, getTasks, createTasks, deleteTasks, updateTasks } = require('../controllers/task.controllers');
const upload = require('../middlewares/multer'); // Asegúrate de que esta ruta sea correcta

const router = Router();

router.get('/task', getAllTasks);
router.get('/task/:id', getTasks);
router.post('/task', upload.single('image'), createTasks);
router.delete('/task/:id', deleteTasks);
router.put('/task/:id', upload.single('image'), updateTasks);

module.exports = router;
