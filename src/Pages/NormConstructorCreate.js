import CreatorLayout from "../Layouts/CreatorLayout";
import { createNorm } from "../Services/Analizer";
import { NORMS } from "../Constants/links";

export default function NormConstructor() {
  return (
    <div style={{ width: `100%`, height: `90%` }}>
      <CreatorLayout
        initialFields={{}}
        formName=""
        header="Create new norm"
        createFieldPlaceholder="Analysis field name"
        formNamePlaceholder={"Culture name"}
        onSubmit={createNorm}
        redirectLink={NORMS}
        confirmationText={
          "The new norm would be created in Grain Guality Conrol system after form submitting. Are you sure you want to proceed?"
        }
      />
    </div>
  );
}
