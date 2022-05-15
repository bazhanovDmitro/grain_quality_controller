import TableLayout from "../Layouts/Table";
import style from "../Assets/Styles/table.module.scss";
import HintCard from "../Components/HintCard";
import { useState } from "react";
import {
  EMPLOYEE_ACTION,
  EMPLOYEE_CREATED,
  EMPLOYEE_DELETED,
} from "../Constants/text";

export default function TablePage() {
  const [isDeletionVisible, setDeletionVisibility] = useState(false);
  const [isCreationVisible, setCreationVisibility] = useState(false);

  const creationToast = isDeletionVisible ? (
    <HintCard
      header={EMPLOYEE_ACTION}
      text={EMPLOYEE_DELETED}
      closeButton={true}
      onClose={() => setDeletionVisibility(false)}
      timing={5000}
      offScreenAnimation={true}
    />
  ) : null;

  const deletionToast = isCreationVisible ? (
    <HintCard
      header={EMPLOYEE_ACTION}
      text={EMPLOYEE_CREATED}
      closeButton={true}
      onClose={() => setCreationVisibility(false)}
      timing={5000}
      offScreenAnimation={true}
    />
  ) : null;

  return (
    <div className={style.tablePage}>
      <TableLayout
        onDeleteToast={() => setDeletionVisibility(true)}
        onCreateToast={() => setCreationVisibility(true)}
      />
      {creationToast}
      {deletionToast}
    </div>
  );
}
