import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Pagination,
} from "@mui/material";
import { RiskAssessment } from "../../../types/riskassessments";
import React, { useEffect, useState } from "react";
import { useRiskAssessment } from "../../../store/context/RiskAssessmentContext";
import {
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../../components/layout/UI/StyledLists";

export const RiskAssessmentHistory = () => {
  const { riskAssessmentCategories, riskAssessment } = useRiskAssessment();

  const [riskAssessmentHistory, setRiskAssessmentHistory] = useState<
    RiskAssessment[]
  >([]);

  const [page, setPage] = useState(1);
  const pageSize = 3;

  const pageCount = Math.ceil(riskAssessmentHistory.length / pageSize);
  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  useEffect(() => {
    const alleCategories = riskAssessmentCategories.find(
      (category) => category.id === "all"
    );

    if (!alleCategories) return console.error("No categories found");

    const sortedRiskAssessments = alleCategories.riskAssessments.sort(
      (a: RiskAssessment, b: RiskAssessment) =>
        (b.update?.getTime() || b.create?.getTime() || new Date(0).getTime()) -
        (a.update?.getTime() || a.create?.getTime() || new Date(0).getTime())
    );
    setRiskAssessmentHistory(sortedRiskAssessments);
  }, [riskAssessmentCategories]);

  const handleChangePage = (event: React.ChangeEvent<any>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card>
      <CardHeader title="Letzte Aktivitäten" />
      <CardContent>
        <StyledVerticalList>
          {riskAssessmentHistory
            .slice(indexOfFirstItem, indexOfLastItem)
            .map((riskAssessment, index) => (
              <StyledVerticalListItem
                key={index}
                className="flex flex-col"
                style={{ placeItems: "flex-start" }}
              >
                <Typography variant="h6">{riskAssessment.name}</Typography>
                <Typography variant="body2">
                  {riskAssessment.update
                    ? `Aktualisiert am: ${riskAssessment.update.toLocaleString()}`
                    : `Erstellt am: ${riskAssessment.create?.toLocaleString()}`}
                </Typography>
              </StyledVerticalListItem>
            ))}
        </StyledVerticalList>
        <Pagination
          className="flex justify-end mt-2"
          count={pageCount}
          onChange={handleChangePage}
        />
      </CardContent>
    </Card>
  );
};
