import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part}: {props.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)

    return (
        <p>Total of {total} exercises</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;