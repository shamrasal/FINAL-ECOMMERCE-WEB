import youtubeIcon from '../Assets/youtube.png'
import facebookIcon from '../Assets/facebook.png'
import spotifyIcon from '../Assets/spotify.png'
import classes from './Footer.module.css'
const Footer = () => {
    return (
        <div>
            <div className={classes.footer}>
                <h1 className={classes.footertitle}>The Generics</h1>
                <div className={classes.icons}>
                    <ul>
                        <li className={classes.iconsli}>
                            <a href="https://www.youtube.com/">
                                <img alt='youtubeIcon' className={classes.img} src={youtubeIcon}></img>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/">
                                <img alt='facebookIcon' className={classes.img} src={facebookIcon}></img>
                            </a>
                        </li>
                        <li>
                            <a href="https://open.spotify.com/">
                                <img alt='spotifyIcon' className={classes.img} src={spotifyIcon}></img>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
