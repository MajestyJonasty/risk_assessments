import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Risk, RiskActions } from "../../../types/riskassessments";
import { Form } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { StyledDialog } from "../../../components/layout/UI/StyledDialog";
import { StyledTextField } from "../../../components/layout/UI/StyledTextField";
import { theme } from "../../../components/layout/theme";
import {
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../../components/layout/UI/StyledLists";

type RiskActionListProps = {
  risk?: Risk;
  addAction: (action: RiskActions) => void;
  selectedActions: RiskActions[];
  selectAction: (action: RiskActions) => void;
  onlySelected?: boolean;
  className?: string;
};

export const RiskActionList = ({
  risk,
  addAction,
  selectedActions,
  selectAction,
  onlySelected,
  className,
}: RiskActionListProps) => {
  const [open, setOpen] = useState(false);

  const [newRiskAction, setNewRiskAction] = useState<RiskActions>({
    id: 0,
    description: "",
  });

  const filteredActions =
    risk?.actions?.filter(
      (action) =>
        !risk.selectedActions.find(
          (selectedAction) => selectedAction.id === action.id
        )
    ) || [];

  const handleActionClose = () => {
    setOpen(false);
    setNewRiskAction({ id: 0, description: "" });
  };

  const isActionSelected = (actionId: number) => {
    return risk?.selectedActions?.some((action) => action.id === actionId);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRiskAction((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const formData = new FormData(event.currentTarget);
      const description = formData.get("description") as string;

      const existingAction = risk?.actions.find(
        (action) => action.description === description
      );

      const newAction = {
        id: existingAction ? existingAction.id : new Date().getTime(),
        description: description,
      };

      addAction(newAction);

      handleActionClose();
    },
    [addAction]
  );

  return (
    <>
      <Card className={className} sx={{ width: "100%" }}>
        <CardHeader
          title={
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h2">
                  {onlySelected ? "gewählte" : "vorhandene"} Maßnahmen
                </Typography>
                <h4>{risk?.name}</h4>
              </div>

              <div className="flex flex-row gap-4">
                <IconButton onClick={() => setOpen(true)}>
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
          <StyledVerticalList>
            {onlySelected ? (
              selectedActions.length === 0 ? (
                <ListItem>
                  <Typography variant="body1">
                    Keine Maßnahmen ausgewählt
                  </Typography>
                </ListItem>
              ) : (
                selectedActions.map((action) => (
                  <ListItem key={action.id}>
                    <StyledTextField
                      fullWidth
                      defaultValue={action.description}
                      multiline
                      disabled
                    />
                  </ListItem>
                ))
              )
            ) : (
              risk?.actions?.map((action, index) => (
                <ListItem key={action.id} onClick={() => selectAction(action)}>
                  <StyledTextField
                    fullWidth
                    name={`actions[${index}][description]`}
                    defaultValue={action.description}
                    multiline
                    disabled
                    style={{
                      backgroundColor:
                        selectedActions &&
                        selectedActions.length > 0 &&
                        isActionSelected(action.id)
                          ? theme.palette.secondary.main
                          : "transparent",
                    }}
                  />
                </ListItem>
              ))
            )}

            <input type="hidden" name="name" value={risk?.name} />
          </StyledVerticalList>
        </CardContent>
      </Card>

      <StyledDialog open={open} onClose={handleActionClose}>
        <DialogTitle>Maßnahme hinzufügen</DialogTitle>
        <Form method="POST" onSubmit={handleSubmit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <div>
              <TextField
                fullWidth
                label="Beschreibung"
                name="description"
                value={newRiskAction.description}
                onChange={handleChangeDescription}
              />
              <input type="hidden" name="riskId" value={risk?.id} />
            </div>
            {onlySelected && (
              <Card>
                <CardHeader title="vorhandene Maßnahmen" />
                <CardContent>
                  <StyledVerticalList>
                    {filteredActions.length > 0 ? (
                      filteredActions.map((action) => (
                        <StyledVerticalListItem
                          key={action.id}
                          onClick={() => setNewRiskAction(action)}
                        >
                          <span>{action.description}</span>
                        </StyledVerticalListItem>
                      ))
                    ) : (
                      <ListItem>
                        <Typography variant="body1">
                          Keine Maßnahmen vorhanden
                        </Typography>
                      </ListItem>
                    )}
                  </StyledVerticalList>
                </CardContent>
              </Card>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" type="submit">
              Hinzufügen
            </Button>
          </DialogActions>
        </Form>
      </StyledDialog>
    </>
  );
};
