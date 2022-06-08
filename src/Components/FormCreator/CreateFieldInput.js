import style from "../../Assets/Styles/fomrCreator.module.scss";
import { useState } from "react";
import { ADD_FIELD, CANCEL, VALUE } from "../../Constants/text";

export default function CreateFieldInput({
  onCreateField,
  onCancel,
  placeholder,
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className={style.createInput}>
      <h2>{ADD_FIELD}</h2>
      <div className={style.inputHolder}>
        <input
          className={style.fieldName}
          placeholder={placeholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className={style.fieldValue}
          placeholder={VALUE}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      <div className={style.buttonContainer}>
        <button
          className={style.add}
          onClick={() => onCreateField(name, value)}
        >
          {ADD_FIELD}
        </button>
        <button className={style.cancel} onClick={onCancel}>
          {CANCEL}
        </button>
      </div>
    </div>
  );
}
