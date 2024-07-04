import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import {
  RiskAssessment,
  RiskAssessmentCategory,
} from "../../../types/riskassessments";
import { useState } from "react";
import {
  StyledVerticalList,
  StyledVerticalListItem,
} from "../../../components/layout/UI/StyledLists";
import { theme } from "../../../components/layout/theme";
import { CategoryList } from "./CategoryList";

type RiskAssessmentListProps = {
  riskAssessments: RiskAssessment[];
  selectedRiskAssessment?: RiskAssessment;
  setRiskAssessment: (riskAssessment: RiskAssessment) => void;
  categories: RiskAssessmentCategory[];
  selectedCategory?: RiskAssessmentCategory;
  setSelectedCategory: (category: RiskAssessmentCategory) => void;
  setOpen: (open: boolean) => void;
};

export const RiskAssessmentList = ({
  riskAssessments,
  selectedRiskAssessment,
  setRiskAssessment,
  categories,
  selectedCategory,
  setSelectedCategory,
  setOpen,
}: RiskAssessmentListProps) => {
  const [page, setPage] = useState(1);

  const pageSize = 3;

  const pageCount = Math.ceil(riskAssessments.length / pageSize);
  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = riskAssessments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleClickCategory = (category: RiskAssessmentCategory) => {
    setSelectedCategory(category);
    localStorage.setItem("riskAssessmentCategoryId", category.id.toString());

    setPage(1);
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h2">Ordner</Typography>} />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <CategoryList
          categories={categories ?? []}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleClickCategory}
        />

        <Card>
          <CardHeader
            title={
              <div className="flex items-center justify-between">
                <Typography variant="h2">{selectedCategory?.name}</Typography>
                <div className="flex flex-row gap-4">
                  {/* <SearchInput /> */}
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
            <StyledVerticalList className="flex flex-col gap-4">
              {currentItems.reverse().map((assessment) => (
                <StyledVerticalListItem
                  key={assessment.id}
                  onClick={() => setRiskAssessment(assessment)}
                  sx={{
                    backgroundColor:
                      selectedRiskAssessment?.id === assessment.id
                        ? theme.palette.secondary.main
                        : "transparent",
                  }}
                >
                  <div>
                    <Typography variant="h3">{assessment.name}</Typography>

                    {assessment?.create && (
                      <span>
                        Erstellt: {assessment.create.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </StyledVerticalListItem>
              ))}
              <Pagination
                className="mt-2 place-self-end"
                count={pageCount}
                onChange={() => handlePageChange(page)}
              />
            </StyledVerticalList>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
