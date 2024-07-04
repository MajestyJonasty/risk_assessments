import { Form } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  LocationArea,
  RiskAssessment,
  RiskAssessmentCategory,
} from "../../types/riskassessments";
import { useEffect, useState } from "react";
import { RiskAssessmentList } from "./components/RiskAssessmentList";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { StyledDialog } from "../../components/layout/UI/StyledDialog";
import { useRiskAssessment } from "../../store/context/RiskAssessmentContext";
import { RiskAssessmentInfoCard } from "./components/RiskAssessmentInfoCard";
import { LocationPicker } from "../../components/LocationPicker";
import { LatLng } from "leaflet";
import { geocode, reverseGeocode } from "../../store/api/reverseGeocode";

export const RiskAssessments = () => {
  const {
    riskAssessmentCategories,
    addRiskAssessment,
    updateRiskAssessment,
    riskAssessment,
    setRiskAssessment,
  } = useRiskAssessment();
  const [selectedCategory, setSelectedCategory] =
    useState<RiskAssessmentCategory>();
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (riskAssessmentCategories && riskAssessmentCategories.length > 0) {
      setSelectedCategory(riskAssessmentCategories[0] ?? undefined);
      setRiskAssessment(
        riskAssessment.id == 0
          ? riskAssessmentCategories[0]?.riskAssessments[0]
          : riskAssessment
      );
    }
  }, [riskAssessmentCategories, location]);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [locationArea, setLocationArea] = useState<LocationArea>({
    id: 0,
    street: "",
    city: "",
    postalCode: "",
    country: "",
    latlng: new LatLng(0, 0),
  });
  const [name, setName] = useState("");
  const [locationPickerIsOpen, setLocationPickerIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleOpen = () => {
    setOpen(true);
    setLocationArea({
      id: 0,
      street: "",
      city: "",
      postalCode: "",
      country: "",
      latlng: new LatLng(0, 0),
    });
    setInputValue("");
    setLocationPickerIsOpen(false);
  };

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  const handleCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAddRiskAssessment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Add Risk Assessment");
    await addRiskAssessment(event);
    handleClose();
  };

  const handleUpdate = (riskAssessment: RiskAssessment) => {
    updateRiskAssessment(riskAssessment, selectedCategory?.id ?? 4);
  };

  return (
    <Paper className="flex flex-col w-full p-4">
      <Typography variant="h1">Meine Gefährdungsbeurteilungen</Typography>
      <div className="flex gap-2">
        <RiskAssessmentList
          riskAssessments={selectedCategory?.riskAssessments ?? []}
          selectedRiskAssessment={riskAssessment}
          setRiskAssessment={setRiskAssessment}
          categories={riskAssessmentCategories ?? []}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setOpen={setOpen}
        />

        {riskAssessment && (
          <RiskAssessmentInfoCard updateRiskAssessment={handleUpdate} />
        )}

        {/* Dialog zum Hinzufügen neuer Kategorie */}
        <StyledDialog open={categoryOpen} onClose={handleCategoryClose}>
          <DialogTitle>Neue Kategorie - Funktionieert noch nicht </DialogTitle>
          <Form method="POST" onSubmit={handleCategorySubmit}>
            <DialogContent>
              <TextField fullWidth label="Name" id="name" name="name" />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit" onClick={handleClose}>
                Hinzufügen
              </Button>
            </DialogActions>
          </Form>
        </StyledDialog>

        {/* Dialog zum Hinzufügen neuer Gefährdungsbeurteilung */}
        <StyledDialog open={open} onClose={handleClose} onLoad={handleOpen}>
          <DialogTitle>Neue Gefährdungsbeurteilung</DialogTitle>
          <Form onSubmit={handleAddRiskAssessment}>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                fullWidth
                label="Name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {showMore ? (
                <div className="flex items-center justify-end">
                  <span>Weniger</span>
                  <IconButton onClick={() => setShowMore(false)}>
                    <ExpandLessIcon />
                  </IconButton>
                </div>
              ) : (
                <div className="flex items-center justify-end">
                  <span>Mehr</span>
                  <IconButton onClick={() => setShowMore(true)}>
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              )}

              {showMore && (
                <div>
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
                          name="street"
                          value={locationArea?.street ?? ""}
                          onChange={handleInputChange("street")}
                        />
                        <TextField
                          fullWidth
                          label="Stadt"
                          id="city"
                          name="city"
                          value={locationArea?.city ?? ""}
                          onChange={handleInputChange("city")}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <TextField
                          fullWidth
                          label="Postleitzahl"
                          id="postalCode"
                          name="postalCode"
                          value={locationArea?.postalCode ?? ""}
                          onChange={handleInputChange("postalCode")}
                        />
                        <TextField
                          fullWidth
                          label="Land"
                          id="country"
                          name="country"
                          value={locationArea?.country ?? ""}
                          onChange={handleInputChange("country")}
                        />
                      </div>
                    </div>
                  </div>
                  <Divider sx={{ margin: "10px 0px" }} />
                  <TextField
                    fullWidth
                    label="Rettungskonzept"
                    id="rescueConcept"
                    name="rescueConcept"
                    multiline
                  />
                  <TextField
                    fullWidth
                    label="Geplante Arbeiten"
                    id="plannedWork"
                    name="plannedWork"
                    multiline
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit" disabled={name === ""}>
                Hinzufügen
              </Button>
            </DialogActions>
          </Form>
        </StyledDialog>
      </div>
    </Paper>
  );
};
