// Apartado.tsx
import { FunctionComponent } from "preact";
import { Tarea } from "../types.ts";

interface ApartadoProps {
  tarea: Tarea;
  onMoverTarea: (tarea: Tarea, destino: string) => void;
  onEditarTarea: (tarea: Tarea) => void;
}

export const Apartado: FunctionComponent<ApartadoProps> = ({ tarea, onMoverTarea, onEditarTarea }) => {
  const handleMoverTarea = (destino: string) => {
    if (tarea.estado !== destino) {
      const updatedTarea: Tarea = {
        ...tarea,
        estado: destino
      };
      onMoverTarea(updatedTarea, destino);
    }
  };

  const handleEditarTarea = () => {
    onEditarTarea(tarea);
  };

  return (
    <div class="tarea-item">
      <button class="tarea-button" onClick={() => handleEditarTarea()}>
        <h2>{tarea.estado}</h2>
        <h3>{tarea.name}</h3>
      </button>
      <div>
        <button onClick={() => handleMoverTarea("ToDo")}>ToDo</button>
        <button onClick={() => handleMoverTarea("InProgress")}>InProgress</button>
        <button onClick={() => handleMoverTarea("InReview")}>InReview</button>
        <button onClick={() => handleMoverTarea("Done")}>Done</button>
      </div>
    </div>
  );
};
