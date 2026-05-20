export interface Vehicle {
  model: string;
  brand: string;
  color: string;
  plate: string;
  year: number;
  condition: string;
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
  driverName: string;
  driverPhone: string;
  truckPlate: string;
  origin: string;
  destination: string;
  destinationAddress: string;
  currentCity: string;
  currentState: string;
  vehicles: Vehicle[];
  route: Waypoint[];
  statusLog: TrackingStatus[];
  totalDistanceKm: number;
  coveredDistanceKm: number;
  estimatedDays: number;
  departureDate: string;
}
