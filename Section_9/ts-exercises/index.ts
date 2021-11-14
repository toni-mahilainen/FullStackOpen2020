import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    }

    res.send({
        height: req.query.height,
        weight: req.query.weight,
        bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: any = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({
            error: 'parameters missing'
        });
    }

    if (Array.isArray(daily_exercises)) {
        const initialHourArray: number = daily_exercises.length;
        const numberArray: number = daily_exercises.filter((value: number) => !isNaN(value)).length;

        if (isNaN(Number(target)) || initialHourArray !== numberArray) {
            res.status(400).send({
                error: 'malformatted parameters'
            });
        }
    }

    const result = calculateExercise(daily_exercises, target);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});