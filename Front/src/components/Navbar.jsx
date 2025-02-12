import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }} style={{ width: '100%' }}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px 0px 10px 0px' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }} >
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>PERN stack</Link>
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button variant="contained" sx={{
                            backgroundColor: "#61dafb",
                            color: "black",
                            transition: "background-color 0.3s ease",
                            "&:hover": { backgroundColor: "#21a1f1" },
                        }} onClick={() => navigate("/task/new")}>
                            Nueva Tarea
                        </Button>
                    </Box>
                </Container>
            </AppBar>
        </Box>
    );
}
