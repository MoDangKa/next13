import { Input } from "antd";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);

  async function fetchSearchResults(searchText: string) {
    const result = await fetch(`/api/search?q=${searchText}`);
    if (result.ok) {
      const json = await result.json();
      console.log(json);
      setSearchResults(json.data);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("e:", e.currentTarget.value);
    fetchSearchResults(e.currentTarget.value);
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
