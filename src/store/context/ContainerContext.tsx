import { ReactNode } from "react";
import { MaterialProvider } from "./MaterialContext";
import { RiskAssessmentProvider } from "./RiskAssessmentContext";

interface ContainerContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({
  children,
}: ContainerContextProviderProps) => (
  <RiskAssessmentProvider>
    <MaterialProvider>{children}</MaterialProvider>
  </RiskAssessmentProvider>
);
