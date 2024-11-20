
export function binaryCrossEntropyLoss(prediction, target) {
    const epsilon = 1e-15; // Small value to prevent log(0)
    const predictionClipped = Math.min(Math.max(prediction, epsilon), 1 - epsilon);

    return - (target * Math.log(predictionClipped) + (1 - target) * Math.log(1 - predictionClipped));
}

export function meanSquaredError(prediction: number, target: number): number {
    return (prediction - target) ** 2;
}