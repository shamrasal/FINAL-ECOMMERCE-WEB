import React, { useRef, useState } from "react";

import classes from "./AddMovieForm.module.css";

function AddMovieForm(props) {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  async function submitHandler(event) {
    event.preventDefault();
    // could add validation here...
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
    try {
      const response = await fetch(
        "https://ecommerce-website-82afa-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong! plz try again...");
      }
      const data = await response.json();
      console.log(data);
      props.isLoadAgain((retry) => !retry);
      setDone(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea
          rows='5'
          id='opening-text'
          ref={openingTextRef}
          required
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
      <div>
        {error && <p>{error}</p>}
        {done && <p>Thank you for contacting us...</p>}
      </div>
    </form>
  );
}

export default AddMovieForm;
