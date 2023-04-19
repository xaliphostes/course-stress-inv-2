import { Stress } from './types'

export class RemoteStress {
    private theta_ = 0
    private S1_ = 0
    private S2_ = 0
    private s = 0
    private c = 0

    get S1() { return this.S1_ }
    get S2() { return this.S2_ }
    get theta() { return this.theta_ }

    static random(magnitude = 1) {
        const r = new RemoteStress()
        r.randomize(magnitude)
        return r
    }

    randomize(magnitude = 1): Stress {
        this.theta_ = Math.random() * 180
        this.S1_ = Math.random() * magnitude
        this.S2_ = Math.random() * magnitude
        const a = (this.theta_ * Math.PI) / 180
        this.c = Math.cos(a)
        this.s = Math.sin(a)
        return this.stress()
    }

    stress(): Stress {
        return [
            this.S1_ * this.c ** 2 + this.S2_ * this.s ** 2,
            (this.S2_ - this.S1_) * this.c * this.s,
            this.S1_ * this.s ** 2 + this.S2_ * this.c ** 2,
        ]
    }
}
