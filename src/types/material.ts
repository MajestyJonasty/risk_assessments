export type Material = {
  id: number;
  name: string;
  producer: string;
  type?: string;
  dateOfProduction: Date;
  serialNumber: string;
  firstUse: Date;
  condition: "very good" | "good" | "bad" | "very bad" | "exchange";
  dateOfLastCheck: Date;
  nextCheck: Date;
  signatureOfChecker: string;
};

export type MaterialCategory = {
  id: number;
  name: string;
  icon?: string;
  materials: Material[];
};
