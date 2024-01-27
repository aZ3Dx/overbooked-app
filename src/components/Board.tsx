import { Suspense } from "react";
import BoardSection from "./BoardSection";
import BoardExtra from "./BoardExtra";

type BoardProps = {
  tipoTablero: number;
  color: string;
  tableroIndex: number;
};

export default function Board({
  tipoTablero,
  color,
  tableroIndex,
}: BoardProps) {
  const colorClase =
    color === "Rojo"
      ? "bg-red-500"
      : color === "Azul"
      ? "bg-blue-500"
      : color === "Verde"
      ? "bg-green-500"
      : color === "Amarillo"
      ? "bg-yellow-500"
      : color === "Blanco"
      ? "bg-slate-50"
      : "bg-slate-400";
  return (
    <div className="border border-black rounded-md p-2">
      <p className="text-lg font-bold">Jugador {tableroIndex + 1}</p>
      <div
        className="border-2 border-slate-500 rounded-xl p-2 grid"
        data-tablero={tableroIndex}
      >
        {tipoTablero === 1 ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              {/* Grilla de 3x5, son en total 15 lozetas */}
              <BoardSection
                colorClase={colorClase}
                filas={5}
                columnas={3}
                seccionIndex={0}
              />
              {/* Grilla de 4x5, son en total 20 lozetas */}
              <BoardSection
                colorClase={colorClase}
                filas={5}
                columnas={4}
                seccionIndex={1}
              />
              {/* Grilla de 3x5, son en total 15 lozetas */}
              <BoardSection
                colorClase={colorClase}
                filas={5}
                columnas={3}
                seccionIndex={2}
              />
            </div>
            <BoardExtra />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Grilla de 4x5, son en total 20 lozetas */}
              <BoardSection
                colorClase={colorClase}
                filas={5}
                columnas={4}
                seccionIndex={0}
              />
              {/* Grilla de 4x5, son en total 20 lozetas */}
              <BoardSection
                colorClase={colorClase}
                filas={5}
                columnas={4}
                seccionIndex={1}
              />
            </div>
            <BoardExtra />
          </>
        )}
      </div>
      {/* <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span>Sobrevendido</span>
          <input type="range" min="0" max="10" className="w-20" />
        </div>
        <div className="flex items-center gap-2">
          <label className="">Vales</label>
          <input type="range" min="0" max="24" className="w-20" />
        </div>
      </div> */}
    </div>
  );
}
