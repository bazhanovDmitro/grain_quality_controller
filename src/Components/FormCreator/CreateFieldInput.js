import style from "../../Assets/Styles/fomrCreator.module.scss";
import { useState } from "react";

export default function CreateFieldInput({
  onCreateField,
  onCancel,
  placeholder,
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className={style.createInput}>
      <h2>Add field</h2>
      <div className={style.inputHolder}>
        <input
          className={style.fieldName}
          placeholder={placeholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className={style.fieldValue}
          placeholder="Value"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      <div className={style.buttonContainer}>
        <button
          className={style.add}
          onClick={() => onCreateField(name, value)}
        >
          Add field
        </button>
        <button className={style.cancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
