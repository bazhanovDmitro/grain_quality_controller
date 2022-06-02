import FormCreator from "../../Components/FormCreator";

export default function CreatorLayout() {
  return (
    <div
      style={{
        display: `flex`,
        width: `100%`,
        height: `100%`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <FormCreator
        initialFields={{ biba: "Boba" }}
        formName="Wheat"
        onSubmit={(formName, values) => console.log(formName, values)}
        header="Create new norm"
        createFieldPlaceholder={"Analysis field name"}
      />
    </div>
  );
}
