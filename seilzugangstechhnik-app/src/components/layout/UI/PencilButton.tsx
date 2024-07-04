import { StyledPencilButton } from "./StyledPencilButton";

interface PencilButtonProps {
  onClick: () => void;
  sx?: any;
}

export const PencilButton = ({ onClick, sx }: PencilButtonProps) => {
  return (
    <StyledPencilButton onClick={onClick} sx={sx}>
      <img src={`/images/pencil.png`} alt="bearbeiten" width={50} height={50} />{" "}
    </StyledPencilButton>
  );
};
