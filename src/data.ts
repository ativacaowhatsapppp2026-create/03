import { Shipment } from "./types";

export const shipmentsData: Shipment[] = [
  {
    cpf: "41871653800",
    customerName: "Gustavo Rodrigo Lubiatto Pinto",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Campinas, SP (Filial Aguavita)",
    destination: "Ubarana, SP",
    destinationAddress: "Bairro: emprojim, Ubarana - SP, CEP: 15225-000",
    currentCity: "Campinas",
    currentState: "SP",
    totalDistanceKm: 300,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Carpa Húngara", quantity: "200 un", details: "Valor: R$ 67,50" },
      { species: "Pangasius (Pangabr)", quantity: "30 un", details: "Valor: R$ 90,00" },
      { species: "Bagre Americano (Catfish)", quantity: "100 un", details: "Valor: R$ 22,50" },
      { species: "Bagre Jundiá Cinza", quantity: "150 un", details: "Valor: R$ 33,75" },
      { species: "Matrinxã", quantity: "200 un", details: "Valor: R$ 52,50" },
      { species: "Tambaqui", quantity: "100 un", details: "Valor: R$ 24,00" },
      { species: "Tambaçu", quantity: "100 un", details: "Valor: R$ 24,00" },
      { species: "Piau Açu", quantity: "100 un", details: "Valor: R$ 28,50" },
      { species: "Pirarara (10 - 12 cm)", quantity: "2 un", details: "Valor: R$ 58,00" }
    ],
    route: [
      { lat: -22.9099, lng: -47.0626, city: "Campinas", state: "SP" },
      { lat: -21.1633, lng: -49.7183, city: "Ubarana", state: "SP" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Campinas.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "00000000000",
    customerName: "Carlos Henrique de Souza Fagundes",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Juiz de Fora, MG (Filial Aguavita)",
    destination: "Pedro Leopoldo, MG",
    destinationAddress: "Rua pacífico Rodrigues, 278c no final do beco, Bairro fidalgo, Pedro Leopoldo - MG (Ref: antes das 2 praças)",
    currentCity: "Juiz de Fora",
    currentState: "MG",
    totalDistanceKm: 320,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Carpa Nishikigoi (4 a 7 cm)", quantity: "30 un", details: "Valor: R$ 56,10" }
    ],
    route: [
      { lat: -21.7664, lng: -43.3444, city: "Juiz de Fora", state: "MG" },
      { lat: -19.9208, lng: -43.9378, city: "Belo Horizonte", state: "MG" },
      { lat: -19.6178, lng: -44.0431, city: "Pedro Leopoldo", state: "MG" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Juiz de Fora.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "72178825672",
    customerName: "Wilson soares delgado",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Ribeirão Preto, SP (Filial Aguavita)",
    destination: "Piumhi, MG",
    destinationAddress: "Avenida José alvarenga, NM 250, Bairro fidalgo, Piumhi - MG, CEP: 37925-000",
    currentCity: "Ribeirão Preto",
    currentState: "SP",
    totalDistanceKm: 250,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Tilápia Tailandesa (4 a 6 cm)", quantity: "1.000 un", details: "Valor: R$ 187,50" },
      { species: "Trairão do Amazonas (3 a 4 cm)", quantity: "100 un", details: "Valor: R$ 187,50" },
      { species: "Carpas Coloridas (Nishikigoi) (3 a 4 cm)", quantity: "25 un", details: "Valor: R$ 46,75" },
      { species: "Pintado Amazônico (8 a 10 cm)", quantity: "15 un", details: "Valor: R$ 56,25" }
    ],
    route: [
      { lat: -21.1704, lng: -47.8103, city: "Ribeirão Preto", state: "SP" },
      { lat: -20.4631, lng: -45.9558, city: "Piumhi", state: "MG" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Ribeirão Preto.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "09621403847",
    customerName: "Vanderlei Rodrigues da Silva",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Bauru, SP (Filial Aguavita)",
    destination: "Morungaba, SP",
    destinationAddress: "Rua José Ari de Campos, nº 51, Bairro Parque das Estância, Morungaba - SP, CEP: 13267-836",
    currentCity: "Bauru",
    currentState: "SP",
    totalDistanceKm: 280,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Carpa Cabeça Grande", quantity: "200 un", details: "Valor: R$ 700,00" }
    ],
    route: [
      { lat: -22.3145, lng: -49.0587, city: "Bauru", state: "SP" },
      { lat: -22.8797, lng: -46.7917, city: "Morungaba", state: "SP" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Bauru.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "00000000000",
    customerName: "Augusto Eigi",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "São Paulo, SP (Filial Aguavita)",
    destination: "Ubirajara, SP",
    destinationAddress: "Praça Porcino Antônio de Lima, nº 530, Em frente à Prefeitura, Ubirajara - SP, CEP: 17440-000",
    currentCity: "São Paulo",
    currentState: "SP",
    totalDistanceKm: 350,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Trairão do Amazonas", quantity: "100 un", details: "Valor: R$ 187,50" },
      { species: "Tambaqui", quantity: "100 un", details: "Valor: R$ 24,00" },
      { species: "Pacu", quantity: "140 un", details: "Valor: R$ 33,60" },
      { species: "Lambari Rosa", quantity: "100 un", details: "Valor: R$ 18,75" }
    ],
    route: [
      { lat: -23.5505, lng: -46.6333, city: "São Paulo", state: "SP" },
      { lat: -22.5205, lng: -49.6386, city: "Ubirajara", state: "SP" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial São Paulo.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "00000000000",
    customerName: "Ezequiel de Matos Gonçalves",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Franca, SP (Filial Aguavita)",
    destination: "Campina Verde, MG",
    destinationAddress: "Rua dos Manacás, nº 312, Bairro Nova Campina Verde, Campina Verde - MG, CEP: 38270-000",
    currentCity: "Franca",
    currentState: "SP",
    totalDistanceKm: 280,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Tambaqui (3 a 4 cm)", quantity: "3.000 un", details: "Valor: R$ 720,00" }
    ],
    route: [
      { lat: -20.5386, lng: -47.4009, city: "Franca", state: "SP" },
      { lat: -19.5358, lng: -49.4864, city: "Campina Verde", state: "MG" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Franca.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "27511031897",
    customerName: "Uander Júnior",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Campinas, SP (Filial Aguavita)",
    destination: "Pindorama, SP",
    destinationAddress: "Rua Santa Terezinha, nº 447, Distrito de Roberto, Pindorama - SP, CEP: 15835-000",
    currentCity: "Campinas",
    currentState: "SP",
    totalDistanceKm: 320,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "26/05/2026",
    cargo: [
      { species: "Tambaçu", quantity: "500 un", details: "Valor: R$ 120,00" },
      { species: "Matrinxã", quantity: "500 un", details: "Valor: R$ 131,25" },
      { species: "Trairão do Amazonas", quantity: "100 un", details: "Valor: R$ 187,50" }
    ],
    route: [
      { lat: -22.9099, lng: -47.0626, city: "Campinas", state: "SP" },
      { lat: -21.1869, lng: -48.9056, city: "Pindorama", state: "SP" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Campinas.",
        time: "13:00",
        date: "26/05/2026",
        completed: true,
        active: true
      }
    ]
  },
  {
    cpf: "00759253200",
    customerName: "Lincoln Simões de Mello Junior",
    customerEmail: "",
    driverName: "Marcos Aurélio Silveira",
    driverPhone: "+55 (55) 99182-4432",
    truckPlate: "AGU-4D89 (Volvo FH 460 Tanque)",
    origin: "Itacoatiara, AM (Filial Aguavita)",
    destination: "Manaus, AM",
    destinationAddress: "Rua Nilo Geber, nº 90, Bairro Coroado, Manaus - AM, CEP: 69082-550 (Ref: Bar do Trica Ferro)",
    currentCity: "Itacoatiara",
    currentState: "AM",
    totalDistanceKm: 270,
    coveredDistanceKm: 15,
    estimatedDays: 1,
    departureDate: "08/06/2026",
    cargo: [
      { species: "Kinguio 6 cm", quantity: "25 un", details: "Valor: R$ 75,00" },
      { species: "Telescópio 6 cm", quantity: "22 un", details: "Valor: R$ 66,00" },
      { species: "Pirarara", quantity: "2 un", details: "Valor: R$ 60,00" }
    ],
    route: [
      { lat: -3.1431, lng: -58.4442, city: "Itacoatiara", state: "AM" },
      { lat: -3.1190, lng: -60.0217, city: "Manaus", state: "AM" }
    ],
    statusLog: [
      {
        title: "Caminhão em Trânsito",
        description: "O transporte partiu da Filial Itacoatiara.",
        time: "13:00",
        date: "08/06/2026",
        completed: true,
        active: true
      }
    ]
  }
];

export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function formatCPF(cpf: string): string {
  const cleaned = cleanCPF(cpf);
  if (cleaned.length !== 11) return cpf;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
}
