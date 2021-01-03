import React from 'react';
import { ContentProps } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = ({ courseParts }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    courseParts.forEach(part => {
        switch (part.name) {
            case 'Fundamentals':
                return (
                    <div>
                        <Part part={part} />
                    </div>
                )

            case 'Using props to pass data':
                return (
                    <div>
                        <Part part={part} />
                    </div>
                )

            case 'Deeper type usage':
                return (
                    <div>
                        <Part part={part} />
                    </div>
                )

            default:
                return assertNever(part)
        }
    })

    return (
        <React.Fragment>
            {courseParts}
        </React.Fragment>
    )
}

export default Content;