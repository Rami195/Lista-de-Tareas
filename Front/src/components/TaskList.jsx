import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/task`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Lista de Tareas</h1>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card style={{ backgroundColor: '#141414', color: 'white' }}>
              {task.image_url && (
                <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}${task.image_url}`}
                  alt={task.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h5">{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </CardContent>
              <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", transition: "background-color 0.5s ease", "&:hover": { backgroundColor: "#2b2b2b" }, marginRight: '0.5rem' }}
                  onClick={() => navigate(`task/${task.id}/edit`)}
                >
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TaskList;
