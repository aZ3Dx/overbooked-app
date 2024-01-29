"use client";
import BoardsContainer from "@/components/BoardsContainer";
import ResultsModal from "@/components/ResultsModal";
import {
  calculoEventos,
  contarCuantosVHay,
  contarParejasDeR,
  contarWRodeados,
  mayorGrupo,
} from "@/utils/Calculate";
import { ObtenerInfo } from "@/utils/GetInfo";
import { PuntosNormales } from "@/utils/Points";
import { useState } from "react";
import confetti from "canvas-confetti";
import { eventos, eventosDisponibles } from "@/utils/eventos";

export default function HomePage() {
  const [cantidadJugadores, setCantidadJugadores] = useState(1);
  const [color, setColor] = useState("Gris");
  const [resultadosSolicitados, setResultadosSolicitados] = useState(false);
  const [resultadosObtenidos, setResultadosObtenidos] = useState(false);
  const [puntos, setPuntos] = useState<{ [key: string]: number }>({});
  const [puntosSeparados, setPuntosSeparados] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [eventosSeleccionados, setEventosSeleccionados] = useState<string[]>(
    []
  );
  const [mostrarEventos, setMostrarEventos] = useState(false);

  const handleCalcularPuntos = () => {
    setResultadosSolicitados(true);

    const { data: juego, posicionColoresPorSeccion } =
      ObtenerInfo(cantidadJugadores);
    const juegoBackup = JSON.parse(JSON.stringify(juego));
    // console.log(juego);
    // console.log(juego);
    // console.log(posicionColoresPorSeccion);

    //Recojemos el valor del input con name="sobrevendido" y name="vales" dentro de cada div con data-tablero
    //Hacemos un array con los valores de los inputs por cada tablero
    const sobrevendido = [];
    const vales = [];
    const estrellas = [];
    for (let i = 0; i < cantidadJugadores; i++) {
      const tableroDiv = document.querySelector(`[data-tablero="${i}"]`);
      const sobrevendidoInput = tableroDiv?.querySelector(
        '[name="sobrevendido"]'
      ) as HTMLInputElement;
      const valesInput = tableroDiv?.querySelector(
        '[name="vales"]'
      ) as HTMLInputElement;
      sobrevendido.push(parseInt(sobrevendidoInput.value));
      vales.push(parseInt(valesInput.value));
      // Recolectamos las estrellas
      // data-estrellas-index=estrellas
      const estrellasInputs = document.querySelector(`[data-estrellas-${i}]`);
      estrellas.push(parseInt(estrellasInputs?.textContent || "0"));
    }

    const resultados: { [key: string]: { [key: string]: number } } = {};
    //Recorrer cada tablero de juego
    let i = 0;
    for (const tablero in juego) {
      resultados[`jugador${tablero}`] = {};
      //Recorremos cada seccion del tablero
      let wRodeados = 0;
      let rParejas = 0;
      let v = 0;
      let bMayorGrupo = 0;
      let gMayorGrupo = 0;
      let yMayorGrupo = 0;
      for (const seccion in juego[tablero]) {
        //Contamos los W rodeados en cada seccion
        wRodeados += contarWRodeados(
          juego[tablero][seccion],
          posicionColoresPorSeccion[tablero][seccion]["W"]
        );
        //Contamos cantidad de V en cada seccion
        v += contarCuantosVHay(
          posicionColoresPorSeccion[tablero][seccion]["V"]
        );
        //Contamos las R parejas en cada seccion
        rParejas += contarParejasDeR(
          juego[tablero][seccion],
          posicionColoresPorSeccion[tablero][seccion]["R"]
        );
        // Contamos el mayor grupo de cada color
        bMayorGrupo = Math.max(
          bMayorGrupo,
          mayorGrupo(
            juego[tablero][seccion],
            posicionColoresPorSeccion[tablero][seccion]["B"],
            "B"
          )
        );
        gMayorGrupo = Math.max(
          gMayorGrupo,
          mayorGrupo(
            juego[tablero][seccion],
            posicionColoresPorSeccion[tablero][seccion]["G"],
            "G"
          )
        );
        yMayorGrupo = Math.max(
          yMayorGrupo,
          mayorGrupo(
            juego[tablero][seccion],
            posicionColoresPorSeccion[tablero][seccion]["Y"],
            "Y"
          )
        );
      }
      resultados[`jugador${tablero}`]["W Rodeados"] = wRodeados;
      resultados[`jugador${tablero}`]["V"] = v;
      resultados[`jugador${tablero}`]["R Parejas"] = rParejas;
      resultados[`jugador${tablero}`]["B Mayor Grupo"] = bMayorGrupo;
      resultados[`jugador${tablero}`]["G Mayor Grupo"] = gMayorGrupo;
      resultados[`jugador${tablero}`]["Y Mayor Grupo"] = yMayorGrupo;
      resultados[`jugador${tablero}`]["Estrellas"] = estrellas[i];
      resultados[`jugador${tablero}`]["Sobrevendido"] = sobrevendido[i];
      resultados[`jugador${tablero}`]["Vales"] = vales[i];
      i++;
      // Validaciones (posteriormente se puede hacer un componente para esto)
    }
    // Parte de los eventos
    // Si hay eventos seleccionados
    if (eventosSeleccionados.length > 0) {
      calculoEventos(
        juegoBackup,
        posicionColoresPorSeccion,
        eventosSeleccionados,
        resultados
      );
    }
    // Contar los puntos de cada jugador
    const { puntos: puntosNormales, puntosSeparados } =
      PuntosNormales(resultados);

    setPuntos(puntosNormales);
    setPuntosSeparados(puntosSeparados);
    setResultadosObtenidos(true);
    //Lanzar bastantes confettis
    confetti({
      particleCount: 200,
      spread: 180,
      origin: { y: 0.6 },
    });
  };

  const aumentarCantidadJugadores = () => {
    if (cantidadJugadores < 4) setCantidadJugadores(cantidadJugadores + 1);
  };

  const disminuirCantidadJugadores = () => {
    if (cantidadJugadores > 1) setCantidadJugadores(cantidadJugadores - 1);
  };

  const cambiarColor = (color: string) => {
    setColor(color);
  };

  //Funcion para pasar al modal y que se cierre, se vuelve resultadoObtenidos a false y resultadosSolicitados a false
  const handleCerrarModal = () => {
    setResultadosObtenidos(false);
    setResultadosSolicitados(false);
  };

  //Funciones relacionadas a Eventos
  const toggleEventosSeleccionados = (evento: string) => {
    if (eventosSeleccionados.includes(evento)) {
      setEventosSeleccionados(eventosSeleccionados.filter((e) => e !== evento));
    } else {
      setEventosSeleccionados([...eventosSeleccionados, evento]);
    }
  };

  return (
    <>
      {/* Un div que oscurece la pantalla y muestra un loader mientras se calculan los puntos */}
      {!resultadosObtenidos && (
        <div
          className={`${
            resultadosSolicitados ? "block" : "hidden"
          } fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50`}
        >
          <div className="flex h-full items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
          </div>
        </div>
      )}
      {/* Modal que muestra los resultados */}
      {resultadosSolicitados && resultadosObtenidos && (
        <ResultsModal
          puntos={puntos}
          handleCerrarModal={handleCerrarModal}
          puntosSeparados={puntosSeparados}
        />
      )}
      <main
        className={`mx-auto w-full md:w-1/2 ${
          resultadosObtenidos ? "blur" : ""
        }`}
      >
        <div className="mb-2">
          <h1 className="text-center align-middle font-bold text-lg bg-orange-400 py-3 my-2">
            Overbooked - Points Counter
          </h1>
          <div className="mx-2">
            <span>Cantidad de jugadores:</span>
            <button
              className="border border-slate-500 px-2 rounded-md ml-2"
              onClick={() => disminuirCantidadJugadores()}
            >
              -
            </button>
            <div className="inline-block px-2">{cantidadJugadores}</div>
            <button
              className="border border-slate-500 px-2 rounded-md"
              onClick={() => aumentarCantidadJugadores()}
            >
              +
            </button>
          </div>
          <div className="mx-2">
            <div className="my-2">
              <span>Eventos:</span>
              <button
                className={`border px-2 rounded-md ml-2 text-slate-700 ${
                  mostrarEventos ? "bg-red-200" : "bg-green-200"
                }`}
                onClick={() => setMostrarEventos(!mostrarEventos)}
              >
                {mostrarEventos ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {mostrarEventos && (
              <div className="flex flex-wrap gap-1 mb-2">
                {eventos.map((evento, i) => (
                  <div
                    key={evento}
                    className={`flex items-center gap-1 border border-slate-400 rounded-md px-1 ${
                      eventosDisponibles[i] ? "" : "text-slate-400"
                    }`}
                  >
                    <label className="cursor-pointer flex items-center">
                      <input
                        type="checkbox"
                        checked={eventosSeleccionados.includes(evento)}
                        onChange={() => toggleEventosSeleccionados(evento)}
                        className="mr-1 cursor-pointer"
                        disabled={eventosDisponibles[i] ? false : true}
                      />
                      {evento}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {eventosSeleccionados.length > 0 && (
              <div>
                {/* <span className="font-bold">Eventos seleccionados:</span> */}
                <div className="flex flex-wrap gap-1">
                  {eventosSeleccionados.map((evento) => (
                    // Ponerle fondo degradado como morado y que se vea el texto
                    <div
                      key={evento}
                      // className="flex items-center gap-1 border border-slate-400 rounded-md px-1"
                      className="flex items-center gap-1 border border-slate-400 text-white rounded-md ps-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                    >
                      {/* Solo mostrar los eventos */}
                      <label className="flex items-center">{evento}</label>
                      <button
                        // Background transparente, solo un poco
                        className="text-red-500 px-1 bg-white bg-opacity-50 rounded-r-md text-sm h-full"
                        onClick={() =>
                          setEventosSeleccionados(
                            eventosSeleccionados.filter((e) => e !== evento)
                          )
                        }
                      >
                        &#10006;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Barra donde se elije el color a usar */}
        <div className="mb-2 sticky top-0 bg-slate-600 p-2 border border-slate-500">
          <div className="flex gap-1 flex-wrap justify-center text-white">
            <button
              className={`border-2 border-red-500 px-2 rounded-md ${
                color === "Rojo" ? "bg-red-500" : ""
              }`}
              onClick={() => cambiarColor("Rojo")}
            >
              Rojo
            </button>
            <button
              className={`border-2 border-blue-500 px-2 rounded-md ${
                color === "Azul" ? "bg-blue-500" : ""
              }`}
              onClick={() => cambiarColor("Azul")}
            >
              Azul
            </button>
            <button
              className={`border-2 border-green-500 px-2 rounded-md ${
                color === "Verde" ? "bg-green-500" : ""
              }`}
              onClick={() => cambiarColor("Verde")}
            >
              Verde
            </button>
            <button
              className={`border-2 border-yellow-500 px-2 rounded-md ${
                color === "Amarillo" ? "bg-yellow-500" : ""
              }`}
              onClick={() => cambiarColor("Amarillo")}
            >
              Amarillo
            </button>
            <button
              className={`border-2 border-slate-50 px-2 rounded-md ${
                color === "Blanco" ? "bg-slate-50 text-black" : ""
              }`}
              onClick={() => cambiarColor("Blanco")}
            >
              Blanco
            </button>
            <button
              className={`border-2 border-slate-400 px-2 rounded-md ${
                color === "Gris" ? "bg-slate-400" : ""
              }`}
              onClick={() => cambiarColor("Gris")}
            >
              V
            </button>
          </div>
        </div>
        <BoardsContainer cantidadJugadores={cantidadJugadores} color={color} />
        <div className="text-center mt-2">
          <button
            className="bg-slate-800 text-slate-100 rounded-md p-2"
            onClick={() => handleCalcularPuntos()}
          >
            Calcular Puntos
          </button>
        </div>
      </main>
    </>
  );
}
