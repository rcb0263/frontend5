import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";
import { Tarea } from "../types.ts";

interface ListProps {
  data: Tarea[];
}

interface exist {
    existe: boolean;
    tarea: Tarea;
  }

export const Cambio: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [estado, setEstado] = useState<string>("");

  

  return (
    <div class="form">
      <h1>Introduce tus datos</h1>
      <form
        action="/submitform.tsx"
        method="POST"          
      >
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input
            onBlur={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            name="name"
            required={true}
          />
        </div>
        <div>
          <label for="estado">estado</label>
        </div>
        <div>
          <input
            onBlur={(e) => setEstado(e.currentTarget.value)}
            type="text"
            id="estado"
            name="estado"
            required={true}

          />
        </div>
        <div>
          <button
            type="submit"
            disabled={error !== ""}
            class="btn"
          >
            Submit
          </button>
        </div>
        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setEstado("");
              setError("");
            }}
          >
            Reset
          </button>
        </div>
        {error !== "" && <div class="span-2 error">{error}</div>}
      </form>
    </div>
  );
};