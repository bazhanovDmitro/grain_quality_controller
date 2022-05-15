import Table from "../../Components/Table";
import { useState } from "react";

export default function TableLayout({ onDeleteToast, onCreateToast }) {
  const [searchValue, setSearch] = useState("");
  const [sortValue, setSort] = useState(true);

  const onDeleteObject = (object) => {
    console.log(`${object.fullname} - deleted`);
    onDeleteToast();
  };

  const onCreateObject = (values) => {
    console.log(values);
    onCreateToast();
  };

  return (
    <Table
      searchValue={searchValue}
      onSearchChange={(event) => setSearch(event.target.value)}
      sortValue={sortValue}
      sortField={"fullname"}
      searchField={"fullname"}
      onSortChange={() => setSort((prev) => !prev)}
      onDeleteObject={onDeleteObject}
      onCreateObject={onCreateObject}
    />
  );
}
