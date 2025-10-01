import { skills } from "../utils/skillsData";

function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
        Skills
      </h2>

      <p className="text-gray-300 text-center max-w-2xl mb-10">
        Un listado general de los
        <span className="text-cyan-400"> lenguajes</span>,
        <span className="text-cyan-400"> tecnologías </span> y
        <span className="text-cyan-400"> herramientas </span> que he aprendido y
        aplicado en mis proyectos.
      </p>

      {/* Versión escritorio → grid */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-10 text-5xl">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={i}
              className="group relative flex items-center justify-center cursor-pointer"
            >
              <Icon
                className={`text-gray-500 transition-all duration-300 group-hover:scale-110 skill-${i}`}
              />
              {/* Tooltip solo en escritorio */}
              <span className="absolute bottom-[-2rem] opacity-0 group-hover:opacity-100 text-sm bg-black/70 text-white px-2 py-1 rounded transition">
                {skill.name}
              </span>
              <style>
                {`
                  .group:hover .skill-${i} {
                    color: ${skill.color} !important;
                  }
                `}
              </style>
            </div>
          );
        })}
      </div>

      {/* Versión móvil → scroll horizontal */}
      <div className="md:hidden w-full">
        {/* Hint deslizar */}
        <p className="text-center text-gray-500 text-sm mb-4 animate-pulse">
          Desliza para ver más
        </p>

        <div className="flex overflow-x-auto no-scrollbar py-4 space-x-8 text-4xl">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center flex-shrink-0 w-20"
              >
                <Icon
                  style={{ color: skill.color }}
                  className={`transition-all duration-300 hover:scale-110 skill-${i}`}
                />
                <span className="mt-2 text-xs text-gray-300">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
