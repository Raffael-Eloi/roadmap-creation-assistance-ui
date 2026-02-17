"use client";

import { useActionState } from "react";
import {
  Button,
  Grid,
  TextField,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { createRoadmap, CreateRoadmapState } from "../actions/createRoadmap";

const initialState: CreateRoadmapState = {
  message: "",
  status: 0,
  errors: {},
  values: {
    gitHubOwner: "",
    gitHubRepositoryName: "",
    gitHubToken: "",
    apiDomainDefinition: "",
    openAIKey: "",
  },
};

function getFieldError(
  errors: Record<string, string[]> | undefined,
  field: string,
): string | undefined {
  return errors?.[field]?.[0];
}

export default function RoadmapForm() {
  const [state, formAction, pending] = useActionState<
    CreateRoadmapState,
    FormData
  >(createRoadmap, initialState);

  const hasErrors = Object.keys(state.errors ?? {}).length > 0;
  const isSuccess = !!state.result;

  if (isSuccess) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="success">
          <Typography variant="subtitle1" fontWeight="bold">
            {state.message}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary={`Project ID: ${state.result!.projectId}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Milestones created: ${state.result!.milestonesCreatedCount}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Issues created: ${state.result!.issuesCreatedCount}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`README created: ${state.result!.readmeCreated ? "Yes" : "No"}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <a
                    href={`https://github.com/${state.values?.gitHubOwner}/${state.values?.gitHubRepositoryName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check it out on GitHub
                  </a>
                }
              />
            </ListItem>
          </List>
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <form action={formAction}>
        <Grid container spacing={3}>
          {hasErrors && (
            <Grid size={12}>
              <Alert severity="error">{state.message}</Alert>
            </Grid>
          )}

          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              GitHub Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Provide your GitHub details. The roadmap will be created as
              milestones and issues in this repository.
            </Typography>
            <Divider />
          </Grid>

          <Grid size={12}>
            <TextField
              name="gitHubOwner"
              fullWidth
              label="GitHub Username"
              variant="outlined"
              placeholder="e.g. octocat"
              defaultValue={state.values?.gitHubOwner}
              error={!!getFieldError(state.errors, "GitHubOwner")}
              helperText={
                getFieldError(state.errors, "GitHubOwner") ||
                "Your GitHub username or organization name."
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="gitHubRepositoryName"
              fullWidth
              label="GitHub Repository name"
              variant="outlined"
              placeholder="e.g. my-learning-roadmap"
              defaultValue={state.values?.gitHubRepositoryName}
              error={!!getFieldError(state.errors, "GitHubRepositoryName")}
              helperText={
                getFieldError(state.errors, "GitHubRepositoryName") ||
                "The repository where milestones and issues will be created."
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="gitHubToken"
              fullWidth
              label="GitHub Personal Access Token"
              variant="outlined"
              type="password"
              defaultValue={state.values?.gitHubToken}
              error={!!getFieldError(state.errors, "GitHubToken")}
              helperText={
                getFieldError(state.errors, "GitHubToken") ||
                "Requires repo, admin:org, and project scopes."
              }
            />
          </Grid>

          <Grid size={12} sx={{ mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              AI & Domain Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              The AI uses your domain description to generate a tailored roadmap
              with relevant milestones and learning activities.
            </Typography>
            <Divider />
          </Grid>

          <Grid size={12}>
            <TextField
              name="apiDomainDefinition"
              fullWidth
              label="API Domain Definition"
              variant="outlined"
              multiline
              minRows={3}
              placeholder="e.g. A REST API for managing e-commerce orders"
              defaultValue={state.values?.apiDomainDefinition}
              error={!!getFieldError(state.errors, "ApiDomainDefinition")}
              helperText={
                getFieldError(state.errors, "ApiDomainDefinition") ||
                "A brief description of your project's domain. The more detail you provide, the better the roadmap."
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              name="openAIKey"
              fullWidth
              label="OpenAI API Key"
              variant="outlined"
              type="password"
              defaultValue={state.values?.openAIKey}
              error={!!getFieldError(state.errors, "OpenAIKey")}
              helperText={
                getFieldError(state.errors, "OpenAIKey") ||
                "Your OpenAI API key. Requires at least $5 in credits."
              }
            />
          </Grid>

          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={pending}
                sx={{ minWidth: 200 }}
                startIcon={
                  pending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {pending ? "Creating Roadmap..." : "Create Roadmap"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
