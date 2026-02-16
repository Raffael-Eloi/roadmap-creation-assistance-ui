import { Box, Container, Typography } from "@mui/material";
import RoadmapForm from "./components/RoadmapForm";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Roadmap Creation Assistance
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Generate a structured learning roadmap to help you grow as a software
          engineer. This tool uses AI to create milestones and issues in your
          GitHub repository, organized into technical tasks, mindset evolution
          activities, and hands-on challenges.
        </Typography>
        <RoadmapForm />
      </Box>
    </Container>
  );
}
