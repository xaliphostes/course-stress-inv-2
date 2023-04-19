import { IData, IStressInversion } from './interfaces'
import { RemoteStress } from './RemoteStress'
import { Solution, Stress } from './types'
import { displaySolution } from './utils'

export class MonteCarlo implements IStressInversion {
    private datas: Array<IData> = []

    constructor(private readonly nbIter: number) {
    }

    addData(data: IData | undefined): void {
        if (data !== undefined) {
            this.datas.push(data)
        }
    }

    run(): Solution {
        const solution = {
            cost: Number.POSITIVE_INFINITY,
            S1: 0,
            S2: 0,
            theta: 0,
            iteration: -1
        }

        for (let i = 0; i < this.nbIter; ++i) {
            const s = RemoteStress.random()

            let c = this.datas.reduce((cur, data) => cur + data.cost(s.stress()), 0)
            c /= this.datas.length

            if (c < solution.cost) {
                solution.cost = c
                solution.S1 = s.S1
                solution.S2 = s.S2
                solution.theta = s.theta
                solution.iteration = i
                displaySolution(solution)
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
