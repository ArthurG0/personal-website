import React, { useState , useEffect } from 'react'
import styles from '../styles/Home.css'

function Home(props) {

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('HomeIntroLevel1').classList.remove('DownLevel1')
            document.getElementById('HomeIntroLevel1').classList.add('Level1')
        }, 200)

        setTimeout(() => {
            document.getElementById('MainIntroSectionsFlex').classList.remove('DownLevel3')
            document.getElementById('MainIntroSectionsFlex').classList.add('Level3')
        }, 1200)


    }, [])


    return (
        <div className="HomeMainDiv">
            <div className="HomeCenterText">Arthur Gatin</div>
            <div className="Home RelativeElement">
                <div id="HomeIntroLevel1" className="HomeIntroText FlyIn DownLevel1">I'm a Software Developer. I love building robust user-friendly applications</div>
            </div>
            <div id="MainIntroSectionsFlex" className="Flex Home SectionsWrapper FlyIn DownLevel3">
                <a href="https://sites.cs.ucsb.edu/~agatin/files/Resume_AX_Apr2021.pdf" className="Home Section">Resume</a>
                <a href="https://www.linkedin.com/in/arthurg0/" className="Home Section">Portfolio</a>
            </div>
        </div>
    )
}

export default Home
