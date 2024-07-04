import { Material } from "../types/material";

export const getConditionColor = (condition: Material["condition"]) => {
  switch (condition) {
    case "very good":
      return "green";
    case "good":
      return "lightgreen";
    case "bad":
      return "red";
    case "very bad":
      return "darkred";
    case "exchange":
      return "orange";
  }
};
