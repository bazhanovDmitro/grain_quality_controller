import TableLayout from "../Layouts/Table";
import style from "../Assets/Styles/table.module.scss";
import HintCard from "../Components/HintCard";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import {
  ADD,
  ADD_EMPLOYEE,
  EMPLOYEE_ACTION,
  EMPLOYEE_CREATED,
  EMPLOYEE_DELETED,
  EMPLOYEE_SEARCH_PLACEHOLDER,
  STAFF_TABLE,
} from "../Constants/text";
import { createUserFields } from "../Utils/objects/staticFormFields";
import { newUserSchema } from "../Validation/createUser";
import {
  deleteUserFromOrganization,
  getOrganizationWithUsers,
  addNewUserToOrganization,
} from "../Services/Organizations";

export default function TablePage() {
  const [isDeletionVisible, setDeletionVisibility] = useState(false);
  const [isCreationVisible, setCreationVisibility] = useState(false);

  const { userInfo } = useContext(UserContext);

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

  const onUserCreate = async (values) => {
    return addNewUserToOrganization(values, userInfo.OrganizationId);
  };

  const onUserDelete = async (user) => {
    return deleteUserFromOrganization(user.id, userInfo.OrganizationId);
  };

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
        onCreateObject={onUserCreate}
        getObjects={getOrganizationWithUsers}
        formSubmitText={ADD}
        createObjectFormFields={createUserFields}
        createObjectValidationSchema={newUserSchema}
        addObjectText={ADD_EMPLOYEE}
        tableHeader={STAFF_TABLE}
        searchPlaceholder={EMPLOYEE_SEARCH_PLACEHOLDER}
        sortField={"lastName"}
        searchField={"lastName"}
        excludeObjectsIdArray={[userInfo.UserId]}
      />
      {creationToast}
      {deletionToast}
    </div>
  );
}
