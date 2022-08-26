import classes from './homeList.module.css'
const HomeList = (props) => {
    return (
        <li className={classes.item}>
            <div className={classes.date}>{props.date}</div>
            <div className={classes.place}>{props.city}</div>
            <div className={classes.city}>{props.place}</div>
            <button className={classes.button}>BUY TICKETS</button>
        </li>
    )
}

export default HomeList