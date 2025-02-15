import React from "react";
import pullRequest from "../assets/git-pull-request.svg";
import github from "../assets/github.svg";
import group from "../assets/people.svg";
import Part from "../components/Part";
import Timeline from "../components/Timeline";
import {
  MENTOR_MANUAL,
  MENTOR_REGISTRATION_LINK,
  STUDENT_MANUAL,
  STUDENT_REGISTRATION_LINK,
} from "../constants";

function Home() {
  const tags = [
    "Machine learning",
    "Android",
    "Computer Vision",
    "Gaming",
    "Backend",
    "Natural Language Processing",
    "Scrapping",
    "Cognition",
    "Front End",
    "Deep Learning",
    "Operating System",
    "DBMS",
    "OOP",
    "Compilers",
    "Security",
    "Data Mining",
    "Simulations",
    "Artificial Intelligence",
  ];

  return (
    <div className="home">
      <section className="hero">
        <Part />
        <div className="hero-body">
          <h1 className="title">Welcome to KWoC</h1>

          <div className="btns-container">
            <a className="button" href={STUDENT_REGISTRATION_LINK}>
              Student Registration
            </a>

            <a className="button" href={MENTOR_REGISTRATION_LINK}>
              Mentor Registration
            </a>
          </div>

          <div className="btns-container">
            <a
              className="button"
              href={STUDENT_MANUAL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Student Manual
            </a>

            <a
              className="button"
              href={MENTOR_MANUAL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Mentor Manual
            </a>
          </div>
        </div>
      </section>

      <section className="why-kwoc container" id="about">
        <h1>About</h1>
        <p>
          Kharagpur Winter of Code is a 5-week long online program for students
          who are new to open source software development. The program not only
          helps students to get involved in open source, but also prepares them
          for many open source summer programs; Google Summer of Code being one
          of them.
        </p>

        <h2>Why KWoC?</h2>

        <h3>Intro to Open Source</h3>

        <p>
          KWoC provides a great opportunity to get acquainted with Github along
          with Git commands and contribute to open source efficiently. Brush up
          your coding skills
        </p>

        <p>
          If you love coding and want to learn about software development then
          KWoC helps you to get a glimpse of it and gives you a head start.
        </p>
        <h3>Prepare for GSoC</h3>

        <p>
          With KWoC, you get to know about how to select a project, interact
          with mentors and learn all other things that prepare you in the best
          way for the next GSoC.
        </p>
      </section>

      <section className="tags container" id="tags">
        <h1>Tags</h1>

        <p>
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </p>
      </section>

      <section className="timeline container" id="tline">
        <h1>Timeline</h1>
        <Part />
        <Timeline />
      </section>

      <section className="stats container">
        <h1>Statistics: KWoC 2019</h1>
        <div className="columns">
          <div className="column">
            <img src={group} alt="Group" />

            <h3>2000+ Participants</h3>
          </div>

          <div className="column">
            <img src={pullRequest} alt="pullRequest" />

            <h3>600+ Pull Requests</h3>
          </div>

          <div className="column">
            <img src={github} alt="Project" />

            <h3>150+ Projects</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
