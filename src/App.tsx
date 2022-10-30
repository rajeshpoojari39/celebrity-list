import React, { useState, useCallback } from "react";
import "./App.css";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import celebritiesData from "./data/celebrities.json";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteDialog from "./components/DeleteDialog";
import SearchBar from "./components/SearchBar";

function App() {
  const [celebrities, setCelebrities] = useState(celebritiesData);
  const [filtereredSearch, setFilteredSearch] = useState(celebrities);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [show, setShow] = useState(false);

  const listData = showSearchResults ? filtereredSearch : celebrities;

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setDeleteID(id);
    setShow(true);
  };

  const searchCelebrity = useCallback(
    (searchTerm: string) => {
      if (searchTerm.length === 0) {
        setShowSearchResults(false);
        return;
      }
      let newList = celebrities.filter((celebrity) => {
        return (
          celebrity.first.startsWith(searchTerm) ||
          celebrity.last.startsWith(searchTerm)
        );
      });
      setFilteredSearch(newList);
      setShowSearchResults(true);
    },
    [celebrities]
  );

  function deleteCelebrity(id: number) {
    if (showSearchResults) {
      let list = filtereredSearch.filter((celebrity) => {
        return celebrity.id !== id;
      });
      setFilteredSearch(list);
    }
    let newList = celebrities.filter((celebrity) => {
      return celebrity.id !== id;
    });

    setCelebrities(newList);
    setDeleteID(0);
  }

  function calculate_age(dob: string) {
    let DOB = new Date(dob.split("-").join(","));
    let diff_ms = Date.now() - DOB.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  return (
    <div className="App">
      <DeleteDialog
        show={show}
        handleClose={handleClose}
        deleteCelebrity={deleteCelebrity}
        deleteID={deleteID}
      />
      <h1>Celebrity List</h1>
      <SearchBar searchCelebrity={searchCelebrity} />
      <ListGroup className="celebrity-list">
        <Accordion>
          {listData.map((celebrity) => {
            return (
              <ListGroup.Item key={celebrity.id}>
                <Accordion.Item eventKey={celebrity.id.toString()}>
                  <Accordion.Header className="accordian-header">
                    <span className="profile-img">
                      <Image roundedCircle src={celebrity.picture} />
                    </span>
                    {celebrity.first} {celebrity.last}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="accordian-body">
                      <div className="basic-info">
                        <div className="age">
                          Age <span>{calculate_age(celebrity.dob)} years</span>
                        </div>
                        <div className="gender">
                          Gender <span>{celebrity.gender}</span>
                        </div>
                        <div className="country">
                          Country <span>{celebrity.country}</span>
                        </div>
                      </div>
                      <div className="description">
                        Description <span> {celebrity.description}</span>
                      </div>
                      <div className="actions">
                        <RiDeleteBin6Line
                          style={{ color: "red", fontSize: "1.5em" }}
                          onClick={() => handleShow(celebrity.id)}
                        />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </ListGroup.Item>
            );
          })}
        </Accordion>
      </ListGroup>
    </div>
  );
}

export default App;
