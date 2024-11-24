export class Matrix {
    private data: Float64Array;
    public readonly rows: number;
    public readonly cols: number;

    constructor(rows: number, cols: number, data?: Float64Array) {
        this.rows = rows;
        this.cols = cols;
        this.data = data ?? new Float64Array(rows * cols);
    }


    public index(row: number, col: number): number {
        return row * this.cols + col;
    }   

    public get(row: number, col: number): number {
        return this.data[this.index(row, col)]
    }

    public set(row: number, col: number, value: number): void {
        this.data[this.index(row, col)] = value;
    }

    public static zeros(rows: number, cols: number): Matrix {
        return new Matrix(rows, cols);
    }

    public static ones(rows: number, cols: number): Matrix {
        const matrix = new Matrix(rows, cols);
        matrix.data.fill(1);
        return matrix;   
    }

    // replaced map verson with for loop for efficieny
    public static random(rows: number, cols: number, min = 0, max = 1): Matrix {
        const matrix = new Matrix(rows, cols);
        const range = max - min;
        for (let i = 0; i < matrix.data.length; i++) {
            matrix.data[i] = Math.random() * range + min;
        }
        return matrix;
    }

    // replaced map verson with for loop for efficieny
    public add(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('Matrix dimensions must match for addition.');
        }
        const resultData = new Float64Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            resultData[i] = this.data[i] + other.data[i];
        }
        return new Matrix(this.rows, this.cols, resultData);
    }

    // replaced map verson with for loop for efficieny
    public subtract(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('Matrix dimensions must match for subtraction.');
        }
        const resultData = new Float64Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            resultData[i] = this.data[i] - other.data[i];
        }
        return new Matrix(this.rows, this.cols, resultData);
    }

    public sum(): number {
        let total = 0;
        for (let i = 0; i < this.data.length; i++) {
            total += this.data[i];
        }
        return total;
    }

    public addInPlace(other: Matrix): void {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('Matrix dimensions must match for addition.');
        }
        
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] += other.data[i];
        }
    }

    public hadamard(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('Matrix dimensions must match for Hadamard product.');
        }

        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.data.length; i++) {
            result.data[i] = this.data[i] * other.data[i];
        }

        return result;
    }

    public multiply(other: Matrix): Matrix {
        if (this.cols !== other.rows) {
            throw new Error('Matrix dimensions are incompatible for multiplication.');
        }   
    
        const result = new Matrix(this.rows, other.cols);
        const n = this.cols;

        for (let i = 0; i < this.rows; i++) {
            for (let k = 0; k < n; k++) {
                const temp = this.get(i, k);
                for (let j = 0; j < other.cols; j++) {
                    result.data[i * result.cols + j] += temp * other.get(k, j);
                }
            }
        }

        return result;
    }

    // replaced map verson with for loop for efficieny
    public multiplyScalar(scalar: number): Matrix {
        const resultData = new Float64Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            resultData[i] = this.data[i] * scalar;
        }
        return new Matrix(this.rows, this.cols, resultData);
    }    

    public transpose(): Matrix {
        const result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(j, i, this.get(i, j));
            }
        }
        return result;
    }

    public clone(): Matrix {
        return new Matrix(this.rows, this.cols, new Float64Array(this.data));
    }

    // replaced map verson with for loop for efficieny
    public map(fn: (value: number, row: number, col: number) => number): Matrix {
        const resultData = new Float64Array(this.data.length);
        const cols = this.cols;
        for (let index = 0; index < this.data.length; index++) {
            const value = this.data[index];
            const row = Math.floor(index / cols);
            const col = index % cols;
            resultData[index] = fn(value, row, col);
        }
        return new Matrix(this.rows, this.cols, resultData);
    }

}