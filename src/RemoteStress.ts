import { math } from './math'
import { Stress } from './types'

/**
 * @category Stress
 */
export class RemoteStress {
    private theta_ = 0
    private k_ = 0
    private s = 0
    private c = 0

    get k() { return this.k_ }
    get theta() { return this.theta_ }
    set k(v: number) { this.k_ = v }
    set theta(v: number) {
        this.theta_ = v
        const a = math.deg2rad(this.theta_)
        this.c = Math.cos(a)
        this.s = Math.sin(a)
    }

    static random(magnitude = 1) {
        const r = new RemoteStress()
        r.randomize(magnitude)
        return r
    }

    randomize(magnitude = 1): Stress {
        this.theta = math.random(1, 180)
        this.k = math.random(0, 1)
        return this.stress()
    }

    stress(): Stress {
        return [
            this.c ** 2 + this.k_ * this.s ** 2,
            (this.k_ - 1) * this.c * this.s,
            this.s ** 2 + this.k_ * this.c ** 2,
        ]
    }
}
