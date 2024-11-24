
import { Matrix } from '../lib/matrix';

describe('Matrix', () => {
    test('should create a matrix with given dimensions and zero values', () => {
        const rows = 3;
        const cols = 2;
        const matrix = new Matrix(rows, cols);

        expect(matrix.rows).toBe(rows);
        expect(matrix.cols).toBe(cols);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                expect(matrix.get(i, j)).toBe(0);
            }
        }
    });

    test('should set and get values correctly', () => {
        const matrix = new Matrix(2, 2);
        matrix.set(0, 0, 1);
        matrix.set(0, 1, 2);
        matrix.set(1, 0, 3);
        matrix.set(1, 1, 4);

        expect(matrix.get(0, 0)).toBe(1);
        expect(matrix.get(0, 1)).toBe(2);
        expect(matrix.get(1, 0)).toBe(3);
        expect(matrix.get(1, 1)).toBe(4);
    });

    test('should create a zero matrix', () => {
        const matrix = Matrix.zeros(2, 3);

        expect(matrix.rows).toBe(2);
        expect(matrix.cols).toBe(3);

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                expect(matrix.get(i, j)).toBe(0);
            }
        }
    });

    test('should create a ones matrix', () => {
        const matrix = Matrix.ones(3, 2);

        expect(matrix.rows).toBe(3);
        expect(matrix.cols).toBe(2);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                expect(matrix.get(i, j)).toBe(1);
            }
        }
    });

    test('should create a random matrix within specified range', () => {
        const min = -1;
        const max = 1;
        const matrix = Matrix.random(2, 2, min, max);

        expect(matrix.rows).toBe(2);
        expect(matrix.cols).toBe(2);

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const value = matrix.get(i, j);
                expect(value).toBeGreaterThanOrEqual(min);
                expect(value).toBeLessThan(max);
            }
        }
    });

    test('should add two matrices correctly', () => {
        const a = new Matrix(2, 2);
        a.set(0, 0, 1);
        a.set(0, 1, 2);
        a.set(1, 0, 3);
        a.set(1, 1, 4);

        const b = new Matrix(2, 2);
        b.set(0, 0, 5);
        b.set(0, 1, 6);
        b.set(1, 0, 7);
        b.set(1, 1, 8);

        const result = a.add(b);

        expect(result.get(0, 0)).toBe(6);
        expect(result.get(0, 1)).toBe(8);
        expect(result.get(1, 0)).toBe(10);
        expect(result.get(1, 1)).toBe(12);
    });

    test('should subtract two matrices correctly', () => {
        const a = new Matrix(2, 2);
        a.set(0, 0, 5);
        a.set(0, 1, 6);
        a.set(1, 0, 7);
        a.set(1, 1, 8);

        const b = new Matrix(2, 2);
        b.set(0, 0, 1);
        b.set(0, 1, 2);
        b.set(1, 0, 3);
        b.set(1, 1, 4);

        const result = a.subtract(b);

        expect(result.get(0, 0)).toBe(4);
        expect(result.get(0, 1)).toBe(4);
        expect(result.get(1, 0)).toBe(4);
        expect(result.get(1, 1)).toBe(4);
    });

    test('should multiply matrix by scalar correctly', () => {
        const matrix = new Matrix(2, 2);
        matrix.set(0, 0, 1);
        matrix.set(0, 1, 2);
        matrix.set(1, 0, 3);
        matrix.set(1, 1, 4);

        const scalar = 2;
        const result = matrix.multiplyScalar(scalar);

        expect(result.get(0, 0)).toBe(2);
        expect(result.get(0, 1)).toBe(4);
        expect(result.get(1, 0)).toBe(6);
        expect(result.get(1, 1)).toBe(8);
    });

    // Test matrix multiplication
    test('should multiply two matrices correctly', () => {
        const a = new Matrix(2, 3);
        a.set(0, 0, 1);
        a.set(0, 1, 2);
        a.set(0, 2, 3);
        a.set(1, 0, 4);
        a.set(1, 1, 5);
        a.set(1, 2, 6);

        const b = new Matrix(3, 2);
        b.set(0, 0, 7);
        b.set(0, 1, 8);
        b.set(1, 0, 9);
        b.set(1, 1, 10);
        b.set(2, 0, 11);
        b.set(2, 1, 12);

        const result = a.multiply(b);

        expect(result.rows).toBe(2);
        expect(result.cols).toBe(2);

        expect(result.get(0, 0)).toBe(58); // 1*7 + 2*9 + 3*11
        expect(result.get(0, 1)).toBe(64); // 1*8 + 2*10 + 3*12
        expect(result.get(1, 0)).toBe(139); // 4*7 + 5*9 + 6*11
        expect(result.get(1, 1)).toBe(154); // 4*8 + 5*10 + 6*12
    });

    test('should transpose matrix correctly', () => {
        const matrix = new Matrix(2, 3);
        matrix.set(0, 0, 1);
        matrix.set(0, 1, 2);
        matrix.set(0, 2, 3);
        matrix.set(1, 0, 4);
        matrix.set(1, 1, 5);
        matrix.set(1, 2, 6);

        const result = matrix.transpose();

        expect(result.rows).toBe(3);
        expect(result.cols).toBe(2);

        expect(result.get(0, 0)).toBe(1);
        expect(result.get(0, 1)).toBe(4);
        expect(result.get(1, 0)).toBe(2);
        expect(result.get(1, 1)).toBe(5);
        expect(result.get(2, 0)).toBe(3);
        expect(result.get(2, 1)).toBe(6);
    });

    test('should apply function to each element using map', () => {
        const matrix = new Matrix(2, 2);
        matrix.set(0, 0, 1);
        matrix.set(0, 1, -2);
        matrix.set(1, 0, -3);
        matrix.set(1, 1, 4);

        const result = matrix.map((value) => Math.abs(value));

        expect(result.get(0, 0)).toBe(1);
        expect(result.get(0, 1)).toBe(2);
        expect(result.get(1, 0)).toBe(3);
        expect(result.get(1, 1)).toBe(4);
    });

    test('should perform element-wise multiplication correctly', () => {
        const a = new Matrix(2, 2);
        a.set(0, 0, 1);
        a.set(0, 1, 2);
        a.set(1, 0, 3);
        a.set(1, 1, 4);

        const b = new Matrix(2, 2);
        b.set(0, 0, 5);
        b.set(0, 1, 6);
        b.set(1, 0, 7);
        b.set(1, 1, 8);

        const result = a.hadamard(b);

        expect(result.get(0, 0)).toBe(5);  // 1*5
        expect(result.get(0, 1)).toBe(12); // 2*6
        expect(result.get(1, 0)).toBe(21); // 3*7
        expect(result.get(1, 1)).toBe(32); // 4*8
    });

    test('should compute the sum of all elements', () => {
        const matrix = new Matrix(2, 2);
        matrix.set(0, 0, 1);
        matrix.set(0, 1, 2);
        matrix.set(1, 0, 3);
        matrix.set(1, 1, 4);

        const total = matrix.sum();

        expect(total).toBe(10);
    });

    test('should throw an error when adding matrices of different dimensions', () => {
        const a = Matrix.zeros(2, 2);
        const b = Matrix.zeros(3, 2);

        expect(() => a.add(b)).toThrow('Matrix dimensions must match for addition.');
    });

    test('should throw an error when subtracting matrices of different dimensions', () => {
        const a = Matrix.zeros(2, 2);
        const b = Matrix.zeros(3, 2);

        expect(() => a.subtract(b)).toThrow('Matrix dimensions must match for subtraction.');
    });

    test('should throw an error when multiplying matrices with incompatible dimensions', () => {
        const a = Matrix.zeros(2, 3);
        const b = Matrix.zeros(2, 2);

        expect(() => a.multiply(b)).toThrow('Matrix dimensions are incompatible for multiplication.');
    });

    test('should perform in-place addition correctly', () => {
        const a = new Matrix(2, 2);
        a.set(0, 0, 1);
        a.set(0, 1, 2);
        a.set(1, 0, 3);
        a.set(1, 1, 4);

        const b = new Matrix(2, 2);
        b.set(0, 0, 5);
        b.set(0, 1, 6);
        b.set(1, 0, 7);
        b.set(1, 1, 8);

        a.addInPlace(b); 

        expect(a.get(0, 0)).toBe(6);
        expect(a.get(0, 1)).toBe(8);
        expect(a.get(1, 0)).toBe(10);
        expect(a.get(1, 1)).toBe(12);
    });

    test('should clone matrix correctly', () => {
        const original = new Matrix(2, 2);
        original.set(0, 0, 1);
        original.set(0, 1, 2);
        original.set(1, 0, 3);
        original.set(1, 1, 4);

        const clone = original.clone(); 

        expect(clone.get(0, 0)).toBe(1);
        expect(clone.get(0, 1)).toBe(2);
        expect(clone.get(1, 0)).toBe(3);
        expect(clone.get(1, 1)).toBe(4);

        clone.set(0, 0, 10);
        expect(clone.get(0, 0)).toBe(10);
        expect(original.get(0, 0)).toBe(1);
    });

    test('should apply sigmoid function to each element', () => {
        const matrix = new Matrix(2, 2);
        matrix.set(0, 0, 0);
        matrix.set(0, 1, 1);
        matrix.set(1, 0, -1);
        matrix.set(1, 1, 2);

        const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

        const result = matrix.map(sigmoid);

        expect(result.get(0, 0)).toBeCloseTo(0.5);
        expect(result.get(0, 1)).toBeCloseTo(0.7310585786);
        expect(result.get(1, 0)).toBeCloseTo(0.2689414213);
        expect(result.get(1, 1)).toBeCloseTo(0.8807970779);
    });
});
