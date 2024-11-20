
import seedrandom from 'seedrandom';
import { binaryCrossEntropyLoss, curriedCost, sigmoid, test } from '../utils';

function gates(gate = "or") {

    const trainingData = {
        'or': [
            [0, 0, 0],
            [1, 0, 1],
            [0, 1, 1],
            [1, 1, 1],
        ],
        'and': [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
    }


    const rng = seedrandom('yodog');
    let weights = [rng() * 0.1, rng() * 0.1];
    let bias = rng() * 0.1;

    const eps = 1e-5;
    const rate = 0.01;

    const ourCost = curriedCost(trainingData[gate], sigmoid, binaryCrossEntropyLoss);

    for (let i = 0; i < 1000000; i++) {
        const c = ourCost(weights, bias);

        const weightGradients = weights.map((w, idx) => {
            const tweakedWeights = [...weights];
            tweakedWeights[idx] += eps;
            return (ourCost(tweakedWeights, bias) - c) / eps;

        });

        const db = (ourCost(weights, bias + eps) - c) / eps;

        weights = weights.map((w, idx) => w - rate * weightGradients[idx]);
        bias -= rate * db;

        if (i % 50 === 0) {
            console.log(`Iteration ${i}: Cost = ${c}, Weights = ${weights}, Bias = ${bias}`);
        }
    }
    console.log('Final Weights: ', weights, ' Final Bias: ', bias);

    test(trainingData[gate], weights, bias, sigmoid);


}



gates('and');
