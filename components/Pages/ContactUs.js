import React, { useRef, useState } from "react";
import classes from "./ContactUs.module.css";
const ContactUs = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const nameRef = useRef("");
  const emailidRef = useRef("");
  const mobnoRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const user = {
      nameRef: nameRef.current.value,
      emailidRef: emailidRef.current.value,
      mobnoRef: mobnoRef.current.value,
    };
    console.log(user);
    nameRef.current.value = "";
    emailidRef.current.value = "";
    mobnoRef.current.value = "";
    try {
      const response = await fetch(
        "https://ecommerce-website-82afa-default-rtdb.firebaseio.com/contactus.json",
        {
          method: "POST",
          body: JSON.stringify(user),
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
      setDone(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <h1>Contact Us</h1>
        <span className={classes.control}>
          <label htmlFor='title'>Name</label>
          <input type='text' id='name' ref={nameRef} required />
        </span>
        <div className={classes.control}>
          <label htmlFor='emailid'>Email ID</label>
          <input type='text' id='email id' ref={emailidRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='mobno'>Mob NO</label>
          <input type='text' id='mobno' ref={mobnoRef} required></input>
        </div>
        <div className={classes.control}>
          <button>Submit</button>
        </div>
        <div>
          {error && <p>Something went wrong! plz try again...</p>}
          {done && <p>Thank you for contacting us...</p>}
        </div>
      </div>
    </form>
  );
};
export default ContactUs;
