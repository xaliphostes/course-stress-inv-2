import { Stress } from './types'
import { Joint } from './Joint'
import { math } from './math'

/**
 * @category Data
 */
export class Stylolite extends Joint {
    protected driver(stress: Stress) {
        const { v1, v2 } = math.eigen(stress)
        return v2
    }
}
