import { Solution, Stress, Vector } from './types'

/**
 * @brief Signature of a data
 * @category Data
 */
export interface IData {
    normal(): Vector
    cost(stress: Stress): number
}

/**
 * @brief Signature of a stress inversion method
 * @category Inversion
 */
export interface IStressInversion {
    addData(data: IData | undefined): void
    serialize(): string
    run(): Solution
}
