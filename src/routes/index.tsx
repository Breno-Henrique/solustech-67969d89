import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Sun, Eye, EyeOff, Loader2, Info } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar — SolusTech" },
      { name: "description", content: "Acesse o SolusTech, monitoramento inteligente de energia solar com IA." },
      { property: "og:title", content: "Entrar — SolusTech" },
      { property: "og:description", content: "Monitoramento inteligente de energia solar com IA." },
    ],
  }),
  component: LoginPage,
});

const DEMO_USER = "admin@solustech.com";
const DEMO_PASS = "123456";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ user?: string; pass?: string; form?: string }>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!user.trim()) next.user = "Informe seu e-mail ou usuário.";
    if (!pass) next.pass = "Informe sua senha.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      if (user.trim().toLowerCase() === DEMO_USER && pass === DEMO_PASS) {
        sessionStorage.setItem("solustech_auth", "1");
        navigate({ to: "/dashboard" });
      } else {
        setLoading(false);
        setErrors({ form: "Usuário ou senha incorretos." });
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center px-4 py-10 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, oklch(0.92 0.12 110 / 0.55) 0%, transparent 70%)" }}
      />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold">SolusTech</span>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm grid gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Entrar</h1>
            <p className="text-sm text-muted-foreground mt-1">Acesse o painel da sua casa.</p>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="user" className="text-sm font-medium">E-mail ou usuário</label>
            <input
              id="user"
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-12 rounded-xl border border-border bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="admin@solustech.com"
            />
            {errors.user && <p className="text-sm text-destructive">{errors.user}</p>}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="pass" className="text-sm font-medium">Senha</label>
            <div className="relative">
              <input
                id="pass"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-background pl-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.pass && <p className="text-sm text-destructive">{errors.pass}</p>}
          </div>

          {errors.form && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm px-4 py-3">
              {errors.form}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="flex gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Acesso de demonstração</p>
              <p className="text-muted-foreground break-all">Usuário: {DEMO_USER}</p>
              <p className="text-muted-foreground">Senha: {DEMO_PASS}</p>
            </div>
          </div>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} SolusTech</p>
      </div>
    </div>
  );
}
