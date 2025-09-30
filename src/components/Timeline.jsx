import { events } from "../utils/eventsData";

function Timeline() {
  return (
    <section
      id="timeline"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Biografía</h2>
      <div className="space-y-6">
        {events.map((e, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="text-cyan-400 font-bold">{e.year}</div>
            <div className="text-gray-300">{e.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Timeline;
