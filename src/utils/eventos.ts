export const eventos: string[] = [
  "Adorable Kids",
  "Buddy Time",
  "Corner Seats",
  "Couples Retreat",
  "Emergency Exit Assistance",
  "Family Vacation",
  "Full Flight",
  "Kids Gone Wild",
  "Lonely Christmas",
  "Low Season Blues",
  "Missing Friends",
  "School Holydays",
  "Three's Company",
  "Beautiful Sunset",
  "Like Sardines",
];

export const eventosDisponibles: Boolean[] = [
  true, //Adorable Kids
  true, //Buddy Time
  true, //Corner Seats
  true, //Couples Retreat
  true, //Emergency Exit Assistance
  true, //Family Vacation
  true, //Full Flight
  true, //Kids Gone Wild
  true, //Lonely Christmas
  true, //Low Season Blues
  true, //Missing Friends
  true, //School Holydays
  true, //Three's Company
  true, //Beautiful Sunset
  true, //Like Sardines
];

type ParametrosDeEventos = {
  juego: { [key: string]: { [key: string]: string[][] } };
  posicionColoresPorSeccion: {
    [key: string]: { [key: string]: { [key: string]: number[][] } };
  };
  resultados: { [key: string]: { [key: string]: number } };
};

//Mapeo de eventos a funciones
export const eventosFunciones: { [key: string]: Function } = {
  "Adorable Kids": adorableKids,
  "Buddy Time": buddyTime,
  "Corner Seats": cornerSeats,
  "Couples Retreat": couplesRetreat,
  "Emergency Exit Assistance": emergencyExitAssistance,
  "Family Vacation": familyVacation,
  "Full Flight": fullFlight,
  "Kids Gone Wild": kidsGoneWild,
  "Lonely Christmas": lonelyChristmas,
  "Low Season Blues": lowSeasonBlues,
  "Missing Friends": missingFriends,
  "School Holydays": schoolHolydays,
  "Three's Company": threesCompany,
  "Beautiful Sunset": beautifulSunset,
  "Like Sardines": likeSardines,
};

function adorableKids(parametros: ParametrosDeEventos) {
  function estaRodeado(matrix: string[][], row: number, col: number) {
    let arriba = false;
    let abajo = false;
    let izquierda = false;
    let derecha = false;

    if (
      row > 0 &&
      matrix[row - 1][col] !== "W" &&
      matrix[row - 1][col] !== "V"
    ) {
      arriba = true;
    }

    if (
      row < matrix.length - 1 &&
      matrix[row + 1][col] !== "W" &&
      matrix[row + 1][col] !== "V"
    ) {
      abajo = true;
    }

    if (
      col > 0 &&
      matrix[row][col - 1] !== "W" &&
      matrix[row][col - 1] !== "V"
    ) {
      izquierda = true;
    }

    if (
      col < matrix[0].length - 1 &&
      matrix[row][col + 1] !== "W" &&
      matrix[row][col + 1] !== "V"
    ) {
      derecha = true;
    }

    return arriba && abajo && izquierda && derecha;
  }
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["W"];

      let count = 0;
      posiciones.forEach((pos) => {
        if (estaRodeado(matrix, pos[0], pos[1])) {
          count++;
        }
      });
      principalCounter += count;
    }
    resultados[`jugador${tablero}`]["Adorable Kids"] = principalCounter * 4;
  }
}

function buddyTime(parametros: ParametrosDeEventos) {
  let { juego, posicionColoresPorSeccion, resultados } = parametros;
  const colores = ["B", "G", "Y"];
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let copia = JSON.parse(JSON.stringify(matrix));
      let count = 0;
      for (const color of colores) {
        const posiciones = posicionColoresPorSeccion[tablero][seccion][color];
        for (const pos of posiciones) {
          if (contarElementosVecinos(copia, pos[0], pos[1], color) >= 3) {
            count++;
            break;
          }
        }
      }
      if (count === 3) principalCounter += 1;
    }
    resultados[`jugador${tablero}`]["Buddy Time"] = principalCounter * 5;
  }
}

function cornerSeats(parametros: ParametrosDeEventos) {
  const { juego, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    let color: string[] = [];
    const secciones = juego[tablero];
    // Analizamos la primera seccion
    let matrix = secciones[Object.keys(secciones)[0]];
    color.push(matrix[0][0]);
    color.push(matrix[matrix.length - 1][0]);
    // Ahora la ultima seccion
    matrix =
      Object.keys(secciones).length > 2
        ? secciones[Object.keys(secciones)[2]]
        : secciones[Object.keys(secciones)[1]];
    color.push(matrix[0][matrix[0].length - 1]);
    color.push(matrix[matrix.length - 1][matrix[0].length - 1]);
    // Analizar que en color no haya ningun "V" y que sean todos diferentes
    if (!color.includes("V") && new Set(color).size === color.length) {
      principalCounter += 6;
    }
    resultados[`jugador${tablero}`]["Corner Seats"] = principalCounter;
  }
}

function couplesRetreat(parametros: ParametrosDeEventos) {
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["R"];
      let count = 0;

      let copia = JSON.parse(JSON.stringify(matrix));
      posiciones.forEach((pos) => {
        if (contarElementosVecinos(copia, pos[0], pos[1], "R") === 2) {
          count++;
        }
      });

      principalCounter += count >= 3 ? 1 : 0;
    }
    resultados[`jugador${tablero}`]["Couples Retreat"] = principalCounter * 4;
  }
}

function emergencyExitAssistance(parametros: ParametrosDeEventos) {
  const filaLlena = (matrix: string[][], fila: number) => {
    for (let i = 0; i < matrix[fila].length; i++) {
      if (matrix[fila][i] === "V") {
        return false;
      }
    }
    return true;
  };
  const { juego, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      if (filaLlena(juego[tablero][seccion], 2)) {
        principalCounter += 1;
      }
    }
    principalCounter =
      principalCounter === Object.keys(juego[tablero]).length ? 10 : 0;
    resultados[`jugador${tablero}`]["Emergency Exit Assistance"] =
      principalCounter;
  }
}

function familyVacation(parametros: ParametrosDeEventos) {
  function estaRodeado(matrix: string[][], row: number, col: number) {
    let arriba = false;
    let abajo = false;
    let izquierda = false;
    let derecha = false;

    if (
      row === 0 ||
      (matrix[row - 1][col] !== "W" && matrix[row - 1][col] !== "V")
    ) {
      arriba = true;
    }

    if (
      row === matrix.length - 1 ||
      (matrix[row + 1][col] !== "W" && matrix[row + 1][col] !== "V")
    ) {
      abajo = true;
    }

    if (
      col === 0 ||
      (matrix[row][col - 1] !== "W" && matrix[row][col - 1] !== "V")
    ) {
      izquierda = true;
    }

    if (
      col === matrix[0].length - 1 ||
      (matrix[row][col + 1] !== "W" && matrix[row][col + 1] !== "V")
    ) {
      derecha = true;
    }

    return arriba && abajo && izquierda && derecha;
  }
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let ubicacionParejas: number[][] = [];
      let ubicacionesDeW: number[][] = [];
      // Primero buscamos las parejas y guardamos sus posiciones (serían 2 posiciones, una por cada integrante de la pareja)
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["R"];
      posiciones.forEach((pos) => {
        let copia = JSON.parse(JSON.stringify(matrix));
        if (contarElementosVecinos(copia, pos[0], pos[1], "R") === 2) {
          ubicacionParejas.push(pos);
        }
      });
      // Luego guardamos las posicion de las W que se encuentren al lado izquierdo o derecho de las parejas (analizamos cada integrante de la pareja)
      ubicacionParejas.forEach((pos) => {
        let [row, col] = pos;
        if (col > 0 && matrix[row][col - 1] === "W") {
          ubicacionesDeW.push([row, col - 1]);
        }
        if (col < matrix[0].length - 1 && matrix[row][col + 1] === "W") {
          ubicacionesDeW.push([row, col + 1]);
        }
      });
      // Finalmente, comprobamos cuantas W se encuentran rodeadas
      let count = 0;
      ubicacionesDeW.forEach((pos) => {
        if (estaRodeado(matrix, pos[0], pos[1])) {
          count++;
        }
      });
      if (count === 1) principalCounter += 1;
    }
    resultados[`jugador${tablero}`]["Family Vacation"] = principalCounter * 3;
  }
}

function fullFlight(parametros: ParametrosDeEventos) {
  const columnasLlenas = (matrix: string[][]) => {
    let counter = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      let lleno = true;
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[j][i] === "V") {
          lleno = false;
          break;
        }
      }
      if (lleno) {
        counter++;
      }
    }
    return counter;
  };
  const { juego, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      principalCounter += columnasLlenas(juego[tablero][seccion]);
    }
    resultados[`jugador${tablero}`]["Full Flight"] = principalCounter * 4;
  }
}

function kidsGoneWild(parametros: ParametrosDeEventos) {
  const estaRodeado = (matrix: string[][], row: number, col: number) => {
    let arriba = false;
    let abajo = false;
    let izquierda = false;
    let derecha = false;
    if (
      row === 0 ||
      (matrix[row - 1][col] !== "W" && matrix[row - 1][col] !== "V")
    ) {
      arriba = true;
    }

    if (
      row === matrix.length - 1 ||
      (matrix[row + 1][col] !== "W" && matrix[row + 1][col] !== "V")
    ) {
      abajo = true;
    }

    if (
      col === 0 ||
      (matrix[row][col - 1] !== "W" && matrix[row][col - 1] !== "V")
    ) {
      izquierda = true;
    }

    if (
      col === matrix[0].length - 1 ||
      (matrix[row][col + 1] !== "W" && matrix[row][col + 1] !== "V")
    ) {
      derecha = true;
    }

    return arriba && abajo && izquierda && derecha;
  };
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = -0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["W"];

      let count = 0;
      posiciones.forEach((pos) => {
        if (!estaRodeado(matrix, pos[0], pos[1])) {
          count++;
        }
      });
      principalCounter -= count;
    }
    resultados[`jugador${tablero}`]["Kids Gone Wild"] = principalCounter * 2;
  }
}

function lonelyChristmas(parametros: ParametrosDeEventos) {
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = -0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["R"];

      let copia = JSON.parse(JSON.stringify(matrix));
      posiciones.forEach((pos) => {
        if (contarElementosVecinos(copia, pos[0], pos[1], "R") === 1) {
          principalCounter -= 1;
        }
      });
    }
    resultados[`jugador${tablero}`]["Lonely Christmas"] = principalCounter * 3;
  }
}

function lowSeasonBlues(parametros: ParametrosDeEventos) {
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    let maxGroup = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["V"];

      let copia = JSON.parse(JSON.stringify(matrix));
      posiciones.forEach((pos) => {
        let count = contarElementosVecinos(copia, pos[0], pos[1], "V");
        maxGroup = Math.max(maxGroup, count);
      });
    }
    principalCounter = maxGroup;
    resultados[`jugador${tablero}`]["Low Season Blues"] = principalCounter;
  }
}

function missingFriends(parametros: ParametrosDeEventos) {
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  const colores = ["B", "G", "Y"];
  for (const tablero in juego) {
    let principalCounter = 0;
    let cantidadDeB = 0;
    let cantidadDeG = 0;
    let cantidadDeY = 0;
    for (const seccion in juego[tablero]) {
      for (const color of colores) {
        let posiciones = posicionColoresPorSeccion[tablero][seccion][color];
        if (color === "B") {
          cantidadDeB += posiciones.length;
        } else if (color === "G") {
          cantidadDeG += posiciones.length;
        } else {
          cantidadDeY += posiciones.length;
        }
      }
    }
    principalCounter += cantidadDeB > 0 && cantidadDeB <= 3 ? 1 : 0;
    principalCounter += cantidadDeG > 0 && cantidadDeG <= 3 ? 1 : 0;
    principalCounter += cantidadDeY > 0 && cantidadDeY <= 3 ? 1 : 0;
    resultados[`jugador${tablero}`]["Missing Friends"] = principalCounter * 5;
  }
}

function schoolHolydays(parametros: ParametrosDeEventos) {
  function estaRodeado(matrix: string[][], row: number, col: number) {
    let arriba = false;
    let abajo = false;
    let izquierda = false;
    let derecha = false;

    if (
      row === 0 ||
      (matrix[row - 1][col] !== "W" && matrix[row - 1][col] !== "V")
    ) {
      arriba = true;
    }

    if (
      row === matrix.length - 1 ||
      (matrix[row + 1][col] !== "W" && matrix[row + 1][col] !== "V")
    ) {
      abajo = true;
    }

    if (
      col === 0 ||
      (matrix[row][col - 1] !== "W" && matrix[row][col - 1] !== "V")
    ) {
      izquierda = true;
    }

    if (
      col === matrix[0].length - 1 ||
      (matrix[row][col + 1] !== "W" && matrix[row][col + 1] !== "V")
    ) {
      derecha = true;
    }

    return arriba && abajo && izquierda && derecha;
  }
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let posiciones = posicionColoresPorSeccion[tablero][seccion]["W"];

      let count = 0;
      posiciones.forEach((pos) => {
        if (estaRodeado(matrix, pos[0], pos[1])) {
          count++;
        }
      });
      if (count >= 3) principalCounter += 1;
    }
    resultados[`jugador${tablero}`]["School Holydays"] = principalCounter * 4;
  }
}

function threesCompany(parametros: ParametrosDeEventos) {
  const { juego, posicionColoresPorSeccion, resultados } = parametros;
  const colores = ["B", "G", "Y"];
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      let copia = JSON.parse(JSON.stringify(matrix));
      for (const color of colores) {
        const posiciones = posicionColoresPorSeccion[tablero][seccion][color];
        posiciones.forEach((pos) => {
          if (contarElementosVecinos(copia, pos[0], pos[1], color) === 3) {
            principalCounter += 1;
          }
        });
      }
    }
    resultados[`jugador${tablero}`]["Three's Company"] = principalCounter * 3;
  }
}

function beautifulSunset(parametros: ParametrosDeEventos) {
  const cantidadEnColumna = (matrix: string[][], col: number) => {
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][col] !== "V") {
        counter++;
      }
    }
    return counter;
  };
  const { juego, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    let cantidadSecciones = Object.keys(juego[tablero]).length;
    // Primera seccion
    let matrix = juego[tablero][Object.keys(juego[tablero])[0]];
    principalCounter += cantidadEnColumna(matrix, 0);
    // Ultima seccion
    matrix = juego[tablero][Object.keys(juego[tablero])[cantidadSecciones - 1]];
    principalCounter += cantidadEnColumna(matrix, matrix[0].length - 1);
    resultados[`jugador${tablero}`]["Beautiful Sunset"] =
      principalCounter > 0 ? Math.floor(principalCounter / 2) : 0;
  }
}

function likeSardines(parametros: ParametrosDeEventos) {
  const { juego, resultados } = parametros;
  for (const tablero in juego) {
    let principalCounter = 0;
    for (const seccion in juego[tablero]) {
      let matrix = juego[tablero][seccion];
      const cantidadColumnas = matrix[0].length - 2;
      const cantidadFilas = matrix.length - 2;
      // Contar cada matriz de 3x3 que no tenga "V"
      for (let i = 0; i < cantidadFilas; i++) {
        for (let j = 0; j < cantidadColumnas; j++) {
          const subMatrix = matrix
            .slice(i, i + 3)
            .map((row) => row.slice(j, j + 3));

          if (subMatrix.every((row) => row.every((cell) => cell !== "V"))) {
            principalCounter += 1;
          }
        }
      }
    }
    resultados[`jugador${tablero}`]["Like Sardines"] = principalCounter * 3;
  }
}

function contarElementosVecinos(
  matrix: string[][],
  startRow: number,
  startCol: number,
  color: string
) {
  const queue = [];
  let count = 0;
  let reemplazo = "V";
  if (color === "V") reemplazo = "W";

  const isValid = (row: number, col: number) => {
    return (
      row >= 0 &&
      col >= 0 &&
      row < matrix.length &&
      col < matrix[0].length &&
      matrix[row][col] === color
    );
  };

  queue.push([startRow, startCol]);

  while (queue.length > 0) {
    const currentPos = queue.shift();

    if (currentPos) {
      const [currentRow, currentCol] = currentPos;

      if (isValid(currentRow, currentCol)) {
        // Antes se marcaba como visitado así:
        matrix[currentRow][currentCol] = reemplazo;
        count++;

        const neighbors: number[][] = [
          [currentRow - 1, currentCol],
          [currentRow + 1, currentCol],
          [currentRow, currentCol - 1],
          [currentRow, currentCol + 1],
        ];

        for (const [row, col] of neighbors) {
          if (isValid(row, col)) {
            queue.push([row, col]);
          }
        }
      }
    }
  }

  return count;
}
