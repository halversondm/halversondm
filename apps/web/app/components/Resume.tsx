/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { type ReactNode } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Resume(): ReactNode {
  return (
    <div className="resume">
      <header className="page-header">
        <h1 className="page-title">Resume of Daniel M. Halverson</h1>
        <small>
          <FontAwesomeIcon icon={faClock} /> Last Updated on: Friday, October
          27, 2023
        </small>
      </header>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="resume-heading">
                <Row>
                  <Col>
                    <figure>
                      <img
                        className="rounded-circle img-fluid"
                        alt=""
                        src="images/dan_suit.jpg"
                      />
                    </figure>
                  </Col>
                  <Col>
                    <ul className="list-group">
                      <li className="list-group-item">Daniel M. Halverson</li>
                      <li className="list-group-item">
                        Senior Director of Software Engineering
                      </li>
                      <li className="list-group-item">JPMorgan Chase & Co.</li>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={faPhone} />
                        630-346-4822
                      </li>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={faEnvelope} />
                        daniel.m.halverson@gmail.com
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="social-btn-holder">
                      <a
                        href="https://www.facebook.com/daniel.m.halverson"
                        className="btn btn-social btn-block btn-facebook"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    </div>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="social-btn-holder">
                      <a
                        href="https://twitter.com/halversondm"
                        className="btn btn-social btn-block btn-twitter"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </div>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="social-btn-holder">
                      <a
                        href="http://www.linkedin.com/in/dmhalverson"
                        className="btn btn-social btn-block btn-linkedin"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </div>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="social-btn-holder">
                      <a
                        href="https://github.com/halversondm"
                        className="btn btn-social btn-block btn-github"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    </div>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="social-btn-holder">
                      <a
                        href="http://stackoverflow.com/users/975640/dan"
                        className="btn btn-social btn-block btn-stackoverflow"
                      >
                        <FontAwesomeIcon icon={faStackOverflow} />
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Header>
            <div className="bs-callout bs-callout-danger">
              <h4>Summary</h4>
              <p>
                Versatile Senior Director of Software Engineering committed to
                consistently finding dynamic solutions for software issues, team
                building, and financial discipline. Polished in finding
                innovative ways to efficiently build scalable, high-availability
                online systems. Offering a 23-year background creating and
                implementing software systems and leading teams.
              </p>
            </div>
            <div className="bs-callout bs-callout-danger">
              <h4>Experiences</h4>
              <ul className="list-group">
                <div className="list-group-item inactive-link">
                  <h4 className="list-group-item-heading">
                    Executive Director / JPMorgan Chase & Co - Chicago, IL{" "}
                  </h4>
                  <h5 className="list-group-item-heading">
                    02/2020 - Current{" "}
                  </h5>
                  <p className="list-group-item-text"></p>
                  <ul>
                    <li>
                      Currently leading a team of 25 engineers across three
                      sites for an internally developed product related to BPM /
                      Workflow. The product has a reach of 9,000 users across
                      the word with multiple installation patterns.
                    </li>
                    <li>
                      Responsible for roadmap creation with my leadership team
                      and socialization with product owners and customers.
                    </li>
                    <li>
                      Designing software with team leads and architects to
                      continue to push goals of the firm and my organization
                    </li>
                    <li>
                      Partnered with internal design teams to achieve the best
                      UX experience while meeting business requirements
                    </li>
                    <li>
                      Mentoring direct reports for promotion and career goals
                    </li>
                    <li>
                      Teaching developers about the application&apos;s finer
                      points and why decisions were made
                    </li>
                    <li>
                      Interviewing and hiring candidates for roles on the team
                    </li>
                    <li>
                      Managing to budget for runtime compute, project and
                      associate concerns
                    </li>
                    <li>
                      Developing software as needed and usually in a pair
                      programming setting
                    </li>
                    <li>
                      Research of products like click analytics solutions and
                      presentation to senior leadership
                    </li>
                    <li>
                      Completed a modernization of a UI and API application by
                      moving 40 microservices and 4 TB of data to the cloud
                    </li>
                    <li>
                      Built an SRE team from the ground up with 3 engineers
                    </li>
                    <li>
                      Created a development team for a legacy application
                      starting with 4 developers and ending with 15 developers
                      and transitioned the team to DevOps.
                    </li>
                    <li>
                      Drastically improved system monitoring and alerting
                      through the usage AppDynamics, Apica, Geneos, Grafana, and
                      Splunk
                    </li>
                    <li>
                      Code for Good Project Judge; a multi-city hackathon to
                      help non-profit organizations with the technology needs
                      via college students
                    </li>
                  </ul>
                </div>
                <div className="list-group-item inactive-link">
                  <h4 className="list-group-item-heading">
                    Vice President / JPMorgan Chase & Co - Chicago, IL{" "}
                  </h4>
                  <h5 className="list-group-item-heading">02/2013 - 01/2020</h5>
                  <p className="list-group-item-text"></p>
                  <ul>
                    <li>
                      Design and develop application code using Java, JavaScript
                      and SQL
                    </li>
                    <li>
                      Lead global teams up to 25 individuals through greenfield
                      and brownfield development efforts
                    </li>
                    <li>
                      Experience with developing workflow applications from the
                      ground up
                    </li>
                    <li>
                      Lead an effort to expand the application&apos;s
                      infrastructure from 8 to 27 servers
                    </li>
                    <li>
                      Implemented the teams CI / CD solution using Jenkins and
                      available firm tools
                    </li>
                    <li>
                      Developed features and resolved defects as well as
                      provided on-call support
                    </li>
                    <li>
                      Lead team through code consolidation and decommission
                      effort to reduce 3.5 MM lines of code to 2 MM
                    </li>
                    <li>
                      Implement software solutions on cloud using micro services
                      patterns
                    </li>
                    <li>Implement user interfaces in React and Angular</li>
                    <li>
                      Promote best practices for source code through code
                      reviews
                    </li>
                    <li>
                      Mentor and coach employees in their current projects and
                      career direction
                    </li>
                    <li>
                      Three-time winner of company-wide hackathons and
                      participant in Tech for Social Good
                    </li>
                    <li>
                      Present new technologies to senior technology management
                      for broad understanding and inclusion
                    </li>
                    <li>
                      Code for Good Team Mentor; a multi-city hackathon to help
                      non-profit organizations with the technology needs via
                      college students
                    </li>
                  </ul>
                </div>
                <div className="list-group-item inactive-link">
                  <h4 className="list-group-item-heading">
                    Associate / JPMorgan Chase & Co - Chicago, IL{" "}
                  </h4>
                  <h5 className="list-group-item-heading">01/2006 - 01/2013</h5>
                  <p className="list-group-item-text"></p>
                  <ul>
                    <li>
                      Design and develop application code using COBOL, CICS, JCL
                      and DB2
                    </li>
                    <li>Leadership of projects within an enterprise release</li>
                    <li>
                      Mentor and advise others on the best design and standards
                      for new code
                    </li>
                    <li>
                      Developed tools to assist in the productivity of team
                      members
                    </li>
                    <li>Provide on-call support</li>
                    <li>Work with business analysts to test application</li>
                    <li>Develop testing scenarios and scripts</li>
                    <li>Working business knowledge of the Banking Industry</li>
                    <li>Review code for cost-savings opportunities</li>
                    <li>
                      Transitioned a key customer data application from COBOL to
                      Java
                    </li>
                  </ul>
                </div>
                <div className="list-group-item inactive-link">
                  <h4 className="list-group-item-heading">
                    Software Project Leader / DST Systems, Inc - Kansas City, MO
                  </h4>
                  <h5 className="list-group-item-heading">06/2000 - 12/2005</h5>
                  <p className="list-group-item-text">
                    The TA2000 Subaccounting application was designed to provide
                    services to broker/dealers to manage their Omnibus positions
                    within a mutual fund. The application provides trade roll-up
                    and triangle reconciliation. The application is written in
                    COBOL/CICS with a thick client front-end and JCL for batch
                    execution.
                  </p>
                  <ul>
                    <li>
                      Develop small software projects (less than 5,000 hours)
                    </li>
                    <li>
                      Supported daily production cycles with fast and reliable
                      issue resolution
                    </li>
                    <li>
                      Working business knowledge of the Mutual Fund industry
                    </li>
                    <li>
                      Work with several teams to build the overall project
                    </li>
                    <li>Develop testing scenarios and scripts</li>
                    <li>
                      Migrate projects through a maximum of three
                      production-like test platforms
                    </li>
                    <li>Lead teams of three people to code software</li>
                    <li>
                      Worked jointly with a remote team to accomplish a 15,000
                      hour project in six months
                    </li>
                    <li>Attended Systemation project management className</li>
                    <li>Certified by DST in DB2 and SQL usage</li>
                  </ul>
                  <p />
                </div>
              </ul>
            </div>
            <div className="bs-callout bs-callout-danger">
              <h4>Skills</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Java, JavaScript, SQL, Oracle, Kafka, MQ, Kubernetes, Docker,
                  Unix
                </li>
                <li className="list-group-item">
                  Large system design with cloud technologies
                </li>
                <li className="list-group-item">
                  Budgeting and financial management
                </li>
                <li className="list-group-item">Agile program management</li>
                <li className="list-group-item">
                  Talent management and staffing
                </li>
                <li className="list-group-item">
                  Senior Management Presentations
                </li>
              </ul>
            </div>
            <div className="bs-callout bs-callout-danger">
              <h4>Language and Platform Skills</h4>
              <ul className="list-group">
                <div className="list-group-item inactive-link">
                  <div className="progress">
                    <div
                      data-placement="top"
                      style={{ width: "80%" }}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={80}
                      role="progressbar"
                      className="progress-bar bg-success"
                    >
                      <span className="sr-only">80%</span>{" "}
                      <span className="progress-type">
                        Java/ JavaEE/ Spring Framework{" "}
                      </span>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      data-placement="top"
                      style={{ width: "70%" }}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={1}
                      role="progressbar"
                      className="progress-bar bg-success"
                    >
                      <span className="sr-only">80%</span>{" "}
                      <span className="progress-type">COBOL /CICS /JCL</span>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      data-placement="top"
                      style={{ width: "70%" }}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={1}
                      role="progressbar"
                      className="progress-bar bg-success"
                    >
                      <span className="sr-only">70%</span>{" "}
                      <span className="progress-type">SQL</span>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      data-placement="top"
                      style={{ width: "65%" }}
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={1}
                      role="progressbar"
                      className="progress-bar bg-warning"
                    >
                      <span className="sr-only">50%</span>{" "}
                      <span className="progress-type">JavaScript /HTML</span>
                    </div>
                  </div>
                  <div className="progress-meter">
                    <div style={{ width: "25%" }} className="meter meter-left">
                      <span className="meter-text">I suck</span>
                    </div>
                    <div style={{ width: "25%" }} className="meter meter-left">
                      <span className="meter-text">I know little</span>
                    </div>
                    <div style={{ width: "30%" }} className="meter meter-right">
                      <span className="meter-text">I&apos;m a guru</span>
                    </div>
                    <div style={{ width: "20%" }} className="meter meter-right">
                      <span className="meter-text">I&apos;m good</span>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div className="bs-callout bs-callout-danger">
              <h4>Education</h4>
              <table className="table table-striped table-responsive ">
                <thead>
                  <tr>
                    <th>Degree</th>
                    <th>School</th>
                    <th>Graduation Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bachelor of Science in Business</td>
                    <td>Eastern Illinois University</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
