export interface CargoItem {
  species: string;
  quantity: string;
  details: string;
}

export interface Waypoint {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface TrackingStatus {
  title: string;
  description: string;
  time: string;
  date: string;
  completed: boolean;
  active: boolean;
}

export interface Shipment {
  cpf: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  driverName: string;
  driverPhone: string;
  truckPlate: string;
  origin: string;
  destination: string;
  destinationAddress: string;
  currentCity: string;
  currentState: string;
  cargo: CargoItem[];
  route: Waypoint[];
  statusLog: TrackingStatus[];
  totalDistanceKm: number;
  coveredDistanceKm: number;
  estimatedDays: number;
  departureDate: string;
}
