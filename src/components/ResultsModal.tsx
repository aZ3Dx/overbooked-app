import { Fragment, useState } from "react";
import { mapeoCategorias } from "@/utils/Points";

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
  // Hallamos la posición del jugador con más puntos
  const maxPuntos = Math.max(...Object.values(puntos));
  const posMaxPuntos = Object.values(puntos).indexOf(maxPuntos);
  return (
    <div className="flex flex-col gap-4 fixed items-center justify-center bg-gray-200 bg-opacity-70 w-full h-full top-0 left-0 z-10">
      <div className="grid grid-cols-4 text-2xl">
        <span>=</span>
        <span>=</span>
        <span>=</span>
        <span>=</span>
      </div>
      <h1 className="text-2xl font-bold">Resultados</h1>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(puntos).map((jugador, i) => (
          <Fragment key={jugador}>
            <h2
              className={`font-extrabold ${
                i === posMaxPuntos && "text-green-700"
              }`}
            >{`Jugador ${i + 1}`}</h2>
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
          {/* {Object.keys(puntosSeparados).map((jugador, i) => (
            <Fragment key={jugador}>
              <h2>{`Jugador ${i + 1}`}</h2>
              {Object.keys(puntosSeparados[jugador]).map((punto) => (
                <p key={punto}>
                  {punto}: {puntosSeparados[jugador][punto]}
                </p>
              ))}
            </Fragment>
          ))} */}
          {/* Tabla de puntos */}
          {/* En eje X se muestran los Jugadores y en eje Y los puntos */}
          <table className="border border-black mx-1">
            <thead>
              <tr>
                <th className="border border-black">Jugador</th>
                {Object.keys(puntosSeparados).map((jugador, i) => (
                  <th
                    key={jugador}
                    className={`border border-black ${
                      i === posMaxPuntos && "bg-green-600"
                    }`}
                  >
                    {`Jugador ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(
                puntosSeparados[Object.keys(puntosSeparados)[0]]
              ).map((punto) => (
                <tr key={punto}>
                  {/* Solo si se cuenta con su mapeo en mapeoCategorias se muestra, si no, se muestra como está en el objeto */}
                  {/* Si no está es porque es un evento, entonces mostralo con fondo degradao morado */}
                  {mapeoCategorias[punto] ? (
                    <td className="border border-black text-center text-sm">
                      {mapeoCategorias[punto]}
                    </td>
                  ) : (
                    <td className="border border-black text-center text-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                      {punto}
                    </td>
                  )}
                  {/* <td className="border border-black">{punto}</td> */}
                  {Object.keys(puntosSeparados).map((jugador) => (
                    <td
                      key={jugador}
                      className="border border-black text-center"
                    >
                      {puntosSeparados[jugador][punto]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="border border-black px-2 rounded-md"
        onClick={() => handleCerrarModal()}
      >
        Cerrar
      </button>
      <div className="grid grid-cols-4 text-2xl">
        <span>=</span>
        <span>=</span>
        <span>=</span>
        <span>=</span>
      </div>
    </div>
  );
}
