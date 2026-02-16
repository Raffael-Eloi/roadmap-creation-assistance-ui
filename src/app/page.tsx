import { Button, Container, Grid, TextField, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        Roadmap Creation Assistance
      </Typography>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="GitHub Username"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="GitHub Repository name"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="GitHub token"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="API domain definition"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <Button variant="contained">Create Roadmap</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
