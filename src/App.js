import Modal from "./Components/Modal";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(false);

  const md = (
    <Modal onOtsideClick={() => setModal(false)}>
      <button onClick={() => alert("Ok")}>First</button>
    </Modal>
  );

  return (
    <div className="App">
      <button onClick={() => setModal(true)}>Modal</button>
      {modal ? md : null}
      <button onClick={() => alert("Mistake 2")}>First</button>
    </div>
  );
}

export default App;
