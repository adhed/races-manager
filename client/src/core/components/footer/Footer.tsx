import React from 'react'
import './Footer.scss';

function Footer() {
    return <footer className="footer">
        <div className="footer__wrapper wrapper">
            <span className="wrapper__copyright">2020 &#9400; Wszelkie prawa zastrzeżone</span>
            <span className="wrapper__author">Wykonanie: <a href="mailto:adamroweb@gmail.com">Adam Rogala</a></span>
        </div>
    </footer>
}

export default Footer;