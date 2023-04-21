import { Stress, Point, Vector } from './types'
import { IData } from './interfaces'
import { math } from './math'

/**
 * @category Data
 */
export class Joint implements IData {
    protected n: Vector

    normal() {
        return this.n
    }

    constructor(p1: Point, p2: Point) {
        if (p2 === undefined) {
            this.n = [...p1]
            this.n = math.normalize(this.n)
        }
        else {
            this.n = math.vectorFromPoints(p1, p2)
            this.n = math.normalize(this.n)
        }
    }

    cost(stress: Stress): number {
        const dot = math.dot(this.driver(stress), this.n)
        const c = Math.acos(Math.abs(dot)) / Math.PI
        if (Number.isNaN(c)) {
            return 1
        }
        return c
    }

    protected driver(stress: Stress) {
        const { v1, v2 } = math.eigen(stress)
        return v1
    }
}
