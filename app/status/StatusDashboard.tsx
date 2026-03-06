"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, RefreshCw, Circle } from "lucide-react";

/* ─── types ─────────────────────────────────────────────── */

type RouteEntry = {
  path: string;
  title: string;
  status: "live" | "planned";
  indexed: boolean;
  note?: string;
};

type NavEntry = { label: string; href: string; icon: string };

type StatusPayload = {
  meta: { project: string; version: string; updatedAt: string; tokenSource: string };
  tokens: {
    colors: Record<string, Record<string, string>>;
    spacing: Record<string, string>;
    shadows: Record<string, string>;
    typography: Record<string, string[]>;
  };
  routes: RouteEntry[];
  apiRoutes: { path: string; methods: string[]; description: string }[];
  nav: NavEntry[];
  components: Record<string, string[]>;
};

/* ─── colour-group config ───────────────────────────────── */

const COLOR_GROUP_META: Record<string, { label: string; swatch: string }> = {
  background: { label: "Background", swatch: "#0a0e0f" },
  sage:        { label: "Sage Green", swatch: "#86d993" },
  bluegray:    { label: "Sky Blue",   swatch: "#7dd3fc" },
  amber:       { label: "Amber",      swatch: "#fbbf24" },
  purple:      { label: "Purple",     swatch: "#c084fc" },
  semantic:    { label: "Semantic",   swatch: "#86d993" },
  text:        { label: "Text",       swatch: "#f8f9fa" },
};

/* ─── helpers ───────────────────────────────────────────── */

function Pill({ children, color = "sage" }: { children: React.ReactNode; color?: "sage" | "amber" | "gray" }) {
  const cls = {
    sage:  "bg-vln-sage/10 text-vln-sage border-vln-sage/25",
    amber: "bg-vln-amber/10 text-vln-amber border-vln-amber/25",
    gray:  "bg-vln-bg-lighter text-vln-gray-dark border-vln-bg-lighter",
  }[color];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border font-mono text-[10px] tracking-wide ${cls}`}>
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-[3px] text-vln-sage mb-4 flex items-center gap-2">
      <span className="block w-4 h-[1px] bg-vln-sage/50" />
      {children}
    </h2>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-vln border border-vln-sage/15 bg-vln-bg-light p-5 ${className}`}>
      {children}
    </div>
  );
}

/* ─── main component ────────────────────────────────────── */

export default function StatusDashboard() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string>("");

  const load = () => {
    setLoading(true);
    fetch("/api/status")
      .then((r) => r.json())
      .then((d: StatusPayload) => {
        setData(d);
        setFetchedAt(new Date().toLocaleTimeString());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-vln-sage/20 bg-vln-bg/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[3px] text-vln-sage">VLN</span>
            <span className="text-vln-gray-dark text-xs">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[3px] text-vln-gray-dark">Project Status</span>
            {data && (
              <Pill>v{data.meta.version}</Pill>
            )}
          </div>
          <div className="flex items-center gap-3">
            {fetchedAt && (
              <span className="hidden sm:block font-mono text-[10px] text-vln-gray-dark">
                fetched {fetchedAt}
              </span>
            )}
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-vln-sage/25 text-vln-sage font-mono text-[10px] uppercase tracking-[2px] hover:bg-vln-sage/10 transition-all disabled:opacity-40"
              aria-label="Refresh status data"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              href="/api/status"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-vln-bluegray/25 text-vln-bluegray font-mono text-[10px] uppercase tracking-[2px] hover:bg-vln-bluegray/10 transition-all"
            >
              JSON
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/" className="font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark hover:text-vln-white transition-colors">
              ← Site
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-10 space-y-10 max-w-6xl">
        {loading && !data && (
          <div className="flex items-center justify-center py-24 text-vln-gray-dark font-mono text-sm">
            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            Loading manifest…
          </div>
        )}

        {data && (
          <>
            {/* Meta strip */}
            <div className="flex flex-wrap gap-3 text-xs font-mono text-vln-gray-dark">
              <span>Source: <span className="text-vln-gray">{data.meta.tokenSource}</span></span>
              <span className="text-vln-sage/30">|</span>
              <span>Updated: <span className="text-vln-gray">{data.meta.updatedAt}</span></span>
              <span className="text-vln-sage/30">|</span>
              <span>
                <Link href="/docs" className="text-vln-bluegray hover:underline">docs/design/README.md</Link>
              </span>
            </div>

            {/* ── Design Tokens ── */}
            <section aria-labelledby="tokens-heading">
              <SectionHeading>
                <span id="tokens-heading">Design Tokens</span>
              </SectionHeading>

              {/* Color groups */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {Object.entries(data.tokens.colors).map(([group, values]) => {
                  const meta = COLOR_GROUP_META[group] ?? { label: group, swatch: "#888" };
                  return (
                    <Card key={group}>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-3 h-3 rounded-full border border-white/10 flex-shrink-0"
                          style={{ background: meta.swatch }}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark">
                          {meta.label}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {Object.entries(values).map(([token, hex]) => (
                          <div key={token} className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded border border-white/10 flex-shrink-0"
                              style={{ background: hex }}
                              title={hex}
                            />
                            <span className="font-mono text-[10px] text-vln-gray truncate flex-1">{token}</span>
                            <span className="font-mono text-[10px] text-vln-gray-dark">{hex}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Spacing + shadows */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark mb-3">Spacing & Radius</p>
                  <div className="space-y-2">
                    {Object.entries(data.tokens.spacing).map(([k, v]) => (
                      <div key={k} className="flex justify-between font-mono text-[11px]">
                        <span className="text-vln-gray">{k}</span>
                        <span className="text-vln-sage">{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark mb-3">Glow Shadows</p>
                  <div className="space-y-2">
                    {Object.entries(data.tokens.shadows).map(([k, v]) => (
                      <div key={k} className="flex justify-between font-mono text-[11px] gap-4">
                        <span className="text-vln-gray">{k}</span>
                        <span className="text-vln-gray-dark truncate text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Token update callout */}
              <div className="mt-4 px-5 py-4 rounded-vln border border-vln-amber/20 bg-vln-amber/[0.04] flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-vln-amber mb-1">Token Update Pipeline</p>
                  <p className="text-sm text-vln-gray">
                    To change a token sitewide: edit <code className="font-mono text-vln-sage text-xs bg-vln-sage/10 px-1.5 py-0.5 rounded">tailwind.config.ts</code>, then run <code className="font-mono text-vln-sage text-xs bg-vln-sage/10 px-1.5 py-0.5 rounded">pnpm build</code>. All Tailwind utilities regenerate automatically. Verify contrast ratios in <code className="font-mono text-vln-sage text-xs bg-vln-sage/10 px-1.5 py-0.5 rounded">docs/design/tokens/colors.md</code>.
                  </p>
                </div>
                <a
                  href="https://github.com/Fused-Gaming/vln/blob/main/tailwind.config.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-vln-amber/30 text-vln-amber font-mono text-[10px] uppercase tracking-[2px] hover:bg-vln-amber/10 transition-all"
                >
                  tailwind.config.ts
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </section>

            {/* ── Routes ── */}
            <section aria-labelledby="routes-heading">
              <SectionHeading>
                <span id="routes-heading">Route Registry</span>
              </SectionHeading>
              <Card className="overflow-x-auto p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-vln-sage/10">
                      <th className="text-left font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark px-5 py-3">Path</th>
                      <th className="text-left font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark px-5 py-3">Title</th>
                      <th className="text-left font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark px-5 py-3">Status</th>
                      <th className="text-left font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark px-5 py-3">Indexed</th>
                      <th className="text-left font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark px-5 py-3">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.routes.map((r) => (
                      <tr key={r.path} className="border-b border-vln-sage/5 hover:bg-vln-bg-lighter/50 transition-colors">
                        <td className="px-5 py-2.5">
                          <Link
                            href={r.path}
                            className="font-mono text-[11px] text-vln-sage hover:underline"
                          >
                            {r.path}
                          </Link>
                        </td>
                        <td className="px-5 py-2.5 text-vln-gray text-[12px]">{r.title}</td>
                        <td className="px-5 py-2.5">
                          <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] ${r.status === "live" ? "text-vln-sage" : "text-vln-gray-dark"}`}>
                            <Circle className={`w-1.5 h-1.5 fill-current`} />
                            {r.status}
                          </span>
                        </td>
                        <td className="px-5 py-2.5">
                          <span className={`font-mono text-[10px] ${r.indexed ? "text-vln-sage" : "text-vln-gray-dark"}`}>
                            {r.indexed ? "yes" : "no"}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 font-mono text-[10px] text-vln-gray-dark">{r.note ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>

            {/* ── API Routes ── */}
            <section aria-labelledby="api-heading">
              <SectionHeading>
                <span id="api-heading">API Routes</span>
              </SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.apiRoutes.map((r) => (
                  <Card key={r.path} className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] text-vln-sage">{r.path}</span>
                      <Link
                        href={r.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-gray-dark hover:text-vln-bluegray transition-colors flex-shrink-0"
                        aria-label={`Open ${r.path}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    <p className="text-xs text-vln-gray">{r.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      {r.methods.map((m) => (
                        <Pill key={m} color={m === "GET" ? "sage" : "amber"}>{m}</Pill>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* ── Nav ── */}
            <section aria-labelledby="nav-heading">
              <SectionHeading>
                <span id="nav-heading">Navigation Structure</span>
              </SectionHeading>
              <div className="flex flex-wrap gap-3">
                {data.nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-vln border border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40 hover:bg-vln-sage/5 transition-all group"
                  >
                    <span className="font-mono text-[10px] text-vln-gray-dark group-hover:text-vln-gray transition-colors">
                      {n.icon}
                    </span>
                    <span className="text-sm text-vln-gray group-hover:text-vln-white transition-colors">{n.label}</span>
                    <span className="font-mono text-[10px] text-vln-sage/50">{n.href}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── Components ── */}
            <section aria-labelledby="components-heading">
              <SectionHeading>
                <span id="components-heading">Component Registry</span>
              </SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(data.components).map(([group, items]) => (
                  <Card key={group}>
                    <p className="font-mono text-[10px] uppercase tracking-[2px] text-vln-gray-dark mb-3">{group}</p>
                    <div className="space-y-1">
                      {items.map((c) => (
                        <p key={c} className="font-mono text-[11px] text-vln-gray">{c}</p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
