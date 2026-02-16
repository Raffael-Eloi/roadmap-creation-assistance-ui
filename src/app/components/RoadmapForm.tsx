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
} from "@mui/material";
import {
  createRoadmap,
  CreateRoadmapState,
} from "../actions/createRoadmap";

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
      <Grid container spacing={2} rowSpacing={2}>
        <Grid size={12}>
          <Alert severity="success">
            <Typography variant="subtitle1" fontWeight="bold">
              {state.message}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={`Project ID: ${state.result!.projectId}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Milestones created: ${state.result!.milestonesCreatedCount}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Issues created: ${state.result!.issuesCreatedCount}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`README created: ${state.result!.readmeCreated ? "Yes" : "No"}`} />
              </ListItem>
            </List>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <form action={formAction}>
      <Grid container spacing={2} rowSpacing={2}>
        {hasErrors && (
          <Grid size={12}>
            <Alert severity="error">{state.message}</Alert>
          </Grid>
        )}
        <Grid size={12}>
          <TextField
            name="gitHubOwner"
            fullWidth
            label="GitHub Username"
            variant="outlined"
            defaultValue={state.values?.gitHubOwner}
            error={!!getFieldError(state.errors, "GitHubOwner")}
            helperText={getFieldError(state.errors, "GitHubOwner")}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            name="gitHubRepositoryName"
            fullWidth
            label="GitHub Repository name"
            variant="outlined"
            defaultValue={state.values?.gitHubRepositoryName}
            error={!!getFieldError(state.errors, "GitHubRepositoryName")}
            helperText={getFieldError(state.errors, "GitHubRepositoryName")}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            name="gitHubToken"
            fullWidth
            label="GitHub token"
            variant="outlined"
            defaultValue={state.values?.gitHubToken}
            error={!!getFieldError(state.errors, "GitHubToken")}
            helperText={getFieldError(state.errors, "GitHubToken")}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            name="apiDomainDefinition"
            fullWidth
            label="API domain definition"
            variant="outlined"
            defaultValue={state.values?.apiDomainDefinition}
            error={!!getFieldError(state.errors, "ApiDomainDefinition")}
            helperText={getFieldError(state.errors, "ApiDomainDefinition")}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            name="openAIKey"
            fullWidth
            label="OpenAI Key"
            variant="outlined"
            defaultValue={state.values?.openAIKey}
            error={!!getFieldError(state.errors, "OpenAIKey")}
            helperText={getFieldError(state.errors, "OpenAIKey")}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" disabled={pending}>
            {pending ? "Creating..." : "Create Roadmap"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
