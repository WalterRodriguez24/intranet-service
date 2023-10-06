export type Position = "Auxiliar de amamacén" | "Conductor";

export const POSITIONS: Position[] = ["Auxiliar de amamacén", "Conductor"];

type Apartment =
  | "Transporte de carga"
  | "Mensajería"
  | "Documentos valorados"
  | "Servicios especiales"
  | "Servicio Inhouse"
  | "Servicio aéreo";

export const APARTMENTS: Apartment[] = [
  "Transporte de carga",
  "Mensajería",
  "Documentos valorados",
  "Servicios especiales",
  "Servicio Inhouse",
  "Servicio aéreo",
];

export type Employee = {
  id: string;
  name: string;
  apartment: Apartment;
  position: Position;
  direction: string;
  latitude: number;
  longitude: number;
  evaluation: number;
  salary: number;
  age: number;
  phone: string;
  email: string;
};
