import React from 'react';
import { TotalProps } from '../types';

const Total: React.FC<TotalProps> = ({ countOfExercises }) => <p>Number of exercises: <b>{countOfExercises}</b></p>

export default Total;