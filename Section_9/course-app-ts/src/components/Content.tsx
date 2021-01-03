import React from 'react';
import { ContentProps } from '../types';

const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
        <div>
            {
                courseParts.map(coursePart =>
                    <p key={coursePart.name}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                )
            }
        </div>
    );
}

export default Content;