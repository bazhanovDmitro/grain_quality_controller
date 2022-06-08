import style from "../../Assets/Styles/fomrCreator.module.scss";
import { useState, useEffect } from "react";
import { ReactComponent as Cross } from "../../Assets/Svg/Cross.svg";
import Modal from "../Modal";
import CreateFieldInput from "./CreateFieldInput";
import Confirm from "../../Components/Confirm";
import { useNavigate } from "react-router-dom";
import { ADD_FIELD, DECLINE, PROCEED } from "../../Constants/text";

export default function FormCreator({
  initialFields,
  onSubmit,
  formName,
  header,
  createFieldPlaceholder,
  formNamePlaceholder,
  redirectLink,
  confirmationText,
}) {
  const [fields, setFields] = useState({});
  const [formNameValue, setFormName] = useState("");
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();

  const onSubmitForm = (name, fields) => {
    onSubmit(name, fields).then(() => navigate(redirectLink));
  };

  const renderFields = (fields) => {
    const keys = Object.keys(fields);
    return keys.map((key, index) => (
      <div key={index} className={style.inputHolder}>
        <input
          className={style.input}
          type="text"
          name={key}
          value={fields[key]}
          onChange={(event) =>
            setFields((prev) => {
              return {
                ...prev,
                [key]: event.target.value,
              };
            })
          }
        />
        <button onClick={() => removeField(key)}>
          <Cross className={style.cross} />
        </button>
      </div>
    ));
  };

  const addField = () => {
    setModal(true);
  };

  const commitField = (name, value) => {
    setFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setModal(false);
  };

  const removeField = (name) => {
    const copy = { ...fields };
    delete copy[name];
    setFields(copy);
  };

  useEffect(() => {
    setFields((prev) => (initialFields ? initialFields : prev));
    setFormName((prev) => (formName ? formName : prev));
  }, [initialFields, formName]);

  return (
    <>
      <form
        className={style.formCreator}
        onSubmit={(event) => event.preventDefault()}
      >
        <h2 className={style.header}>{header}</h2>
        <div className={style.inputHolder}>
          <input
            className={style.input}
            type={"text"}
            name="formName"
            value={formNameValue}
            onChange={(event) => setFormName(event.target.value)}
            placeholder={formNamePlaceholder}
          />
        </div>
        {renderFields(fields)}
        <button className={style.addFieldButton} onClick={addField}>
          {ADD_FIELD}
        </button>
        <button className={style.submitButton} onClick={() => setConfirm(true)}>
          {header}
        </button>
      </form>
      {modal && (
        <Modal onOtsideClick={() => setModal(false)}>
          <CreateFieldInput
            placeholder={createFieldPlaceholder}
            onCancel={() => setModal(false)}
            onCreateField={commitField}
          />
        </Modal>
      )}
      {confirm && (
        <Modal onOtsideClick={() => setConfirm(false)}>
          <Confirm
            onAccept={() => onSubmitForm(formNameValue, fields)}
            onDecline={() => setConfirm(false)}
            acceptText={PROCEED}
            declineText={DECLINE}
            text={confirmationText}
            header={header}
          />
        </Modal>
      )}
    </>
  );
}
