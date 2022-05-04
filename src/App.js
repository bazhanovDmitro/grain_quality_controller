import Modal from "./Components/Modal";
import { useState } from "react";
import Confirm from "./Components/Confirm";
import { CANCEL, DELETE } from "./Constants/text";

function App() {
  const [modal, setModal] = useState(false);

  const md = (
    <Modal onOtsideClick={() => setModal(false)}>
      <Confirm
        header={`Hello world`}
        text={`Example text lorem ipsum dolor sit amet Example text lorem ipsum dolor sit amet Example text lorem ipsum dolor sit amet`}
        highlighted={`Additional content`}
        onDecline={() => setModal(false)}
        onAccept={() => {
          alert("Ok");
          setModal(false);
        }}
        acceptText={DELETE}
        declineText={CANCEL}
      />
    </Modal>
  );

  return (
    <div className="App">
      <button onClick={() => setModal(true)}>Modal</button>
      {modal ? md : null}
    </div>
  );
}

export default App;
