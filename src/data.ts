import { Shipment } from "./types";

export const shipmentData: Shipment = {
  cpf: "01944334041",
  customerName: "Carolina Fantinel Veloso",
  customerEmail: "caralceloso_fisio@yahoo.com.br",
  driverName: "Marcos Aurélio Silveira",
  driverPhone: "+55 (55) 99182-4432",
  truckPlate: "CEG-4D89 (Scania R 450)",
  origin: "Osasco, SP",
  destination: "Santa Maria, RS",
  destinationAddress: "Centro rua felipe de oliveira numero 44 401 cep 97015250",
  currentCity: "Osasco",
  currentState: "SP",
  totalDistanceKm: 1040,
  coveredDistanceKm: 10,
  estimatedDays: 3,
  departureDate: "21/05/2026",
  vehicles: [
    {
      model: "VW Nivus HL TSI",
      brand: "Volkswagen",
      color: "Prata",
      plate: "TLR9F16",
      year: 2024,
      condition: "Excelente"
    }
  ],
  route: [
    { lat: -23.5329, lng: -46.7917, city: "Osasco", state: "SP" },
    { lat: -25.4296, lng: -49.2719, city: "Curitiba", state: "PR" },
    { lat: -28.2586, lng: -52.4089, city: "Passo Fundo", state: "RS" },
    { lat: -29.6842, lng: -53.8069, city: "Santa Maria", state: "RS" }
  ],
  statusLog: [
    {
      title: "Cegonha em Trânsito",
      description: "A cegonha está saindo de Osasco e a caminho do destino.",
      time: "13:00",
      date: "21/05/2026",
      completed: true,
      active: true
    },
    {
      title: "Carga Pronta para Viagem",
      description: "O veículo integrado ao manifesto de carga foi devidamente fixado e testado contra vibração. Amarração concluída.",
      time: "10:30",
      date: "21/05/2026",
      completed: true,
      active: false
    },
    {
      title: "Coleta e Inspeção de Entrada",
      description: "Vistoria veicular detalhada realizada no VW Nivus em Osasco com fotos anexadas ao laudo técnico de inspeção.",
      time: "09:45",
      date: "21/05/2026",
      completed: true,
      active: false
    }
  ]
};

export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function formatCPF(cpf: string): string {
  const cleaned = cleanCPF(cpf);
  if (cleaned.length !== 11) return cpf;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
}
