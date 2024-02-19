import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import SearchBar from "../components/SearchBar";
import "../styles/HomePage.css";
import axios from "axios";
import Header from "../components/Header";
import create_new_note from "../assets/create_note.svg";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [addedNew, setAddedNew] = useState(false);
  const [searching, setSearching] = useState(false);
  const tokens = JSON.parse(localStorage.getItem("authTokens"));

  const handleToggle = (toggle) => {
    setToggle(!toggle);
  };
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens["access"],
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
          Authorization: "Bearer " + tokens["access"],
        },
        body: JSON.stringify({
          title: "",
          description: "",
          deadline: Date(),
        }),
      });
      getData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAddedNew(true);
    }
  };

  useEffect(() => {
    getData();
    setAddedNew(false);
    setSearching(false);
  }, [addedNew, toggle]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        fetch(`http://localhost:8000/notes/${id}/`, {
          headers: {
            Authorization: "Bearer " + tokens["access"],
          },
          method: "DELETE",
        });
        setData((prevData) => {
          return prevData.filter((note) => note.id !== id);
        });
      } catch (error) {
        console.error("Error:", error);
      }
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
    try {
      const response = await fetch(
        `http://localhost:8000/notes/${noteData.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokens["access"],
          },
          body: JSON.stringify(noteData),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (toggle) {
      try {
        const response = await fetch(
          `http://localhost:8000/notes/?global_search=${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokens["access"],
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
        setSearching(true);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // TODO: Fix this unmodular code.
      try {
        const response = await fetch(
          `http://localhost:8000/notes/?local_search=${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokens["access"],
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="py-3">
      <div className="p-3 lg:pl-24 sm:p-2 md:p-5 space-y-14">
        <Header />
        <SearchBar onToggleChange={handleToggle} onQueryChange={handleSearch} />
      </div>

      <div className="p-3 lg:pt-24 lg:pl-24 lg:pr-24 sm:p-2 md:p-5">
        <div>
          <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.length === 0 ? (
              searching ? (
                <div className="w-full text-3xl font-bold text-gray-500">
                  <p className="my-auto">No notes found!</p>
                </div>
              ) : (
                <div className="w-full text-3xl font-bold text-gray-500">
                  <img
                    className="w-32 h-32 text-center opacity-50"
                    src={create_new_note}
                    alt="Create new note"
                  />
                  <p className="my-auto">Create your first note!</p>
                </div>
              )
            ) : (
              <></>
            )}
            {data.map((note) => (
              <CSSTransition
                key={note.id}
                timeout={500}
                classNames="note-transition"
              >
                {searching ? (
                  <Notes
                    propsid={note.id}
                    propstitle={note.title}
                    propsbody={note.description}
                    propsdeadline={note.deadline}
                    propsispublic={note.is_public}
                    propsauthor={note.author}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    editable={false}
                  />
                ) : (
                  <Notes
                    propsid={note.id}
                    propstitle={note.title}
                    propsbody={note.description}
                    propsdeadline={note.deadline}
                    propsispublic={note.is_public}
                    propsauthor={note}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    editable={true}
                  />
                )}
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      <div className="h-52"></div>

      <div className="fixed bottom-0 right-0 p-5" onClick={handleAdd}>
        <AddNote />
      </div>
    </div>
  );
};

export default HomePage;
