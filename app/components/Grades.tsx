/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";

export interface GradesState {
    studentList: Student[];
    student: Student;
}

export interface Student {
    studentNumber: number;
    quiz1: number;
    quiz2: number;
    midterm: number;
    final: number;
    classAverage: number;
    letterGrade: string;
}

export class Grades extends React.Component<undefined, GradesState> {

    state: GradesState;

    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            student: {
                studentNumber: 0,
                quiz1: 0,
                quiz2: 0,
                midterm: 0,
                final: 0,
                classAverage: 0,
                letterGrade: "",
            },
        };
        this.removeStudent = this.removeStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.determineLetterGrade = this.determineLetterGrade.bind(this);
        this.finalChange = this.finalChange.bind(this);
        this.midtermChange = this.midtermChange.bind(this);
        this.quiz1Change = this.quiz1Change.bind(this);
        this.quiz2Change = this.quiz2Change.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
        this.studentNumberChange = this.studentNumberChange.bind(this);
    }

    removeStudent(event) {
        event.preventDefault();
        const studentList = this.state.studentList;
        studentList.splice(event.currentTarget.dataset.key, 1);
        this.setState({studentList});
    }

    addStudent(event) {
        event.preventDefault();
        let student = this.state.student;
        const quizzes = ((student.quiz1 * 10) + (student.quiz2 * 10)) / 200;
        const midterm = student.midterm / 100;
        const final = student.final / 100;
        const finalGrade = ((quizzes * 0.25) + (midterm * 0.25) +
            (final * 0.5)) * 100;
        student.classAverage = Math.round(finalGrade);
        student = this.determineLetterGrade(finalGrade, student);
        const studentList = this.state.studentList;
        studentList.push(student);
        this.setState({
            studentList,
            student: {
                studentNumber: 0,
                quiz1: 0,
                quiz2: 0,
                midterm: 0,
                final: 0,
                classAverage: 0,
                letterGrade: "",
            },
        });
    }

    determineLetterGrade(finalGrade, student) {
        student.letterGrade = finalGrade >= 90 ? "A" : (finalGrade >= 80 && finalGrade <= 89) ? "B" :
            (finalGrade >= 70 && finalGrade <= 79) ? "C" :
                (finalGrade >= 60 && finalGrade <= 69) ? "D" : "F";
        return student;
    }

    studentNumberChange(event) {
        const student = this.state.student;
        student.studentNumber = event.target.value;
        this.setState({student});
    }

    quiz1Change(event) {
        const student = this.state.student;
        student.quiz1 = event.target.value;
        this.setState({student});
    }

    quiz2Change(event) {
        const student = this.state.student;
        student.quiz2 = event.target.value;
        this.setState({student});
    }

    midtermChange(event) {
        const student = this.state.student;
        student.midterm = event.target.value;
        this.setState({student});
    }

    finalChange(event) {
        const student = this.state.student;
        student.final = event.target.value;
        this.setState({student});
    }

    render() {
        return (
            <div>
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
                                <td id={"studentNumber" + i}>{student.studentNumber}</td>
                                <td id={"quiz1" + i}>{student.quiz1}</td>
                                <td id={"quiz2" + i}>{student.quiz2}</td>
                                <td id={"midterm" + i}>{student.midterm}</td>
                                <td id={"final" + i}>{student.final}</td>
                                <td id={"classAverage" + i}>{student.classAverage}</td>
                                <td id={"letterGrade" + i}>{student.letterGrade}</td>
                                <td>
                                    <button id={"removeStudent" + i} className="btn btn-danger btn-sm"
                                            onClick={this.removeStudent} data-key={i}> - Remove
                                        Student
                                    </button>
                                </td>
                            </tr>;
                        })
                    }
                    </tbody>
                </table>
                <hr/>
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
            </div>
        );
    }
}
