import React from 'react';
import { PartProps } from '../types';

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <>
                    <p>{part.name}</p>
                    <p>{part.exerciseCount}</p>
                    <p>{part.description}</p>
                </>
            )

        case 'Using props to pass data':
            return (
                <div>
                    <p>{part.name}</p>
                    <p>{part.exerciseCount}</p>
                    <p>{part.groupProjectCount}</p>
                </div>
            )

        case 'Deeper type usage':
            return (
                <div>
                    <p>{part.name}</p>
                    <p>{part.exerciseCount}</p>
                    <p>{part.description}</p>
                    <p>{part.exerciseSubmissionLink}</p>
                </div>
            )

        default:
            return null
    }
}

export default Part;