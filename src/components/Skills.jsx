import { skills } from "../utils/skillsData";

function Skills() {
  const categories = [
    {
      name: "Frontend",
      skills: skills.filter(s => ["React", "Angular", "Vue.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "TailwindCSS", "Bootstrap"].includes(s.name)),
      className: "lg:col-span-2"
    },
    {
      name: "Backend",
      skills: skills.filter(s => ["Java", "Spring Boot", "Node.js", "Express", "Python", "PHP", "Kotlin", "JWT"].includes(s.name)),
      className: "lg:col-span-1"
    },
    {
      name: "Data Stack",
      skills: skills.filter(s => ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "Power BI", "Tableau"].includes(s.name)),
      className: "lg:col-span-1"
    },
    {
      name: "DevOps & Cloud",
      skills: skills.filter(s => ["Git", "GitHub", "Docker", "Kubernetes", "Jenkins", "AWS"].includes(s.name)),
      className: "lg:col-span-1"
    },
    {
      name: "Tools",
      skills: skills.filter(s => ["Swagger", "Postman", "Jira", "Confluence", "Apache Kafka"].includes(s.name)),
      className: "lg:col-span-1"
    }
  ];

  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 lg:px-16 overflow-hidden relative"
    >
      {/* Decorative background glows consistent with other sections */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full flex flex-col items-center">
        {/* Header - Scaled for mobile vs desktop */}
        <div className="text-center mb-6 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
            Mi <span className="text-cyan-500">Tech Stack</span>
          </h2>
          <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid - Strictly optimized for vertical space on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible pr-1 md:pr-0 custom-scrollbar">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden p-3 md:p-6 lg:p-10 rounded-xl md:rounded-[2rem] border border-gray-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/30 animate-fadeIn ${
                cat.name === "Frontend" ? "md:col-span-2 lg:col-span-2" : "md:col-span-1"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-6">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  <h3 className="text-[10px] md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tighter transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-3">
                  {cat.skills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center space-x-1.5 md:space-x-3 px-2 py-0.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-gray-100 dark:bg-slate-800/30 border border-gray-200 dark:border-slate-800/40 hover:border-gray-300 dark:hover:border-slate-600/60 transition-all duration-300 md:hover:-translate-y-0.5 cursor-default"
                      >
                        <Icon 
                          className="text-xs md:text-base lg:text-xl grayscale opacity-60 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-300" 
                          style={{ color: skill.color }} 
                        />
                        <span className="text-[9px] md:text-[10px] lg:text-[13px] font-medium text-slate-600 dark:text-slate-400 md:hover:text-slate-900 md:dark:hover:text-slate-100 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Glows are now at the top of the component */}
    </section>
  );
}

export default Skills;
