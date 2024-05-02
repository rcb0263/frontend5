import { useState } from "preact/hooks";
import { Tarea } from "../types.ts";
import { FunctionComponent} from "preact";

interface FormularioCrearTareaProps {
  onCrearTarea: (tarea: Tarea) => void;
  onClose: () => void;
}

export const FormularioCrearTarea: FunctionComponent<FormularioCrearTareaProps> = ({ onCrearTarea, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("ToDo");

  const handleCrearTarea = () => {
    const nuevaTarea: Tarea = {
      name: nombre,
      estado: estado
    };
    onCrearTarea(nuevaTarea);
    setNombre(""); // Limpiar el campo de nombre después de crear la tarea
    onClose(); // Cerrar el formulario después de crear la tarea
  };

  return (
    <div class="formulario">
      <h2>Crear Tarea</h2>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" value={nombre} onInput={(e) => setNombre(e.currentTarget.value)} />
      <label htmlFor="estado">Estado:</label>
      <select id="estado" value={estado} onChange={(e) => setEstado(e.currentTarget.value)}>
        <option value="ToDo">ToDo</option>
        <option value="InProgress">InProgress</option>
        <option value="InReview">InReview</option>
        <option value="Done">Done</option>
      </select>
      <div>
        <button onClick={handleCrearTarea}>Crear tarea</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};
