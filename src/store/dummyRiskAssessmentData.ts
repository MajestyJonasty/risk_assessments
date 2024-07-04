import { LatLng } from "leaflet";
import {
  Risk,
  RiskAssessment,
  TeamMember,
  RiskCategory,
  RiskActions,
  RiskAssessmentCategory,
} from "../types/riskassessments";

// RiskActions MechanicalRisks
const defaultBewegendeTeileActionsList: RiskActions[] = [
  { id: 1, description: "Arbeitsbereich sperren" },
  { id: 2, description: "Helm tragen" },
];

const defaultScharfeKantenActionsList: RiskActions[] = [
  { id: 1, description: "angemessenen Kantenschutz benutzen" },
  {
    id: 2,
    description:
      "Anschlagpunkte so wählen, dass keine Scharfen Kanten mit Seil in Berührung kommen",
  },
];

const defaultQuetschgefahrMaschinenActionsList: RiskActions[] = [
  { id: 1, description: "Schutzvorrichtungen verwenden" },
  { id: 2, description: "Sicherheitsabstand halten" },
];

const defaultAbsturzgefahrActionsList: RiskActions[] = [
  { id: 1, description: "Anwendung der DGUV R 112-198/TRBS" },
];

const defaultMechanicalRisks: Risk[] = [
  {
    id: 1,
    name: "Unkontrolliert bewegende Teile",
    actions: defaultBewegendeTeileActionsList,
    selectedActions: [],
  },
  {
    id: 2,
    name: "scharfe Kanten",
    actions: defaultScharfeKantenActionsList,
    selectedActions: [],
  },
  {
    id: 3,
    name: "Quetschgefahr durch Maschinen",
    actions: defaultQuetschgefahrMaschinenActionsList,
    selectedActions: [],
  },
  {
    id: 4,
    name: "Absturzgefahr",
    actions: defaultAbsturzgefahrActionsList,
    selectedActions: [],
  },
];

// RiskActions ElectricalRisks
const defaultStromschlagActionsList: RiskActions[] = [
  { id: 1, description: "Isolierte Werkzeuge verwenden" },
  { id: 2, description: "Elektrische Anlagen ausschalten" },
];

const defaultKurzschlussActionsList: RiskActions[] = [
  { id: 1, description: "Sicherungskästen überprüfen" },
  { id: 2, description: "Schadhafte Kabel ersetzen" },
];

const defaultÜberlastungDerStromkreiseActionsList: RiskActions[] = [
  { id: 1, description: "Stromkreise nicht überlasten" },
  { id: 2, description: "Verteilung der Lasten überprüfen" },
];

const defaultBlitzeinschlagActionsList: RiskActions[] = [
  {
    id: 1,
    description: "Arbeiten einstellen und geschützte Bereiche (Auto) aufsuchen",
  },
  { id: 2, description: "Kontakt mit metallischen Leitungen vermeiden" },
  { id: 3, description: "keine kabelgebundenen Elektrogeräte benutzen" },
];

const defaultElectricalRisk: Risk[] = [
  {
    id: 1,
    name: "Stromschlag",
    actions: defaultStromschlagActionsList,
    selectedActions: [],
  },
  {
    id: 2,
    name: "Kurzschluss",
    actions: defaultKurzschlussActionsList,
    selectedActions: [],
  },
  {
    id: 3,
    name: "Überlastung der Stromkreise",
    actions: defaultÜberlastungDerStromkreiseActionsList,
    selectedActions: [],
  },
  {
    id: 4,
    name: "Blitzeinschlag",
    actions: defaultBlitzeinschlagActionsList,
    selectedActions: [],
  },
];

// RiskActions HazardousSubstances
const defaultEinatmenGiftigeDaempfeActionsList: RiskActions[] = [
  { id: 1, description: "Atemschutzmasken tragen" },
  { id: 2, description: "Belüftung sicherstellen" },
  { id: 3, description: "Messungen vor Arbeiten durchführen" },
];

const defaultHautkontaktChemikalienActionsList: RiskActions[] = [
  { id: 1, description: "entsprechende Schutzhandschuhe und -kleidung tragen" },
  { id: 2, description: "Sicherheitsduschen bereitstellen" },
];

const defaultVerschluckenChemikalienActionsList: RiskActions[] = [
  { id: 1, description: "Spezielle Arbeitsvorschriften beachten" },
  { id: 2, description: "Notfallpläne bereithalten" },
];

const defaultHazardousSubstances: Risk[] = [
  {
    id: 1,
    name: "Einatmen von giftigen Dämpfen",
    actions: defaultEinatmenGiftigeDaempfeActionsList,
    selectedActions: [],
  },
  {
    id: 2,
    name: "Hautkontakt mit gefährlichen Chemikalien",
    actions: defaultHautkontaktChemikalienActionsList,
    selectedActions: [],
  },
  {
    id: 3,
    name: "Verschlucken von Chemikalien",
    actions: defaultVerschluckenChemikalienActionsList,
    selectedActions: [],
  },
];
// RiskActions HazardousSubstances
const defaultFeuerEntzündbareMaterialienActionsList: RiskActions[] = [
  { id: 1, description: "Feuerlöscher bereitstellen" },
  {
    id: 2,
    description: "Brandmeldeanlagen auf funktionstüchtigkeit überprüfen",
  },
  { id: 2, description: "leicht entzündbare Materialien vermeiden" },
];

const defaultStaubexplosionActionsList: RiskActions[] = [
  { id: 1, description: "Staubansammlungen vermeiden" },
  { id: 2, description: "Geeignete Lüftungssysteme installieren" },
  {
    id: 3,
    description:
      "Arbeiten, die Staub produzieren, nicht in geschlossenen Räumen durchführen",
  },
];

const defaultGasexplosionActionsList: RiskActions[] = [
  { id: 1, description: "Gasdetektoren verwenden" },
  { id: 2, description: "Regelmäßige Wartung der Gasleitungen" },
];

const defaultFireAndExplosionRisk: Risk[] = [
  {
    id: 1,
    name: "Feuer durch entzündbare Materialien",
    actions: defaultFeuerEntzündbareMaterialienActionsList,
    selectedActions: [],
  },
  {
    id: 2,
    name: "Staubexplosionen",
    actions: defaultStaubexplosionActionsList,
    selectedActions: [],
  },
  {
    id: 3,
    name: "Explosionen durch Gaslecks",
    actions: defaultGasexplosionActionsList,
    selectedActions: [],
  },
];

// RiskActions OtherRisk
const defaultLärmActionsList: RiskActions[] = [
  { id: 1, description: "Gehörschutz tragen" },
  { id: 2, description: "Lärmmindernde Maßnahmen ergreifen" },
];

const defaultErschöpfungActionsList: RiskActions[] = [
  { id: 1, description: "Regelmäßige Pausen einlegen" },
  { id: 2, description: "Arbeitszeiten überwachen" },
];

const defaultStolperSturzGefahrActionsList: RiskActions[] = [
  { id: 1, description: "Lauftechnik verbessern" },
  { id: 2, description: "Boden sauber halten" },
  { id: 3, description: "'Stolperfallen' beseitigen" },
  { id: 4, description: "während des Ganges nach vorne schauen" },
  { id: 5, description: "Alkohol während der Arbeitszeit vermeiden" },
];

const defaultOtherRisk: Risk[] = [
  {
    id: 1,
    name: "Lärmbelastung",
    actions: defaultLärmActionsList,
    selectedActions: [],
  },
  {
    id: 2,
    name: "Erschöpfung durch Überarbeitung",
    actions: defaultErschöpfungActionsList,
    selectedActions: [],
  },
  {
    id: 3,
    name: "Stolper- und Sturzgefahr",
    actions: defaultStolperSturzGefahrActionsList,
    selectedActions: [],
  },
];

let dummyTeamMembers: TeamMember[] = [
  { id: 1, name: "Max Mustermann", role: "Level-1" },
  { id: 2, name: "Maxine Musterfrau", role: "Sicherheitsbeauftragter" },
  { id: 3, name: "Maximilian Mustermensch", role: "Sicherheitsbeauftragter" },
];

export const defaultRiskCategoryList: RiskCategory[] = [
  {
    id: 1,
    name: "Mechanische",
    imgSrc: "/images/mechanicalRiskIcon.png",
    allRisks: [...defaultMechanicalRisks],
    selectedRisks: [],
    description:
      "Mechanische Gefährdungen entstehen durch Relativbewegungen zwischen Teilen des menschlichen Körpers und Gegenständen wie Arbeitsmitteln oder Arbeitsgegenständen, die zu einem Zusammentreffen derselben führen.",
  },
  {
    id: 2,
    name: "Elektrische",
    imgSrc: "/images/electricalRiskIcon.png",
    allRisks: [...defaultElectricalRisk],
    selectedRisks: [],
    description:
      "Elektrische Gefahren beziehen sich auf Risiken, die durch den Kontakt mit elektrischer Energie entstehen können. Diese Gefahren umfassen unteranderem Stromschläge, Verbrennungen und Lichtbogenverletzungenen.",
  },
  {
    id: 3,
    name: "Gefahrenstoffe",
    imgSrc: "/images/hazardousSubstancesIcon.png",
    allRisks: [...defaultHazardousSubstances],
    selectedRisks: [],
    description:
      "Gefahrenstoffe sind Substanzen, die physikalische oder gesundheitliche Risiken für Menschen, Tiere und die Umwelt darstellen können. Diese Stoffe können giftig, ätzend, entzündlich, explosiv, oxidierend oder anderweitig schädlich sein.",
  },
  {
    id: 4,
    name: "Brand & Exposionen",
    imgSrc: "/images/fireExplosionIcon.png",
    allRisks: [...defaultFireAndExplosionRisk],
    selectedRisks: [],
    description:
      "Brand- und Explosionsgefahren beziehen sich auf Risiken, die durch entzündliche oder explosive Stoffe entstehen können. Diese Gefahren umfassen die schnelle Ausbreitung von Feuer und die plötzliche Freisetzung von Energie.",
  },
  {
    id: 5,
    name: "Sonstige",
    imgSrc: "/images/otherIcon.png",
    allRisks: [...defaultOtherRisk],
    selectedRisks: [],
    description:
      "Unter die Kategorie 'Sonstige' fallen alle Gefahren, die den anderen Kategorien nicht eindeutig zugeordnet werden konnten.",
  },
];

const dummyRiskAssessment: RiskAssessment = {
  id: 1,
  name: "Tropical Island",
  create: new Date("04.02.2022"),
  imagePath: "/images/palme.png",
  riskCategories: [...defaultRiskCategoryList],
  teamMembers: dummyTeamMembers,
  location: {
    id: 1,
    street: " Tropical-Islands-Allee 1",
    city: "Krausnick",
    postalCode: "15910",
    country: "Germany",
    latlng: new LatLng(52.0333, 13.7333),
  },
};
const dummyRiskAssessment2: RiskAssessment = {
  id: 2,
  name: "Bauernhof",
  create: new Date("04.02.2022"),
  imagePath: "/images/bauernhof.png",
  riskCategories: [...defaultRiskCategoryList],
  teamMembers: dummyTeamMembers,
};
const dummyRiskAssessment3: RiskAssessment = {
  id: 3,
  name: "Werkstatt",
  create: new Date("04.02.2022"),
  imagePath: "/images/werkstatt.png",
  riskCategories: [...defaultRiskCategoryList],
  teamMembers: dummyTeamMembers,
};
const dummyRiskAssessment4: RiskAssessment = {
  id: 4,
  name: "Büro",
  create: new Date("04.02.2022"),
  imagePath: "/images/buero.png",
  riskCategories: [...defaultRiskCategoryList],
  teamMembers: dummyTeamMembers,
};

export const dummyRiskAssessmentList: RiskAssessment[] = [
  dummyRiskAssessment,
  dummyRiskAssessment2,
];

export const dummyRiskAssessmentList2: RiskAssessment[] = [
  dummyRiskAssessment3,
  dummyRiskAssessment4,
];

export const dummyRiskAssessmentList3: RiskAssessment[] = [
  dummyRiskAssessment,
  dummyRiskAssessment2,
  dummyRiskAssessment3,
  dummyRiskAssessment4,
];

export const allDummyRiskAssessmentLists: RiskAssessment[] = [
  ...dummyRiskAssessmentList,
  ...dummyRiskAssessmentList2,
  ...dummyRiskAssessmentList3,
];

export const dummyRiskAssessmentCategoryList: RiskAssessmentCategory[] = [
  {
    id: 1,
    name: "Entwürfe",
    icon: "images/entwurfe.png",
    riskAssessments: [...dummyRiskAssessmentList],
  },
  {
    id: 2,
    name: "Bestätigt",
    icon: "images/bestatigung.png",
    riskAssessments: [...dummyRiskAssessmentList2],
  },
  {
    id: "all",
    name: "Alle",
    icon: "images/alle.png",
    riskAssessments: [...dummyRiskAssessmentList3],
  },
];
