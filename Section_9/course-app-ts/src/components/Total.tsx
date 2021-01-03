import React from 'react';
import { TotalProps } from '../types';

const Total: React.FC<TotalProps> = ({ countOfExercises }) => <p>Number of exercises {countOfExercises}</p>

export default Total;