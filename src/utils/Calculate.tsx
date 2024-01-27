export function contarWRodeados(matrix: string[][], positions: number[][]) {
  let count = 0;

  positions.forEach((pos) => {
    if (estaRodeado(matrix, pos[0], pos[1])) {
      count++;
    }
  });

  return count;
}

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

export function contarCuantosVHay(positions: number[][]) {
  return positions.length;
}

export function contarParejasDeR(matrix: string[][], positions: number[][]) {
  let count = 0;

  positions.forEach((pos) => {
    if (contarElementosVecinos(matrix, pos[0], pos[1], "R") === 2) {
      count++;
    }
  });

  return count;
}

export function mayorGrupo(
  matrix: string[][],
  positions: number[][],
  color: string
) {
  let maxGroup = 0;

  positions.forEach((pos) => {
    let count = contarElementosVecinos(matrix, pos[0], pos[1], color);
    maxGroup = Math.max(maxGroup, count);
  });

  maxGroup = maxGroup > 1 ? maxGroup : 0;

  return maxGroup;
}

function contarElementosVecinos(
  matrix: string[][],
  startRow: number,
  startCol: number,
  color: string
) {
  const queue = [];
  let count = 0;

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
        matrix[currentRow][currentCol] = "V";
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

// function contarElementosVecinos(
//   matrix: string[][],
//   row: number,
//   col: number,
//   color: string
// ): number {
//   if (
//     row < 0 ||
//     col < 0 ||
//     row >= matrix.length ||
//     col >= matrix[0].length ||
//     matrix[row][col] !== color
//   ) {
//     return 0;
//   }

//   matrix[row][col] = "V"; // Marcamos el elemento para evitar contar múltiples veces

//   return (
//     1 +
//     contarElementosVecinos(matrix, row - 1, col, color) +
//     contarElementosVecinos(matrix, row + 1, col, color) +
//     contarElementosVecinos(matrix, row, col - 1, color) +
//     contarElementosVecinos(matrix, row, col + 1, color)
//   );
// }
