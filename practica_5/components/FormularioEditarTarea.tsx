import { useState } from "preact/hooks";
import { Tarea } from "../types.ts";
import { FunctionComponent} from "preact";

interface FormularioEditarTareaProps {
  tarea: Tarea;
  onSave: (nuevoNombre: string, nuevoEstado: string) => void;
  onClose: () => void;
  onMoveToColumn: (tarea: Tarea, destino: string) => void;
}

export const FormularioEditarTarea: FunctionComponent<FormularioEditarTareaProps> = ({ tarea, onSave, onClose, onMoveToColumn }) => {
  const [nuevoNombre, setNuevoNombre] = useState(tarea.name);
  const [nuevoEstado, setNuevoEstado] = useState(tarea.estado);

  const handleSaveChanges = () => {
    onSave(nuevoNombre, nuevoEstado);
    // Mover la tarea a la columna correspondiente
    onMoveToColumn(tarea, nuevoEstado);
  };

  return (
    <div class="formulario">
      <h2>Editar Tarea</h2>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" value={nuevoNombre} onInput={(e) => setNuevoNombre(e.currentTarget.value)} />
      <label htmlFor="estado">Estado:</label>
      <select id="estado" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.currentTarget.value)}>
        <option value="ToDo">ToDo</option>
        <option value="InProgress">InProgress</option>
        <option value="InReview">InReview</option>
        <option value="Done">Done</option>
      </select>
      <div>
        <button onClick={handleSaveChanges}>Guardar cambios</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};
