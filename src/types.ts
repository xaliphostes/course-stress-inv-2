/**
 * @brief Order: `Sxx`, `Sxy`, `Syy`
 * @category Types
 */
export type Stress = [number, number, number]

/**
 * @category Types
 */
export type Vector = [number, number]

/**
 * @category Types
 */
export type Point = [number, number]

/**
 * @category Types
 */
export type Solution = {
    cost: number,
    S1: number,
    S2: number,
    theta: number,
    iteration: number
}
