import React, { useState } from "react";
import './contact.scss';
import contactImg from "./doc/contact.png";


const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <div className="contact">
    <form onSubmit={handleSubmit}>
  <div className="container">
    <div style={{ textAlign: "center" }}>
      <h2>Contact Us</h2>
      <p>Swing by for a cup of coffee, or leave us a message:</p>
    </div>
    <div className="row">
      <div className="column">
        <img src={contactImg} style={{ width: "100%" }} alt="Map" />
      </div>
      <div className="column">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Your name.." />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Your email.." />
        <br/>
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Write something.." style={{ height: "170px" }} />
        <button type="submit">{status}</button>
      </div>
    </div>
  </div>
</form>
<br/>
<a href="/"><button className="button">Menu</button></a>
</div>
);
};


export default ContactForm;
