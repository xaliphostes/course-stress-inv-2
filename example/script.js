const lib = require('../dist/course-stress-inv-2')

function generateNormal() {
    return lib.math.normalize([Math.random(), Math.random()])
}

console.log(lib)

console.log('Available data types:', lib.Factory.names(), '\n')

const mc = new lib.MonteCarlo(10000)

for (let i = 0; i < 30; ++i) {
    mc.addData(lib.Factory.create('Joint', generateNormal()))
    mc.addData(lib.Factory.create('Stylolite', generateNormal()))
}

mc.run() // will display info