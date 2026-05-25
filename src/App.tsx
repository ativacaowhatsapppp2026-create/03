import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Truck, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Compass, 
  Clock, 
  TrendingUp, 
  FileText, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Calendar,
  X,
  Map as MapIcon,
  HelpCircle,
  QrCode
} from "lucide-react";
import { shipmentData, cleanCPF, formatCPF } from "./data";
import TrackingMap from "./components/TrackingMap";
import { CargoItem } from "./types";

export default function App() {
  // Navigation & Search State
  const [cpfInput, setCpfInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [activeShipment, setActiveShipment] = useState<typeof shipmentData | null>(null);

  // Simulation State
  const [progress, setProgress] = useState(2.3); // Start at ~2.3% (Acabou de sair de Uruguaiana)
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Modal inspection checklists
  const [selectedInspectionVehicle, setSelectedInspectionVehicle] = useState<CargoItem | null>(null);

  // Toast alert
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle auto-simulation loop
  useEffect(() => {
    if (isSimulating) {
      simulationIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            triggerToast("🎉 O caminhão chegou ao destino final em Iraquara, BA!");
            return 100;
          }
          // Increment speed
          return Math.min(prev + 0.35, 100);
        });
      }, 100);
    } else {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    }

    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [isSimulating]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // Human-readable CPF formatter during typing
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setSearchError("");
    if (raw.length <= 11) {
      setCpfInput(raw);
    }
  };

  // Formatted display helper
  const getCpfDisplayValue = () => {
    if (!cpfInput) return "";
    const raw = cleanCPF(cpfInput);
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
  };

  // Perform search query
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanCPF(cpfInput);

    if (cleaned === shipmentData.cpf) {
      setActiveShipment(shipmentData);
      setProgress(2.5); // Reset back to Uruguaiana departure on load
      setIsSimulating(false);
      setSearchError("");
      triggerToast("📡 Conexão GPS Estabelecida! Caminhão Localizado.");
    } else if (cleaned.length === 0) {
      setSearchError("Por favor, preencha o número de CPF do cliente.");
    } else {
      setSearchError("CPF não localizado no manifesto de transporte ativo.");
    }
  };

  // Calculate dynamic telemetry based on progress
  const totalDist = shipmentData.totalDistanceKm;
  const currentCoveredDist = Math.max(
    45, 
    Math.round((progress / 100) * totalDist)
  );
  const currentRemainingDist = Math.max(0, totalDist - currentCoveredDist);
  
  // Speed approximation: 80 km/h average
  const hoursRemaining = Math.max(0, Math.round(currentRemainingDist / 80));
  const daysRemaining = (hoursRemaining / 24).toFixed(1);

  // Dynamic Waypoint finding based on progress index
  const routePoints = shipmentData.route;
  const currentWaypointIndex = Math.min(
    Math.floor((progress / 100) * routePoints.length),
    routePoints.length - 1
  );
  const currentPassingCity = routePoints[currentWaypointIndex]?.city || activeShipment.currentCity;
  const currentPassingState = routePoints[currentWaypointIndex]?.state || activeShipment.currentState;

  // Dynamic active status checkpoint calculation
  const getTimelineStatus = (pct: number) => {
    if (pct < 5) return { label: "Saída Recente", color: "text-blue-700 bg-blue-50 border-blue-250" };
    if (pct < 40) return { label: "Em Trânsito (Sentido MG)", color: "text-blue-600 bg-blue-50/50 border-blue-100" };
    if (pct < 70) return { label: "Cruzando Divisa Estadual", color: "text-indigo-700 bg-indigo-50 border-indigo-150" };
    if (pct < 98) return { label: "Próximo ao Destino", color: "text-purple-700 bg-purple-50 border-purple-150" };
    return { label: "Entrega Concluída com Sucesso", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  };

  const journeyStatus = getTimelineStatus(progress);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      
      {/* GLOBAL TOAST BANNER */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/95 text-slate-800 border border-blue-200 shadow-lg px-5 py-3 rounded-lg flex items-center gap-3 backdrop-blur-md">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></div>
              <span className="text-xs font-bold tracking-wide font-display text-blue-900">{toastMessage}</span>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION HEADBAR */}
      <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-700 flex items-center justify-center shadow-sm">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-lg sm:text-xl block text-cyan-900 uppercase">
                AGUATRANS <span className="font-light text-cyan-600">TRANS LOGÍSTICA</span>
              </span>
              <span className="text-[9px] uppercase font-mono font-bold tracking-[0.25em] text-slate-400 block -mt-1">
                Transporte Seguro de Carga Viva
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeShipment && (
              <button
                onClick={() => {
                  setActiveShipment(null);
                  setIsSimulating(false);
                  setProgress(2.5);
                }}
                className="text-xs font-bold font-display px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
              >
                Nova Consulta
              </button>
            )}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-200">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold text-slate-500">Canal Seguro SSL</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT GATEWAY CONTAINER */}
      <main className="flex-1 flex flex-col">
        {!activeShipment ? (
          /* ========================================================= */
          /* SCREEN 1: LANDING & TRACKING CONSULTATION PORTAL         */
          /* ========================================================= */
          <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-12 sm:py-20 flex flex-col justify-center items-center">
            
            {/* Visual branding hero panel */}
            <div className="text-center mb-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest font-mono">Plataforma Homologada</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 mb-4">
                Localize sua <span className="text-cyan-600 uppercase">Carga Viva em Trânsito</span>
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Acompanhe o trajeto detalhado e os parâmetros da água da carreta encarregada do transporte dos animais, com atualizações em tempo real.
              </p>
            </div>

            {/* Main tracking form container */}
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600"></div>
              
              <h2 className="text-base font-display font-bold text-slate-800 mb-5 flex items-center gap-2">
                <Compass className="w-4.5 h-4.5 text-blue-600" />
                Rastreamento por CPF do Comprador
              </h2>

              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Digite o CPF do Cliente
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-slate-900 font-mono tracking-wide placeholder:text-slate-400 font-medium"
                      placeholder="000.000.000-00"
                      value={getCpfDisplayValue()}
                      onChange={handleCpfChange}
                    />
                  </div>
                </div>

                {searchError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded flex items-start gap-2 text-xs text-red-700 leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{searchError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-display font-bold py-3 px-4 rounded shadow-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold tracking-tight"
                >
                  <Compass className="w-4.5 h-4.5" />
                  Rastrear Caminhão
                </button>
              </form>
            </div>

            {/* Quick trust metrics panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 mt-12 w-full max-w-4xl text-center">
              <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="font-display font-bold text-lg text-slate-800">100% Homologado</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono font-bold tracking-wider">Certificações de Carga</div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="font-display font-bold text-lg text-slate-800">Sinal Satelital</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono font-bold tracking-wider">Atualização a cada 30s</div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="font-display font-bold text-lg text-slate-800">Vistoria Eletrônica</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono font-bold tracking-wider">Laudos com Fotos Digitais</div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* SCREEN 2: ACTIVE CARRIER TRACKING SHIPMENT INTERFACE       */
          /* ========================================================= */
          <div className="flex-1 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* TOP DISCLOSURE BANNER */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono tracking-widest font-extrabold text-blue-700 bg-blue-50 py-1 px-2.5 rounded border border-blue-200 uppercase">
                      Manifesto Ativo #{activeShipment.cpf.slice(0,6)}-AGUA
                    </span>
                    <span className={`text-[10px] font-bold py-1 px-2.5 rounded border tracking-wider font-display uppercase ${journeyStatus.color}`}>
                      {journeyStatus.label}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900 mt-1">
                    Destinatário: <span className="text-blue-900 font-bold">{activeShipment.customerName}</span>
                  </h2>
                  {activeShipment.customerEmail && (
                    <p className="text-xs text-slate-500 font-medium">
                      Contato: <span className="text-slate-700 font-bold font-mono">{activeShipment.customerEmail}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    Destino: <span className="font-bold text-slate-800">{activeShipment.destination}</span> ({activeShipment.destinationAddress})
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-3 md:pt-0 md:border-t-0 font-display">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block leading-none font-bold">Previsão Estimada</span>
                    <span className="text-lg font-bold text-blue-600 mt-0.5 block">
                      {progress >= 100 ? "🚚 Entregue!" : "Até 22/05/2026"}
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">
                      {progress >= 100 ? "Viagem concluída" : "Prazo Limite de Entrega"}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* CORE DASHBOARD GRID PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* COLUMN 1: LIVE INTERACTIVE MAP & SHIPMENT SIMULATION (7 of 12) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Map Box */}
                  <div className="h-[420px] lg:h-[480px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                    <TrackingMap route={activeShipment.route} progress={progress} />
                  </div>

                  {/* Shipment Simulation Controls & Telemetry Gauge */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-mono tracking-wider text-slate-400 font-bold uppercase">
                          Painel de Simulação GPS
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          Acompanhe o trajeto do caminhão em tempo real no painel de simulação.
                        </p>
                      </div>
                      <div className="px-2 py-1 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? "animate-ping bg-blue-400" : "bg-orange-400"}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulating ? "bg-blue-500" : "bg-orange-500"}`}></span>
                        </span>
                        <span className="text-[9px] uppercase font-mono font-extrabold text-slate-600">
                          {isSimulating ? "Sinal em Movimento" : "Pausado"}
                        </span>
                      </div>
                    </div>

                    {/* Progress Slider Track */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-medium">
                        <span className="text-slate-400">{activeShipment.origin}</span>
                        <span className="text-blue-600 font-bold">Progresso total: {progress.toFixed(1)}%</span>
                        <span className="text-slate-400">{activeShipment.destination}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="2.5"
                          max="100"
                          step="0.1"
                          value={progress}
                          onChange={(e) => setProgress(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Action buttons list */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded text-xs font-display font-bold transition-all cursor-pointer ${
                          isSimulating 
                            ? "bg-amber-600/10 border border-amber-500/30 text-amber-700 hover:bg-amber-100" 
                            : "bg-blue-600 hover:bg-blue-700 text-white border border-transparent"
                        }`}
                      >
                        {isSimulating ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            Pausar Rota
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            Locomoção Automática
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsSimulating(false);
                          setProgress(2.5);
                          triggerToast(`🚚 Recuado para: Acabando de sair de ${activeShipment.origin}.`);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 py-2.5 px-3 rounded text-xs font-display font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        title="Voltar ao ponto inicial original"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reiniciar
                      </button>

                      <button
                        onClick={() => {
                          setIsSimulating(false);
                          setProgress(100);
                          triggerToast("🏁 Teletransportado com segurança ao destino final!");
                        }}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 py-2.5 px-3 rounded text-xs font-display font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Finalizar Trajeto
                      </button>
                    </div>

                    {/* Live passing location readouts */}
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded space-y-3 font-display">
                      <div className="flex items-center justify-between text-xs border-b border-slate-200/80 pb-2">
                        <span className="text-slate-400 font-medium">Sinal Recebido de:</span>
                        <span className="text-blue-900 font-bold flex items-center gap-1 uppercase font-mono text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          {currentPassingCity}, {currentPassingState}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Total Percorrido</span>
                          <span className="text-base font-bold text-blue-600 font-mono">
                            {currentCoveredDist} <span className="text-xs">km</span>
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Distância Restante</span>
                          <span className="text-base font-bold text-slate-700 font-mono">
                            {currentRemainingDist} <span className="text-xs">km</span>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* COLUMN 2: ACTIVE SHIPMENT TELEMETRY, TIMELINE LOGS AND LOAD VEHICLES (5 of 12) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Status telemetry telemetry overview card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
                    <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Status do Frete e Carga
                    </h3>

                    {/* Simple summary strip data */}
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">Placa do Caminhão</span>
                        <span className="text-slate-800 font-extrabold">{activeShipment.truckPlate.split(" ")[0]}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">Configuração</span>
                        <span className="text-slate-800 font-extrabold">Tanque com Oxigenação</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                          <User className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block font-bold">Motorista Escort</span>
                          <span className="text-xs font-bold text-slate-800 block">{activeShipment.driverName}</span>
                          <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-mono tracking-wider font-semibold">Pleno Credenciado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transported Vehicles Panel with detailed digital inspection launches */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-600" />
                        Carga Viva Embarcada
                      </h3>
                      <span className="text-xs font-mono font-extrabold text-cyan-700 bg-cyan-50 border border-cyan-150 px-2 py-0.5 rounded">
                        {activeShipment.cargo.length} Espécies
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {activeShipment.cargo.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 relative overflow-hidden group/card hover:border-cyan-400 transition"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[9px] font-mono uppercase bg-white text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-bold mb-1 inline-block">
                                Animais Vivos
                              </span>
                              <h4 className="text-xs font-display font-bold text-slate-900 group-hover/card:text-cyan-700 transition">
                                {item.species}
                              </h4>
                              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                                Quantidade: <span className="font-bold text-slate-700">{item.quantity}</span>
                              </p>
                            </div>
                            
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 font-mono block font-bold">Detalhes</span>
                              <span className="text-[9px] font-bold text-slate-700 font-mono max-w-[120px] inline-block">{item.details}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                            <span className="text-[9px] text-emerald-700 font-mono bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded flex items-center gap-1 leading-none py-1 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              Vistoria Ok
                            </span>

                            <button
                              onClick={() => setSelectedInspectionVehicle(item)}
                              className="text-[10px] font-display font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition pr-1 pointer-events-auto cursor-pointer"
                            >
                              Ver Laudo Digital
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Logs Checkpoints */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-sm">
                    <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Histórico e Rastreamento de Embarque
                    </h3>

                    <div className="relative border-l border-slate-200 ml-3 pl-5 space-y-6 text-xs antialiased leading-relaxed">
                      {activeShipment.statusLog.map((log, index) => {
                        // Dynamically determine completion state based on current progress slider!
                        // "Cegonha em Trânsito" is index 0. Always complete once we start.
                        // However, let's make a beautiful progress-based checklist:
                        // - "Cegonha em Trânsito" (idx 0): visible, completed as long as progress >= 2.5
                        // - "Carga Pronta para Viagem" (idx 1): completed as progress >= 2.5
                        // - "Coleta e Inspeção de Entrada" (idx 2): completed as progress >= 2.5
                        // - "Contrato e Manifesto Liberados" (idx 3): completed as progress >= 2.5
                        // Wait, we can add dynamic milestones to make the log live!
                        // Let's add custom tracking milestone checks:
                        const isCheckpointActive = index === 0 && progress < 100;

                        return (
                          <div key={index} className="relative group">
                            {/* Point Bullet marker */}
                            <span className={`absolute -left-[26px] top-1 w-3 h-3 rounded-full border border-white flex items-center justify-center transition-all ${
                              isCheckpointActive 
                                ? "bg-blue-600 scale-125 shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                                : "bg-emerald-600"
                            }`}>
                              {isCheckpointActive && (
                                <span className="absolute inset-0.5 bg-white rounded-full animate-ping"></span>
                              )}
                            </span>

                            <div className="space-y-1">
                              <span className="text-[9px] font-mono font-bold text-slate-400 flex items-center gap-2">
                                <span>{log.date} - {log.time}</span>
                                {isCheckpointActive ? (
                                  <span className="text-[8px] text-blue-700 bg-blue-50 border border-blue-200 px-1 rounded font-display font-bold animate-pulse uppercase shadow-sm">
                                    MONITORADO AGORA
                                  </span>
                                ) : (
                                  <span className="text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-150 px-1 rounded uppercase font-bold">Concluído</span>
                                )}
                              </span>
                              
                              <h4 className={`text-slate-800 font-bold font-display ${isCheckpointActive ? "text-blue-600" : ""}`}>
                                {log.title}
                              </h4>
                              
                              <p className="text-slate-500 font-medium text-[11px] leading-relaxed">
                                {log.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add a dynamic milestone if transport complete (100% progress) */}
                      {progress >= 100 && (
                        <div className="relative group animate-fade-in">
                          <span className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-emerald-600 border border-white flex items-center justify-center">
                            <span className="absolute -inset-1 bg-emerald-500/30 rounded-full animate-ping"></span>
                          </span>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                              <span>Entrega Realizada</span>
                              <span className="text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-150 px-1.5 py-0.5 rounded font-display font-bold uppercase">Finalizado</span>
                            </span>
                            <h4 className="text-emerald-700 font-black font-display">
                              Carga Entregue no Endereço Final
                            </h4>
                            <p className="text-slate-600 font-medium text-[11px]">
                              O caminhão estacionou com segurança em seu destino: <span className="text-amber-800 font-bold bg-amber-50 border border-amber-250 px-1.5 py-0.5 rounded">{activeShipment.destinationAddress}</span>. A carga foi inspecionada, os peixes descarregados saudáveis, e o documento foi integralmente assinado pelo comprador.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        )}
      </main>

      {/* DETAILED DIGITAL INSPECTION MODAL */}
      <AnimatePresence>
        {selectedInspectionVehicle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 relative shadow-lg overflow-hidden text-slate-800"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-blue-600"></div>
              
              <button
                onClick={() => setSelectedInspectionVehicle(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5">
                <span className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-extrabold">
                  Relatório Eletrônico de Vistoria
                </span>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-1.5 animate-fadeIn">
                  {selectedInspectionVehicle.species}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  Quantidade: {selectedInspectionVehicle.quantity} | {selectedInspectionVehicle.details}
                </p>
              </div>

              {/* Checklist technical details */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-2">
                    Item Checklist Técnico (Terminal de {activeShipment.origin.split(',')[0]})
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px] leading-relaxed">
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Nível de Oxigênio (95%)
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Temperatura da Água (18°C)
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      pH Balanceado (7.2)
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Sistemas de Filtragem Ativos
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Comportamento Saudável
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Aclimatização Concluída
                    </div>
                  </div>
                </div>

                {/* Vistoriador Credentials */}
                <div className="p-3.5 bg-slate-50 rounded-lg text-slate-600 text-[11px] flex items-center gap-3 border border-slate-200">
                  <QrCode className="w-10 h-10 text-slate-400 shrink-0 border border-slate-200 p-1 rounded bg-white shadow-sm" />
                  <div>
                    <span className="text-slate-800 font-bold font-display block leading-none">Vistoriador Responsável:</span>
                    <span className="text-slate-500 text-[10px] block mt-1 font-medium">José Roberto Camargo</span>
                    <span className="text-slate-400 block text-[9px] font-mono uppercase mt-0.5 font-semibold">CREA-RS 44.119-D | Assinado Digitalmente</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedInspectionVehicle(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-display font-semibold text-xs px-5 py-2.5 rounded cursor-pointer shadow-sm transition"
                >
                  Concluir Visualização
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER METRICS AND TRADEMARK */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs text-slate-400 font-medium font-sans">
            &copy; 2026 <span className="text-slate-700 font-bold font-display uppercase">AGUATRANS TRANS LOGISTICA</span>. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            <span className="hover:text-blue-600 transition duration-150 cursor-pointer">Privacidade</span>
            <span>&bull;</span>
            <span className="hover:text-blue-600 transition duration-150 cursor-pointer">Contratos de Trânsito</span>
            <span>&bull;</span>
            <span className="text-slate-500">SAC: 0800 500 2342</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
