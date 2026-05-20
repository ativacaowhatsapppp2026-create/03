import { Shipment } from "./types";

export const shipmentData: Shipment = {
  cpf: "70600759607",
  customerName: "Welvis Moreira de Souza",
  customerEmail: "welvisevi@gmail.com",
  driverName: "Marcos Aurélio Silveira",
  driverPhone: "+55 (55) 99182-4432",
  truckPlate: "CEG-4D89 (Scania R 450)",
  origin: "Uruguaiana, RS",
  destination: "Ibiaí, MG",
  destinationAddress: "Rua Nove, Casa 20",
  currentCity: "Curitiba",
  currentState: "PR",
  totalDistanceKm: 2040,
  coveredDistanceKm: 867, // near Curitiba
  estimatedDays: 1,
  departureDate: "19/05/2026",
  vehicles: [
    {
      model: "VW Gol 1.6 (Mod. 2011)",
      brand: "Volkswagen",
      color: "Prata",
      plate: "ASR9525",
      year: 2010,
      condition: "Excelente (Ano Fab. 2010 / Mod. 2011)"
    }
  ],
  route: [
    { lat: -29.7547, lng: -57.0863, city: "Uruguaiana", state: "RS" },
    { lat: -29.3524, lng: -56.5512, city: "Itaqui", state: "RS" },
    { lat: -28.6599, lng: -56.0028, city: "São Borja", state: "RS" },
    { lat: -28.2586, lng: -52.4089, city: "Passo Fundo", state: "RS" },
    { lat: -27.2423, lng: -52.0245, city: "Concórdia", state: "SC" },
    { lat: -26.2443, lng: -49.3855, city: "São Bento do Sul", state: "SC" },
    { lat: -25.4296, lng: -49.2719, city: "Curitiba", state: "PR" },
    { lat: -24.4875, lng: -47.8436, city: "Registro", state: "SP" },
    { lat: -23.5505, lng: -46.6333, city: "São Paulo", state: "SP" },
    { lat: -22.9056, lng: -47.0608, city: "Campinas", state: "SP" },
    { lat: -21.1775, lng: -47.8103, city: "Ribeirão Preto", state: "SP" },
    { lat: -19.7476, lng: -47.9392, city: "Uberaba", state: "MG" },
    { lat: -18.5744, lng: -46.5181, city: "Patos de Minas", state: "MG" },
    { lat: -17.2023, lng: -44.9254, city: "Pirapora", state: "MG" },
    { lat: -16.2572, lng: -44.9122, city: "Ibiaí", state: "MG" }
  ],
  statusLog: [
    {
      title: "Cegonha em Trânsito",
      description: "A carreta cegonha cruzou a fronteira estadual e se aproxima de Curitiba - PR, em trânsito para Ibiaí - MG. Viagem monitorada via satélite.",
      time: "14:30",
      date: "20/05/2026",
      completed: true,
      active: true
    },
    {
      title: "Carga Pronta para Viagem",
      description: "O veículo integrado ao manifesto de carga foi devidamente fixado e testado contra vibração. Amarração concluída.",
      time: "18:30",
      date: "19/05/2026",
      completed: true,
      active: false
    },
    {
      title: "Coleta e Inspeção de Entrada",
      description: "Vistoria veicular detalhada realizada no VW Gol 1.6 prata em Uruguaiana com fotos anexadas ao laudo técnico de inspeção.",
      time: "15:45",
      date: "19/05/2026",
      completed: true,
      active: false
    },
    {
      title: "Contrato e Manifesto Liberados",
      description: "Emissão de CT-e (Conhecimento de Transporte Eletrônico) concluída e validada junto aos postos fiscais da Receita Estadual.",
      time: "10:12",
      date: "19/05/2026",
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
