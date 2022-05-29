import Table from "../../Components/Table";
import { useState } from "react";

export default function TableLayout({
  onDeleteToast,
  onCreateToast,
  getObjects,
  onDeleteObject,
  onCreateObject,
  formSubmitText,
  createObjectFormFields,
  createObjectValidationSchema,
  addObjectText,
  tableHeader,
  searchPlaceholder,
}) {
  const [searchValue, setSearch] = useState("");
  const [sortValue, setSort] = useState(true);

  const onDelete = (object) => {
    onDeleteObject(object);
    if (onDeleteToast) onDeleteToast();
  };

  const onCreate = (values) => {
    if (onCreateToast) onCreateToast();
    return onCreateObject(values);
  };

  return (
    <Table
      searchValue={searchValue}
      onSearchChange={(event) => setSearch(event.target.value)}
      sortValue={sortValue}
      sortField={"lastName"}
      searchField={"lastName"}
      onSortChange={() => setSort((prev) => !prev)}
      onDeleteObject={onDelete}
      onCreateObject={onCreate}
      getObjects={getObjects}
      formSubmitText={formSubmitText}
      createObjectFormFields={createObjectFormFields}
      createObjectValidationSchema={createObjectValidationSchema}
      addObjectText={addObjectText}
      tableHeader={tableHeader}
      searchPlaceholder={searchPlaceholder}
    />
  );
}
