import FormCreator from "../../Components/FormCreator";

export default function CreatorLayout({
  initialFields,
  formName,
  header,
  createFieldPlaceholder,
  formNamePlaceholder,
  onSubmit,
  redirectLink,
  confirmationText,
}) {
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
        initialFields={initialFields}
        formName={formName}
        onSubmit={(formName, values) => onSubmit(formName, values)}
        header={header}
        createFieldPlaceholder={createFieldPlaceholder}
        formNamePlaceholder={formNamePlaceholder}
        redirectLink={redirectLink}
        confirmationText={confirmationText}
      />
    </div>
  );
}
