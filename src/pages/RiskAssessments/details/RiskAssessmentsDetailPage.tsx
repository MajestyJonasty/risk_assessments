import { Form, useNavigate, useParams } from "react-router-dom";
import {
  Risk,
  RiskActions,
  RiskCategory,
} from "../../../types/riskassessments";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { RiskList } from "../components/RiskList";
import {
  StyledHorizontalList,
  StyledHorizontalListItem,
} from "../../../components/layout/UI/StyledLists";
import { useRiskAssessment } from "../../../store/context/RiskAssessmentContext";
import { RiskActionList } from "../components/RiskActionList";
import { IconListButton } from "../../../components/IconListButton";
import { theme } from "../../../components/layout/theme";
import { StyledDialog } from "../../../components/layout/UI/StyledDialog";

export const RiskAssessmentsDetail = () => {
  const {
    riskAssessment,
    loadRiskAssessment,
    addRisk,
    deleteRisk,
    addRiskAction,
    updateRiskAssessment,
  } = useRiskAssessment();
  const [selectedRisk, setSelectedRisk] = useState<Risk>();
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory>();
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadRiskAssessment(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (riskAssessment && riskAssessment.riskCategories.length > 0) {
      setSelectedCategory(selectedCategory ?? riskAssessment.riskCategories[0]);
      setSelectedRisk(
        selectedRisk ?? riskAssessment.riskCategories[0].selectedRisks[0]
      );
    }
  }, [riskAssessment]);

  const handleSelectRisk = (risk: Risk) => {
    setSelectedRisk(risk);
  };

  const handleAddSelectedAction = (action: RiskActions) => {
    setSelectedRisk((prevRisk) => {
      if (!prevRisk) return prevRisk;

      const updatedRisk = {
        ...prevRisk,
        selectedActions: [...prevRisk.selectedActions, action],
      };

      return updatedRisk;
    });

    addRiskAction(
      action,
      selectedRisk || riskAssessment.riskCategories[0].selectedRisks[0],
      selectedCategory?.id || 4
    );

    setIsChanged(true);
  };

  const handleAddRisk = (newRisk: Risk) => {
    addRisk(newRisk, selectedCategory?.id || 4);

    setIsChanged(true);
  };

  const handleDeleteRisk = (risk: Risk) => {
    deleteRisk(risk, selectedCategory?.id || 4);

    setIsChanged(true);
  };
  const handleCategoryChange = (category: RiskCategory) => () => {
    setSelectedCategory(category);
    setSelectedRisk(category.selectedRisks[0]);
  };

  const [showDialog, setShowDialog] = useState(false);
  const goBack = () => {
    if (isChanged) {
      setShowDialog(true);
    } else {
      navigate("/riskassessments", { replace: true });
    }
  };

  const handleSave = () => {
    const updatedRiskAssessment = {
      ...riskAssessment,
      update: new Date(),
    };

    updateRiskAssessment(updatedRiskAssessment, selectedCategory?.id || 4);

    setIsChanged(false);
  };

  return (
    riskAssessment && (
      <Paper className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <Typography variant="h1">{riskAssessment.name}</Typography>
          <div className="flex gap-4 items-center">
            <IconButton onClick={goBack}>
              <img
                src={`/images/zuruck.png`}
                alt="zurück"
                width={75}
                height={75}
              />
            </IconButton>
            <Form onSubmit={handleSave}>
              <input
                type="hidden"
                name="riskAssessment"
                value={JSON.stringify(riskAssessment)}
              />
              <IconButton type="submit">
                <img
                  src={`/images/diskette.png`}
                  alt="speichern"
                  width={75}
                  height={75}
                />
              </IconButton>
            </Form>
          </div>
        </div>
        <div className="flex flex-col m-2 p-4 w-full gap-2">
          {/* Gefahrekategorien */}
          <Card sx={{ width: "100%" }}>
            <CardHeader
              title={<Typography variant="h2">Gefahrenkategorien</Typography>}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <StyledHorizontalList>
                {riskAssessment.riskCategories.map((category: RiskCategory) => (
                  <StyledHorizontalListItem
                    onClick={handleCategoryChange(category)}
                  >
                    <IconListButton
                      icon={category.imgSrc}
                      name={category.name}
                      style={{
                        backgroundColor:
                          selectedCategory?.id === category.id
                            ? theme.palette.secondary.main
                            : "transparent",
                        cursor: "pointer",
                      }}
                    />
                  </StyledHorizontalListItem>
                ))}
              </StyledHorizontalList>
              {/* RiskCategoryInfo */}
              <Card className="col-span-1 h-tailwind h-auto">
                <CardHeader
                  title={<Typography variant="h2">Beschreibung</Typography>}
                />
                <CardContent>
                  <Typography variant="body1">
                    {selectedCategory?.description}
                  </Typography>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <div className="flex w-full gap-2">
            <RiskList
              className="w-full"
              risks={
                riskAssessment?.riskCategories.find(
                  (category) => category.id === selectedCategory?.id
                )?.selectedRisks || []
              }
              selectedCategory={
                selectedCategory || riskAssessment.riskCategories[0]
              }
              selectedRisk={selectedRisk}
              setSelectedRisk={handleSelectRisk}
              addRisk={handleAddRisk}
              deleteRisk={handleDeleteRisk}
            />

            <RiskActionList
              className="w-full"
              onlySelected={true}
              risk={selectedRisk}
              addAction={handleAddSelectedAction}
              selectedActions={selectedRisk?.selectedActions || []}
              selectAction={function (action: RiskActions): void {
                throw new Error("Function not implemented.");
              }}
              // addAction={function (action: RiskActions): void {
              //   throw new Error("Function not implemented.");
              // }}
            />
          </div>
        </div>
        <StyledDialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>Ungespeicherte Änderungen</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Typography>
              Du hast ungespeicherte Änderungen, möchtest du sie speichern bevor
              du gehst?
            </Typography>
            <div className="flex gap-4 items-center place-self-end">
              <Button
                onClick={() => {
                  handleSave();
                  navigate("/riskassessments", { replace: true });
                }}
              >
                Speichern
              </Button>
              <Button
                onClick={() => navigate("/riskassessments", { replace: true })}
              >
                Schließen ohne speichern
              </Button>
              <Button onClick={() => setShowDialog(false)}>Zurück</Button>
            </div>
          </DialogContent>
        </StyledDialog>
      </Paper>
    )
  );
};
