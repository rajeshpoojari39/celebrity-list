import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

type searchBarProps = {
  searchCelebrity: (searchTerm: string) => void;
};

const SearchBar = ({ searchCelebrity }: searchBarProps) => {
  const [search, setSearch] = useState("");

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
    searchCelebrity(search);
  };

  useEffect(() => {
    searchCelebrity(search);
  }, [search, searchCelebrity]);

  return (
    <Form className="d-flex search-bar">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={search}
        onChange={searchHandler}
      />
    </Form>
  );
};

export default SearchBar;
