import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sun,
  Zap,
  Brain,
  BellRing,
  BarChart3,
  Leaf,
  Plug,
  LineChart,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SolarIQ — Monitoramento Inteligente de Energia Solar" },
      {
        name: "description",
        content:
          "Sistema inteligente com IA que monitora seu consumo, mostra onde economizar e ajuda você a aproveitar melhor sua energia solar.",
      },
      { property: "og:title", content: "SolarIQ — Monitoramento Inteligente de Energia Solar" },
      {
        property: "og:description",
        content:
          "Entenda, economize e aproveite melhor sua energia solar com inteligência artificial.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <AIExample />
      <HowItWorks />
      <Benefits />
      <FinalPitch />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <Sun className="w-4 h-4" />
          </div>
          SolarIQ
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#problema" className="hover:text-foreground transition">Problema</a>
          <a href="#solucao" className="hover:text-foreground transition">Solução</a>
          <a href="#como-funciona" className="hover:text-foreground transition">Como funciona</a>
          <a href="#beneficios" className="hover:text-foreground transition">Benefícios</a>
        </nav>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:opacity-90 transition"
        >
          Abrir painel
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.92 0.12 110 / 0.55) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Inteligência Artificial para sua energia solar
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          Sistema Inteligente de{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Monitoramento de Energia Solar
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Entenda, economize e aproveite melhor sua energia solar com inteligência artificial.
        </p>
        <div id="cta" className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 hover:opacity-90 transition shadow-lg shadow-primary/20"
          >
            Abrir painel da minha casa
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card font-medium px-6 py-3 hover:bg-muted transition"
          >
            Ver como funciona
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { k: "Tempo real", v: "Por cômodo" },
            { k: "IA", v: "Recomendações" },
            { k: "Alertas", v: "Inteligentes" },
            { k: "Relatórios", v: "Automáticos" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-card/70 backdrop-blur p-4 text-left"
            >
              <div className="text-xs text-muted-foreground">{s.k}</div>
              <div className="font-semibold mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    "Onde estão gastando mais energia.",
    "Quais aparelhos consomem mais.",
    "Se estão aproveitando bem a energia solar.",
    "Quanto realmente estão economizando.",
  ];
  return (
    <section id="problema" className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary">O problema</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Muitas famílias já têm placas solares, mas não sabem o que está acontecendo.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl bg-card border border-border p-6"
            >
              <div className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive grid place-items-center shrink-0">
                <span className="font-semibold">?</span>
              </div>
              <p className="text-lg">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    { icon: BarChart3, title: "Consumo por cômodo", desc: "Acompanhe em tempo real o que cada ambiente da sua casa está usando." },
    { icon: LineChart, title: "Comparativos", desc: "Diários, semanais e mensais para você ver a evolução do seu consumo." },
    { icon: BellRing, title: "Alertas inteligentes", desc: "Receba avisos quando algum cômodo gastar mais do que o normal." },
    { icon: Brain, title: "Sugestões com IA", desc: "Recomendações automáticas para reduzir desperdícios e economizar mais." },
    { icon: Sun, title: "Relatórios solares", desc: "Veja com clareza quanto você está economizando com sua energia solar." },
    { icon: Plug, title: "Compatível", desc: "Funciona com tomadas inteligentes e medidores que você já tem em casa." },
  ];
  return (
    <section id="solucao" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary">A solução</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Conecte, monitore e deixe a IA recomendar.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nosso aplicativo conecta tomadas inteligentes e medidores já existentes, coleta os dados
            e usa IA para interpretar e recomendar ações práticas.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover:scale-110 transition">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIExample() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-primary">Exemplo</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            O que a IA conversa com você
          </h2>
          <p className="mt-4 text-muted-foreground">
            Recomendações claras, em linguagem do dia a dia.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <AICard
            badge="Alerta de consumo"
            text="A sala teve um aumento de 25% no consumo nesta semana. O maior gasto aconteceu entre 18h e 22h. Uma sugestão é reduzir o uso do ar-condicionado nesse horário."
            tone="accent"
          />
          <AICard
            badge="Energia solar"
            text="A energia solar gerada hoje foi suficiente para manter a cozinha e a sala durante o período da tarde."
            tone="primary"
          />
        </div>
      </div>
    </section>
  );
}

function AICard({ badge, text, tone }: { badge: string; text: string; tone: "primary" | "accent" }) {
  const toneClass = tone === "primary" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">SolarIQ · IA</div>
          <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-0.5 ${toneClass}`}>
            {badge}
          </span>
        </div>
      </div>
      <p className="mt-5 text-lg leading-relaxed">“{text}”</p>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Plug, title: "Conecte", desc: "Conecte suas tomadas inteligentes ao aplicativo." },
    { icon: Zap, title: "Colete", desc: "O app coleta os dados de consumo e geração solar." },
    { icon: Brain, title: "Interprete", desc: "A IA analisa os números e gera recomendações práticas." },
    { icon: LineChart, title: "Acompanhe", desc: "Veja tudo em gráficos simples e relatórios automáticos." },
  ];
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-primary">Como funciona</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Em 4 passos simples
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="rounded-2xl border border-border bg-card p-6 h-full">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground grid place-items-center">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Zap, t: "Economia real na conta de luz." },
    { icon: Sun, t: "Uso mais eficiente da energia solar." },
    { icon: BellRing, t: "Alertas inteligentes para evitar desperdícios." },
    { icon: Plug, t: "Compatibilidade com várias marcas de sensores e tomadas." },
    { icon: Leaf, t: "Sustentabilidade com tecnologia acessível." },
  ];
  return (
    <section id="beneficios" className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-medium text-primary">Benefícios</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Economia, sustentabilidade e tecnologia em um só lugar.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mais clareza sobre o seu consumo e a sua geração — para decisões melhores todos os dias.
          </p>
        </div>
        <ul className="space-y-3">
          {items.map((b) => (
            <li
              key={b.t}
              className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <b.icon className="w-5 h-5" />
              </div>
              <span className="text-lg">{b.t}</span>
              <CheckCircle2 className="w-5 h-5 text-primary ml-auto shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalPitch() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary to-[oklch(0.45_0.14_165)] text-primary-foreground p-10 md:p-16 text-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(40% 60% at 80% 20%, oklch(0.95 0.18 90) 0%, transparent 70%)",
            }}
          />
          <Sun className="w-10 h-10 mx-auto mb-6 text-accent" />
          <p className="text-2xl md:text-3xl font-medium leading-snug relative">
            “Nosso sistema inteligente ajuda famílias com placas solares a entender e otimizar seu
            consumo de energia. Com IA, mostramos onde está o maior gasto, quanto foi economizado e
            damos sugestões práticas para reduzir desperdícios. É economia, sustentabilidade e
            tecnologia em um só produto.”
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-background text-foreground font-medium px-6 py-3 hover:opacity-90 transition relative"
          >
            Abrir painel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground grid place-items-center">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-foreground">SolarIQ</span>
        </div>
        <p>© {new Date().getFullYear()} SolarIQ. Energia inteligente para todos.</p>
      </div>
    </footer>
  );
}
