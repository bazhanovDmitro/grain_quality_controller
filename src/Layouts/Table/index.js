import Table from "../../Components/Table";
import { useState } from "react";

export default function TableLayout() {
  const [searchValue, setSearch] = useState("");
  const [sortValue, setSort] = useState(true);

  return (
    <Table
      searchValue={searchValue}
      onSearchChange={(event) => setSearch(event.target.value)}
      sortValue={sortValue}
      onSortChange={() => setSort((prev) => !prev)}
    />
  );
}
