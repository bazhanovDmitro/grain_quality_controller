import CreatorLayout from "../Layouts/CreatorLayout";
import { createNorm } from "../Services/Analizer";
import { NORMS } from "../Constants/links";
import {
  ANALYSIS_PLACEHOLDER,
  CREATE_NEW_NORM,
  CREATE_NORM_CONFIRMATION_TEXT,
  CULTURE_NAME,
} from "../Constants/text";

export default function NormConstructor() {
  return (
    <div style={{ width: `100%`, height: `90%` }}>
      <CreatorLayout
        initialFields={{}}
        formName=""
        header={CREATE_NEW_NORM}
        createFieldPlaceholder={ANALYSIS_PLACEHOLDER}
        formNamePlaceholder={CULTURE_NAME}
        onSubmit={createNorm}
        redirectLink={NORMS}
        confirmationText={CREATE_NORM_CONFIRMATION_TEXT}
      />
    </div>
  );
}
