import DropdownMenu from "./Components/DropdownMenu";
import buttons from "./Assets/Styles/common/buttons.module.scss";

function App() {
  const buttonArray = [
    {
      text: `Print`,
      className: buttons.transparentBlue_ordinary,
      style: { padding: `5px 20px` },
      onClick: () => alert(`test`),
    },
  ];

  return (
    <div className="App">
      <DropdownMenu buttons={buttonArray}>
        <div
          style={{
            width: `500px`,
            height: `300px`,
            backgroundColor: `red`,
          }}
        ></div>
      </DropdownMenu>
    </div>
  );
}

export default App;
