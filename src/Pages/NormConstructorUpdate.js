import CreatorLayout from "../Layouts/CreatorLayout";
import { updateNorm } from "../Services/Analizer";
import { NORMS } from "../Constants/links";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  ANALYSIS_PLACEHOLDER,
  CULTURE_NAME,
  UPDATE_NORM,
  UPDATE_NORM_CONFIRMATION_TEXT,
} from "../Constants/text";

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
          header={UPDATE_NORM}
          createFieldPlaceholder={ANALYSIS_PLACEHOLDER}
          formNamePlaceholder={CULTURE_NAME}
          onSubmit={onUpdateNorm}
          redirectLink={NORMS}
          confirmationText={UPDATE_NORM_CONFIRMATION_TEXT}
        />
      </div>
    )
  );
}
