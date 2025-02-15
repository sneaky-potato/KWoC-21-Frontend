import axios from "axios";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import cheers from "../assets/meme.jpg";
import reloadIcon from "../assets/refresh-cw.svg";
import { BACKEND_URL, STATS_API } from "../constants";
import { trim_lines, trim_message } from "../utils/helpers";

export default function StudentDashboard() {
  const [fullName, setFullName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [evalStatus, setEvalStatus] = useState("");
  const [blogLink, setBlogLink] = useState("");
  const [projects, setProjects] = useState([]);

  // const { width, height } = useWindowSize();

  const [stats, setStats] = useState({});

  const [pulls, setPulls] = useState([]);

  const [extraCommits, setExtraCommits] = useState([]);
  const [extraLinesAdded, setExtraLinesAdded] = useState(0);
  const [extraLinesRemoved, setExtraLinesRemoved] = useState(0);

  const announcements = [
    {
      date: "December 16, 2020",
      content: "The Mid Evals have been postponed to 20th December, 23:59 IST.",
    },
    {
      date: "December 6, 2020",
      content: "Coding Period has begun!",
    },
    {
      date: "November 28, 2020",
      content: "Coding Period begins on 6th December!",
    },
  ];

  const resources = [
    {
      message: "Writing Kickass READMEs",
      url: "http://www.bauva.com/blog/Writing-Kickass-READMEs/",
      avatar: "http://www.bauva.com/images/bio-photo.jpg",
    },
    {
      message: "Everything you need to ace KWoC",
      url: "https://medium.com/kharagpur-open-source-society/an-informal-introduction-to-kwoc-62fc5e686f79",
      avatar: "https://miro.medium.com/max/66/1*S7YHjDmgGnBEJcE116qQ7w.jpeg",
    },
    {
      message: "How to choose a Project for KWoC",
      url: "https://telegra.ph/How-to-choose-a-Project-for-KWoC-12-01",
      avatar: "https://telegra.ph/favicon.ico",
    },
    {
      message: "Codeacademy: Learn Git",
      url: "https://www.codecademy.com/learn/learn-git",
      avatar: "https://www.codecademy.com/favicon.ico",
    },
    {
      message: "Git Flight Rules: Cookbook for Git",
      url: "https://github.com/k88hudson/git-flight-rules",
      avatar: "https://github.com/k88hudson.png",
    },
    {
      message: "GitHub: Hello World Tutorial",
      url: "https://guides.github.com/activities/hello-world/",
      avatar: "https://guides.github.com/favicon.ico",
    },
  ];

  const details = {
    bloglink: blogLink,
    username: localStorage.getItem("student_username"),
  };

  const message_storage = () => {
    if (localStorage.getItem("announcement_message") !== "true") {
      localStorage.setItem("page_reload", "false");
    } else {
      localStorage.setItem("page_reload", "true");
    }

    localStorage.setItem("announcement_message", "true");
  };

  const result_message_storage = () => {
    if (localStorage.getItem("result_message") !== "true") {
      localStorage.setItem("page_reload2", "false");
    } else {
      localStorage.setItem("page_reload2", "true");
    }

    localStorage.setItem("result_message", "true");
  };

  const handleBlogLink = () => {
    const urlMatch = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.@~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-@]*)?" + // query string
        "(\\#[:-a-z\\d_]*)?$",
      "i"
    );

    if (!urlMatch.test(blogLink)) {
      alert("Not a valid blog link. Please correct and submit again");
      return;
    } else {
      axios
        .post(`${BACKEND_URL}/student/bloglink`, details, {
          headers: {
            Bearer: localStorage.getItem("student_jwt"),
          },
        })
        .then((res) => {
          console.log(details);
          console.log(res);
        })
        .catch((err) => {
          alert("Server error, Try again");
          console.log(err);
        });
    }

    window.location.reload();
  };

  useEffect(() => {
    message_storage();
    const student_username = localStorage.getItem("student_username");

    fetch(`${STATS_API}/student/exists/${student_username}`)
      .then((res) => res.text())
      .then((res) => {
        if (res === "false") {
          alert("Sorry, it seems that you have not registered for KWoC");
          window.location.pathname = "";
        }
      });
    // check that its not null
    const student_loggedout =
      localStorage.getItem("student_jwt") === null ||
      localStorage.getItem("student_jwt") === undefined;
    if (student_loggedout) window.location.pathname = "";
    const URL = `${BACKEND_URL}/student/dashboard`;
    const data = {
      username: localStorage.getItem("student_username"),
    };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setFullName(res.name);
        setCollegeName(res.college);
        setEvalStatus(res.evals);

        if (res.evals !== 0) {
          result_message_storage();
        }
      })
      .catch((err) => {
        alert("Server Error, Please try again");
      });

    //   axios
    //     .get(`${STATS_API}/stats/student/${student_username}`)
    //     .then((res) => {
    //       setStats(res.data[student_username]);
    //       console.log(res.data[student_username]);
    //     })
    //     .catch((err) => {
    //       alert("Server error, Try again");
    //     });
  }, []);

  // TODO: remove or delocalize
  // sample data kept for future reference
  // let data = {
  //   name: 'Aditya Vikram Singh',
  //   github: 'xypnox',
  //   college: 'IIT Kharagpur',
  //   commits: {
  //     count: 235,
  //     commits: [
  //       {
  //         hash: '234rrt',
  //         project: 'xypnox/xyplot',
  //         messsage: 'Compress residual images for faster loading speed',
  //       },
  //       {
  //         hash: 'aw3548',
  //         project: 'kossiitkgp/darkHorse',
  //         messsage: 'Fix: Typo and spacing',
  //       },
  //       {
  //         hash: 'hhstb32',
  //         project: 'xypnox/todxpy',
  //         messsage: 'Introduce new sorting for todos',
  //       },
  //       {
  //         hash: 'y67eb6',
  //         project: 'kossiitkgp/KWoC',
  //         messsage: 'Replace navbar with footer for fun',
  //       },
  //     ],
  //   },
  //   // this is the total sum of PRs for all the projects that he has been mentoring.
  //   pullRequests: {
  //     count: 12,
  //     open: 5,
  //     closed: 6,
  //   },
  //   linesOfCode: {
  //     count: '126k',
  //   },
  //   languages: ['Python', 'Javascript', 'HTML', 'CSS'],
  //   projects: ['darkHorse', 'todxpy', 'KWoC'],
  //   resources: [
  //     {
  //       message: 'Writing Kickass READMEs',
  //       url: 'http://www.bauva.com/blog/Writing-Kickass-READMEs/',
  //       avatar: 'http://www.bauva.com/images/bio-photo.jpg',
  //     },
  //     {
  //       message: 'Make a README',
  //       url: 'https://www.makeareadme.com/',
  //       avatar:
  //         'https://d33wubrfki0l68.cloudfront.net/ca149ad795cbdbe3a450dd7985baf0d763cc2fb6/0220f/images/owlbert.jpg',
  //     },
  //     {
  //       message: 'How to Write Beautiful and Meaningful README.md',
  //       url:
  //         'https://blog.bitsrc.io/how-to-write-beautiful-and-meaningful-readme-md-for-your-next-project-897045e3f991',
  //       avatar:
  //         'https://miro.medium.com/fit/c/96/96/1*50FKErsxynOeSmrUZk5Bsw.jpeg',
  //     },
  //     {
  //       message: 'What being a Google Summer of Code mentor taught me?',
  //       url:
  //         'https://hackernoon.com/what-being-a-google-summer-of-code-mentor-taught-me-8c97aad503a5',
  //       avatar:
  //         'https://hackernoon.com/avatars/pwtNTVrD7BPYArwg776n1wGXP193.png',
  //     },
  //     {
  //       message: 'Official GSoC Mentoring Guide',
  //       url: 'https://google.github.io/gsocguides/mentor/mind-the-gap',
  //       avatar: 'https://google.github.io/gsocguides/images/sun-small.png',
  //     },
  //     {
  //       message: 'OSS Maintainer and being a Mentor',
  //       url: 'https://www.bwplotka.dev/2020/how-to-became-oss-maintainer/',
  //       avatar: 'https://www.bwplotka.dev/images/profile.jpg',
  //     },
  //   ],
  //   student: ['yashrsharma44', 'rakaar', 'orkohunter'],
  //   announcement: [
  //     'Hi the KWOC has just started!',
  //     'Make sure you have submitted the mideval feedback for the student!',
  //     'Hi \n, the end evals have been finished!',
  //   ],
  //   evals: 'Mid Eval',
  // };

  let resourceList = [];
  for (const [index, elements] in resources.entries()) {
    resourceList.push(<li key={index}>{elements}</li>);
  }

  function removeCachedTimeStamp() {
    const student_username = localStorage.getItem("student_username");
    localStorage.removeItem(`stats_events_timestamp_${student_username}`);
    window.location.reload();
  }

  function resendForm() {
    setEvalStatus(1);
  }

  return (
    <div className="student-dashboard-body dashboard-container">
      <div className="dashboard">
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="font-awesome/css/font-awesome.css"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap"
          rel="stylesheet"
        ></link>
        {/*

         Mentor Dashboard here
            Plans to include the following
             -> Useful links - how to write README, others if any?
             -> Important Announcements
             -> Stats of indiv Mentor ???
      */}
        <div className="title-dashboard">
          <h1>Student Dashboard</h1>
        </div>
        <div className="intro-card">
          <div className="avatar grow-card">
            <img
              src={`https://github.com/${localStorage.getItem(
                "student_username"
              )}.png`}
              className="avatar-img"
              alt="Mentor's GitHub Avatar"
            ></img>
            <br />
            <div className="avatar-content">
              <p id="mentor-name">{fullName}</p>
              <p id="mentor-username">
                {localStorage.getItem("student_username")}
              </p>
              <p id="mentor-username">{collegeName}</p>
            </div>
          </div>

          <div className="mentor-stats ">
            <div className="mentor-stats-header">
              <h1>Stats</h1>
              <p className="stats-message">
                Stats will be updated once coding period begins
              </p>
              <br />
            </div>
            {/**Keep the font-mentor-header to a single word, multiple words create a bad UI experience */}
            <div className="mentor-stats-content">
              <div className="card-component non-purple-card mstats grow-card">
                <p className="font-mentor-header">Commits</p>
                <p className="font-mentor-stats">
                  {stats["commits"] && stats["commits"].length}
                </p>
              </div>

              <div className="card-component purple-card mstats  grow-card">
                <p className="font-mentor-header">
                  Pull Requests <br />
                  (open+closed)
                </p>
                <p className="font-mentor-stats">
                  {stats["pulls"] !== undefined && stats["pulls"].length}
                </p>
              </div>

              <div className="card-component non-purple-card mstats  grow-card">
                <p className="font-mentor-header">Lines of Code</p>
                <h1>(+/-)</h1>
                <p className="font-mentor-stats">
                  {trim_lines(parseInt(stats["lines_added"]))}/
                  {trim_lines(parseInt(stats["lines_removed"]))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {evalStatus === 1 ? (
            <div className="projects">
              <div className="endEvals-guide">
                <h1>
                  Thank you for your efforts till now. The deadlines for
                  End-term Evaluation submission has passed. See you next year
                  and keep contributing to open source.
                  <br />
                  For any issues, contact us.
                </h1>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <React.Fragment>
          {evalStatus === 2 ? (
            <div className="endEvals-guide">
              <Confetti />
              <h1>
                Thank you for participating in KWoC. Your report is being
                evaluated and on clearing, your certificate would be emailed to
                you till 18th January. See you next year and keep contributing
                to open source.
                <br />
                For any issues, contact us.
              </h1>
            </div>
          ) : (
            ""
          )}
        </React.Fragment>

        <div>
          {evalStatus === 0 ? (
            <React.Fragment className="projects">
              <h1 className="message">
                You could not clear KWoC 2020 Mid Evaluation.
                <br />
                But, don't let this stop you from contributing to Open Source.
                For any issues contact us.
              </h1>
            </React.Fragment>
          ) : (
            <div>
              {/* TODO: better way to show and confirm if announcements had been seen */}
              <React.Fragment className="projects">
                {localStorage.getItem("announcement_message") === "true" &&
                localStorage.getItem("page_reload") === "false" ? (
                  <div className="message">
                    <h1>Announcements have been updated!</h1>
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>

              <React.Fragment className="projects">
                {localStorage.getItem("result_message") === "true" &&
                localStorage.getItem("page_reload2") === "false" ? (
                  <div className="message">
                    <h1>
                      You have successfully passed KWoC 2020 Mid Evaluation.
                      Keep going!
                    </h1>
                    <img alt="" src={cheers} />
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>

              <div className="projects">
                <div className="project-header">
                  <h1>Languages involved</h1>
                </div>
                <div>
                  {stats["languages"] !== undefined &&
                    stats["languages"].map((item) => (
                      <span className="tag is-dark is-large">{item}</span>
                    ))}
                </div>
              </div>

              <div className="projects">
                <div className="project-header">
                  <h1>Projects</h1>
                </div>
                <div>
                  {stats["projects"] !== undefined &&
                    stats["projects"].map((item) => (
                      <span className="tag is-dark is-large is-info">
                        <a href={`https://github.com/${item}`}>{item}</a>
                      </span>
                    ))}
                </div>
              </div>

              <div className="projects">
                <div className="project-header">
                  <h1>
                    Pull Reqests
                    <img
                      alt=""
                      src={reloadIcon}
                      className="refresh-icon"
                      onClick={removeCachedTimeStamp}
                    />
                  </h1>
                </div>
                <div className="table-container" id="indiv-stats-table">
                  {pulls !== undefined ? (
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <h3>Project</h3>
                          </th>
                          <th>
                            <h3>Pull Request</h3>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {stats["pulls"] &&
                          stats["pulls"].map((item) => {
                            return (
                              <tr>
                                <td>
                                  <a
                                    className="project-in-commit-table"
                                    href={`https://github.com/${item["base"]["repo"]["full_name"]}`}
                                  >
                                    {item["base"]["repo"]["full_name"]}
                                  </a>
                                </td>

                                <td>
                                  <a href={item["html_url"]}>
                                    {trim_message(item["title"])}
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="projects">
                <div className="project-header">
                  <h1>Commits</h1>
                </div>
                <div className="table-container" id="indiv-stats-table">
                  {stats["commits"] !== undefined &&
                  extraCommits !== undefined ? (
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <h3>Project</h3>
                          </th>
                          <th>
                            <h3>Commit</h3>
                          </th>
                          <th>
                            <h3>Lines</h3>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {stats["commits"].map((item) => {
                          return (
                            <tr>
                              <td>
                                <a
                                  className="project-in-commit-table"
                                  href={`https://github.com/${item["project"]}`}
                                >
                                  {item["project"]}
                                </a>
                              </td>
                              <td>
                                <a href={item["html_url"]}>
                                  {trim_message(item["message"])}
                                </a>
                              </td>
                              <td>
                                +{trim_lines(item["lines_added"])},-
                                {trim_lines(item["lines_removed"])}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <section className="resource-card">
                <div className="resource-header">
                  <h1>Resources</h1>
                </div>

                <table className="table is-bordered is-striped">
                  <tbody>
                    {resources.map((resourceCard) => {
                      const message = resourceCard.message;
                      const url = resourceCard.url;
                      const avatar = resourceCard.avatar;

                      return (
                        <tr>
                          <td>
                            <a href={url}>
                              <img
                                src={avatar}
                                className="avatar-resource"
                                alt="link"
                              ></img>
                            </a>
                          </td>
                          <td>
                            <a href={url}>
                              <p>{message}</p>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <div className="announcements">
                <h1>Announcements</h1>

                {announcements.map((item, index) => {
                  return (
                    <div className="anc-card card-component grow-card">
                      <h1>{item.date}</h1>
                      <p>{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
