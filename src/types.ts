// Order: Sxx, Sxy, Syy
export type Stress = [number, number, number]

export type Vector = [number, number]

export type Point = [number, number]

export type Solution = {
    cost: number,
    S1: number,
    S2: number,
    theta: number,
    iteration: number
}
