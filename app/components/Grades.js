/**
 * Created by Daniel on 6/26/2016.
 */
"use strict";

import React from "react";

const Grades = React.createClass({

  getInitialState() {
    return {
      studentList: [],
      student: {
        studentNumber: "",
        quiz1: "",
        quiz2: "",
        midterm: "",
        final: "",
        classAverage: "",
        letterGrade: ""
      }
    };
  },
  removeStudent(event) {
    var studentList = this.state.studentList;
    studentList.splice(event.currentTarget.dataset.key, 1);
    this.setState({studentList: studentList});
  },
  addStudent() {
    var student = this.state.student;
    var quizzes = ((student.quiz1 * 10) + (student.quiz2 * 10)) / 200;
    var midterm = student.midterm / 100;
    var final = student.final / 100;
    var finalGrade = ((quizzes * 0.25) + (midterm * 0.25) +
      (final * 0.5)) * 100;
    student.classAverage = Math.round(finalGrade);
    student = this.determineLetterGrade(finalGrade, student);
    var studentList = this.state.studentList;
    studentList.push(student);
    this.setState({
      studentList: studentList,
      student: {
        studentNumber: "",
        quiz1: "",
        quiz2: "",
        midterm: "",
        final: "",
        classAverage: "",
        letterGrade: ""
      }
    });
  },
  determineLetterGrade(finalGrade, student) {
    if (finalGrade >= 90) {
      student.letterGrade = "A";
    } else if (finalGrade >= 80 && finalGrade <= 89) {
      student.letterGrade = "B";
    } else if (finalGrade >= 70 && finalGrade <= 79) {
      student.letterGrade = "C";
    } else if (finalGrade >= 60 && finalGrade <= 69) {
      student.letterGrade = "D";
    } else {
      student.letterGrade = "F";
    }
    return student;
  },
  studentNumberChange(event) {
    var student = this.state.student;
    student.studentNumber = event.target.value;
    this.setState({student: student});
  },
  quiz1Change(event) {
    var student = this.state.student;
    student.quiz1 = event.target.value;
    this.setState({student: student});
  },
  quiz2Change(event) {
    var student = this.state.student;
    student.quiz2 = event.target.value;
    this.setState({student: student});
  },
  midtermChange(event) {
    var student = this.state.student;
    student.midterm = event.target.value;
    this.setState({student: student});
  },
  finalChange(event) {
    var student = this.state.student;
    student.final = event.target.value;
    this.setState({student: student});
  },
  render() {
    return <div>
      <h2 className="text-primary">Grade Book</h2>
      <p>Quizzes are on a 10 point basis. Exams are on a 100 point basis.
        Quizzes and the Midterm count for 25% of the final grade. The final exam
        counts for 50% of the final grade.</p>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>Student #</th>
          <th>Quiz 1 Grade</th>
          <th>Quiz 2 Grade</th>
          <th>Midterm Exam Grade</th>
          <th>Final Exam Grade</th>
          <th>Class Average</th>
          <th>Letter Grade</th>
          <th>Remove Student</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.studentList.map((student, i) => {
            return <tr key={i}>
              <td>{student.studentNumber}</td>
              <td>{student.quiz1}</td>
              <td>{student.quiz2}</td>
              <td>{student.midterm}</td>
              <td>{student.final}</td>
              <td>{student.classAverage}</td>
              <td>{student.letterGrade}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                        onClick={this.removeStudent} data-key={i}> - Remove
                  Student
                </button>
              </td>
            </tr>;
          })
        }
        </tbody>
      </table>
      <hr />
      <h4>Add a new student</h4>
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="studentNumber" className="col-sm-2 control-label">Student
            Number</label>
          <div className="col-sm-2">
            <input id="studentNumber" value={this.state.student.studentNumber}
                   onChange={this.studentNumberChange} type="number"
                   className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="quiz1" className="col-sm-2 control-label">Quiz 1
            Grade</label>
          <div className="col-sm-2">
            <input id="quiz1" value={this.state.student.quiz1} type="number"
                   onChange={this.quiz1Change} className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="quiz2" className="col-sm-2 control-label">Quiz 2
            Grade</label>
          <div className="col-sm-2">
            <input id="quiz2" value={this.state.student.quiz2} type="number"
                   onChange={this.quiz2Change} className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="midterm" className="col-sm-2 control-label">Midterm
            Exam Grade</label>
          <div className="col-sm-2">
            <input id="midterm" value={this.state.student.midterm} type="number"
                   onChange={this.midtermChange} className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="final" className="col-sm-2 control-label">Final Exam
            Grade</label>
          <div className="col-sm-2">
            <input id="final" value={this.state.student.final} type="number"
                   onChange={this.finalChange} className="form-control"/>
          </div>
        </div>
        <button className="btn btn-primary btn-sm" id="addStudent"
                onClick={this.addStudent}> + Add Student
        </button>
      </form>
    </div>;
  }
});

export default Grades;
