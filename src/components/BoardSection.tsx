import { useEffect, useState } from "react";

type BoardSectionProps = {
  colorClase: string;
  filas: number;
  columnas: number;
  seccionIndex: number;
};

export default function BoardSection({
  colorClase,
  filas,
  columnas,
  seccionIndex,
}: BoardSectionProps) {
  const cantidadLozetas = filas * columnas;
  const [arrayColores, setArrayColores] = useState<string[]>(
    Array(cantidadLozetas).fill("bg-slate-400")
  );
  const [arrayDataColor, setArrayDataColor] = useState<string[]>(
    Array(cantidadLozetas).fill("V")
  );

  useEffect(() => {
    setArrayColores(Array(cantidadLozetas).fill("bg-slate-400"));
    setArrayDataColor(Array(cantidadLozetas).fill("V"));
  }, [cantidadLozetas]);

  const cambiarColor = (index: number) => {
    setArrayColores((prev) => {
      const nuevoArray = [...prev];
      nuevoArray[index] = colorClase;
      return nuevoArray;
    });
    setArrayDataColor((prev) => {
      const nuevoArray = [...prev];
      nuevoArray[index] = (() => {
        switch (colorClase) {
          case "bg-red-500":
            return "R";
          case "bg-blue-500":
            return "B";
          case "bg-green-500":
            return "G";
          case "bg-yellow-500":
            return "Y";
          case "bg-slate-50":
            return "W";
          default:
            return "V";
        }
      })();
      return nuevoArray;
    });
  };

  const clasesGrid = `grid grid-cols-${columnas} grid-rows-${filas} gap-1 place-items-center`;
  // const clasesGrid = `col-span-${columnas}`;

  return (
    <div className={clasesGrid} data-seccion={seccionIndex}>
      {[...Array(cantidadLozetas)].map((_, i) => (
        <div
          key={i}
          className={`h-6 w-6 border border-black ${arrayColores[i]}`}
          onClick={() => cambiarColor(i)}
          data-color={arrayDataColor[i]}
        ></div>
      ))}
    </div>
  );
}
