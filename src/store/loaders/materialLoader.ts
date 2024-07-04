import { defer } from "react-router-dom";
import { MaterialCategory } from "../../types/material";
import { materialCategories } from "../dummyMaterialsData";

async function loadMaterialCategories(): Promise<MaterialCategory[]> {
  return Promise.resolve(materialCategories);
}

export async function materialCategoriesLoader() {
  return defer({
    materialCategories: loadMaterialCategories(),
  });
}
