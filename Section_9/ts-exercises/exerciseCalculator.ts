interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercise = (hours: string[], target: number): Results => {
    if (hours.length < 4) throw new Error('Not enough arguments');
    
    let ratingDescription = '';
    let rating = 0;
    
    const periodLength = hours.length;
    const average = hours.map(value => Number(value)).reduce((acc, curr) => acc + curr) / hours.length;
    const trainingDays = hours.filter(value => Number(value) > 0).length;
    const success = !(target > Number(hours.reduce((acc, curr) => acc + curr)) / hours.length);

    switch (true) {
        case average <= 1:
            ratingDescription = 'That was quite lazy job dude...';
            rating = 1;
            break;

        case average > 1 && average <= 2:
            ratingDescription = 'Better but still not enough..';
            rating = 1.5;
            break;

        case average > 2 && average <= 3:
            ratingDescription = 'Good job! Next week will be even better, right?';
            rating = 2;
            break;

        case average > 3 && average <= 4:
            ratingDescription = 'Execellent job!... but you can still do it even better.';
            rating = 2.5;
            break;

        case average > 4:
            ratingDescription = 'Super!';
            rating = 3;
            break;

        default:
            throw new Error('Something bad happened!');
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};