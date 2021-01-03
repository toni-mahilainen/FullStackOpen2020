import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePart } from './types';


const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: Array<CoursePart> = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];

    const countOfExercises: number = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total countOfExercises={countOfExercises} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));