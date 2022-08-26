import React, { useState, useEffect } from "react"
import HomeList from "./homeList"
import classes from './Home.module.css'

// const tourElement = [
//     {
//         id: 'tour1',
//         date: "JUL 16",
//         city: 'DETROIT, MI',
//         place: 'DTE ENERGY MUSIC THEATRE'
//     },
//     {
//         id: 'tour2',
//         date: "JUL 23",
//         city: 'TORONTO,ON',
//         place: 'BUDWEISER STAGE'
//     },
//     {
//         id: 'tour3',
//         date: "JUL 22",
//         city: 'BRISTOW, VA',
//         place: 'JIGGY LUBE LIVE'
//     },
//     {
//         id: 'tour4',
//         date: "JUL 29",
//         city: 'PHOENIX, AZBRISTOW, VA',
//         place: 'AK-CHIN PAVILION'
//     },
// ]
const Home = () => {
    let [maxNumbertry, setmaxNumbertry] = useState(5)
    const [retry, setretry] = useState(false)
    const [dataItem, setDataItem] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, seterror] = useState(null)

    useEffect(() => {
        async function xyz() {
            setIsLoading(true)
            seterror(null)
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!res.ok) {
                    throw new Error('Something went wrong ....Retrying')
                }
                const data = await res.json()
                const ListItems = data.map((item) => (
                    <HomeList
                        key={item.id}
                        date={item.address.city}
                        city={item.name}
                        place={item.address.street}
                    ></HomeList>
                ))
                setDataItem(ListItems)
            } catch (err) {
                seterror(err.message)
                setmaxNumbertry(maxNumbertry--)
                setretry(true)
                if (maxNumbertry > 0) {
                    setTimeout(() => {
                        setmaxNumbertry(maxNumbertry--)
                        console.log(maxNumbertry)
                    }, 5000);
                }
            }
            setIsLoading(false)
        }
        xyz()
    }, [maxNumbertry])

    const stopretryHandler = () => {
        setmaxNumbertry(0)
        console.log(maxNumbertry)
    }

    // let content = <h2>Something went wrong ....Retrying</h2>
    //another way of error handling
    // let content = <h2>No Tours Found...</h2>
    // if (dataItem.length > 0) {
    //     content = dataItem
    // }
    // if (error) {
    //     content = <h2>{error}</h2>
    // }
    // if (isLoading) {
    //     content = <h2>Loading...</h2>
    // }
    return (
        <div className={classes.home}>
            <h2>Tours</h2>
            <ul>
                {/* {content} */}
                {!isLoading && dataItem.length > 0 && dataItem}
                {!isLoading && dataItem.length === 0 && !error && <h2>No Tours Found...</h2>}
                {!isLoading && error && <h2>{error}</h2>}
                {isLoading && <h2>Loading...</h2>}
                {retry && <button onClick={stopretryHandler}>Stop Retrying</button>}
            </ul>
        </div>
    )
}

export default Home