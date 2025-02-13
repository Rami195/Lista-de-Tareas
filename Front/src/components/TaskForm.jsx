import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const loadTasks = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/task/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description, image: null });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTasks(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', task.title);
    formData.append('description', task.description);
    if (task.image) {
      formData.append('image', task.image);
    }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/task${editing ? `/${params.id}` : ''}`, {
  method: editing ? 'PUT' : 'POST',
  body: formData,
});
    const data = await response.json();
    console.log(data);
    setLoading(false);
    navigate("/");
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" paddingTop={5}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Card sx={{
          backgroundColor: "#1e272e",
          padding: { xs: "1rem", sm: "2rem", md: "3rem" },
          maxWidth: { xs: "375px", sm: "667px", md: "800px", lg: "1000px" },
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Typography color="white" textAlign="center" paddingTop={3} variant="h4" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' } }}>
            {editing ? "Editar Tarea" : "Crear Tarea"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <TextField
                onChange={handleChange}
                name="title"
                variant="filled"
                label="Escribe tu título"
                value={task.title}
                fullWidth
                inputProps={{ style: { color: "white", fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } } }}
                InputLabelProps={{ style: { color: "white", fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } } }}
              />
              <TextField
                onChange={handleChange}
                name="description"
                variant="filled"
                multiline
                value={task.description}
                rows={4}
                label="Escribe una descripción"
                fullWidth
                inputProps={{ style: { color: "white", fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } } }}
                InputLabelProps={{ style: { color: "white", fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } } }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1.5rem',
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  sx={{
                    backgroundColor: "#61dafb",
                    color: "black",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#21a1f1" },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    padding: { xs: '0.8rem 1.6rem', sm: '0.9rem 1.8rem', md: '1rem 2rem' },
                  }}
                >
                  Subir Imagen
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    hidden
                  />
                </Button>
              </Box>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginTop: '1.5rem',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  padding: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                }}
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : "Guardar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
