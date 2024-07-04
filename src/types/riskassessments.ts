import { LatLng } from "leaflet";

export type RiskAssessmentCategory = {
  id: number | "all";
  name: string;
  icon: string;
  riskAssessments: RiskAssessment[];
};

export type RiskAssessment = {
  id: number;
  name: string;
  create?: Date;
  update?: Date;
  imagePath?: string;
  riskCategories: RiskCategory[];
  teamMembers?: TeamMember[];
  description?: string;
  location?: LocationArea;
  rescueConcept?: string;
  plannedWork?: string;
};
export type LocationArea = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latlng: LatLng;
};

export type RiskCategory = {
  id: number;
  name: string;
  imgSrc: string;
  allRisks: Risk[];
  selectedRisks: Risk[];
  description?: string;
};

export type Risk = {
  id: number;
  name: string;
  actions: RiskActions[];
  selectedActions: RiskActions[];
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
};

export type RiskActions = {
  id: number;
  description: string;
};
