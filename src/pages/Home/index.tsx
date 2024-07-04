import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { RiskAssessmentHistory } from "./components/RiskAssessmentHistory";

export const Home = () => {
  return (
    <Paper className="flex flex-col w-full p-4 g-6">
      <Typography variant="h1">Home</Typography>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Card>
            <CardHeader
              title="Meine Gefährdungsbeurteilungen"
              action={
                <IconButton component={Link} to="/riskassessments">
                  <NavigateNextIcon />
                </IconButton>
              }
            />
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader
              title="MeineAusrüstung"
              action={
                <IconButton component={Link} to="/materials">
                  <NavigateNextIcon />
                </IconButton>
              }
            />
            <CardContent></CardContent>
          </Card>
        </div>
        <RiskAssessmentHistory />
      </div>
    </Paper>
  );
};
