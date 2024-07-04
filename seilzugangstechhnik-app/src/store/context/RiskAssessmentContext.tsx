import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Risk,
  RiskActions,
  RiskAssessment,
  RiskAssessmentCategory,
  RiskCategory,
} from "../../types/riskassessments";
import { LatLng } from "leaflet";
import {
  defaultRiskCategoryList,
  dummyRiskAssessmentCategoryList,
} from "../dummyRiskAssessmentData";

interface RiskAssessmentContextType {
  riskAssessmentCategories: RiskAssessmentCategory[];
  addRiskAssessment: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  updateRiskAssessment: (
    updatedRiskAssessment: RiskAssessment,
    selectedCategoryId: number | "all"
  ) => void;
  riskAssessment: RiskAssessment;
  setRiskAssessment: React.Dispatch<React.SetStateAction<RiskAssessment>>;
  loadRiskAssessment: (id: number) => Promise<void>;
  addRisk: (risk: Risk, selectedCategoryId: number) => void;
  deleteRisk: (risk: Risk, selectedCategoryId: number) => void;
  addRiskAction: (
    action: RiskActions,
    selectedRisk: Risk,
    selectedCategoryId: number
  ) => void;
}

const RiskAssessmentContext = createContext<
  RiskAssessmentContextType | undefined
>(undefined);

interface RiskAssessmentProviderProps {
  children: ReactNode;
}

function deepCopyRiskCategories(categories: RiskCategory[]) {
  return categories.map((category) => ({
    ...category,
    allRisks: category.allRisks.map((risk) => ({
      ...risk,
      actions: risk.actions?.map((action) => ({ ...action })),
    })),
    selectedRisks: [],
  }));
}

export const RiskAssessmentProvider = ({
  children,
}: RiskAssessmentProviderProps) => {
  const [riskAssessmentCategories, setRiskAssessmentCategories] = useState<
    RiskAssessmentCategory[]
  >([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment>({
    id: 0,
    name: "",
    create: new Date(),
    update: new Date(),
    riskCategories: [],
    location: {
      id: 0,
      street: "",
      city: "",
      postalCode: "",
      country: "",
      latlng: new LatLng(0, 0),
    },
    rescueConcept: "",
    plannedWork: "",
  });

  useEffect(() => {
    loadRiskAssessmentCategories();
  }, []);

  const loadRiskAssessmentCategories = async () => {
    setRiskAssessmentCategories(dummyRiskAssessmentCategoryList);
  };

  const addRiskAssessment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRiskAssessment: RiskAssessment = {
      id: Math.random() * 1000000,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      update: new Date(),
      create: new Date(),
      riskCategories: deepCopyRiskCategories(defaultRiskCategoryList),
      location: {
        id: Math.random() * 1000000,
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        postalCode: formData.get("postalCode") as string,
        country: formData.get("country") as string,
        latlng: new LatLng(0, 0),
      },
      rescueConcept: formData.get("rescueConcept") as string,
      plannedWork: formData.get("plannedWork") as string,
    };

    const categoryId =
      localStorage.getItem("riskAssessmentCategoryId") || "all";

    setRiskAssessmentCategories((prevCategories) => {
      let updatedCategories = [...prevCategories];

      // Finde die Indexe für die Kategorie "all" und die spezifische Kategorie
      const allIndex = updatedCategories.findIndex(
        (category) => category.id === "all"
      );
      const specificIndex =
        categoryId !== "all"
          ? updatedCategories.findIndex(
              (category) => category.id === +categoryId
            )
          : -1;

      // Füge das neue RiskAssessment zur Kategorie "all" hinzu
      if (allIndex !== -1) {
        updatedCategories[allIndex] = {
          ...updatedCategories[allIndex],
          riskAssessments: [
            ...updatedCategories[allIndex].riskAssessments,
            newRiskAssessment,
          ],
        };
      }

      // Füge das neue RiskAssessment zur spezifischen Kategorie hinzu, falls ausgewählt
      if (specificIndex !== -1) {
        updatedCategories[specificIndex] = {
          ...updatedCategories[specificIndex],
          riskAssessments: [
            ...updatedCategories[specificIndex].riskAssessments,
            newRiskAssessment,
          ],
        };
      }

      return updatedCategories;
    });

    setRiskAssessment(newRiskAssessment);
  };

  const loadRiskAssessment = async (id: number) => {
    const foundAssessment = riskAssessmentCategories
      .flatMap((category) => category.riskAssessments)
      .find((assessment) => assessment.id === id);

    if (foundAssessment) {
      setRiskAssessment(foundAssessment);
    }
  };

  const addRisk = (risk: Risk, selectedCategoryId: number) => {
    setRiskAssessment((prevRiskAssessment) => {
      if (!prevRiskAssessment) return prevRiskAssessment;

      const updatedRiskCategories = prevRiskAssessment.riskCategories.map(
        (category) => {
          if (category.id === selectedCategoryId) {
            return {
              ...category,
              selectedRisks: [...category.selectedRisks, risk],
            };
          }
          return category;
        }
      );

      const updatedRiskAssessment = {
        ...prevRiskAssessment,
        riskCategories: updatedRiskCategories,
      };

      return {
        ...updatedRiskAssessment,
      };
    });
  };

  const deleteRisk = (risk: Risk, selectedCategoryId: number) => {
    setRiskAssessment((prevRiskAssessment) => {
      if (!prevRiskAssessment) return prevRiskAssessment;

      const updatedRiskCategories = prevRiskAssessment.riskCategories.map(
        (category) => {
          if (category.id === selectedCategoryId) {
            return {
              ...category,
              selectedRisks: category.selectedRisks.filter(
                (selectedRisk) => selectedRisk.id !== risk.id
              ),
            };
          }
          return category;
        }
      );

      return {
        ...prevRiskAssessment,
        riskCategories: updatedRiskCategories,
      };
    });
  };

  const addRiskAction = (
    riskAction: RiskActions,
    selectedRisk: Risk,
    selectedCategoryId: number
  ) => {
    setRiskAssessment((prevRiskAssessment) => {
      const updatedRiskCategories = prevRiskAssessment.riskCategories.map(
        (category) => {
          if (category.id === selectedCategoryId) {
            const updatedRisks = category.selectedRisks.map((risk) => {
              if (risk.id === selectedRisk.id) {
                return {
                  ...risk,
                  selectedActions: [...risk.selectedActions, riskAction],
                };
              }
              return risk;
            });
            return { ...category, selectedRisks: updatedRisks };
          }
          return category;
        }
      );

      return { ...prevRiskAssessment, riskCategories: updatedRiskCategories };
    });
  };

  const updateRiskAssessment = (
    updatedRiskAssessment: RiskAssessment,
    selectedCategoryId: number | "all"
  ) => {
    setRiskAssessmentCategories((prevCategories) => {
      const categoryIndex = prevCategories.findIndex(
        (cat) => cat.id === selectedCategoryId
      );
      if (categoryIndex !== -1) {
        const updatedCategory = {
          ...prevCategories[categoryIndex],
          riskAssessments: prevCategories[categoryIndex].riskAssessments.map(
            (ra) =>
              ra.id === updatedRiskAssessment.id ? updatedRiskAssessment : ra
          ),
        };

        return [
          ...prevCategories.slice(0, categoryIndex),
          updatedCategory,
          ...prevCategories.slice(categoryIndex + 1),
        ];
      }
      return prevCategories;
    });

    // Auch das aktuell ausgewählte RiskAssessment aktualisieren, falls es angezeigt wird
    setRiskAssessment((prev) => {
      if (prev && prev.id === updatedRiskAssessment.id) {
        return updatedRiskAssessment;
      }
      return prev;
    });
  };
  return (
    <RiskAssessmentContext.Provider
      value={{
        riskAssessmentCategories,
        addRiskAssessment,
        riskAssessment,
        setRiskAssessment,
        updateRiskAssessment,
        loadRiskAssessment,
        addRisk,
        deleteRisk,
        addRiskAction,
      }}
    >
      {children}
    </RiskAssessmentContext.Provider>
  );
};

export const useRiskAssessment = (): RiskAssessmentContextType => {
  const context = useContext(RiskAssessmentContext);
  if (context === undefined) {
    throw new Error(
      "useRiskAssessment must be used within a RiskAssessmentProvider"
    );
  }
  return context;
};
