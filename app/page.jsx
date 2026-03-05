"use client";
import { useState, useEffect, useRef, useMemo } from "react";

const COUNTRIES = [
  { id: "usa", name: "United States", flag: "🇺🇸", militaryBudget: 886, gdp: 27360, population: 334, color: "#1E3A5F", source: "SIPRI 2024" },
  { id: "china", name: "China", flag: "🇨🇳", militaryBudget: 296, gdp: 17795, population: 1412, color: "#C0392B", source: "SIPRI 2024 est." },
  { id: "russia", name: "Russia", flag: "🇷🇺", militaryBudget: 109, gdp: 1862, population: 144, color: "#6C3483", source: "SIPRI 2024 est." },
  { id: "india", name: "India", flag: "🇮🇳", militaryBudget: 83, gdp: 3550, population: 1428, color: "#B7950B", source: "SIPRI 2024" },
  { id: "saudi", name: "Saudi Arabia", flag: "🇸🇦", militaryBudget: 75, gdp: 1069, population: 36, color: "#1D8348", source: "SIPRI 2024" },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", militaryBudget: 75, gdp: 3332, population: 68, color: "#922B6C", source: "SIPRI 2024" },
  { id: "israel", name: "Israel", flag: "🇮🇱", militaryBudget: 27.5, gdp: 509, population: 9.8, color: "#0B7285", source: "SIPRI 2024 + US aid" },
  { id: "iran", name: "Iran", flag: "🇮🇷", militaryBudget: 10.3, gdp: 401, population: 88, color: "#C0550E", source: "SIPRI 2024 (official, likely higher)" },
];

const ALTERNATIVES = [
  { id: "schools", icon: "🏫", label: "Schools", cost: 0.01, desc: "Fully equipped K-12 school" },
  { id: "hospitals", icon: "🏥", label: "Hospitals", cost: 0.05, desc: "Modern 200-bed hospital" },
  { id: "homes", icon: "🏠", label: "Homes", cost: 0.0002, desc: "Affordable family housing" },
  { id: "water", icon: "💧", label: "Clean Water Access", cost: 0.00005, desc: "Clean water · 1 person/year" },
  { id: "vaccines", icon: "💉", label: "Vaccine Doses", cost: 0.00002, desc: "Full dose + delivery" },
  { id: "trees", icon: "🌳", label: "Trees Planted", cost: 0.00001, desc: "Tree planted & maintained" },
];

function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}

const AnimNum = ({ target, duration = 1800 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        let s = 0;
        const step = target / (duration / 16);
        const t = setInterval(() => {
          s += step;
          if (s >= target) { setVal(target); clearInterval(t); } else setVal(s);
        }, 16);
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{fmt(val)}</span>;
};

const Bar = ({ pct, color, delay = 0 }) => {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ width: "100%", height: "10px", background: "#F1F5F9", borderRadius: "99px", overflow: "hidden" }}>
      <div style={{ width: `${w}%`, height: "100%", background: color, borderRadius: "99px", transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
    </div>
  );
};

export default function WarCostViz() {
  const [sel, setSel] = useState(COUNTRIES[0]);
  const [tab, setTab] = useState("compare");
  const [hov, setHov] = useState(null);

  const sorted = useMemo(() => [...COUNTRIES].sort((a, b) => b.militaryBudget - a.militaryBudget), []);
  const sortedPC = useMemo(() => [...COUNTRIES].sort((a, b) => (b.militaryBudget / b.population) - (a.militaryBudget / a.population)), []);
  const sortedGDP = useMemo(() => [...COUNTRIES].sort((a, b) => (b.militaryBudget / b.gdp) - (a.militaryBudget / a.gdp)), []);
  const maxB = Math.max(...COUNTRIES.map(c => c.militaryBudget));
  const maxPC = Math.max(...COUNTRIES.map(c => c.militaryBudget / c.population));
  const totalB = COUNTRIES.reduce((s, c) => s + c.militaryBudget, 0);

  const css = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Sans+3:wght@400;500;600;700;800&display=swap'); *{margin:0;padding:0;box-sizing:border-box} body{background:#FFF} ::selection{background:#1E293B;color:#FFF} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} .fu{animation:fadeUp .6s ease both} .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}`;

  const Pill = ({ id, label }) => (
    <button onClick={() => setTab(id)} style={{
      padding: "9px 22px", borderRadius: "99px", cursor: "pointer", fontSize: "13px", fontWeight: 700,
      border: tab === id ? "2px solid #0F172A" : "1.5px solid #E2E8F0",
      background: tab === id ? "#0F172A" : "#FFF", color: tab === id ? "#FFF" : "#94A3B8",
      transition: "all .25s", letterSpacing: "0.2px",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Source Sans 3', sans-serif", color: "#1E293B" }}>
      <style>{css}</style>

      <header style={{ position: "relative", padding: "52px 24px 36px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        <div style={{ width: "44px", height: "4px", background: "#DC2626", borderRadius: "2px", margin: "0 auto 18px" }} />

        <div className="fu" style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "#94A3B8", fontWeight: 700, marginBottom: "18px" }}>
          INTERACTIVE DATA REPORT
        </div>

        <h1 className="fu d1" style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 7vw, 60px)",
          fontWeight: 800, lineHeight: 1.08, margin: "0 auto 18px", maxWidth: "680px",
          color: "#0F172A", letterSpacing: "-0.5px",
        }}>
          What If War Money<br />Was Spent On <em style={{ color: "#DC2626" }}>Life</em>?
        </h1>

        <p className="fu d2" style={{ fontSize: "15px", color: "#94A3B8", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Estimates based on <strong style={{ color: "#64748B" }}>SIPRI 2024</strong> data · Stockholm International Peace Research Institute
        </p>

        <div className="fu d3" style={{
          display: "inline-flex", flexDirection: "column", alignItems: "center",
          padding: "18px 36px", borderRadius: "14px", background: "#FAFBFC", border: "1px solid #F1F5F9",
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#94A3B8", marginBottom: "4px", fontWeight: 700 }}>COMBINED MILITARY SPENDING</div>
          <div style={{ fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 800, color: "#DC2626", letterSpacing: "-2px" }}>$<AnimNum target={totalB} />B</div>
          <div style={{ fontSize: "12px", color: "#CBD5E1" }}>per year · {COUNTRIES.length} nations</div>
        </div>
      </header>

      <nav style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "0 20px 32px", flexWrap: "wrap" }}>
        <Pill id="compare" label="Spending Rank" />
        <Pill id="alternative" label="What Could Be Built" />
        <Pill id="percapita" label="Cost Per Citizen" />
      </nav>

      <main style={{ maxWidth: "840px", margin: "0 auto", padding: "0 20px 72px" }}>

        {tab === "compare" && (
          <div className="fu">
            <section style={{ border: "1px solid #F1F5F9", borderRadius: "18px", padding: "28px 28px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0F172A" }}>Annual Military Expenditure</h2>
                  <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "3px" }}>Billions USD · SIPRI Yearbook 2024</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sorted.map((c, i) => (
                  <div key={c.id}
                    onMouseEnter={() => setHov(c.id)} onMouseLeave={() => setHov(null)} onClick={() => setSel(c)}
                    style={{
                      cursor: "pointer", padding: "10px 14px", borderRadius: "12px", transition: "all .2s",
                      background: sel.id === c.id ? "#FAFBFC" : hov === c.id ? "#FDFDFE" : "transparent",
                      border: sel.id === c.id ? `1.5px solid ${c.color}20` : "1.5px solid transparent",
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "11px", color: "#CBD5E1", fontWeight: 700, width: "16px", textAlign: "right" }}>{i + 1}</span>
                        <span style={{ fontSize: "22px", lineHeight: 1 }}>{c.flag}</span>
                        <span style={{ fontWeight: 700, fontSize: "14px" }}>{c.name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                        <span style={{ fontWeight: 800, fontSize: "20px", color: c.color, fontVariantNumeric: "tabular-nums" }}>{c.militaryBudget}</span>
                        <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600 }}>B</span>
                      </div>
                    </div>
                    <Bar pct={(c.militaryBudget / maxB) * 100} color={c.color} delay={i * 100} />
                  </div>
                ))}
              </div>
            </section>

            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "10px" }}>
              {sortedGDP.slice(0, 4).map(c => (
                <div key={c.id} style={{ padding: "18px", borderRadius: "14px", textAlign: "center", background: "#FAFBFC", border: "1px solid #F1F5F9" }}>
                  <div style={{ fontSize: "26px", marginBottom: "4px" }}>{c.flag}</div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: c.color }}>{((c.militaryBudget / c.gdp) * 100).toFixed(1)}%</div>
                  <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>of GDP</div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "alternative" && (
          <div className="fu">
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", justifyContent: "center", marginBottom: "22px" }}>
              {COUNTRIES.map(c => (
                <button key={c.id} onClick={() => setSel(c)} style={{
                  display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 13px", borderRadius: "99px",
                  cursor: "pointer", fontSize: "12px", fontWeight: 700, transition: "all .25s",
                  border: sel.id === c.id ? `2px solid ${c.color}` : "1.5px solid #E2E8F0",
                  background: sel.id === c.id ? `${c.color}0A` : "#FFF", color: sel.id === c.id ? c.color : "#94A3B8",
                }}><span style={{ fontSize: "15px" }}>{c.flag}</span>{c.name}</button>
              ))}
            </div>

            <div style={{
              borderRadius: "18px", padding: "28px", textAlign: "center", marginBottom: "20px",
              background: `linear-gradient(135deg, ${sel.color}06, ${sel.color}02)`, border: `1px solid ${sel.color}12`,
            }}>
              <div style={{ fontSize: "48px", marginBottom: "6px" }}>{sel.flag}</div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>{sel.name}&apos;s Annual Military Budget</div>
              <div style={{ fontSize: "44px", fontWeight: 800, color: "#DC2626", letterSpacing: "-2px", margin: "4px 0" }}>${sel.militaryBudget}B</div>
              <div style={{ fontSize: "11px", color: "#CBD5E1", fontStyle: "italic" }}>{sel.source}</div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
                <div style={{ padding: "14px 20px", borderRadius: "12px", background: "#FAFBFC", border: "1px solid #F1F5F9", minWidth: "120px" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: sel.color }}>{((sel.militaryBudget / sel.gdp) * 100).toFixed(1)}%</div>
                  <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>of GDP</div>
                </div>
                <div style={{ padding: "14px 20px", borderRadius: "12px", background: "#FAFBFC", border: "1px solid #F1F5F9", minWidth: "120px" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: sel.color }}>${((sel.militaryBudget * 1e9) / (sel.population * 1e6)).toFixed(0)}</div>
                  <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 600 }}>per citizen</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "12px" }}>
              {ALTERNATIVES.map(alt => {
                const count = (sel.militaryBudget * 1e9) / (alt.cost * 1e9);
                return (
                  <div key={alt.id} style={{
                    borderRadius: "14px", padding: "22px", textAlign: "center",
                    background: "#FAFBFC", border: "1px solid #F1F5F9", transition: "all .25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ fontSize: "34px", marginBottom: "8px" }}>{alt.icon}</div>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: "#059669", letterSpacing: "-1px" }}>{fmt(count)}</div>
                    <div style={{ fontSize: "13px", color: "#1E293B", fontWeight: 700, marginTop: "3px" }}>{alt.label}</div>
                    <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "5px" }}>{alt.desc}</div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: "20px", padding: "22px 24px", borderRadius: "14px", textAlign: "center",
              background: "#ECFDF5", border: "1px solid #D1FAE5",
            }}>
              <div style={{ fontSize: "12px", color: "#059669", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>IN OTHER WORDS</div>
              <div style={{ fontSize: "16px", color: "#1E293B", lineHeight: 1.8 }}>
                {sel.name}&apos;s military budget alone could build <strong style={{ color: "#059669" }}>{fmt((sel.militaryBudget * 1e9) / (ALTERNATIVES[0].cost * 1e9))}</strong> schools and <strong style={{ color: "#059669" }}>{fmt((sel.militaryBudget * 1e9) / (ALTERNATIVES[1].cost * 1e9))}</strong> hospitals — every single year.
              </div>
            </div>
          </div>
        )}

        {tab === "percapita" && (
          <div className="fu">
            <section style={{ border: "1px solid #F1F5F9", borderRadius: "18px", padding: "28px" }}>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0F172A", marginBottom: "3px" }}>How Much Does Each Citizen Pay?</h2>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "24px" }}>Military spending ÷ population</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {sortedPC.map((c, i) => {
                  const pc = ((c.militaryBudget * 1e9) / (c.population * 1e6)).toFixed(0);
                  const blocks = Math.min(Math.ceil(pc / 80), 36);
                  return (
                    <div key={c.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "11px", color: "#CBD5E1", fontWeight: 700, width: "18px", textAlign: "right" }}>#{i + 1}</span>
                          <span style={{ fontSize: "20px" }}>{c.flag}</span>
                          <span style={{ fontWeight: 700, fontSize: "13px" }}>{c.name}</span>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: "20px", color: c.color, fontVariantNumeric: "tabular-nums" }}>${pc}</span>
                      </div>
                      <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                        {Array.from({ length: blocks }).map((_, j) => (
                          <div key={j} style={{
                            width: "9px", height: "20px", borderRadius: "2.5px",
                            background: c.color, opacity: 0.12 + (j / blocks) * 0.88,
                          }} />
                        ))}
                      </div>
                      <div style={{ fontSize: "10px", color: "#CBD5E1", marginTop: "3px" }}>Each block ≈ $80/yr per citizen</div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ marginTop: "16px", padding: "20px 24px", borderRadius: "14px", background: "#FFFBEB", border: "1px solid #FEF3C7" }}>
              <div style={{ fontSize: "12px", color: "#D97706", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "5px" }}>DID YOU KNOW?</div>
              <div style={{ fontSize: "14px", color: "#1E293B", lineHeight: 1.8 }}>
                An Israeli citizen bears the highest per-capita military cost (~$2,806/yr), while an Indian citizen bears the lowest (~$58/yr) — even though India&apos;s total budget is 3× larger.
              </div>
            </div>
          </div>
        )}

        <footer style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid #F1F5F9", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "#CBD5E1", lineHeight: 2 }}>
            Data: SIPRI Yearbook 2024 · Development costs are global averages for illustration<br />
            <span style={{ color: "#94A3B8" }}>For awareness purposes — actual figures may vary</span>
          </div>
          <div style={{ marginTop: "12px", fontSize: "12px", color: "#E2E8F0" }}>
            Built by <strong style={{ color: "#94A3B8" }}>Bader</strong> · <a href="https://x.com/itsabader" target="_blank" rel="noopener noreferrer" style={{ color: "#94A3B8", textDecoration: "none", borderBottom: "1px dotted #CBD5E1" }}>@itsabader</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
