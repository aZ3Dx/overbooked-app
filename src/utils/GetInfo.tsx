export const ObtenerInfo = (cantidadJugadores: number) => {
  const secciones = cantidadJugadores <= 3 ? 3 : 2;
  const lozetasPorSeccion = cantidadJugadores <= 3 ? [15, 20, 15] : [20, 20];

  const data: { [key: string]: { [key: string]: string[][] } } = {};
  const posicionColoresPorSeccion: {
    [key: string]: { [key: string]: { [key: string]: number[][] } };
  } = {};

  for (let i = 0; i < cantidadJugadores; i++) {
    const tableroDiv = document.querySelector(`[data-tablero="${i}"]`);

    const tablero: { [key: string]: string[][] } = {};
    posicionColoresPorSeccion[`tablero${i}`] = {};

    for (let j = 0; j < secciones; j++) {
      const seccionDiv = tableroDiv?.querySelector(
        `[data-seccion="${j}"]`
      ) as HTMLDivElement;

      const seccion: string[][] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`] = {};
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["R"] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["B"] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["G"] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["Y"] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["W"] = [];
      posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`]["V"] = [];

      const lozetas = seccionDiv.querySelectorAll("div");
      const columnas = lozetasPorSeccion[j] / 5;
      for (let k = 0; k < 5; k++) {
        const fila: string[] = [];
        for (let l = 0; l < columnas; l++) {
          const lozeta = lozetas[k * columnas + l];
          fila.push(lozeta.dataset.color || "V");
          posicionColoresPorSeccion[`tablero${i}`][`seccion${j}`][
            lozeta.dataset.color || "V"
          ].push([k, l]);
        }
        seccion.push(fila);
      }
      tablero[`seccion${j}`] = seccion;
    }
    data[`tablero${i}`] = tablero;
  }

  //Retornamos un objeto con la info de los tableros y la posicion de los colores luego lo desestructuramos
  return { data, posicionColoresPorSeccion };
};
