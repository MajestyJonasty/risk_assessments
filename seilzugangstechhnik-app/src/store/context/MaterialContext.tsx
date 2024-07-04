import { createContext, useContext, useState, ReactNode } from "react";
import { Material, MaterialCategory } from "../../types/material";

interface MaterialContextType {
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  materialCategories: MaterialCategory[];
  setMaterialCategories: (materialCategories: MaterialCategory[]) => void;
}

const MaterialContext = createContext<MaterialContextType | undefined>(
  undefined
);

interface MaterialProviderProps {
  children: ReactNode;
}

export const MaterialProvider = ({ children }: MaterialProviderProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialCategories, setMaterialCategories] = useState<
    MaterialCategory[]
  >([]);

  return (
    <MaterialContext.Provider
      value={{
        materials,
        setMaterials,
        materialCategories,
        setMaterialCategories,
      }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterials = (): MaterialContextType => {
  const context = useContext(MaterialContext);
  if (!context) {
    throw new Error("useMaterials must be used within a MaterialProvider");
  }
  return context;
};
