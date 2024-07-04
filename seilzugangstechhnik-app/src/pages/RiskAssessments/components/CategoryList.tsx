import {
  StyledHorizontalList,
  StyledHorizontalListItem,
} from "../../../components/layout/UI/StyledLists";
import { RiskAssessmentCategory } from "../../../types/riskassessments";
import { IconListButton } from "../../../components/IconListButton";
import { theme } from "../../../components/layout/theme";

type CategoryListProps = {
  categories: RiskAssessmentCategory[];
  selectedCategory?: RiskAssessmentCategory;
  setSelectedCategory: (category: RiskAssessmentCategory) => void;
};

export const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  const filteredCategories = categories.filter(
    (category, index) => categories.indexOf(category) === index
  );

  return (
    <StyledHorizontalList>
      {filteredCategories.map((category) => (
        <StyledHorizontalListItem
          key={category.id}
          onClick={() => setSelectedCategory(category)}
        >
          <IconListButton
            icon={category.icon}
            name={category.name}
            style={{
              backgroundColor:
                selectedCategory?.id === category.id
                  ? theme.palette.secondary.main
                  : "transparent",
            }}
          />
        </StyledHorizontalListItem>
      ))}
    </StyledHorizontalList>
  );
};
