import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import SearchBar from "../components/SearchBar";
import "../styles/HomePage.css";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
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
    setData((prevData) => [
      {
        id: "",
        title: "",
        description: "",
        tags: [],
      },
      ...prevData,
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("Data has changed: ", data);
  }, [data]);

  const handleDelete = async (id) => {
    console.log("Delete: ", id);
    try {
      fetch(`http://localhost:8000/notes/${id}/`, {
        method: "DELETE",
      });
      setData((prevData) => {
        return prevData.filter((note) => note.id !== id);
      });
    }
    catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (data) => {
    console.log('Update: ', data.id);
    try {
      fetch(`http://localhost:8000/notes/${data.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCreate = async (data) => {
    console.log('Create: ', data);
    try {
      fetch(`http://localhost:8000/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="p-3 lg:pl-24 sm:p-2 md:p-5">
        <SearchBar onToggleChange={handleToggle} />
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
                  propstags={note.tags}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  onCreate={handleCreate}
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
