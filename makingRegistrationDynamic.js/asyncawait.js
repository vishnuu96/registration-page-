// without async await
console.log('person1:shows ticket')
console.log('person2:shows ticket')

const promiseWifeBringTickets = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ticket')
    }, 3000)
})
// promiseWifeBringTickets.then((ticket)=>{
//     // console.log(`person3:shows ${ticket}`)
//     console.log('husband: we should go in')
//     console.log('wife: no im hungery')
//     return new Promise((resolve, reject) => {
//        resolve(`${ticket} popcorn`)
//     })
// }).then((t)=>{
//     console.log(t)
// })
const getPopcorn = promiseWifeBringTickets.then((ticket) => {
    console.log('wife: i got the tickets')
    console.log('husband: we should go in')
    console.log('wife: no im hungery')
    return new Promise((resolve, reject) => {
        resolve(`${ticket} popcorn`)
    })
})
const getButter = getPopcorn.then((t) => {
    console.log('husband i got some popcorn')
    console.log("husband: we should go in")
    console.log('wife: i need butter on my popcorn')
    return new Promise((resolve, reject) => {
        resolve((`${t} butter`))
    })
})
getButter.then((b) => {
    console.log(b)
}).then(() => {
    console.log('person3:shows ticket')
})

console.log('person4:shows ticket')
console.log('person5:shows ticket')


// with async await

console.log('person1:shows ticket')
console.log('person2:shows ticket')
// asunc function always returns a promise 
const preMovie1 = async () => {
    const promiseWifeBringTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ticket')
        }, 3000)
    })
    const getPopcorn = new Promise((resolve, reject) => {
        resolve(`popcorn`)
    })
    const getButter = new Promise((resolve, reject) => {
        resolve(`butter`)
    })

    let ticket = await promiseWifeBringTickets

    console.log(`wife: i got the ${ticket}`)
    console.log('husband: we should go in')
    console.log('wife: no im hungery')
    let popcorn = await getPopcorn
    console.log(`husband i got some ${popcorn}`)
    console.log("husband: we should go in")
    console.log('wife: i need butter on my popcorn')

    let butter = await getButter
    console.log(`husband:i got some ${butter} on popcorn`)
    console.log(`husband:anything else darling?`)
    console.log(`wife:lets go we are getting late`)
    console.log(`husband:thanks for the reminder`)


    return ticket
}
preMovie1().then((m) => {
    console.log(`person3:shows ${m}`)
})


console.log('person4:shows ticket')
console.log('person5:shows ticket')



// to show how to use promise.all
console.log('person1:shows ticket')
console.log('person2:shows ticket')
const preMovie2 = async () => {
    const promiseWifeBringTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ticket')
        }, 3000)
    })
    const getPopcorn = new Promise((resolve, reject) => {
        resolve(`popcorn`)
    })
    const getCandy = new Promise((resolve, reject) => {
        resolve('candy')
    })
    const getCoke = new Promise((resolve, reject) => {
        resolve('coke')
    })
    let ticket = await promiseWifeBringTickets
    // to use promise.all
    let [popcorn, candy, coke] = await Promise.all([getPopcorn, getCandy, getCoke])
    console.log(`${popcorn},${candy},${coke}`)

    return ticket
}
preMovie2().then((m) => {
    console.log(`person3:shows ${m}`)
})


// to show how to catch error

console.log('person1:shows ticket')
console.log('person2:shows ticket')
const preMovie3 = async () => {
    const promiseWifeBringTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('ticket')
        }, 3000)
    })
    // what if the promise rejects so we have to use try catch
    let ticket
    try {
        ticket = await promiseWifeBringTickets
    } catch (e) {
        ticket = 'sad face'
    }
    return ticket
}
preMovie3().then((ticket) => {
    console.log(`person3:shows ${ticket}`)
})

