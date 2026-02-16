import { Container, Typography } from "@mui/material";
import RoadmapForm from "./components/RoadmapForm";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        Roadmap Creation Assistance
      </Typography>
      <RoadmapForm />
    </Container>
  );
}
