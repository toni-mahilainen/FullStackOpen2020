import React from 'react';
import { PartProps } from '../types';
import { assertNever } from '../utils'

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <div>
                    <hr />
                    <h2>Name</h2><p>{part.name}</p>
                    <h4>Exercise count</h4><p>{part.exerciseCount}</p>
                    <h4>Description</h4><p>{part.description}</p>
                    <hr />
                </div>
            )

        case 'Using props to pass data':
            return (
                <div>
                    <h2>Name</h2><p>{part.name}</p>
                    <h4>Exercise count</h4><p>{part.exerciseCount}</p>
                    <h4>Group project count</h4><p>{part.groupProjectCount}</p>
                    <hr />
                </div>
            )

        case 'Deeper type usage':
            return (
                <div>
                    <h2>Name</h2><p>{part.name}</p>
                    <h4>Exercise count</h4><p>{part.exerciseCount}</p>
                    <h4>Description</h4><p>{part.description}</p>
                    <h4>Exercise submission link</h4><p>{part.exerciseSubmissionLink}</p>
                    <hr />
                </div>
            )

        case 'Styling with styled components':
            return (
                <div>
                    <h2>Name</h2><p>{part.name}</p>
                    <h4>Exercise count</h4><p>{part.exerciseCount}</p>
                    <h4>Description</h4><p>{part.description}</p>
                    <h4>Number of students</h4><p>{part.numberOfStudents}</p>
                    <hr />
                </div>
            )

        default:
            return assertNever(part)
    }
}

export default Part;