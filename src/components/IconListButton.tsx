import { Typography } from "@mui/material";
import { StyledIconListButton } from "./layout/UI/StyledIconListButton";

interface IconListButtonProps {
  icon?: string;
  name: string;
  style?: React.CSSProperties;
}

export const IconListButton = ({ icon, name, style }: IconListButtonProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <StyledIconListButton className="flex flex-col" sx={style}>
        <img src={icon} alt={name} width={50} height={50} />
      </StyledIconListButton>
      <Typography variant="subtitle2">{name}</Typography>
    </div>
  );
};
