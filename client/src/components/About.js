
import './about.css';
import React from 'react';
import Mahnaz from "./doc/Mahnaz.jpg";
import Nima from "./doc/Nima.jpg";
import Yuqin from "./doc/Yuqin.jpg";
import githubIcon from "./doc/github.png";
import emailIcon from "./doc/email.jpg";

function About() {
  return (
    <>
    <div className="about-section">
      <h1>About Us</h1>
      <br/>
      <p>We are 3 person with different background. We joined to LightHouse Labs to learn how we need to change our life.</p>
      <p>We tried to improve our skils in web programing in Javascript as a Full Stack Web Developer.</p>
      <p>We had a great team work with some chalange to create this project as our final project during one week.</p>
    </div>

    <div className="row1">
      <div className="column1">
        <div className="card1">
          <div className="photo"><img src={Yuqin} alt="Yuqin" style={{width: "50%"}} /></div>
          <div className="container">
            <h2>Yuqin Hu</h2>
            <p className="title">Full Stack Web Developer</p>
            <p>I am a full-stack web developer with a background in data science. I have excellent coding skills in full-stack web development in 
              front-end and back-end. I also have some data processing skills such as cleaning data and predicting data.</p>
              <img className="emailImg" src={emailIcon} alt="email icon"/>  h878688736@gmail.com
            <br/>
            <a href="https://github.com/YuqinHu">
             <img className="githubImg" src={ githubIcon} alt="GitHub icon"/>YuqinHu</a>
          </div>
        </div>
      </div>

      <div className="column1">
        <div className="card1">
        <div className="photo"><img src={Nima} alt="Nima" style={{width: "50%"}} /></div>
          <div className="container">
            <h2>Nima Mohamed</h2>
            <p className="title">Full Stack Web Developer</p>
            <p>As a full-stack developer transitioning from a second cook, I have a keen eye for details and I can manage my time well while working under pressure. 
              I have strong Photoshop skills and an artistic view that can help me design visually appealing applications.</p>
              <img className="emailImg" src={emailIcon} alt="email icon"/>  nima.mohamed@hotmail.com
            <br/>
            <a href="https://github.com/nima-nimbile">
             <img className="githubImg" src={ githubIcon} alt="GitHub icon"/>nima-nimbile</a>
          </div>
        </div>
      </div>

      <div className="column1">
        <div className="card1">
        <div className="photo"><img src={Mahnaz} alt="Mahnaz" style={{width: "50%"}} /></div>
          <div className="container">
            <h2>Mahnaz Esmaeili</h2>
            <p className="title">Full Stack Web Developer</p>
            <p>I am a Full Stack Web Developer with four years of experience as a Java Developer in client-server environments. 
              I have experience in developing and designing web applications using HTML, CSS, JavaScript,
              Node.js, and React, and some skills in databases.</p>
              <img className="emailImg" src={emailIcon} alt="email icon"/>  Esmaeilymahnaz@gmail.com
            <br/>
            <a href="https://github.com/MahnazEs">
             <img className="githubImg" src={ githubIcon} alt="GitHub icon"/>MahnazEs</a>
          </div>
          </div>
      </div>
    </div>
    <p><a href="/Contact"><button className="button1">Contact</button></a></p>
    </>
  );
}

export default About;