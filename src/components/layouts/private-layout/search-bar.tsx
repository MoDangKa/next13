import { Input } from "antd";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);

  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

  async function fetchSearchResults(searchText: string) {
    const result = await fetch(`/api/search?q=${searchText}`);
    if (result.ok) {
      const json = await result.json();
      console.log(json);
      setSearchResults(json.data);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedFetchSearchResults(e.currentTarget.value);
  }

  return (
    <div>
      <Input
        type="text"
        className="ant-input__custom"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
}
