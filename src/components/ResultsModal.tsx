import { Fragment, useState } from "react";

type ResultsModalProps = {
  puntos: { [key: string]: number };
  handleCerrarModal: () => void;
  puntosSeparados: { [key: string]: { [key: string]: number } };
};

export default function ResultsModal({
  puntos,
  handleCerrarModal,
  puntosSeparados,
}: ResultsModalProps) {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  return (
    <div className="flex flex-col gap-4 fixed items-center justify-center bg-gray-200 w-full h-full top-0 left-0 z-10">
      <div className="grid grid-cols-4">
        <span>=</span>
        <span>=</span>
        <span>=</span>
        <span>=</span>
      </div>
      <h1>Resultados</h1>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(puntos).map((jugador, i) => (
          <Fragment key={jugador}>
            <h2>{`Jugador ${i + 1}`}</h2>
            <p className="text-right">{`${puntos[jugador]} puntos`}</p>
          </Fragment>
        ))}
      </div>
      {/* Sección donde se verá el detalle de los puntos utilizando puntosSeparados */}
      {/* Se recorre el objeto puntosSeparados (por jugador) luego se recorre y se muestra cada propiedad que contenga */}
      <button
        className="border border-black px-2 rounded-md"
        onClick={() => setMostrarDetalle(!mostrarDetalle)}
      >
        {mostrarDetalle ? "Ocultar" : "Mostrar"} detalle
      </button>
      {mostrarDetalle && (
        <div>
          {Object.keys(puntosSeparados).map((jugador, i) => (
            <Fragment key={jugador}>
              <h2>{`Jugador ${i + 1}`}</h2>
              {Object.keys(puntosSeparados[jugador]).map((punto) => (
                <p key={punto}>
                  {punto}: {puntosSeparados[jugador][punto]}
                </p>
              ))}
            </Fragment>
          ))}
        </div>
      )}
      {/* <div>
        {Object.keys(puntosSeparados).map((jugador, i) => (
          <div key={jugador}>
            <h2>{`Jugador ${i + 1}`}</h2>
            {Object.keys(puntosSeparados[jugador]).map((punto) => (
              <p key={punto}>
                {punto}: {puntosSeparados[jugador][punto]}
              </p>
            ))}
          </div>
        ))}
      </div> */}
      <button
        className="border border-black px-2 rounded-md"
        onClick={() => handleCerrarModal()}
      >
        Cerrar
      </button>
      <div className="grid grid-cols-4">
        <span>=</span>
        <span>=</span>
        <span>=</span>
        <span>=</span>
      </div>
    </div>
  );
}
