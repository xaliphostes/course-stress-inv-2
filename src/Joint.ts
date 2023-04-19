import { Stress, Point, Vector } from './types'
import { IData } from './interfaces'
import { math } from './math'

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
        const dot = math.scalarProduct(this.driver(stress), this.n)
        return Math.acos(Math.abs(dot)) / Math.PI
    }

    protected driver(stress: Stress) {
        const { v1, v2 } = math.eigen(stress)
        return v1
    }
}
