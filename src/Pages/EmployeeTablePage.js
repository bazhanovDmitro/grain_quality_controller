import TableLayout from "../Layouts/Table";
import style from "../Assets/Styles/table.module.scss";
import HintCard from "../Components/HintCard";
import { useState } from "react";
import {
  EMPLOYEE_ACTION,
  EMPLOYEE_CREATED,
  EMPLOYEE_DELETED,
} from "../Constants/text";

const getUsers = async () => [
  {
    fullname: "ADimon",
    email: "dimon@gmail.com",
    date: "1652367292842",
    id: "1432",
  },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
    id: "223",
  },
  {
    fullname: "Dimon",
    email: "dimon@gmail.com",
    date: "1652367292842",
    id: "342334",
  },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
    id: "4233",
  },
  {
    fullname: "Dimon",
    email: "dimon@gmail.com",
    date: "1652367292842",
    id: "5333",
  },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
    id: "668",
  },
  {
    fullname: "Dimon",
    email: "dimon@gmail.com",
    date: "1652367292842",
    id: "7392",
  },
  {
    fullname: "Vlados DotNet",
    email: "AdotNet@gmail.com",
    date: "1552367292842",
    id: "843",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
    id: "91231",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
    id: "10",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
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
      />
      {creationToast}
      {deletionToast}
    </div>
  );
}
