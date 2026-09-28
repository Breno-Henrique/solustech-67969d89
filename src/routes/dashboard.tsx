import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sun,
  Zap,
  BellRing,
  ChevronLeft,
  Home,
  Lightbulb,
  Tv,
  Refrigerator,
  AirVent,
  WashingMachine,
  Microwave,
  Plug,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Power,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — SolusTech" },
      { name: "description", content: "Veja o consumo da sua casa em tempo real, cômodo por cômodo." },
      { property: "og:title", content: "Painel — SolusTech" },
      { property: "og:description", content: "Consumo de energia ao vivo, cômodo por cômodo." },
    ],
  }),
  component: DashboardPage,
});

// ---------- Types & mock data ----------

type DeviceIcon = "light" | "tv" | "fridge" | "ac" | "washer" | "microwave" | "plug";

type Device = {
  id: string;
  name: string;
  icon: DeviceIcon;
  baseW: number; // base watts
  on: boolean;
};

type Room = {
  id: string;
  name: string;
  // SVG layout (in viewBox 1000 x 640)
  x: number;
  y: number;
  w: number;
  h: number;
  devices: Device[];
};

type House = {
  id: string;
  name: string;
  address: string;
  solarKwPeak: number;
  rooms: Room[];
};

const HOUSES: House[] = [
  {
    id: "casa-principal",
    name: "Casa Principal",
    address: "Rua das Palmeiras, 120",
    solarKwPeak: 5.2,
    rooms: [
      {
        id: "sala",
        name: "Sala",
        x: 20, y: 20, w: 520, h: 320,
        devices: [
          { id: "s1", name: "Ar-condicionado", icon: "ac", baseW: 1400, on: true },
          { id: "s2", name: "TV 55\"", icon: "tv", baseW: 120, on: true },
          { id: "s3", name: "Iluminação", icon: "light", baseW: 60, on: true },
          { id: "s4", name: "Tomada lateral", icon: "plug", baseW: 25, on: true },
        ],
      },
      {
        id: "cozinha",
        name: "Cozinha",
        x: 560, y: 20, w: 420, h: 200,
        devices: [
          { id: "c1", name: "Geladeira", icon: "fridge", baseW: 180, on: true },
          { id: "c2", name: "Microondas", icon: "microwave", baseW: 1100, on: false },
          { id: "c3", name: "Iluminação", icon: "light", baseW: 45, on: true },
        ],
      },
      {
        id: "lavanderia",
        name: "Lavanderia",
        x: 560, y: 240, w: 200, h: 200,
        devices: [
          { id: "l1", name: "Máquina de lavar", icon: "washer", baseW: 900, on: false },
          { id: "l2", name: "Iluminação", icon: "light", baseW: 20, on: false },
        ],
      },
      {
        id: "banheiro",
        name: "Banheiro",
        x: 780, y: 240, w: 200, h: 200,
        devices: [
          { id: "b1", name: "Chuveiro elétrico", icon: "plug", baseW: 5500, on: false },
          { id: "b2", name: "Iluminação", icon: "light", baseW: 30, on: true },
        ],
      },
      {
        id: "quarto1",
        name: "Quarto Casal",
        x: 20, y: 360, w: 300, h: 260,
        devices: [
          { id: "q1", name: "Ar-condicionado", icon: "ac", baseW: 1100, on: false },
          { id: "q2", name: "TV 43\"", icon: "tv", baseW: 90, on: false },
          { id: "q3", name: "Iluminação", icon: "light", baseW: 40, on: true },
        ],
      },
      {
        id: "quarto2",
        name: "Quarto Infantil",
        x: 340, y: 360, w: 200, h: 260,
        devices: [
          { id: "q21", name: "Iluminação", icon: "light", baseW: 30, on: true },
          { id: "q22", name: "Tomadas", icon: "plug", baseW: 15, on: true },
        ],
      },
      {
        id: "area",
        name: "Área Externa",
        x: 560, y: 460, w: 420, h: 160,
        devices: [
          { id: "a1", name: "Iluminação externa", icon: "light", baseW: 80, on: false },
          { id: "a2", name: "Bomba piscina", icon: "plug", baseW: 450, on: false },
        ],
      },
    ],
  },
  {
    id: "casa-praia",
    name: "Casa de Praia",
    address: "Av. Beira-Mar, 45",
    solarKwPeak: 3.8,
    rooms: [
      {
        id: "sala",
        name: "Sala/Cozinha",
        x: 20, y: 20, w: 600, h: 300,
        devices: [
          { id: "sp1", name: "Geladeira", icon: "fridge", baseW: 160, on: true },
          { id: "sp2", name: "Iluminação", icon: "light", baseW: 50, on: true },
          { id: "sp3", name: "TV", icon: "tv", baseW: 95, on: false },
        ],
      },
      {
        id: "quarto",
        name: "Quarto",
        x: 640, y: 20, w: 340, h: 300,
        devices: [
          { id: "qp1", name: "Ar-condicionado", icon: "ac", baseW: 950, on: true },
          { id: "qp2", name: "Iluminação", icon: "light", baseW: 30, on: true },
        ],
      },
      {
        id: "banheiro",
        name: "Banheiro",
        x: 20, y: 340, w: 300, h: 280,
        devices: [
          { id: "bp1", name: "Chuveiro", icon: "plug", baseW: 4500, on: false },
          { id: "bp2", name: "Iluminação", icon: "light", baseW: 25, on: true },
        ],
      },
      {
        id: "varanda",
        name: "Varanda",
        x: 340, y: 340, w: 640, h: 280,
        devices: [
          { id: "vp1", name: "Iluminação", icon: "light", baseW: 60, on: true },
          { id: "vp2", name: "Tomadas", icon: "plug", baseW: 30, on: false },
        ],
      },
    ],
  },
];

const DEVICE_ICONS: Record<DeviceIcon, typeof Lightbulb> = {
  light: Lightbulb,
  tv: Tv,
  fridge: Refrigerator,
  ac: AirVent,
  washer: WashingMachine,
  microwave: Microwave,
  plug: Plug,
};

// ---------- Helpers ----------

function roomLiveW(room: Room, jitter: number) {
  return room.devices.reduce((sum, d) => {
    if (!d.on) return sum;
    // ±8% noise per device for realism
    const noise = 1 + Math.sin(jitter * 0.7 + d.id.length) * 0.08;
    return sum + d.baseW * noise;
  }, 0);
}

function fmtW(w: number) {
  if (w >= 1000) return `${(w / 1000).toFixed(2)} kW`;
  return `${Math.round(w)} W`;
}

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ---------- Page ----------

function DashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("solustech_auth") !== "1") navigate({ to: "/" });
  }, [navigate]);
  const [houseId, setHouseId] = useState<string>(HOUSES[0].id);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  // devices state per house, keyed by `${houseId}:${deviceId}`
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [tick, setTick] = useState(0);
  const [alerts, setAlerts] = useState<
    { id: string; ts: number; room: string; text: string; level: "warn" | "info" | "ai" }[]
  >([]);

  // Live tick
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const house = useMemo(() => {
    const base = HOUSES.find((h) => h.id === houseId)!;
    return {
      ...base,
      rooms: base.rooms.map((r) => ({
        ...r,
        devices: r.devices.map((d) => {
          const key = `${base.id}:${d.id}`;
          return key in overrides ? { ...d, on: overrides[key] } : d;
        }),
      })),
    };
  }, [houseId, overrides]);

  const liveByRoom = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of house.rooms) map[r.id] = roomLiveW(r, tick);
    return map;
  }, [house, tick]);

  const totalW = useMemo(
    () => Object.values(liveByRoom).reduce((a, b) => a + b, 0),
    [liveByRoom],
  );

  // Solar generation simulated by time of day
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const solarFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
  const solarW = house.solarKwPeak * 1000 * solarFactor * (0.92 + Math.sin(tick * 0.3) * 0.05);
  const netW = totalW - solarW;
  const solarCoverage = totalW > 0 ? Math.min(100, (solarW / totalW) * 100) : 100;

  // Live alerts based on consumption
  useEffect(() => {
    const newAlerts: typeof alerts = [];
    for (const r of house.rooms) {
      const w = liveByRoom[r.id] ?? 0;
      if (w > 1500 && Math.random() < 0.25) {
        newAlerts.push({
          id: `${r.id}-${Date.now()}`,
          ts: Date.now(),
          room: r.name,
          text: `${r.name} está consumindo ${fmtW(w)} agora — acima da média.`,
          level: "warn",
        });
      }
    }
    if (solarCoverage > 80 && totalW > 200 && Math.random() < 0.15) {
      newAlerts.push({
        id: `solar-${Date.now()}`,
        ts: Date.now(),
        room: "Solar",
        text: `Sua geração solar está cobrindo ${Math.round(solarCoverage)}% do consumo. Bom momento para usar a máquina de lavar.`,
        level: "ai",
      });
    }
    if (newAlerts.length) {
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, 8));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const selectedRoom = selectedRoomId ? house.rooms.find((r) => r.id === selectedRoomId) ?? null : null;

  const toggleDevice = (deviceId: string) => {
    const key = `${house.id}:${deviceId}`;
    const room = house.rooms.find((r) => r.devices.some((d) => d.id === deviceId));
    const dev = room?.devices.find((d) => d.id === deviceId);
    if (!dev) return;
    setOverrides((o) => ({ ...o, [key]: !dev.on }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 min-h-16 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => { sessionStorage.removeItem("solustech_auth"); navigate({ to: "/" }); }}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm py-2"
            >
              <ChevronLeft className="w-4 h-4" /> Sair
            </button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2 font-semibold truncate">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <span className="truncate">SolusTech<span className="hidden sm:inline"> · Painel</span></span>
            </div>
          </div>

          <HouseSelector houseId={houseId} onChange={(id) => { setHouseId(id); setSelectedRoomId(null); }} />
        </div>
      </header>


      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid gap-6">
        {/* Live stats */}
        <section className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Consumo agora"
            value={fmtW(totalW)}
            icon={Zap}
            tone="primary"
            sub={`${house.rooms.length} cômodos monitorados`}
          />
          <StatCard
            label="Gerando (solar)"
            value={fmtW(solarW)}
            icon={Sun}
            tone="accent"
            sub={`Pico ${house.solarKwPeak} kW`}
          />
          <StatCard
            label={netW > 0 ? "Comprando da rede" : "Excedente solar"}
            value={fmtW(Math.abs(netW))}
            icon={netW > 0 ? TrendingUp : TrendingDown}
            tone={netW > 0 ? "warn" : "ok"}
            sub={`${Math.round(solarCoverage)}% coberto pelo solar`}
          />
          <StatCard
            label="Custo estimado hoje"
            value={fmtBRL(((totalW / 1000) * 8 * 0.85))}
            icon={Sparkles}
            tone="muted"
            sub="Tarifa R$ 0,85/kWh"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 min-w-0">
          {/* Floor plan */}
          <section className="min-w-0 rounded-3xl border border-border bg-card p-3 sm:p-4 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold">Planta da casa</h2>
                <p className="text-sm text-muted-foreground">
                  Toque em um cômodo para ver o que tem dentro e o consumo ao vivo.
                </p>
              </div>
              <LiveDot />
            </div>
            <FloorPlan
              rooms={house.rooms}
              liveByRoom={liveByRoom}
              selectedId={selectedRoomId}
              onSelect={setSelectedRoomId}
            />
            <Legend />
          </section>

          {/* Side panel */}
          <aside className="grid gap-6 content-start min-w-0">
            <RoomPanel
              room={selectedRoom}
              live={selectedRoom ? liveByRoom[selectedRoom.id] : 0}
              onToggle={toggleDevice}
              onClose={() => setSelectedRoomId(null)}
            />
            <AlertsPanel alerts={alerts} />
          </aside>
        </div>
      </main>
    </div>
  );
}

// ---------- Sub-components ----------

function HouseSelector({ houseId, onChange }: { houseId: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Home className="w-4 h-4 text-muted-foreground" />
      <select
        value={houseId}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card border border-border rounded-full text-sm px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {HOUSES.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>
    </div>
  );
}

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      Ao vivo
    </span>
  );
}

function StatCard({
  label, value, icon: Icon, tone, sub,
}: {
  label: string; value: string; icon: typeof Zap;
  tone: "primary" | "accent" | "warn" | "ok" | "muted";
  sub?: string;
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/30 text-accent-foreground",
    warn: "bg-destructive/10 text-destructive",
    ok: "bg-primary/10 text-primary",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className={`w-8 h-8 rounded-lg grid place-items-center ${toneClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

function intensityFromWatts(w: number) {
  // 0..1
  return Math.min(1, w / 2500);
}

function FloorPlan({
  rooms, liveByRoom, selectedId, onSelect,
}: {
  rooms: Room[];
  liveByRoom: Record<string, number>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-full min-w-0">
      <svg viewBox="0 0 1000 640" className="block w-full max-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* outer wall */}
        <rect x="8" y="8" width="984" height="624" rx="18"
          className="fill-muted/40 stroke-border" strokeWidth={2} />
        {rooms.map((r) => {
          const w = liveByRoom[r.id] ?? 0;
          const intensity = intensityFromWatts(w);
          const isSelected = selectedId === r.id;
          // Color blends from primary (cool) to destructive (hot) based on watts
          const fill = `color-mix(in oklab, var(--primary) ${10 + intensity * 25}%, var(--card))`;
          const hotOverlay = intensity > 0.6
            ? `color-mix(in oklab, var(--destructive) ${(intensity - 0.5) * 60}%, transparent)`
            : "transparent";
          return (
            <g
              key={r.id}
              onClick={() => onSelect(r.id)}
              className="cursor-pointer"
              style={{ transition: "filter 200ms" }}
            >
              <rect
                x={r.x} y={r.y} width={r.w} height={r.h} rx={14}
                style={{ fill }}
                className={`stroke-border ${isSelected ? "stroke-[3]" : "stroke-2"}`}
                stroke={isSelected ? "var(--primary)" : undefined}
              />
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={14}
                style={{ fill: hotOverlay }} pointerEvents="none" />
              <text x={r.x + 16} y={r.y + 28}
                className="fill-foreground"
                style={{ fontSize: 18, fontWeight: 600 }}>
                {r.name}
              </text>
              <text x={r.x + 16} y={r.y + 52}
                className="fill-muted-foreground tabular-nums"
                style={{ fontSize: 14 }}>
                {fmtW(w)}
              </text>
              {/* mini device dots */}
              <g>
                {r.devices.slice(0, 5).map((d, i) => (
                  <circle
                    key={d.id}
                    cx={r.x + 18 + i * 16}
                    cy={r.y + r.h - 18}
                    r={5}
                    fill={d.on ? "var(--primary)" : "var(--border)"}
                  />
                ))}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "color-mix(in oklab, var(--primary) 10%, var(--card))" }} />
        Pouco consumo
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "color-mix(in oklab, var(--primary) 30%, var(--card))" }} />
        Médio
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "color-mix(in oklab, var(--destructive) 40%, var(--card))" }} />
        Alto
      </span>
      <span className="inline-flex items-center gap-2 ml-auto">
        <span className="w-2 h-2 rounded-full bg-primary" /> ligado
        <span className="w-2 h-2 rounded-full bg-border ml-2" /> desligado
      </span>
    </div>
  );
}

function RoomPanel({
  room, live, onToggle, onClose,
}: {
  room: Room | null;
  live: number;
  onToggle: (id: string) => void;
  onClose: () => void;
}) {
  if (!room) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/50 p-6 text-center">
        <Home className="w-6 h-6 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Selecione um cômodo na planta para ver os aparelhos e o consumo em tempo real.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Cômodo</span>
          <h3 className="text-xl font-semibold">{room.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          fechar
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.45_0.14_165)] text-primary-foreground p-4">
        <div className="text-xs opacity-80">Consumindo agora</div>
        <div className="text-3xl font-semibold tabular-nums mt-1">{fmtW(live)}</div>
        <div className="text-xs opacity-80 mt-2">
          {room.devices.filter((d) => d.on).length} de {room.devices.length} aparelhos ligados
        </div>
      </div>

      <ul className="mt-4 grid gap-2">
        {room.devices.map((d) => {
          const Icon = DEVICE_ICONS[d.icon];
          return (
            <li
              key={d.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
            >
              <div className={`w-9 h-9 rounded-lg grid place-items-center ${d.on ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.name}</div>
                <div className="text-xs text-muted-foreground tabular-nums">
                  {d.on ? fmtW(d.baseW) : "desligado"} · base
                </div>
              </div>
              <button
                onClick={() => onToggle(d.id)}
                className={`inline-flex items-center gap-1 rounded-full text-xs px-3 py-1.5 border transition ${
                  d.on
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted"
                }`}
              >
                <Power className="w-3 h-3" />
                {d.on ? "On" : "Off"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AlertsPanel({
  alerts,
}: {
  alerts: { id: string; ts: number; room: string; text: string; level: "warn" | "info" | "ai" }[];
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <BellRing className="w-4 h-4 text-primary" /> Alertas ao vivo
        </h3>
        <LiveDot />
      </div>

      {alerts.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-4">
          Tudo tranquilo. Avisaremos aqui se algum cômodo passar do esperado.
        </p>
      ) : (
        <ul className="mt-4 grid gap-2">
          {alerts.map((a) => {
            const Icon = a.level === "ai" ? Sparkles : AlertTriangle;
            const cls = a.level === "warn"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : a.level === "ai"
                ? "bg-accent/30 text-accent-foreground border-accent/40"
                : "bg-primary/10 text-primary border-primary/20";
            return (
              <li key={a.id} className={`rounded-xl border p-3 text-sm ${cls}`}>
                <div className="flex items-start gap-2">
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{a.room}</div>
                    <div className="opacity-90">{a.text}</div>
                    <div className="text-[10px] opacity-60 mt-1">
                      {new Date(a.ts).toLocaleTimeString("pt-BR")}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
