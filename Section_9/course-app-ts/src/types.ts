interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description?: string
}

interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
    name: "Styling with styled components";
    numberOfStudents: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface HeaderProps {
    courseName: string
}

export interface ContentProps {
    courseParts: Array<CoursePart>
}

export interface TotalProps {
    countOfExercises: number
}

export interface PartProps {
    part: CoursePart
}