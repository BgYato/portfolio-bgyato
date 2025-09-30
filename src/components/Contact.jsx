function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      {" "}
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Contacto</h2>{" "}
      <form className="w-full max-w-md space-y-4">
        {" "}
        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-400"
        />{" "}
        <input
          type="email"
          placeholder="Correo"
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-400"
        />{" "}
        <textarea
          placeholder="Mensaje"
          rows="4"
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-400"
        ></textarea>{" "}
        <button
          type="submit"
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition"
        >
          {" "}
          Enviar{" "}
        </button>{" "}
      </form>{" "}
    </section>
  );
}
export default Contact;
