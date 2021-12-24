import React, {useState, useEffect} from 'react'
import '../styles/Reaction.css'

function Reaction() {

    /* 
    0 = not started
    1 = activated, yellow
    2 = green
    3 = green stopped
    */ 
    const [status, setStatus] = useState(0)
    const [launchTime, setLaunchTime] = useState(null)
    const [stoppedTime, setStoppedTime] = useState(null)

    return (
        <div className="ReactionWrapper">
            <div className="BodyHeader">Test Your Reaction Time!</div>
            <div className="BodyInfo">The field will turn yellow, then green. When the field turns green, click as quickly as possible. Activate the field below to start.</div>
            <div className="ReactionResult">---</div>
            <div className="ReactionField" onClick={fieldClicked}>Not Activated</div>
        </div>
    )

    function fieldClicked(){
        if(status == 0){
            fieldActivated()
        }
        else if(status == 2){
            fieldStop()
        }
    }

    function fieldActivated() {
        console.log('field activated')
        document.getElementsByClassName('ReactionField')[0].classList.add('yellow')
        document.getElementsByClassName('ReactionField')[0].innerHTML = 'Get Ready!'
        document.getElementsByClassName('ReactionResult')[0].innerHTML = '---'
        let randomBeforeActivation =  3000 +  Math.floor(Math.random() * 4000)
        setTimeout(() => {
            turnGreen()
        }, randomBeforeActivation)
        setStatus(1)
    }

    function turnGreen() {
        document.getElementsByClassName('ReactionField')[0].classList.remove('yellow')
        document.getElementsByClassName('ReactionField')[0].classList.add('green')
        document.getElementsByClassName('ReactionField')[0].innerHTML = 'CLICK!'
        setLaunchTime(performance.now())
        setStatus(2)
    }

    function fieldStop() {
        const whenStopped = performance.now()
        document.getElementsByClassName('ReactionResult')[0].innerHTML = `${Math.floor(whenStopped - launchTime)} ms`
        setStoppedTime(whenStopped)
        setStatus(0)
        document.getElementsByClassName('ReactionField')[0].classList.remove('green')
        document.getElementsByClassName('ReactionField')[0].classList.remove('yellow')
        document.getElementsByClassName('ReactionField')[0].innerHTML = 'Not Activated'
    }
}




export default Reaction
