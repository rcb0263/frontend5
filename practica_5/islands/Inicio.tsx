import { useState } from "preact/hooks";
import { Columna, Tarea } from "../types.ts";
import { Column } from "../components/Column.tsx";
import { FormularioCrearTarea } from "../components/FormularioCrearTarea.tsx";
import { FormularioEditarTarea } from "../components/FormularioEditarTarea.tsx";

export default function Inicio() {
  const [toDo, setToDo] = useState<Columna>({ lista: [] });
  const [inProgress, setInProgress] = useState<Columna>({ lista: [] });
  const [inReview, setInReview] = useState<Columna>({ lista: [] });
  const [done, setDone] = useState<Columna>({ lista: [] });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTarea, setEditTarea] = useState<Tarea | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCrearTarea = (tarea: Tarea) => {
    setToDo((prevToDo) => ({
      lista: [...prevToDo.lista, tarea]
    }));
    setShowCreateForm(false);
  };

  const handleMoverTarea = (tarea: Tarea, origen: string, destino: string) => {
    const tareaActualizada = { ...tarea, estado: destino };

    switch (destino) {
      case "ToDo":
        setToDo((prevToDo) => ({
          lista: [...prevToDo.lista, tareaActualizada]
        }));
        break;
      case "InProgress":
        setInProgress((prevInProgress) => ({
          lista: [...prevInProgress.lista, tareaActualizada]
        }));
        break;
      case "InReview":
        setInReview((prevInReview) => ({
          lista: [...prevInReview.lista, tareaActualizada]
        }));
        break;
      case "Done":
        setDone((prevDone) => ({
          lista: [...prevDone.lista, tareaActualizada]
        }));
        break;
      default:
        console.log("Destino inválido");
    }

    switch (origen) {
      case "ToDo":
        setToDo((prevToDo) => ({
          lista: prevToDo.lista.filter((t) => t.name !== tarea.name)
        }));
        break;
      case "InProgress":
        setInProgress((prevInProgress) => ({
          lista: prevInProgress.lista.filter((t) => t.name !== tarea.name)
        }));
        break;
      case "InReview":
        setInReview((prevInReview) => ({
          lista: prevInReview.lista.filter((t) => t.name !== tarea.name)
        }));
        break;
      case "Done":
        setDone((prevDone) => ({
          lista: prevDone.lista.filter((t) => t.name !== tarea.name)
        }));
        break;
      default:
        console.log("Origen inválido");
    }
  };

  const handleOpenEditForm = (tarea: Tarea) => {
    setEditTarea(tarea);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleGuardarCambios = (nuevoNombre: string, nuevoEstado: string) => {
    if (editTarea) {
      const updatedTarea: Tarea = {
        estado: nuevoEstado,
        name: nuevoNombre
      };

      // Mover la tarea a la columna correspondiente
      handleMoverTarea(updatedTarea, editTarea.estado, nuevoEstado);
    }
    handleCloseEditForm();
  };

  return (
    <div class={"columns"}>
      <Column title="ToDo" list={toDo} onMoverTarea={handleMoverTarea} onEditarTarea={handleOpenEditForm} />
      <Column title="InProgress" list={inProgress} onMoverTarea={handleMoverTarea} onEditarTarea={handleOpenEditForm} />
      <Column title="InReview" list={inReview} onMoverTarea={handleMoverTarea} onEditarTarea={handleOpenEditForm} />
      <Column title="Done" list={done} onMoverTarea={handleMoverTarea} onEditarTarea={handleOpenEditForm} />
      {showCreateForm && <FormularioCrearTarea onCrearTarea={handleCrearTarea} onClose={() => setShowCreateForm(false)} />}
      {showEditForm && editTarea && (
        <FormularioEditarTarea
          tarea={editTarea}
          onSave={handleGuardarCambios}
          onClose={handleCloseEditForm}
          onMoveToColumn={(tarea, destino) => handleMoverTarea(tarea, tarea.estado, destino)}
        />
      )}
      <button onClick={() => setShowCreateForm(true)}>Crear Tarea</button>
    </div>
  );
}
