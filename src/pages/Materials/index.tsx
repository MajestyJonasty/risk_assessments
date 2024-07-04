import { useRouteLoaderData } from "react-router-dom";
import { useMaterials } from "../../store/context/MaterialContext";
import { Material, MaterialCategory } from "../../types/material";
import { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  StyledHorizontalList,
  StyledHorizontalListItem,
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../components/layout/UI/StyledLists";
import { MaterialDetailCard } from "./components/MaterialDetailCard";
import { SearchInput } from "../../components/SearchInput";
import { getConditionColor } from "../../util/color.util";
import { IconListButton } from "../../components/IconListButton";
import { theme } from "../../components/layout/theme";

export const MaterialPage = () => {
  const { materialCategories, setMaterialCategories } = useMaterials();
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>();
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  const data = useRouteLoaderData("materials") as {
    materialCategories: Promise<MaterialCategory[]>;
  };

  useEffect(() => {
    data.materialCategories.then((categories) => {
      setMaterialCategories(categories);
      setSelectedCategory(categories[0]);
      setSelectedMaterial(categories[0].materials[0]);
    });
  }, []);

  return (
    <Paper className="flex flex-col w-full p-4">
      <Typography variant="h1">Meine Ausrüstung</Typography>
      <div className="grid grid-cols-2 grid-rows-2 w-full overflow-auto m-2 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="row-span-1">
            <CardHeader title="Kategorien" />
            <CardContent>
              <StyledHorizontalList>
                {materialCategories.map((category) => (
                  <StyledHorizontalListItem
                    key={category.name}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <IconListButton
                      icon={category.icon}
                      name={category.name}
                      style={{
                        backgroundColor:
                          selectedCategory?.id === category.id
                            ? theme.palette.secondary.main
                            : "transparent",
                      }}
                    />
                  </StyledHorizontalListItem>
                ))}
              </StyledHorizontalList>
            </CardContent>
          </Card>
          {selectedMaterial && (
            <Card className="row-span-2">
              <CardHeader
                title={
                  <div className="flex justify-between">
                    <div>
                      <h3>{selectedMaterial.name}</h3>
                      <span>{selectedMaterial.producer}</span>
                    </div>

                    <ConditionCircle condition={selectedMaterial.condition} />
                  </div>
                }
              />
              <CardContent>
                <MaterialDetailCard material={selectedMaterial} />
              </CardContent>
            </Card>
          )}
          <Card className="col-span-1">
            <CardHeader
              title={
                <div className="flex items-center justify-between">
                  <h2>{selectedCategory?.name}</h2>
                  <div className="flex flex-row gap-4">
                    {/* <SearchInput /> */}
                    <IconButton>
                      <img
                        src={`/images/plus.png`}
                        alt="home"
                        width={25}
                        height={25}
                      />
                    </IconButton>
                  </div>
                </div>
              }
            />
            <CardContent>
              <StyledVerticalList className="flex flex-col gap-4">
                {selectedCategory?.materials.map((material) => (
                  <StyledVerticalListItem
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    sx={{
                      backgroundColor:
                        selectedMaterial?.id === material.id
                          ? theme.palette.secondary.main
                          : "transparent",
                    }}
                  >
                    <span>{material.name}</span>
                  </StyledVerticalListItem>
                ))}
              </StyledVerticalList>
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </Paper>
  );
};

const ConditionCircle = ({
  condition,
}: {
  condition: Material["condition"];
}) => {
  const conditionColor = getConditionColor(condition);
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: conditionColor,
        }}
      />
      <span>{condition}</span>
    </div>
  );
};
