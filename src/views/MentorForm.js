import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

export default function Form(props) {
  const [isSubmitDisabled, disableSubmit] = useState(false);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { username, name, email } = props.location.state;

    setUsername(username);
    setName(name);
    setEmail(email);
  }, [props.location.state]);

  function handleSubmit(e) {
    e.preventDefault();
    disableSubmit(true);
    const URL = `${BACKEND_URL}/mentor/form`;
    const data = {
      username: username,
      name: name,
      email: email,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        Bearer: localStorage.getItem("mentor_jwt"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "success") props.history.push("/dashboard/mentor");
      })
      .catch((err) => {
        disableSubmit(false);
      });
  }

  return (
    <div className="box">
      <h2>Registrations for this year have ended.</h2>
    </div>
  );
}
