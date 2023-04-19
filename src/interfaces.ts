import { Solution, Stress, Vector } from './types'

// Signature of a data
export interface IData {
    normal(): Vector
    cost(stress: Stress): number
}

// Signature of a stress inversion method
export interface IStressInversion {
    addData(data: IData | undefined): void
    run(): Solution
}
