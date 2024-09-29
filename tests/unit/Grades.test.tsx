import React from "react";
import { render, screen } from '@testing-library/react';
import Grades from "../../app/components/Grades";
import userEvent from "@testing-library/user-event";


describe("Grades", () => {
    it("Will render the Grades component", () => {
        const component = render(<Grades />);
        expect(component.container.toString()).toMatchSnapshot();
    });

    it("Will create a student with A C grade", async () => {
        render(<Grades />);

        await userEvent.type(document.getElementById("studentNumber"), '1');
        await userEvent.type(document.getElementById("quiz1"), '10');
        await userEvent.type(document.getElementById("quiz2"), '9');
        await userEvent.type(document.getElementById("midterm"), '80');
        await userEvent.type(document.getElementById("final"), '70');
        await userEvent.click(document.getElementById("addStudent"));

        expect(document.getElementById("studentNumber0").innerText).toEqual("1");
        expect(document.getElementById("quiz10").innerText).toEqual("10");
        expect(document.getElementById("quiz20").innerText).toEqual("9");
        expect(document.getElementById("midterm0").innerText).toEqual("80");
        expect(document.getElementById("final0").innerText).toEqual("70");
        expect(document.getElementById("classAverage0").innerText).toEqual("79");
        expect(document.getElementById("letterGrade0").innerText).toEqual("C");

    });

    it("Will create a student with grades and remove student", async () => {
        render(<Grades />);

        await userEvent.type(document.getElementById("studentNumber"), '1');
        await userEvent.type(document.getElementById("quiz1"), '10');
        await userEvent.type(document.getElementById("quiz2"), '9');
        await userEvent.type(document.getElementById("midterm"), '80');
        await userEvent.type(document.getElementById("final"), '70');
        await userEvent.click(document.getElementById("addStudent"));
        await userEvent.click(document.getElementById("removeStudent0"));

        expect(document.getElementById("studentNumber0")).toBeNull();

    });
});
