import TableLayout from "../Layouts/Table";
import style from "../Assets/Styles/table.module.scss";
import HintCard from "../Components/HintCard";
import { useState } from "react";
import {
  ADD,
  EMPLOYEE_ACTION,
  EMPLOYEE_CREATED,
  EMPLOYEE_DELETED,
} from "../Constants/text";
import { createUserFields } from "../Utils/objects/staticFormFields";
import { newUserSchema } from "../Validation/createUser";

const getUsers = async () => [
  {
    firstName: "ADimon",
    lastName: "adsdasd",
    email: "dimon@gmail.com",
    id: "1432",
  },
  {
    firstName: "Vlados DotNet",
    lastName: "cadsdasd",
    email: "dotNet@gmail.com",
    id: "223",
  },
  {
    firstName: "Dimon",
    lastName: "xadsdasd",
    email: "dimon@gmail.com",
    id: "342334",
  },
  {
    firstName: "Vlados DotNet",
    lastName: "zadsdasd",
    email: "dotNet@gmail.com",
    id: "4233",
  },
  {
    firstName: "Dimon",
    lastName: "qadsdasd",
    email: "dimon@gmail.com",
    id: "5333",
  },
  {
    firstName: "Vlados DotNet",
    lastName: "zadsdasd",
    email: "dotNet@gmail.com",
    id: "668",
  },
  {
    firstName: "Dimon",
    lastName: "xadsdasd",
    email: "dimon@gmail.com",
    id: "7392",
  },
  {
    firstName: "Vlados DotNet",
    lastName: "radsdasd",
    email: "AdotNet@gmail.com",
    id: "843",
  },
  {
    firstName: "Semenov Olec Mykola",
    lastName: "wwadsdasd",
    email: "auction.io@gmail.com",
    id: "91231",
  },
  {
    firstName: "Semenov Olec Mykola",
    lastName: "dadsdasd",
    email: "auction.io@gmail.com",
    id: "10",
  },
  {
    firstName: "Semenov Olec Mykola",
    lastName: "fadsdasd",
    email: "auction.io@gmail.com",
    id: "1133333",
  },
];

const onUserDelete = async (userID) => {
  console.log(`User was just deleted ID is - ${userID}`);
};

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
        onDeleteObject={onUserDelete}
        getObjects={getUsers}
        formSubmitText={ADD}
        createObjectFormFields={createUserFields}
        createObjectValidationSchema={newUserSchema}
      />
      {creationToast}
      {deletionToast}
    </div>
  );
}
