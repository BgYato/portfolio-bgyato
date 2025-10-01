function CV() {
  return (
    <section
      id="cv"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400">Hoja de Vida</h2>

      <p className="text-gray-300 text-center max-w-2xl mb-10">
        Acá podrás ver y descargar mi hoja de vida en formato PDF, que incluye
        un resumen de mi experiencia, educación y habilidades.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-6xl">
        <div className="flex flex-col space-y-4">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition text-center"
          >
            Ver CV Completo
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition text-center"
          >
            Descargar CV
          </a>
        </div>

        <div className="w-full h-[500px] xl:h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="/cv.pdf"
            title="CV Preview"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default CV;
