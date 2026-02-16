import { Box, Container, Grid, TextField } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <h3>Roadmap Creation Assistance</h3>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="GitHub owner (GitHub Username)"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="GitHub repository name"
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
      </Grid>
    </Container>
  );
}
