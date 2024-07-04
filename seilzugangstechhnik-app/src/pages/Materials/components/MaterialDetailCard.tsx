import { Material } from "../../../types/material";
import {
  StyledVerticalListItem,
  StyledVerticalList,
} from "../../../components/layout/UI/StyledLists";
import { formatDate } from "../../../util/formatdate.util";
import { PencilButton } from "../../../components/layout/UI/PencilButton";

type MaterialDetailCardProps = {
  material: Material;
};

export const MaterialDetailCard = ({ material }: MaterialDetailCardProps) => {
  return (
    <StyledVerticalList>
      <div className="flex gap-2">
        <StyledVerticalListItem>
          <div className="flex flex-col">
            <span className="font-bold">Seriennummer</span>
            <span>{material.serialNumber} </span>
          </div>
        </StyledVerticalListItem>
        <StyledVerticalListItem>
          <div className="flex flex-col">
            <span className="font-bold">Herstellungsdatum</span>
            <span>{formatDate(material.dateOfProduction)}</span>
          </div>
        </StyledVerticalListItem>
      </div>

      <StyledVerticalListItem>
        <div className="flex flex-col">
          <span className="font-bold">erster Gebrauch</span>
          <span>{formatDate(material.firstUse)}</span>
        </div>
      </StyledVerticalListItem>
      {material.type && (
        <StyledVerticalListItem>
          <div className="flex flex-col">
            <span className="font-bold">Typ</span>
            <span>{material.type}</span>
          </div>
        </StyledVerticalListItem>
      )}

      <div className="flex flex-col gap-2 pt-2 border-t-2">
        <div className="flex gap-2">
          <StyledVerticalListItem>
            <div className="flex flex-col">
              <span className="font-bold">Letzte Prüfung</span>
              <span>{formatDate(material.dateOfLastCheck)}</span>
            </div>
          </StyledVerticalListItem>
          <StyledVerticalListItem>
            <div className="flex flex-col">
              <span className="font-bold">Prüfer</span>
              <span>{material.signatureOfChecker}</span>
            </div>
          </StyledVerticalListItem>
        </div>
        <StyledVerticalListItem>
          <div className="flex flex-col">
            <span className="font-bold">Nächste Prüfung</span>
            <span>{formatDate(material.nextCheck)}</span>
          </div>
        </StyledVerticalListItem>
      </div>

      <PencilButton onClick={() => {}} sx={{ placeSelf: "flex-end" }} />
    </StyledVerticalList>
  );
};
