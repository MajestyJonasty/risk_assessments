import { Paper } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AstronautAnimation from "../../components/layout/UI/Animations/AstronautErrorAnimation";

interface CustomError extends Error {
  status?: number;
}

export const ErrorPage = () => {
  const error = useRouteError() as CustomError;

  let errorMessage: string;
  let errorStatus: number;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStatus = (error as CustomError).status || 500;
  } else {
    errorMessage = "Unknown error occurred";
    errorStatus = 500;
  }

  // Setze 404 für nicht gefundene Routen
  if (errorStatus === 404) {
    errorMessage = "Page Not Found";
  }

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AstronautAnimation
        errorStatus={errorStatus}
        errorMessage={errorMessage}
      />
    </Paper>
  );
};
