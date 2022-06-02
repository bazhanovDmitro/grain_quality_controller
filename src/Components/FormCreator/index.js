import style from "../../Assets/Styles/fomrCreator.module.scss";
import { useState, useEffect } from "react";
import { ReactComponent as Cross } from "../../Assets/Svg/Cross.svg";

export default function FormCreator({
  initialFields,
  onSubmit,
  formName,
  header,
}) {
  const [fields, setFields] = useState({});
  const [formNameValue, setFormName] = useState("");

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

  const addField = (name, value) => {
    setFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
          />
        </div>
        {renderFields(fields)}
        <button
          className={style.addFieldButton}
          onClick={() => addField("test", "text")}
        >
          Add field
        </button>
        <button
          className={style.submitButton}
          onClick={() => onSubmit(formNameValue, fields)}
        >
          Create norm
        </button>
      </form>
    </>
  );
}
