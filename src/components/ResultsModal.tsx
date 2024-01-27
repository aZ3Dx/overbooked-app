type ResultsModalProps = {
  puntos: { [key: string]: number };
  handleCerrarModal: () => void;
};

export default function ResultsModal({
  puntos,
  handleCerrarModal,
}: ResultsModalProps) {
  return (
    <div className="flex flex-col gap-4 absolute items-center justify-center bg-gray-200 w-full h-full">
      <h1>Resultados</h1>
      {Object.keys(puntos).map((jugador, i) => (
        <p key={jugador}>
          {`Jugador ${i + 1}`}: {puntos[jugador]}
        </p>
      ))}
      <button
        className="border border-black px-2 rounded-md"
        onClick={() => handleCerrarModal()}
      >
        Cerrar
      </button>
    </div>
  );
}
