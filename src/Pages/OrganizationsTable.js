import { getOrganizationList } from "../Services/Organizations";
import style from "../Assets/Styles/table.module.scss";
import {
  ADD,
  ADD_ORGANIZATION,
  ORGANIZATION_ACTION,
  ORGANIZATION_DELETED_MESSAGE,
  ORGANIZATION_SEARCH_PLACEHOLDER,
} from "../Constants/text";
import { ORGANIZATION_LIST } from "../Constants/text";
import { createOrganizationFields } from "../Utils/objects/staticFormFields";
import TableLayout from "../Layouts/Table";
import { createOrganizationSchema } from "../Validation/createOrganization";
import { createOrganizationWithManager } from "../Services/Organizations";
import { deleteOrganization } from "../Services/Organizations";
import { useState } from "react";
import HintCard from "../Components/HintCard/index";

export default function OrganizationsTable() {
  const [isDeletionVisible, setDeletionVisibility] = useState(false);
  const [isCreationVisible, setCreationVisibility] = useState(false);

  const deletionToast = isDeletionVisible ? (
    <HintCard
      header={ORGANIZATION_ACTION}
      text={ORGANIZATION_DELETED_MESSAGE}
      closeButton={true}
      onClose={() => setDeletionVisibility(false)}
      timing={5000}
      offScreenAnimation={true}
    />
  ) : null;

  const creationToast = isCreationVisible ? (
    <HintCard
      header={ORGANIZATION_ACTION}
      text={ORGANIZATION_DELETED_MESSAGE}
      closeButton={true}
      onClose={() => setCreationVisibility(false)}
      timing={5000}
      offScreenAnimation={true}
    />
  ) : null;

  return (
    <div className={style.tablePage}>
      <TableLayout
        getObjects={getOrganizationList}
        onDeleteObject={deleteOrganization}
        onCreateObject={createOrganizationWithManager}
        onDeleteToast={() => setDeletionVisibility(true)}
        onCreateToast={() => setCreationVisibility(true)}
        createObjectFormFields={createOrganizationFields}
        createObjectValidationSchema={createOrganizationSchema}
        formSubmitText={ADD}
        addObjectText={ADD_ORGANIZATION}
        tableHeader={ORGANIZATION_LIST}
        searchPlaceholder={ORGANIZATION_SEARCH_PLACEHOLDER}
        sortField={"organizationName"}
        searchField={"organizationName"}
      />
      {deletionToast}
      {creationToast}
    </div>
  );
}
