import { IData, IStressInversion } from './interfaces'
import { RemoteStress } from './RemoteStress'
import { Solution, Stress } from './types'
import { displaySolution } from './utils'

/**
 * @brief Inversion using a regular sampling
 * @category Inversion
 */
export class Grid implements IStressInversion {
    private datas: Array<IData> = []

    constructor(private readonly n: number) {
    }

    addData(data: IData | undefined): void {
        if (data !== undefined) {
            this.datas.push(data)
        }
    }

    serialize(): string {
        let r = '# x y z cost\n'
        const s = RemoteStress.random()
        for (let i = 1; i < this.n; ++i) {
            for (let j = 1; j < this.n; ++j) {
                s.k = i / (this.n)
                s.theta = j * 180 / (this.n)
                let c = this.datas.reduce((cur, data) => cur + data.cost(s.stress()), 0)
                c /= this.datas.length
                r += i + ' ' + j + ' 0 ' + c + '\n'
            }
        }
        return r
    }

    run(): Solution {
        const solution = {
            cost: Number.POSITIVE_INFINITY,
            S1: 0,
            S2: 0,
            theta: 0,
            iteration: -1
        }

        const s = new RemoteStress()
        for (let i = 0; i < this.n; ++i) {
            for (let j = 0; j < this.n; ++j) {
                s.k = i / (this.n - 1)
                s.theta = j * 180 / (this.n - 1)
                let c = this.datas.reduce((cur, data) => cur + data.cost(s.stress()), 0)
                c /= this.datas.length

                if (c < solution.cost) {
                    solution.cost = c
                    solution.S1 = 1
                    solution.S2 = s.k
                    solution.theta = s.theta
                    solution.iteration = i
                    displaySolution(solution)
                }
            }
        }

        return solution
    }

    /** 
     * Get the cost of all the data as an array of number
     */
    costs(stress: Stress): Array<number> {
        return this.datas.map(data => data.cost(stress))
    }
}
