import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import SearchBar from "../components/SearchBar";
import "../styles/HomePage.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [addedNew, setAddedNew] = useState(false);
  // const [randomState, setRandomState] = useState(true);
  const handleToggle = (toggle) => {
    setToggle(toggle);
  };
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAdd = () => {
    try {
      fetch(`http://localhost:8000/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          description: "",
        }),
      });
      getData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAddedNew(true);
      console.log("Added note");
    }
  };

  useEffect(() => {
    getData();
    setAddedNew(false);
  }, [addedNew]);

  useEffect(() => {
    console.log("Data has changed: ", data);
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      console.log("Delete: ", id);
      try {
        fetch(`http://localhost:8000/notes/${id}/`, {
          method: "DELETE",
        });
        setData((prevData) => {
          return prevData.filter((note) => note.id !== id);
        });
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("Note deleted");
    }
    else {
      console.log("Note not deleted");
    }
  };

  const handleUpdate = async (noteData) => {
    setData((prevData) => {
      return prevData.map((note) => {
        if (note.id === noteData.id) {
          return noteData;
        } else {
          return note;
        }
      });
    });
    console.log("Update: ", noteData);
    try {
      const response = await fetch(
        `http://localhost:8000/notes/${noteData.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        }
      );
      if (!response.ok) {
        alert("Failed to update note:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="p-3 lg:pl-24 sm:p-2 md:p-5 space-y-5">
        <SearchBar onToggleChange={handleToggle} />
        {/* {randomState ? <ClipLoader color="white" /> : <></>} */}
      </div>
      <div className="p-3 lg:pt-24 lg:pl-24 lg:pr-24 sm:p-2 md:p-5">
        <div>
          <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((note) => (
              <CSSTransition
                key={note.id}
                timeout={500}
                classNames="note-transition"
              >
                <Notes
                  propsid={note.id}
                  propstitle={note.title}
                  propsbody={note.description}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 p-5" onClick={handleAdd}>
        <AddNote />
      </div>
    </>
  );
};

export default HomePage;
