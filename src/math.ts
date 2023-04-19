import { Vector, Stress, Point } from './types'

export namespace math {

    export function normalize(n: Vector): Vector {
        const l = Math.sqrt(n[0] ** 2 + n[1] ** 2)
        return [n[0] / l, n[1] / l]
    }

    export function vectorFromPoints(p1: Point, p2: Point): Vector {
        return [p2[0] - p1[0], p2[1] - p1[1]]
    }

    export function scalarProduct(v1: Vector, v2: Vector): number {
        return v2[0] * v1[0] + v2[1] * v1[1]
    }

    export function randomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    export function eigen(stress: Stress): { v1: Vector, v2: Vector } {
        const a = stress[0] // xx
        const b = stress[1] // xy
        const trace = a + stress[2]
        const discri = Math.sqrt(trace ** 2 - 4 * (a * stress[2] - b * b))

        // Decreasing order according to the eigen values
        const v1 = normalize([b, (trace + discri) / 2 - a])
        const v2 = normalize([b, (trace - discri) / 2 - a])
        return { v1, v2 }
    }
}
