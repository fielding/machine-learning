import { meanSquaredError } from "./loss";

export function cost(
    trainingData: number[][],
    weights: number[],
    bias: number = 0,
    activation: ((x: number) => number) | null = null,
    lossFunction:((prediction: number, target: number) => number) | null = null
): number {
    return trainingData.reduce((acc, train) => {
        const inputs = train.slice(0, -1);
        const target = train[train.length - 1];

        const linearSum = inputs.reduce((sum, x, i) => sum + x * weights[i], bias);
        const prediction = activation ? activation(linearSum) : linearSum;

        const error = lossFunction ? lossFunction(prediction, target) : meanSquaredError(prediction, target);
        return acc + error;
    }, 0) / trainingData.length;
}

export function curriedCost(
    trainingData: number[][],
    activation: ((x: number) => number) | null = null,
    lossFunction: ((prediction: number, target: number) => number) | null = null
): ((weights: number[], bias: number) => number) {
    return (weights, bias = 0) => cost(trainingData, weights, bias, activation);
}



export function test(
    data: number[][],
    weights: number[],
    bias: number,
    activation: ((x: number) => number) | null = null
): void {
    data.forEach((train) => {
        const inputs = train.slice(0, -1);
        const target = train[train.length - 1];

        const linearSum = inputs.reduce((sum, x, i) => sum + x * weights[i], bias);
        const prediction = activation ? activation(linearSum) : linearSum;

        console.log(`Prediction for ${inputs} is ${prediction}, Target is ${target}`);
    })
}
