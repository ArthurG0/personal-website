import React, { useState , useEffect } from 'react'
import styles from '../styles/Home.css'
import pic1 from '../assets/personal-pic/linkedin-pic.jpeg'
import linkedLogo from '../assets/icons/linkedin-logo.svg'
import ghLogo from '../assets/icons/github-logo.svg'
import Projects from './Projects.js'

function Home(props) {

    // let projects = [
    //     {
    //         name: '2048',
    //         desc: 'I built an AI program that defeated the game 2048 and achieved much higher scores. Learn more about the project here:',
    //         link: 'https://github.com/ArthurG0/2048-Defeater'
    //     }
    // ]
    // let projectsHTML = <div className="PersonalProjects"></div>

    return (
        <div>
        <div className="Home HeaderBar">
            <a href="#contact">Contact</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#resume">Resume</a>

        </div>

        <div className="HomeMainDiv">
            <div className="HomeGreeting">Hello | Здравствуйте</div>
            <div className="HomeAbout">My name is Arthur Gatin</div>
            <img className="ProfilePic" src={pic1} alt="Arthur Gatin Avatar"></img>
            <div className="Home Flex Row">
                <img className="Home Icon" id="linkedInIcon" src={linkedLogo} onClick={() => { window.open('https://linkedin.com/in/arthurg0', '_blank') }}>
                    
                </img>
                <img className="Home Icon" src={ghLogo} onClick={() => { window.open('https://github.com/arthurg0', '_blank') }}>
                    
                </img>
            </div>
            <div className="HomeAbout">I am a 21-year old Russian-American Software Developer.</div>
            <div className="HomeAbout">I have graduated from University of California, Santa Barbara as a Bachelor of Computer Science. I am currently enrolled in a 5-year Master's Program at UCSB.</div>
            <div className="HomeAbout">I am looking for work.</div>
            <div className="HomeSection">Contact me!
                <a id="contact"></a>
            </div>
            <div className="HomeAbout">The best way to reach me is through email: agatin [at] ucsb.edu</div>
            <div className="HomeSection">Portfolio
                <a id="portfolio"></a>
            </div>
            <div className="HomeAbout">Here is a small selection of the projects I've worked on in 2021:</div>
            {<Projects/>}
            <div className="HomeSection">Resume
                <a id="resume"></a>
            </div>
            <div className="HomeAbout">Thank you for scrolling thus far. Here is my resume:</div>
            <iframe src="https://sites.cs.ucsb.edu/~agatin/files/Resume_AXS_Dec21.pdf#" width="100%" height="100%">
            </iframe>



        </div>
        </div>

    )
}

export default Home
