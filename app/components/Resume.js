/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React, {Component} from "react";

class Resume extends Component {

    render() {
        return <div className="resume">
            <header className="page-header">
                <h1 className="page-title">Resume of Daniel M. Halverson</h1>
                <small><i className="fa fa-clock-o"/> Last Updated on: Sunday,
                    February 01, 2015
                </small>
            </header>
            <div className="row">
                <div
                    className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                    <div className="panel panel-default">
                        <div className="panel-heading resume-heading">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="col-xs-12 col-sm-4">
                                        <figure>
                                            <img className="img-circle img-responsive" alt=""
                                                 src="images/dan_glasses.jpeg"/>
                                        </figure>
                                        <div className="row">
                                            <div className="col-xs-12 social-btns">
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a
                                                        href="https://plus.google.com/u/0/114718071449100470041"
                                                        className="btn btn-social btn-block btn-google"> <i
                                                        className="fa fa-google"/>
                                                    </a>
                                                </div>
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a href="https://www.facebook.com/daniel.m.halverson"
                                                       className="btn btn-social btn-block btn-facebook">
                                                        <i
                                                            className="fa fa-facebook"/>
                                                    </a>
                                                </div>
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a href="https://twitter.com/halversondm"
                                                       className="btn btn-social btn-block btn-twitter">
                                                        <i
                                                            className="fa fa-twitter"/>
                                                    </a>
                                                </div>
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a href="http://www.linkedin.com/in/dmhalverson"
                                                       className="btn btn-social btn-block btn-linkedin">
                                                        <i
                                                            className="fa fa-linkedin"/>
                                                    </a>
                                                </div>
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a href="https://github.com/halversondm"
                                                       className="btn btn-social btn-block btn-github"> <i
                                                        className="fa fa-github"/>
                                                    </a>
                                                </div>
                                                <div
                                                    className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                                    <a href="http://stackoverflow.com/users/975640/dan"
                                                       className="btn btn-social btn-block btn-stackoverflow">
                                                        <i className="fa fa-stack-overflow"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-8">
                                        <ul className="list-group">
                                            <li className="list-group-item">Daniel M. Halverson</li>
                                            <li className="list-group-item">Application Developer Lead
                                            </li>
                                            <li className="list-group-item">JPMorgan Chase & Co.</li>
                                            <li className="list-group-item"><i
                                                className="fa fa-phone"/>
                                                630-346-4822
                                            </li>
                                            <li className="list-group-item"><i
                                                className="fa fa-envelope"/>
                                                daniel.m.halverson@gmail.com
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bs-callout bs-callout-danger">
                            <h4>Summary</h4>
                            <p>14 years of experience in Information Technology. Extensive
                                experience in enterprise applications through the whole SDLC
                                lifecycle.</p>
                            <p>Achieved Expert Engineer status at JPMorgan Chase in 2012.</p>
                            <p>Experience in developing Java applications in a
                                service-oriented architecture.</p>
                            <p>Experience in developing COBOL applications for batch and
                                online functions.</p>
                            <p>Experience in SQL tuning with IBM DB2.</p>
                            <p>Experience in Object Relational Mapping with Hibernate.</p>
                            <p>Experience with data transportation in the form of IBM
                                WebSphere MQ and Apache CXF / SOAP messages.</p>
                            <p>Provide on-call support with fast, well thought resolution to
                                in-the-moment problems.</p>
                            <p>Have excellent analytical, problem solving, communication and
                                interpersonal skills, with ability to interact with individuals
                                at all levels and work as a part of a team, as well as
                                independently.</p>
                        </div>
                        <div className="bs-callout bs-callout-danger">
                            <h4>Prior Experiences</h4>
                            <ul className="list-group">
                                <div className="list-group-item inactive-link">
                                    <h4 className="list-group-item-heading">Application Developer
                                        Lead at JPMorgan Chase & Co.</h4>
                                    <h5 className="list-group-item-heading">February 2013 -
                                        Current</h5>
                                    <p className="list-group-item-text">Development leader for
                                        applications in the Retail and Investment Banks. Provide
                                        direction for junior members of the team.</p>
                                    <ul>
                                        <li>Leadership of projects in an Agile methodology</li>
                                        <li>Mentor and advise others on the best design and
                                            standards for new code
                                        </li>
                                        <li>Develop the service code and unit tests.</li>
                                        <li>Instruct others on the usage of tools and procedures
                                        </li>
                                    </ul>
                                </div>
                                <div className="list-group-item inactive-link">
                                    <h4 className="list-group-item-heading">Application Developer
                                        at JPMorgan Chase & Co.</h4>
                                    <h5 className="list-group-item-heading">January 2006 -
                                        Current</h5>
                                    <p className="list-group-item-text">The CIS application is the
                                        data store for customer data across the entire JPMorgan
                                        Chase bank. Data on every customer is stored in the CIS
                                        application and every channel retrieves data from either
                                        online and/or batch functions. The CIS application is
                                        written in COBOL/CICS with JCL for batch execution.The CIS
                                        Re-engineering project overall aims to replace the legacy
                                        COBOL, platform specific application with an enterprise Java
                                        application that is platform agnostic. In this phase of the
                                        project, we implemented a pair of pilot services to test
                                        feasibility and dependability. Then, we followed with a
                                        section of ten services from our list of COBOL online
                                        functions to convert into Java.</p>
                                    <ul>
                                        <li>Leadership of projects within an enterprise release.
                                        </li>
                                        <li>Design and develop application code using COBOL, CICS,
                                            JCL and DB2
                                        </li>
                                        <li>Mentor and advise others on the best design and
                                            standards for new code
                                        </li>
                                        <li>Developed tools to assist in the productivity of team
                                            members
                                        </li>
                                        <li>Provide on-call support</li>
                                        <li>Work with business analysts to test application</li>
                                        <li>Develop testing scenarios and scripts</li>
                                        <li>Working business knowledge of the Banking Industry</li>
                                        <li>Review code for cost-savings opportunities</li>
                                        <li>Decompose existing COBOL functions to determine what
                                            business logic and SQL needed to be recreated in Java and
                                            Hibernate and deployed as a WebService.
                                        </li>
                                        <li>Develop the schema and WSDL for the Java services.</li>
                                        <li>Develop the service code and unit tests.</li>
                                        <li>Wrote technical design document with a test driven
                                            development methodology.
                                        </li>
                                        <li>Understand the deployment process and work with the
                                            configuration management team to resolve deployment
                                            issues.
                                        </li>
                                        <li>Implemented synthetic transaction monitoring using HP
                                            BPM and Nagios
                                        </li>
                                        <li>Instruct others on the usage of tools and procedures
                                        </li>
                                        <li>Worked across teams to develop JMeter scripts to test
                                            SOAP messages.
                                        </li>
                                        <li>Developed a way to use Publish/Subscribe messaging
                                            across the application server cluster to dynamically
                                            change log4j logging levels at runtime
                                        </li>
                                        <li>Developed the design pattern that the team would use for
                                            processing Point-to-Point messaging via JMS
                                        </li>
                                        <li>Developed a logging solution using Aspect Oriented
                                            Programming to consistently log fixed-byte messages
                                            entering and leaving a JMS solution
                                        </li>
                                    </ul>
                                </div>
                                <div className="list-group-item inactive-link">
                                    <h4 className="list-group-item-heading">Software Project
                                        Leader at DST Systems, Inc</h4>
                                    <h5 className="list-group-item-heading">June 2000 - December
                                        2005</h5>
                                    <p className="list-group-item-text">The TA2000 Subaccounting
                                        application was designed to provide services to
                                        broker/dealers to manage their Omnibus positions within a
                                        mutual fund. The application provides trade roll-up and
                                        triangle reconciliation. The application is written in
                                        COBOL/CICS with a thick client front-end and JCL for batch
                                        execution.</p>
                                    <ul>
                                        <li>Develop small software projects (less than 5,000 hours)
                                        </li>
                                        <li>Supported daily production cycles with fast and reliable
                                            issue resolution
                                        </li>
                                        <li>Working business knowledge of the Mutual Fund industry
                                        </li>
                                        <li>Work with several teams to build the overall project
                                        </li>
                                        <li>Develop testing scenarios and scripts</li>
                                        <li>Migrate projects through a maximum of three
                                            production-like test platforms
                                        </li>
                                        <li>Lead teams of three people to code software</li>
                                        <li>Worked jointly with a remote team to accomplish a 15,000
                                            hour project in six months
                                        </li>
                                        <li>Attended Systemation project management className</li>
                                        <li>Certified by DST in DB2 and SQL usage</li>
                                    </ul>
                                    <p/>
                                </div>
                            </ul>
                        </div>
                        <div className="bs-callout bs-callout-danger">
                            <h4>Key Expertise</h4>
                            <ul className="list-group">
                                <li className="list-group-item">Legacy Platforms including COBOL
                                    and
                                    CICS
                                </li>
                                <li className="list-group-item">Object-Oriented Analysis and
                                    Design
                                </li>
                                <li className="list-group-item">Agile Design Methodologies</li>
                                <li className="list-group-item">Legacy Platform to Object
                                    Oriented
                                    Migrations
                                </li>
                                <li className="list-group-item">Database Design and Performance
                                    Tuning
                                </li>
                                <li className="list-group-item">Messaging Platforms</li>
                                <li className="list-group-item">Web Design</li>
                            </ul>
                        </div>
                        <div className="bs-callout bs-callout-danger">
                            <h4>Language and Platform Skills</h4>
                            <ul className="list-group">
                                <div className="list-group-item inactive-link">
                                    <div className="progress">
                                        <div data-placement="top" style={{width: "80%"}}
                                             aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="80" role="progressbar"
                                             className="progress-bar progress-bar-success">
                                            <span className="sr-only">80%</span> <span
                                            className="progress-type">Java/
                                                JavaEE/ Spring Framework </span>
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <div data-placement="top" style={{width: "70%"}}
                                             aria-valuemax="100" aria-valuemin="0" aria-valuenow="1"
                                             role="progressbar"
                                             className="progress-bar progress-bar-success">
                                            <span className="sr-only">80%</span> <span
                                            className="progress-type">COBOL
                                                /CICS /JCL</span>
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <div data-placement="top" style={{width: "70%"}}
                                             aria-valuemax="100" aria-valuemin="0" aria-valuenow="1"
                                             role="progressbar"
                                             className="progress-bar progress-bar-success">
                                            <span className="sr-only">70%</span> <span
                                            className="progress-type">SQL
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <div data-placement="top" style={{width: "65%"}}
                                             aria-valuemax="100" aria-valuemin="0" aria-valuenow="1"
                                             role="progressbar"
                                             className="progress-bar progress-bar-warning">
                                            <span className="sr-only">50%</span> <span
                                            className="progress-type">JavaScript
                                                /HTML</span>
                                        </div>
                                    </div>
                                    <div className="progress-meter">
                                        <div style={{width: "25%"}} className="meter meter-left">
                                            <span className="meter-text">I suck</span>
                                        </div>
                                        <div style={{width: "25%"}} className="meter meter-left">
                                            <span className="meter-text">I know little</span>
                                        </div>
                                        <div style={{width: "30%"}} className="meter meter-right">
                                            <span className="meter-text">I'm a guru</span>
                                        </div>
                                        <div style={{width: "20%"}} className="meter meter-right">
                                            <span className="meter-text">I''m good</span>
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
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Resume;

