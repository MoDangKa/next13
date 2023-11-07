import User from "@/components/user";
import { Form, Input } from "antd";
import _ from "lodash";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";

type FieldType = {
  search?: string;
};

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as any)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

  async function fetchSearchResults(searchText: string) {
    const result = await fetch(`/api/search?q=${searchText}`);
    if (result.ok) {
      const json = await result.json();
      setVisible(true);
      setSearchResults(json.data);
    } else {
      setVisible(false);
      setSearchResults([]);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedFetchSearchResults(e.currentTarget.value);
  }

  function handleClick() {
    setVisible(false);
    form.resetFields();
  }

  return (
    <div
      ref={divRef}
      className="flex flex-row max-w-md w-full justify-end relative"
    >
      <Form
        form={form}
        name="search-form"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FieldType> name="search" className="mb-0">
          <Input
            type="text"
            className="ant-input__custom max-w-xs"
            placeholder="Search"
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
      {visible && searchResults.length > 0 ? (
        <ul className="flex flex-col bg-gray-700 absolute rounded-lg top-14 w-full max-w-sm py-2 right-2 z-10">
          {searchResults.map((result: UserI) => (
            <li
              key={result.id}
              className="px-5 py-3 hover:bg-gray-500 transition-all"
              onClick={handleClick}
            >
              <User user={result} />
            </li>
          ))}
        </ul>
      ) : (
        <Fragment />
      )}
    </div>
  );
}
