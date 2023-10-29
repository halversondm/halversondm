/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { type ReactNode, useState } from 'react'

interface GradesState {
  studentList: Student[]
  student: Student
}

interface Student {
  studentNumber: number
  quiz1: number
  quiz2: number
  midterm: number
  final: number
  classAverage: number
  letterGrade: string
}

export default function Grades (): ReactNode {
  const [state, setState] = useState<GradesState>(initialState())

  function initialState (): GradesState {
    return {
      studentList: [],
      student: {
        studentNumber: 0,
        quiz1: 0,
        quiz2: 0,
        midterm: 0,
        final: 0,
        classAverage: 0,
        letterGrade: ''
      }
    }
  }

  function removeStudent (event): void {
    const studentList = state.studentList
    studentList.splice(event.currentTarget.dataset.key, 1)
    setState({ ...state, studentList })
  }

  function addStudent (event): void {
    let student = state.student
    const quizzes = ((student.quiz1 * 10) + (student.quiz2 * 10)) / 200
    const midterm = student.midterm / 100
    const final = student.final / 100
    const finalGrade = ((quizzes * 0.25) + (midterm * 0.25) +
            (final * 0.5)) * 100
    student.classAverage = Math.round(finalGrade)
    student = determineLetterGrade(finalGrade, student)
    const studentList = state.studentList
    studentList.push(student)
    setState({
      studentList,
      student: {
        studentNumber: 0,
        quiz1: 0,
        quiz2: 0,
        midterm: 0,
        final: 0,
        classAverage: 0,
        letterGrade: ''
      }
    })
  }

  function determineLetterGrade (finalGrade, student): Student {
    student.letterGrade = finalGrade >= 90
      ? 'A'
      : (finalGrade >= 80 && finalGrade <= 89)
          ? 'B'
          : (finalGrade >= 70 && finalGrade <= 79)
              ? 'C'
              : (finalGrade >= 60 && finalGrade <= 69) ? 'D' : 'F'
    return student
  }

  function studentNumberChange (event): void {
    const student = state.student
    student.studentNumber = event.target.value
    setState({ ...state, student })
  }

  function quiz1Change (event): void {
    const student = state.student
    student.quiz1 = event.target.value
    setState({ ...state, student })
  }

  function quiz2Change (event): void {
    const student = state.student
    student.quiz2 = event.target.value
    setState({ ...state, student })
  }

  function midtermChange (event): void {
    const student = state.student
    student.midterm = event.target.value
    setState({ ...state, student })
  }

  function finalChange (event): void {
    const student = state.student
    student.final = event.target.value
    setState({ ...state, student })
  }

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
                        state.studentList.map((student, i) => {
                          return <tr key={i}>
                                <td id={'studentNumber' + i}>{student.studentNumber}</td>
                                <td id={'quiz1' + i}>{student.quiz1}</td>
                                <td id={'quiz2' + i}>{student.quiz2}</td>
                                <td id={'midterm' + i}>{student.midterm}</td>
                                <td id={'final' + i}>{student.final}</td>
                                <td id={'classAverage' + i}>{student.classAverage}</td>
                                <td id={'letterGrade' + i}>{student.letterGrade}</td>
                                <td>
                                    <button type="button" id={'removeStudent' + i} className="btn btn-danger btn-sm"
                                            onClick={removeStudent} data-key={i}> - Remove
                                        Student
                                    </button>
                                </td>
                            </tr>
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
                            <input id="studentNumber" value={state.student.studentNumber}
                                   onChange={studentNumberChange} type="number"
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quiz1" className="col-sm-2 control-label">Quiz 1
                            Grade</label>
                        <div className="col-sm-2">
                            <input id="quiz1" value={state.student.quiz1} type="number"
                                   onChange={quiz1Change} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quiz2" className="col-sm-2 control-label">Quiz 2
                            Grade</label>
                        <div className="col-sm-2">
                            <input id="quiz2" value={state.student.quiz2} type="number"
                                   onChange={quiz2Change} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="midterm" className="col-sm-2 control-label">Midterm
                            Exam Grade</label>
                        <div className="col-sm-2">
                            <input id="midterm" value={state.student.midterm} type="number"
                                   onChange={midtermChange} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="final" className="col-sm-2 control-label">Final Exam
                            Grade</label>
                        <div className="col-sm-2">
                            <input id="final" value={state.student.final} type="number"
                                   onChange={finalChange} className="form-control"/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm" id="addStudent"
                            onClick={addStudent}> + Add Student
                    </button>
                </form>
            </div>
  )
}
