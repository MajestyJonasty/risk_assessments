import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useRiskAssessment } from "../../../store/context/RiskAssessmentContext";
import { Risk, RiskCategory } from "../../../types/riskassessments";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { Button, Paper } from "@mui/material";

const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100%",
  },
  page: {
    width: "100%",
    flexDirection: "column",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionCategory: {
    margin: 4,
    padding: 8,
    border: "1px solid black",
  },
  sectionRisk: {
    margin: 8,
    padding: 4,
  },
  sectionAction: {
    margin: 8,
    padding: 4,
  },
  category: {
    fontSize: "16px",
  },
  risk: {
    fontSize: "14px",
  },
  action: {
    fontSize: "12px",
  },
});

export const RiskAssessmentPDFPage = () => {
  const navigate = useNavigate();
  const { riskAssessment } = useRiskAssessment();

  const filterdRiskCategories = riskAssessment?.riskCategories.filter(
    (category) => category.selectedRisks.length > 0
  );

  const goBack = () => {
    navigate("/riskassessments", { replace: true });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Paper className="flex flex-col w-full p-2 gap-4">
        <Button onClick={goBack} className="m-4 w-max">
          Zurück
        </Button>
        <PDFViewer className="w-full h-full">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>{riskAssessment?.name}</Text>
                <View>
                  <Text style={{ fontSize: "12px" }}>
                    {riskAssessment?.location?.street}
                  </Text>
                  <Text style={{ fontSize: "12px" }}>
                    {riskAssessment?.location?.city} -{" "}
                    {riskAssessment?.location?.postalCode}
                  </Text>
                </View>
              </View>
              <View style={styles.section}>
                <Text>Gefährdungsermittlung und Beurteilung</Text>
                <View style={styles.section}>
                  {filterdRiskCategories?.map((category: RiskCategory) => (
                    <View key={category.id} style={styles.sectionCategory}>
                      <Text style={styles.category}>
                        {category.name} Gefahren:
                      </Text>
                      {category.selectedRisks.map((risk: Risk) => (
                        <View key={risk.id} style={styles.sectionRisk}>
                          <Text style={styles.risk}>{risk.name}</Text>
                          <View style={styles.sectionAction}>
                            <Text style={styles.risk}>Maßnahmen:</Text>
                            {risk.selectedActions.map((action) => (
                              <View
                                key={action.id}
                                style={styles.sectionAction}
                              >
                                <Text style={styles.action}>
                                  {action.description}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Paper>
    </Suspense>
  );
};
