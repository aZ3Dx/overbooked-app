export const mapeoCategorias: { [key: string]: string } = {
  puntosPorParejasDeR: "Parejas",
  puntosPorWRodeados: "Niños Rodeados",
  puntosPorMayorGrupoB: "Grupo de Azules",
  puntosPorMayorGrupoG: "Grupo de Verdes",
  puntosPorMayorGrupoY: "Grupo de Amarillos",
  puntosPorVales: "Vales",
  puntosPorEstrella: "Estrellas",
  puntosPorV: "Asientos Vacíos",
  puntosPorSobrevendido: "Sobrevendidos",
};

export function PuntosNormales(resultados: {
  [key: string]: { [key: string]: number };
}) {
  const puntosSeparados: { [key: string]: { [key: string]: number } } = {};

  for (const jugador in resultados) {
    // Inicializa el objeto para cada jugador antes del bucle interno
    puntosSeparados[jugador] = {};
    puntosSeparados[jugador]["puntosPorParejasDeR"] =
      resultados[jugador]["R Parejas"] * 5;
    puntosSeparados[jugador]["puntosPorWRodeados"] =
      resultados[jugador]["W Rodeados"] * 3;
    puntosSeparados[jugador]["puntosPorMayorGrupoB"] =
      resultados[jugador]["B Mayor Grupo"];
    puntosSeparados[jugador]["puntosPorMayorGrupoG"] =
      resultados[jugador]["G Mayor Grupo"];
    puntosSeparados[jugador]["puntosPorMayorGrupoY"] =
      resultados[jugador]["Y Mayor Grupo"];
    puntosSeparados[jugador]["puntosPorVales"] = Math.floor(
      resultados[jugador]["Vales"] / 2
    );
    puntosSeparados[jugador]["puntosPorEstrella"] =
      resultados[jugador]["Estrellas"];
    puntosSeparados[jugador]["puntosPorV"] = resultados[jugador]["V"] * -1;
    puntosSeparados[jugador]["puntosPorSobrevendido"] =
      resultados[jugador]["Sobrevendido"] * -2;
    // Parte Eventos
    // Para las demás cosas (eventos) del array resultados simplemente se copia el valor al array puntosSeparados
    for (const evento in resultados[jugador]) {
      if (
        evento !== "R Parejas" &&
        evento !== "W Rodeados" &&
        evento !== "B Mayor Grupo" &&
        evento !== "G Mayor Grupo" &&
        evento !== "Y Mayor Grupo" &&
        evento !== "Vales" &&
        evento !== "Estrellas" &&
        evento !== "V" &&
        evento !== "Sobrevendido"
      ) {
        puntosSeparados[jugador][evento] = resultados[jugador][evento];
      }
    }
  }

  // Consola para ver los puntos separados
  // console.log(puntosSeparados);

  // Si hay mas de un jugador se compara quien tiene el grupo mas grande de cada color y se le multiplica por 2, si hay 2 o mas jugadores con el grupo mas grande se le multiplica por 2 a todos
  // Tambien quien tenga mas Sobrevendidos se le resta 2 puntos extra
  if (Object.keys(resultados).length > 1) {
    const gruposB: number[] = [];
    const gruposG: number[] = [];
    const gruposY: number[] = [];
    const sobrevendidos: number[] = [];
    const eventoLSB: number[] = [];

    for (const jugador in resultados) {
      gruposB.push(resultados[jugador]["B Mayor Grupo"]);
      gruposG.push(resultados[jugador]["G Mayor Grupo"]);
      gruposY.push(resultados[jugador]["Y Mayor Grupo"]);
      sobrevendidos.push(resultados[jugador]["Sobrevendido"]);
      eventoLSB.push(resultados[jugador]["Low Season Blues"]);
    }

    const maxGrupoB = Math.max(...gruposB);
    const maxGrupoG = Math.max(...gruposG);
    const maxGrupoY = Math.max(...gruposY);
    const maxSobrevendidos = Math.max(...sobrevendidos);
    const maxLSB = Math.max(...eventoLSB);

    for (const jugador in resultados) {
      if (resultados[jugador]["B Mayor Grupo"] === maxGrupoB) {
        puntosSeparados[jugador]["puntosPorMayorGrupoB"] *= 2;
      }
      if (resultados[jugador]["G Mayor Grupo"] === maxGrupoG) {
        puntosSeparados[jugador]["puntosPorMayorGrupoG"] *= 2;
      }
      if (resultados[jugador]["Y Mayor Grupo"] === maxGrupoY) {
        puntosSeparados[jugador]["puntosPorMayorGrupoY"] *= 2;
      }
      if (
        resultados[jugador]["Sobrevendido"] === maxSobrevendidos &&
        maxSobrevendidos > 0
      ) {
        puntosSeparados[jugador]["puntosPorSobrevendido"] -= 2;
      }
      if (resultados[jugador]["Low Season Blues"] === maxLSB && maxLSB > 0) {
        puntosSeparados[jugador]["Low Season Blues"] = 5;
      } else {
        puntosSeparados[jugador]["Low Season Blues"] = 0;
      }
    }
  }

  const puntos = ContandoPuntos(puntosSeparados);

  return puntos;
}

function ContandoPuntos(puntosSeparados: {
  [key: string]: { [key: string]: number };
}) {
  const puntos: { [key: string]: number } = {};

  for (const jugador in puntosSeparados) {
    puntos[jugador] = Object.values(puntosSeparados[jugador]).reduce(
      (a, b) => a + b
    );
  }

  return { puntos, puntosSeparados };
}
