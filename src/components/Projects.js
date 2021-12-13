import React, { useState , useEffect } from 'react'
import '../styles/Projects.css'
import pic2048 from '../assets/portfolio-pics/2048-pic.png'
import picmonty from '../assets/portfolio-pics/monty-pic.png'
import picacm from '../assets/portfolio-pics/acm-pic.svg'
import picreaction from '../assets/portfolio-pics/reaction-pic.png'
import picthis from '../assets/portfolio-pics/personal-website-pic.jpeg'



function Projects() {


    let projects = [
        {
            name: '2048-Defeater',
            desc: 'I built an AI program that defeated the game 2048 and achieved much higher scores. ' + 
            'By implementing and heavily modifying the Minimax algorithm I was able to teach the program to select the best possible move to maximize future score. ' +
            'Learn more about the project here:',
            technologies: ['Python', 'AI', 'Minimax', 'Math'],
            link: 'https://github.com/ArthurG0/2048-Defeater',
            pic: pic2048
        },
        {
            name: 'Monty Hall Paradox',
            desc: 'Monty Hall is a famous mathematical/statistical riddle that is ridiculously counterintuitive. ' +
            'I built a demonstration game as well as Firebase integration to illustrate the paradox. Check out about the project here:',
            technologies: ['Javascript', 'React', 'Firebase', 'Backend'],
            link: 'https://arthurgat.in/monty-hall',
            pic: picmonty
        },
        {
            name: 'Reaction Time Test',
            desc: 'Not all men are created equal. The difference in Reaction Time really shows for top athletes and in e-sports. ' + 
            'I created this basic reaction testing tool to see if the differences in performance between me and my friends are just based on skill, ' +
            'or if their brain is giving them an unfair advantage. Try it out here',
            technologies: ['Javascript', 'React'],
            link: 'https://arthurgat.in/reaction',
            pic: picreaction
        },
        {
            name: 'Website for ACM UCSB',
            desc: 'I designed and built a website for UCSB\'s Association of Computing Machinery. We are a small organization, and wanted our website to ' + 
            'attract new students, serve as a gallery for our events and projects, and a platform to help us grow.',
            technologies: ['Javasctipt', 'React'],
            link: 'https://ucsbacm.com',
            pic: picacm
        },
        {
            name: 'This Personal Website',
            desc: 'I\'ve always wanted to have a personal website and was fascinated by an idea that people all over the world, through a click of a link, can find me ' + 
            'I\'ve built this website so I could use it as my business card, since all projects are hard to place on a Resume paper',
            technologies: ['Javasctipt', 'React'],
            link: 'https://arthurgat.in',
            pic: picthis
        }
    ]
    let projectsHTML = <div className="PersonalProjects">
        {
            
            projects.map((x, index) => {
                let projName = <div className="IPName">{x.name}</div>
                let projDesc = <div className="IPDesc">{x.desc}</div>
                let projLink = <a className="IPLink" href={x.link}>{x.link}</a>
                let projPhoto = <div className="IPPhotoWrapper">
                    <img className="IPPhoto" alt='Portfolio Avatar' id={`Portfolio-${index}`} src={x.pic}></img>
                </div>



                if(index % 2) {
                    return (
                        <div className="IndividualProject">
                            <div className="IPRightSide"> 
                            {
                                projPhoto
                            }
                            </div>
                            <div className="IPLeftSide"> 
                            {projName}
                            {projDesc}
                            {projLink}
                            </div>
                        </div>
                    )
                }
                return (
                <div className="IndividualProject">
                    <div className="IPLeftSide"> 
                        {projName}
                        {projDesc}
                        {projLink}
                    </div>
                    <div className="IPRightSide">
                    {
                        projPhoto
                    }
                    </div>
                </div>
            )
            })
        }
    </div>

    return (
        <div className="ProjectsWrapper">
            {
                projectsHTML
            }
        </div>
    )
}

export default Projects