import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import "../styles/HomePage.css"; // Create a new CSS file (HomePage.css) for custom styles

const HomePage = () => {
  const data = [
    {
      uid: "1",
      title: "Title1",
      body: "Body1",
      tags: ["tag1", "tag2"],
    },
    {
      uid: "2",
      title: "Title2",
      body: "Body2",
      tags: ["tag1", "tag2"],
    },
    {
      uid: "3",
      title: "Title3",
      body: "Body3",
      tags: ["tag1", "tag2"],
    },
  ];
  const [notes, setNotes] = useState(data);

  const handleAdd = () => {
    setNotes((prevNotes) => [
      {
        uid: Date.now().toString(),
        title: "",
        body: "",
        tags: ["tag1", "tag2"],
      },
      ...prevNotes,
    ]);
  };

  return (
    <>
      <div className="p-3 lg:pt-24 lg:pl-24 lg:pr-24 sm:p-2 md:p-5">
        <div className="mx-auto">
          <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {notes.map((note, key) => (
              <CSSTransition key={note.uid} timeout={500} classNames="note-transition">
                <Notes propstitle={note.title} propsbody={note.body} />
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
