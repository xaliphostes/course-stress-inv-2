import { Solution } from './types'

export function displaySolution(s: Solution): void {
    console.log('Iter ', s.iteration)
    console.log('S1   ', s.S1.toFixed(3))
    console.log('S2   ', s.S2.toFixed(3))
    console.log('Theta', Math.round(s.theta) + '°')
    console.log('Cost ', s.cost.toFixed(2))
    console.log('Fit  ', Math.round((1 - s.cost) * 100) + '%')
    console.log('')
}
