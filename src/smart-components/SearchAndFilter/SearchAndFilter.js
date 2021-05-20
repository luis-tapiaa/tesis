import React, { useState } from "react";
import { IconButton, Input } from "../../components";

const SearchAndFilter = ({ columns, columnAlias, context, onFilter }) => {
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState([]);
  const { setQuery } = context();

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const onChangeCheck = ({ target }) => {
    if (target.checked) {
      setCheck((prev) => [...prev, target.name]);
    } else {
      setCheck((prev) => prev.filter((p) => p !== target.name));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onFilter(check, search);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "10px 0px 15px 0px",
          justifyContent: "center"
        }}
      >
        <Input value={search} onChange={onChangeSearch} />
        <IconButton icon="search" onClick={onSubmit} />
      </div>
      {columns?.map((col) => (
        <label style={{ margin: "15px", marginTop: "10px" }} key={col}>
          <input type="checkbox" name={col} onChange={onChangeCheck} />
          {columnAlias[col] ?? col}
        </label>
      ))}
    </div>
  );
};

export default SearchAndFilter;
