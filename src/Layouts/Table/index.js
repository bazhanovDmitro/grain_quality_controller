import Table from "../../Components/Table";
import { useState } from "react";

export default function TableLayout() {
  const [searchValue, setSearch] = useState("");
  const [sortValue, setSort] = useState(true);

  const onDeleteObject = (object) => {
    console.log(`${object.fullname} - deleted`);
  };

  const onCreateObject = (values) => {
    console.log(values);
  };

  return (
    <Table
      searchValue={searchValue}
      onSearchChange={(event) => setSearch(event.target.value)}
      sortValue={sortValue}
      sortField={"fullname"}
      onSortChange={() => setSort((prev) => !prev)}
      onDeleteObject={onDeleteObject}
      onCreateObject={onCreateObject}
    />
  );
}
