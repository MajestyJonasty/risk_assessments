import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  ListItem,
} from "@mui/material";
import { SearchInput } from "../../../components/SearchInput";
import {
  Risk,
  RiskActions,
  RiskCategory,
} from "../../../types/riskassessments";
import { Form, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../../components/layout/UI/StyledLists";
import { StyledDialog } from "../../../components/layout/UI/StyledDialog";
import CancelIcon from "@mui/icons-material/Cancel";
import { theme } from "../../../components/layout/theme";
import { useSwipeable } from "react-swipeable";
import { RiskActionList } from "./RiskActionList";

type RiskListProps = {
  risks: Risk[];
  selectedCategory: RiskCategory;
  selectedRisk?: Risk;
  setSelectedRisk: (risk: Risk) => void;
  addRisk: (risk: Risk) => void;
  deleteRisk: (risk: Risk) => void;
  className?: string;
};

export const RiskList = ({
  risks,
  selectedCategory,
  selectedRisk,
  setSelectedRisk,
  addRisk,
  deleteRisk,
  className,
}: RiskListProps) => {
  const [open, setOpen] = useState(false);
  const [newRisk, setNewRisk] = useState<Risk>({
    id: 0,
    name: "",
    actions: [],
    selectedActions: [],
  });

  const handleOpen = () => {
    setNewRisk({
      id: 0,
      name: "",
      actions: [],
      selectedActions: [],
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRisk({ ...newRisk, name: event.target.value });
    setSelectedRisk({ ...newRisk, name: event.target.value });
  };

  const handleAddRiskAction = (action: RiskActions) => {
    setNewRisk({ ...newRisk, actions: [...newRisk.actions, action] });
    setSelectedRisk({ ...newRisk, actions: [...newRisk.actions, action] });
  };

  const handleSelectAction = (action: RiskActions) => {
    if (!selectedRisk) {
      console.error("Selected risk is undefined");
      return;
    }

    const index = selectedRisk?.selectedActions.findIndex(
      (a) => a.id === action.id
    );

    let updatedActions: RiskActions[] = [];
    if (index === -1) {
      updatedActions = [...(selectedRisk?.selectedActions || []), action];
    } else {
      updatedActions =
        selectedRisk?.selectedActions.filter((_, idx) => idx !== index) || [];
    }

    setSelectedRisk({ ...selectedRisk, selectedActions: updatedActions }); // TODO: can be removed ?
    setNewRisk({ ...selectedRisk, selectedActions: updatedActions });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const riskId = parseInt(formData.get("riskId") as string);

    const riskActions: RiskActions[] = [];
    formData.forEach((value: any, key: any) => {
      if (key.startsWith("actions[") && key.endsWith("][description]")) {
        const index = parseInt(key.match(/actions\[(\d+)\]/)[1]);
        riskActions[index] = riskActions[index] || {
          id: null,
          description: "",
        };
        riskActions[index].description = value;
      }
      if (key.startsWith("actions[") && key.endsWith("][id]")) {
        const index = parseInt(key.match(/actions\[(\d+)\]/)[1]);
        riskActions[index] = riskActions[index] || {
          id: null,
          description: "",
        };
        riskActions[index].id = parseInt(value);
      }
    });

    const risk: Risk = {
      id: riskId == 0 ? new Date().getTime() : riskId,
      name: name,
      actions: selectedRisk?.actions || [],
      selectedActions: riskActions,
    };

    addRisk(risk);

    handleClose();
  };

  const handleReset = () => {
    setNewRisk({
      id: 0,
      name: "",
      actions: [],
      selectedActions: [],
    });
  };

  return (
    <>
      <Card sx={{ width: "100%" }} className={className}>
        <CardHeader
          title={
            <div className="flex items-center justify-between">
              <Typography variant="h2">
                {selectedCategory?.name} Gefahren
              </Typography>
              <div className="flex flex-row gap-4">
                {/* <SearchInput /> */}
                <IconButton onClick={handleOpen}>
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
        <CardContent className="flex">
          <StyledVerticalList>
            {risks.length === 0 && (
              <ListItem>
                <Typography variant="body1">
                  Keine Gefahren ausgewählt
                </Typography>
              </ListItem>
            )}
            {risks.map((risk) => (
              <RiskItem
                key={risk.id}
                risk={risk}
                onDelete={deleteRisk}
                onSelect={setSelectedRisk}
                isSelected={selectedRisk?.id === risk.id}
              />
            ))}
          </StyledVerticalList>
        </CardContent>
      </Card>

      {/* AddNewRisk - Dialog */}
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle className="truncate">
          Neue {selectedCategory?.name} Gefahr
        </DialogTitle>
        <Form method="POST" onSubmit={handleSubmit}>
          <DialogContent className="flex flex-col">
            <div className="flex gap-2">
              <TextField
                fullWidth
                label="Name"
                id="name"
                name="name"
                value={newRisk.name}
                onChange={handleNameChange}
                disabled={newRisk.id != 0}
              />
              <input type="hidden" name="name" value={newRisk.name} />
              <input type="hidden" name="riskId" value={newRisk.id} />

              {newRisk.id != 0 && (
                <IconButton onClick={handleReset}>
                  <CancelIcon />
                </IconButton>
              )}
              {newRisk?.selectedActions?.map((action, index) => (
                <div key={index}>
                  <input
                    type="hidden"
                    name={`actions[${index}][description]`}
                    value={action.description}
                  />
                  <input
                    type="hidden"
                    name={`actions[${index}][id]`}
                    value={action.id}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 w-full">
              <Card sx={{ width: "100%" }}>
                <CardHeader
                  title={
                    <Typography variant="h2">vorhandene Gefahren</Typography>
                  }
                />
                <CardContent>
                  <StyledVerticalList>
                    {selectedCategory?.allRisks
                      .filter((risk: Risk) => {
                        return (
                          risks.find((r) => r.id === risk.id) === undefined
                        );
                      })
                      .map((risk: Risk) => (
                        <RiskItem
                          key={risk.id}
                          onDelete={() => {}}
                          onSelect={(risk) => {
                            setNewRisk(risk);
                            setSelectedRisk(risk);
                          }}
                          risk={risk}
                          isSelected={false}
                        />
                      ))}
                  </StyledVerticalList>
                </CardContent>
              </Card>

              <RiskActionList
                risk={newRisk}
                addAction={handleAddRiskAction}
                selectedActions={newRisk?.selectedActions || []} //TODO can be removed ?
                selectAction={handleSelectAction}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" type="submit" onClick={handleClose}>
              Hinzufügen
            </Button>
          </DialogActions>
        </Form>
      </StyledDialog>
    </>
  );
};

interface RiskItemProps {
  risk: Risk;
  onDelete: (risk: Risk) => void;
  onSelect: (risk: Risk) => void;
  isSelected: boolean;
}

const RiskItem = ({ risk, onDelete, onSelect, isSelected }: RiskItemProps) => {
  const [xPos, setXPos] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (event) => {
      const x = Math.min(0, Math.max(-180, event.deltaX));
      setXPos(x);
    },
    onSwiped: (event) => {
      if (event.deltaX < -120) {
        onDelete(risk);
      } else {
        setXPos(0);
      }
    },
    trackMouse: true,
  });

  const backgroundStyle = {
    position: "absolute",
    backgroundColor: xPos < -50 ? "rgba(255, 0, 0, 0.5)" : "transparent", // Roter Hintergrund erscheint bei mehr als 50px Verschiebung
    width: "100%",
    height: "100%",
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "20px",
    fontSize: "1rem",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="flex relative" key={risk.id} {...handlers}>
      <div style={backgroundStyle}>{xPos < -50 && <span>Löschen</span>}</div>
      <StyledVerticalListItem
        onClick={() => onSelect(risk)}
        style={{
          backgroundColor: isSelected
            ? theme.palette.secondary.main
            : "transparent",
          transform: `translateX(${xPos}px)`,
          transition: "transform 0.3s ease",
        }}
      >
        <span>{risk.name}</span>
      </StyledVerticalListItem>
    </div>
  );
};
