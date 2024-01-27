import Image from "next/image";
import { useState } from "react";

export default function BoardExtra() {
  const [sobrevendido, setSobrevendido] = useState(0);
  const [vales, setVales] = useState(0);

  return (
    <div className="flex justify-between mt-2">
      <div className="flex items-center gap-2">
        <Image src="/over.png" width={20} height={20} alt="Sobrevendido" />
        <input
          name="sobrevendido"
          type="range"
          min="0"
          max="10"
          className="w-24"
          defaultValue={sobrevendido}
          onChange={(e) => setSobrevendido(parseInt(e.target.value))}
        />
        <p className="w-5">{sobrevendido}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image src="/vale.png" width={20} height={20} alt="Vales" />
        <input
          name="vales"
          type="range"
          min="0"
          max="24"
          className="w-28"
          defaultValue={vales}
          onChange={(e) => setVales(parseInt(e.target.value))}
        />
        <p className="w-5">{vales}</p>
      </div>
    </div>
  );
}
