interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (exerciseInfo: number[], target: number): Results => {
    return {
        periodLength: exerciseInfo.length,
        trainingDays: exerciseInfo.filter(value => value > 0).length,
        success: !(target > exerciseInfo.reduce((acc, curr) => acc + curr) / exerciseInfo.length),
        rating: 0,
        ratingDescription: 'string',
        target,
        average: exerciseInfo.reduce((acc, curr) => acc + curr) / exerciseInfo.length
    }
}

try {
    console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 1));
} catch (error) {
    console.log(`Some errors! Message: ${error.message}`);
}