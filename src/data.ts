import { Shipment } from "./types";

export const shipmentData: Shipment = {
  cpf: "86707455508",
  customerName: "Antonio Pereira dos Santos",
  customerEmail: "",
  driverName: "Marcos Aurélio Silveira",
  driverPhone: "+55 (55) 99182-4432",
  truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
  origin: "Curitiba, PR (Aguavita)",
  destination: "Iraquara, BA",
  destinationAddress: "Posto a entrada do mato preto, o lavarapido do hulk, Iraquara - BA, CEP: 46980-000",
  currentCity: "Curitiba",
  currentState: "PR",
  totalDistanceKm: 2150,
  coveredDistanceKm: 15,
  estimatedDays: 4,
  departureDate: "25/05/2026",
  cargo: [
    {
      species: "Carpa Capim",
      quantity: "20 un",
      details: "Alevinos saudáveis, oxigenação 95%"
    },
    {
      species: "Tambaçu",
      quantity: "15 un",
      details: "Tamanho juvenil, água termicamente controlada"
    },
    {
      species: "Carpas Coloridas (Nishikigoi)",
      quantity: "Lote Diversas",
      details: "Alta pureza de cores, acondicionamento especial"
    }
  ],
  route: [
    { lat: -25.4296, lng: -49.2719, city: "Curitiba", state: "PR" },
    { lat: -23.5505, lng: -46.6333, city: "São Paulo", state: "SP" },
    { lat: -19.9208, lng: -43.9378, city: "Belo Horizonte", state: "MG" },
    { lat: -12.2479, lng: -41.6146, city: "Iraquara", state: "BA" }
  ],
  statusLog: [
    {
      title: "Caminhão em Trânsito",
      description: "O transporte com os tanques ativados partiu de Curitiba e segue viagem rumo a Iraquara.",
      time: "13:00",
      date: "25/05/2026",
      completed: true,
      active: true
    },
    {
      title: "Aclimatação e Embarque",
      description: "Os peixes foram devidamente aclimatados e os sistemas de oxigenação e filtragem do caminhão-tanque operam em capacidade ideal.",
      time: "10:30",
      date: "25/05/2026",
      completed: true,
      active: false
    },
    {
      title: "Vistoria da Qualidade da Água",
      description: "Laudo técnico confirma pH e níveis de oxigênio dissolvido dentro dos parâmetros exigidos para as espécies transportadas.",
      time: "09:45",
      date: "25/05/2026",
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
