import seedrandom from 'seedrandom';
import { curriedCost, test } from '../utils';

function doubler() {
    const trainingData = [
        [0, 0],
        [1, 2],
        [2, 4],
        [3, 6],
        [4, 8],
        [5, 10],
        [6, 12],
        [7, 14],
        [8, 16],
        [9, 18],
        [10, 20],
    ]
    const rng = seedrandom('bro');
    let weights = [rng() * 10.0];
    let bias = rng();

    const eps = 0.0001;
    const rate = 0.0001;

    const ourCost = curriedCost(trainingData);

    for (let i = 0; i < 100000; i++) {
        const c = ourCost(weights, bias);

        const weightGradients = weights.map((w, idx) => {
            const tweakedWeights = [...weights];
            tweakedWeights[idx] += eps;
            return (ourCost(tweakedWeights, bias) - c) / eps;
        });

        const db = (ourCost(weights, bias + eps) - c) / eps;

        weights = weights.map((w, idx) => w - rate * weightGradients[idx]);
        bias -= rate * db;

        if (i % 1000 === 0) {
            console.log(`Iteration ${i}: Cost = ${c}, Weights = ${weights}, Bias = ${bias}`);
        }
    }
    console.log('Final Weights: ', weights, ' Final Bias: ', bias);

    test(trainingData, weights, bias);
}


doubler();

