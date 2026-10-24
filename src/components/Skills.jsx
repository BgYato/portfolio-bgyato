import { useState } from "react";
import { skills } from "../utils/skillsData";

const hexToRgb = (hex) => {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const toHex = (rgb) =>
  "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

const luminance = ([r, g, b]) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const mix = (rgb, target, amount) =>
  rgb.map((v) => Math.round(v + (target - v) * amount));

const adaptColor = (color, mode) => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  let out = rgb;
  if (mode === "light") {
    for (let i = 0; i < 12 && luminance(out) > 0.3; i++)
      out = mix(out, 0, 0.15);
  } else {
    for (let i = 0; i < 15 && luminance(out) < 0.15; i++)
      out = mix(out, 255, 0.2);
  }
  return toHex(out);
};

const pick = (names) =>
  skills
    .filter((s) => names.includes(s.name))
    .map((s) => ({
      ...s,
      isMain: s.main === true,
      light: adaptColor(s.color, "light"),
      dark: adaptColor(s.color, "dark"),
    }))
    .sort((a, b) => Number(b.isMain) - Number(a.isMain));

const categories = [
  { name: "Backend", wide: true, skills: pick(["Java", "Spring Boot", "Node.js", "Express", "Python", "PHP", "Kotlin", "JWT"]) },
  { name: "Frontend", skills: pick(["React", "Angular", "Vue.js", "CSS3", "JavaScript", "TailwindCSS", "Bootstrap"]),},  
  { name: "Data Stack", skills: pick(["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "Power BI", "Tableau"]) },
  { name: "DevOps & Cloud", skills: pick(["Git", "GitHub", "Docker", "Kubernetes", "Jenkins", "AWS"]) },
  { name: "Tools", skills: pick(["Swagger", "Postman", "Jira", "Confluence", "Apache Kafka", "Selenium"]) },
];

const chipShape =
  "group flex items-center space-x-2 md:space-x-3 px-2.5 py-1 md:px-3.5 md:py-1.5 lg:px-4 rounded-lg md:rounded-xl border " +
  "transition-all duration-300 md:hover:-translate-y-0.5 cursor-default " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 " +
  "[--c:var(--c-light)] dark:[--c:var(--c-dark)] " +
  "hover:[border-color:color-mix(in_srgb,var(--c)_35%,transparent)] " +
  "dark:hover:[border-color:color-mix(in_srgb,var(--c)_35%,transparent)] " +
  "focus-visible:[border-color:color-mix(in_srgb,var(--c)_35%,transparent)] " +
  "dark:focus-visible:[border-color:color-mix(in_srgb,var(--c)_35%,transparent)]";

const chipNormal =
  "bg-gray-100 dark:bg-slate-800/30 border-gray-200 dark:border-slate-800/40";
const chipMain = "bg-cyan-500/[0.07] border-cyan-500/30";

const iconBase =
  "text-sm md:text-base lg:text-xl transition-colors duration-300";
const iconNormal =
  "text-slate-500 dark:text-slate-400 group-hover:[color:var(--c)] group-focus-visible:[color:var(--c)]";
const iconMain = "[color:var(--c)]";

const labelBase =
  "text-[11px] md:text-xs lg:text-[13px] font-medium transition-colors duration-300 " +
  "group-hover:text-slate-900 dark:group-hover:text-slate-100 " +
  "group-focus-visible:text-slate-900 dark:group-focus-visible:text-slate-100";
const labelNormal = "text-slate-600 dark:text-slate-400";
const labelMain = "text-slate-800 dark:text-slate-200";

function Chip({ skill }) {
  const Icon = skill.icon;
  return (
    <div
      tabIndex={0}
      className={`${chipShape} ${skill.isMain ? chipMain : chipNormal}`}
      style={{ "--c-light": skill.light, "--c-dark": skill.dark }}
    >
      <Icon className={`${iconBase} ${skill.isMain ? iconMain : iconNormal}`} />
      <span
        className={`${labelBase} ${skill.isMain ? labelMain : labelNormal}`}
      >
        {skill.name}
      </span>
    </div>
  );
}

function CategoryCard({ cat, delay = 0, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden min-w-0 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-[2rem] border border-gray-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl transition-colors duration-500 hover:border-cyan-500/30 animate-fadeIn ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-5">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
        <h3 className="text-sm md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
          {cat.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-2.5 lg:gap-3">
        {cat.skills.map((skill) => (
          <Chip key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [activeCat, setActiveCat] = useState(0);

  return (
    <section
      id="skills"
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 lg:px-16 pt-20 pb-8 md:pt-24 overflow-hidden relative"
    >
      {/* Decorative background glows consistent with other sections */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-5 md:mb-8 lg:mb-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
            Mi <span className="text-cyan-500">Tech Stack</span>
          </h2>
          <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
          <p className="mt-4 flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <span className="w-3 h-3 rounded border border-cyan-500/30 bg-cyan-500/[0.07]" />
            Stack principal, el que uso a diario
          </p>
        </div>

        <div className="md:hidden w-full min-w-0 pr-[3.25rem]">
          <div
            role="tablist"
            aria-label="Categorías"
            className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                type="button"
                role="tab"
                aria-selected={i === activeCat}
                onClick={() => setActiveCat(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 ${
                  i === activeCat
                    ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-700 dark:text-cyan-400"
                    : "bg-gray-100 dark:bg-slate-800/30 border-gray-200 dark:border-slate-800/40 text-slate-600 dark:text-slate-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <CategoryCard
            key={activeCat}
            cat={categories[activeCat]}
            className="min-h-[220px]"
          />
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              cat={cat}
              delay={i * 50}
              className={
                cat.wide ? "md:col-span-2 lg:col-span-2" : "md:col-span-1"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;