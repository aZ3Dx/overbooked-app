import Board from "./Board";

type BoardsContainerProps = {
  cantidadJugadores: number;
  color: string;
};

export default function BoardsContainer({
  cantidadJugadores,
  color,
}: BoardsContainerProps) {
  const tipoTablero = cantidadJugadores <= 3 ? 1 : 2;
  return (
    <div className="flex flex-col gap-4">
      {[...Array(cantidadJugadores)].map((_, i) => (
        <Board
          key={i}
          tipoTablero={tipoTablero}
          color={color}
          tableroIndex={i}
        />
      ))}
    </div>
  );
}
