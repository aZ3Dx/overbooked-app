export function PuntosNormales(resultados: {
  [key: string]: { [key: string]: number };
}) {
  const puntosSeparados: { [key: string]: { [key: string]: number } } = {};

  for (const jugador in resultados) {
    // Inicializa el objeto para cada jugador antes del bucle interno
    puntosSeparados[jugador] = {};
    puntosSeparados[jugador]["puntosPorParerjasDeR"] =
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
  }

  // Consola para ver los puntos separados
  console.log(puntosSeparados);

  // Si hay mas de un jugador se compara quien tiene el grupo mas grande de cada color y se le multiplica por 2, si hay 2 o mas jugadores con el grupo mas grande se le multiplica por 2 a todos
  // Tambien quien tenga mas Sobrevendidos se le resta 2 puntos extra
  if (Object.keys(resultados).length > 1) {
    const gruposB: number[] = [];
    const gruposG: number[] = [];
    const gruposY: number[] = [];
    const sobrevendidos: number[] = [];

    for (const jugador in resultados) {
      gruposB.push(resultados[jugador]["B Mayor Grupo"]);
      gruposG.push(resultados[jugador]["G Mayor Grupo"]);
      gruposY.push(resultados[jugador]["Y Mayor Grupo"]);
      sobrevendidos.push(resultados[jugador]["Sobrevendido"]);
    }

    const maxGrupoB = Math.max(...gruposB);
    const maxGrupoG = Math.max(...gruposG);
    const maxGrupoY = Math.max(...gruposY);
    const maxSobrevendidos = Math.max(...sobrevendidos);

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
    }
  }

  const puntos: { [key: string]: number } = {};

  for (const jugador in puntosSeparados) {
    puntos[jugador] = Object.values(puntosSeparados[jugador]).reduce(
      (a, b) => a + b
    );
  }

  return puntos;
}
