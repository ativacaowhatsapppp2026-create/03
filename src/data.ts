import { Shipment } from "./types";

export const shipmentData: Shipment = {
  cpf: "42751301894",
  customerName: "Pedro Henrique de Oliveira Cunha",
  customerEmail: "pedrohenrique@email.com",
  driverName: "Marcos Aurélio Silveira",
  driverPhone: "+55 (55) 99182-4432",
  truckPlate: "CEG-4D89 (Scania R 450)",
  origin: "Rio Grande do Sul",
  destination: "Poá, SP",
  destinationAddress: "Rua Marquês do Herval, número 333, Bairro Jardim Medina, Poá - SP, CEP: 08556-400",
  currentCity: "Porto Alegre",
  currentState: "RS",
  totalDistanceKm: 1150,
  coveredDistanceKm: 15,
  estimatedDays: 4,
  departureDate: "23/05/2026",
  vehicles: [
    {
      model: "Astra",
      brand: "Chevrolet",
      color: "Prata",
      plate: "XXX0000",
      year: 2010,
      condition: "Excelente"
    }
  ],
  route: [
    { lat: -30.0346, lng: -51.2177, city: "Porto Alegre", state: "RS" },
    { lat: -25.4296, lng: -49.2719, city: "Curitiba", state: "PR" },
    { lat: -23.5505, lng: -46.6333, city: "São Paulo", state: "SP" },
    { lat: -23.5284, lng: -46.3458, city: "Poá", state: "SP" }
  ],
  statusLog: [
    {
      title: "Cegonha em Trânsito",
      description: "A cegonha está saindo do Rio Grande do Sul e a caminho do destino em São Paulo.",
      time: "13:00",
      date: "23/05/2026",
      completed: true,
      active: true
    },
    {
      title: "Carga Pronta para Viagem",
      description: "O veículo integrado ao manifesto de carga foi devidamente fixado e testado contra vibração. Amarração concluída.",
      time: "10:30",
      date: "23/05/2026",
      completed: true,
      active: false
    },
    {
      title: "Coleta e Inspeção de Entrada",
      description: "Vistoria veicular detalhada realizada no Chevrolet Astra no Rio Grande do Sul com fotos anexadas ao laudo técnico de inspeção.",
      time: "09:45",
      date: "23/05/2026",
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
