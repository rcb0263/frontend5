// Column.tsx
import { FunctionComponent } from "preact";
import { Columna, Tarea } from "../types.ts";
import { Apartado } from "./Apartado.tsx";

interface ColumnProps {
  title: string;
  list: Columna;
  onMoverTarea: (tarea: Tarea, origen: string, destino: string) => void; // Ajustar el tipo de la función
  onEditarTarea: (tarea: Tarea) => void;
}

export const Column: FunctionComponent<ColumnProps> = ({ title, list, onMoverTarea, onEditarTarea }) => {
  const handleMoverTarea = (tarea: Tarea, destino: string) => {
    onMoverTarea(tarea, title, destino); // Ajustar el argumento pasado
  };

  return (
    <div class={"column"}>
      <h2>{title}</h2>
      <div>
        {list.lista.map((tarea) => (
          <Apartado key={tarea.estado} tarea={tarea} onMoverTarea={handleMoverTarea} onEditarTarea={onEditarTarea} />
        ))}
      </div>
    </div>
  );
};
