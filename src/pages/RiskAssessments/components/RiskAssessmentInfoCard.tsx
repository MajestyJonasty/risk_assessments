import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { LocationArea, RiskAssessment } from "../../../types/riskassessments";
import {
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../../components/layout/UI/StyledLists";
import { PencilButton } from "../../../components/layout/UI/PencilButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StyledDialog } from "../../../components/layout/UI/StyledDialog";
import { LocationPicker } from "../../../components/LocationPicker";
import { geocode, reverseGeocode } from "../../../store/api/reverseGeocode";
import { LatLng } from "leaflet";
import { useRiskAssessment } from "../../../store/context/RiskAssessmentContext";

interface RiskAssessmentInfoProps {
  updateRiskAssessment: (updatedRiskAssessment: RiskAssessment) => void;
  className?: string;
}

export const RiskAssessmentInfoCard = ({
  updateRiskAssessment,
  className,
}: RiskAssessmentInfoProps) => {
  const { riskAssessment } = useRiskAssessment();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState("");

  const [plannedWork, setPlannedWork] = useState(riskAssessment.plannedWork);
  const [rescueConcept, setRescueConcept] = useState(
    riskAssessment.rescueConcept
  );

  const [locationPickerIsOpen, setLocationPickerIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [locationArea, setLocationArea] = useState<LocationArea>({
    id: 0,
    street: riskAssessment.location?.street ?? "",
    city: riskAssessment.location?.city ?? "",
    postalCode: riskAssessment.location?.postalCode ?? "",
    country: riskAssessment.location?.country ?? "",
    latlng: riskAssessment.location?.latlng ?? new LatLng(0, 0),
  });
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleLocationFinderInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };
  const handleLocationSelect = async (location: LatLng) => {
    const address = await reverseGeocode(location);
    setLocationArea(address);
  };

  const handleInputChange =
    (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocationArea((prev) => ({ ...prev, [field]: e.target.value }));
    };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      if (inputValue) {
        try {
          const location = await geocode(inputValue);
          setLocationArea(location);
        } catch (error) {
          console.error("Failed to fetch location data", error);
          setLocationArea({
            id: 0,
            street: "",
            city: "",
            postalCode: "",
            country: "",
            latlng: new LatLng(0, 0),
          });
        }
      }
    }, 2500);

    setTimer(newTimer);
    // Cleanup-Funktion, die den Timer löscht, wenn die Komponente unmounted wird
    return () => clearTimeout(newTimer);
  }, [inputValue]);

  const openPdfView = () => {
    navigate(`/riskassessments/${riskAssessment.id}/pdf`);
  };

  const openDialog = (dialogType: string) => {
    setDialogOpen(true);
    setActiveDialog(dialogType);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveDialog("");
  };

  const renderDialogContent = () => {
    switch (activeDialog) {
      case "location":
        return (
          <div className="flex flex-col gap-2 w-full">
            <div className="self-end flex gap-2 items-center">
              {!locationPickerIsOpen ? (
                <span>Ort finden</span>
              ) : (
                <Input
                  fullWidth
                  id="location"
                  placeholder="Ort finden..."
                  value={inputValue}
                  onChange={handleLocationFinderInputChange}
                />
              )}

              <IconButton
                onClick={() => setLocationPickerIsOpen((prev) => !prev)}
                className="self-end"
              >
                {!locationPickerIsOpen ? (
                  <img
                    src={`/images/suche.png`}
                    alt="home"
                    width={25}
                    height={25}
                  />
                ) : (
                  <img
                    src={`/images/x.png`}
                    alt="home"
                    width={25}
                    height={25}
                  />
                )}
              </IconButton>
            </div>
            {locationPickerIsOpen && (
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                currentLocation={locationArea.latlng || null}
              />
            )}
            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full">
                <TextField
                  fullWidth
                  label="Straße"
                  id="street"
                  value={locationArea?.street ?? ""}
                  onChange={handleInputChange("street")}
                />
                <TextField
                  fullWidth
                  label="Stadt"
                  id="city"
                  value={locationArea?.city ?? ""}
                  onChange={handleInputChange("city")}
                />
              </div>
              <div className="flex flex-col w-full">
                <TextField
                  fullWidth
                  label="Postleitzahl"
                  id="postalCode"
                  value={locationArea?.postalCode ?? ""}
                  onChange={handleInputChange("postalCode")}
                />
                <TextField
                  fullWidth
                  label="Land"
                  id="country"
                  value={locationArea?.country ?? ""}
                  onChange={handleInputChange("country")}
                />
              </div>
            </div>
          </div>
        );
      case "plannedWork":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            id="plannedWork"
            value={plannedWork}
            label="Geplante Arbeiten"
            onChange={(e) => setPlannedWork(e.target.value)}
          />
        );
      case "rescueConcept":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={rescueConcept}
            id="rescueConcept"
            onChange={(e) => setRescueConcept(e.target.value)}
            label="Rettungskonzept"
          />
        );
      default:
        return <div>Noch nicht verfügbar...</div>;
    }
  };

  const handleSave = () => {
    const updatedRiskAssessment = {
      ...riskAssessment,
      location: locationArea,
      plannedWork: plannedWork,
      rescueConcept: rescueConcept,
      update: new Date(),
    };

    updateRiskAssessment(updatedRiskAssessment);
    closeDialog();
  };
  return (
    <>
      <Card className={className}>
        <CardHeader
          title={
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <Typography variant="h2">{riskAssessment.name}</Typography>
                <span>
                  Letzte Änderung:
                  {riskAssessment.update?.toLocaleDateString() ?? " -"}
                </span>
              </div>
              <div className="flex gap-4">
                <IconButton onClick={openPdfView}>
                  <img
                    src={`/images/pdf.png`}
                    alt="generate pdf"
                    width={50}
                    height={50}
                  />
                </IconButton>
                <Button
                  onClick={() =>
                    navigate(`/riskassessments/${riskAssessment.id}`)
                  }
                >
                  Gefahren bearbeiten
                </Button>
              </div>
            </div>
          }
        />
        <CardContent>
          <StyledVerticalList>
            <StyledVerticalListItem>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Ort</span>
                  <PencilButton onClick={() => openDialog("location")} />
                </div>

                <div className="flex flex-col">
                  <span>{riskAssessment.location?.street}</span>
                  <span>
                    {riskAssessment.location?.city} -
                    {riskAssessment.location?.country}
                  </span>
                </div>
              </div>
            </StyledVerticalListItem>

            <StyledVerticalListItem>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Geplante Arbeiten</span>
                  <PencilButton onClick={() => openDialog("plannedWork")} />
                </div>

                <div className="flex flex-col">
                  <span>{riskAssessment.plannedWork}</span>
                </div>
              </div>
            </StyledVerticalListItem>
            <StyledVerticalListItem>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Rettungskonzept</span>
                  <PencilButton onClick={() => openDialog("rescueConcept")} />
                </div>

                <div className="flex flex-col">
                  <span>{riskAssessment.rescueConcept}</span>
                </div>
              </div>
            </StyledVerticalListItem>
            <StyledVerticalListItem>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Team</span>
                  <PencilButton onClick={() => openDialog("team")} />
                  {/* <IconButton>
                    <img
                      src={`/images/teilen.png`}
                      alt="add member"
                      width={25}
                      height={25}
                    />
                  </IconButton> */}
                </div>

                <div className="flex flex-col gap-1">
                  {riskAssessment.teamMembers?.map((member) => (
                    <div key={member.id}>
                      <Typography variant="h4">{member.name}</Typography>
                      <Typography variant="body2">{member.role}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </StyledVerticalListItem>
            {riskAssessment.description && (
              <StyledVerticalListItem>
                <div className="flex flex-col">
                  <span className="font-bold">Beschreibung</span>
                  <span>{riskAssessment.description}</span>
                </div>
              </StyledVerticalListItem>
            )}
          </StyledVerticalList>
        </CardContent>
      </Card>

      <StyledDialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Bearbeiten</DialogTitle>
        <DialogContent>{renderDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Speichern</Button>
          <Button onClick={closeDialog}>Abbrechen</Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};
