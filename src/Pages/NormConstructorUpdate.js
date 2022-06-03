import CreatorLayout from "../Layouts/CreatorLayout";
import { updateNorm } from "../Services/Analizer";
import { NORMS } from "../Constants/links";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function NormConstructorUpdate() {
  const { selectedNorm, setNorm } = useContext(UserContext);

  const navigate = useNavigate();

  const onUpdateNorm = async (name, newFields) => {
    updateNorm(selectedNorm.id, name, newFields);
    setNorm(null);
  };

  useEffect(() => {
    if (selectedNorm === null) navigate(NORMS);
  }, [navigate, selectedNorm]);

  return (
    selectedNorm && (
      <div style={{ width: `100%`, height: `90%` }}>
        <CreatorLayout
          initialFields={selectedNorm.fieldsToCheck}
          formName={selectedNorm.cultureName}
          header="Update norm"
          createFieldPlaceholder="Analysis field name"
          formNamePlaceholder="Culture name"
          onSubmit={onUpdateNorm}
          redirectLink={NORMS}
          confirmationText={
            "The norm values will be edited in Grain Guality Conrol system after form submitting. Are you sure you want to proceed?"
          }
        />
      </div>
    )
  );
}
