import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Inicio from "../islands/Inicio.tsx";

export default function Home() {
  return (
    <div>
      <div >
        <Inicio/>
      </div>
    </div>
  );
}
