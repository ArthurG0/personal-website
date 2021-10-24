import React, { useState , useEffect, useRef} from 'react'
import styles from '../styles/Home.css'
import { initializeApp } from "firebase/app";
import { getFirestore , collection, doc, getDocs, setDoc } from "firebase/firestore";
import almostCar from '../assets/monty-hall/mh-almost-open-car.jpg'
import almostGoat from '../assets/monty-hall/mh-almost-open-goat.jpg'
import barelyOpen from '../assets/monty-hall/mh-barely-open.jpg'
import midOpen from '../assets/monty-hall/mh-mid.jpg'
import openCar from '../assets/monty-hall/mh-open-car.jpg'
import openGoat from '../assets/monty-hall/mh-open-goat.jpg'
import closedDoor from '../assets/monty-hall/mh-closed.jpg'
import '../styles/MontyHall.css'


function MontyHall(props) {

    const [statsData, setStatsData] = useState({})
    const [statsLoaded, setStatsLoaded] = useState(false)
    const [numOfGames, setNumOfGames] = useState(0)
    const [selectionStatus, setSelectionStatus] = useState('none')
    const [doorPrizes, setDoorPrizes] = useState(generatePrizes())
    const FirestoreRef = useRef(null)
    const TextRef = useRef()
    const Door1Ref = useRef()
    const Door2Ref = useRef()
    const Door3Ref = useRef()

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_MH_DATABASE_API_KEY,
        authDomain: "fir-test-759bf.firebaseapp.com",
        projectId: "fir-test-759bf",
    };

    let app;
    let firestore;

    let doors = 
    
    <div className="MontyHallDoorsFlex">
    {
        [Door1Ref, Door2Ref, Door3Ref].map((x, index) => {
            return (
            <div className="DoorWrapper">
                <img 
                    src={closedDoor}
                    ref={x}
                    onMouseEnter={() => doorHover(index)}
                    onMouseOut={() => doorMouseOut(index)}
                    onClick={() => doorClick(index)}
                ></img>
                <div className="DoorLabel" id={`MontyHallDoor${index}Label`}>{`Door ${index + 1}`}</div>
            </div>
            )
        })
    }

    </div>

    let introText = 'Welcome to the Monty Hall Paradox! Behind these doors is ' +
    'one brand new car and two goats. Try your luck, and hopefully win a shiny new car! Click on a door to open it.'


      
      
      // Initialize Firebase
      
    useEffect(() => {
        console.log('initializing app')
        app = initializeApp(firebaseConfig);
        FirestoreRef.current = getFirestore();
        // if(Door1Ref.current) Door1Ref.current.srcObj = closedDoor
        // if(Door2Ref.current) Door2Ref.current.srcObj = closedDoor
        // if(Door3Ref.current) Door3Ref.current.srcObj = closedDoor
        getInitialData()
        setTimeout(() => {
            chatBoxAddText(introText)
        }, 200)

        console.log(process.env.REACT_APP_AAA)
        console.log(process.env.AAAA)

    }, [])

    let chatBox = 
        <div className="ChatBoxText" ref={TextRef}>
            <svg class="corner" viewBox="0 0 65 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 3.5L65 6.5V62L0 0L35 3.5Z" fill="white"/>
            </svg>
        </div>

    let statistics = statsLoaded ? 
        <table className="MontyHallStatsTable">
            <tbody>
                <tr>
                    <td>
                    Times people swapped: {statsData.swap_total}
                    </td>
                    <td>
                    Times swaps resulted in car: {statsData.swap_success}
                    </td>
                    <td>
                    Swap winrate: {Math.round(statsData.swap_success / statsData.swap_total * 100) + '%'}
                    </td>
                </tr>
                <tr>
                    <td>
                    Times people stayed: {statsData.stay_total}
                    </td>
                    <td>
                    Times stays resulted in car: {statsData.stay_success}
                    </td>
                    <td>
                    Stay winrate: {Math.round(statsData.stay_success / statsData.stay_total * 100) + '%'}
                    </td>
                </tr>
            </tbody>
        </table>

        : ""




    return (
        <div className="MontyHallMain">
            <div className="MontyHallLabel">Monty Hall Paradox</div>
            {
                chatBox
            }
            {/* {
                statsLoaded ? 
                
                <div className="MontyMainContent">
                    {
                        doors
                    }
                    <button onClick={button1Clicked}>Button1</button>
                    <button onClick={button2Clicked}>Button2</button>
                </div>
                : 
                
                <div className="MontyLoading">
                Loading...
                </div>

            } */}
                <div className="MontyMainContent">
                        {
                            doors
                        }
                        <button
                            className="MontyHallPlayAgainButton"
                            id="MontyHallPlayAgainBtn"
                            onClick={playAgainClicked}
                        >Play Again</button>
                        {
                            statistics
                        }
                        {/* <button onClick={button1Clicked}>Button1</button>
                        <button onClick={button2Clicked}>Button2</button> */}

                </div>
        </div>
    )

    async function getInitialData(){
        console.log(FirestoreRef.current)
        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.REACT_APP_MH_DATABASE_DOCUMENT_ID)
        let initial_data = Object.assign({} , document.data())
        setStatsData(initial_data)
        setStatsLoaded(true)

    }


    async function button1Clicked() {
        console.log('button1')
        console.log(FirestoreRef.current)
        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id}`);
            console.log(doc.data())
        });

    }
    async function button2Clicked() {
        console.log('button1')
        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.REACT_APP_MH_DATABASE_DOCUMENT_ID)
        let current_data = Object.assign({} , document.data())
        current_data.swap_total+=1;
        current_data.swap_success+=1;
        console.log(current_data)
        await setDoc(doc(FirestoreRef.current, 'guess-stats', process.env.REACT_APP_MH_DATABASE_DOCUMENT_ID), current_data)

    }

    function doorHover(index) {
        console.log(`door ${index} hover`)
        let ref;
        if(index == 0) ref = Door1Ref
        else if(index == 1) ref = Door2Ref
        else if(index == 2) ref = Door3Ref
        if(selectionStatus === 'none'){
            ref.current.src = barelyOpen
        }
        // 
        else if(selectionStatus === 'all opened') {

        }
        //
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){
            
        }
        //
        else {
            ref.current.src = barelyOpen
        }
    }
    function doorMouseOut(index) {
        console.log(`door ${index} mouse out`)
        let ref;
        if(index == 0) ref = Door1Ref
        else if(index == 1) ref = Door2Ref
        else if(index == 2) ref = Door3Ref
        if(selectionStatus === 'none'){
            ref.current.src = closedDoor
        }
        // 
        else if(selectionStatus === 'all opened') {

        }
        //
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){
            
        }
        //
        else {
            ref.current.src = closedDoor
        }

    }

    function doorClick(index) {
        console.log(`door ${index} clicked`)
        let ref = getDoorRef(index)
        if(selectionStatus === 'none'){
            ref.current.src = midOpen
            let doorToOpen = chooseDoorToOpen(index)
            setSelectionStatus(`selected:${index} opened:${doorToOpen}`)
            revealDoor(doorToOpen)
            chatBoxAddText(generateSecondLine(index, doorToOpen))
            let otherChoice = [0,1,2].filter(x => (x != index && x != doorToOpen))[0]
            document.getElementById(`MontyHallDoor${otherChoice}Label`).innerHTML += ' (switch)'
            document.getElementById(`MontyHallDoor${index}Label`).innerHTML += ' (stay)'
        }
        else if( selectionStatus === 'all opened') {

        }
        
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){

        }
        
        else {
            let didSwitch;
            let didWin;
            if(index == selectionStatus.split(' ')[0][selectionStatus.split(' ')[0].length - 1]){
                didSwitch = false
            } else didSwitch = true
            if(doorPrizes[index] === 'car') didWin = true
            else didWin = false
            revealDoor(0)
            revealDoor(1)
            revealDoor(2)
            showStatistics()
            recordResult(didWin, didSwitch)
            revealPlayAgainButton()
            setNumOfGames(numOfGames + 1)
            setSelectionStatus('all opened')
            chatBoxAddText(generateThirdLine(didWin, didSwitch))
        }
    }

    function getDoorRef(index){
        if(index == 0) return Door1Ref
        else if(index == 1) return Door2Ref
        else if(index == 2) return Door3Ref
    }

    function chatBoxAddText(text) {
        // first make all the previously added text visible
        console.log(TextRef.current.childNodes)
        // TextRef.current.childNodes.clear
        // TextRef.current.childNodes.forEach(node => {
        //     if(node.nodeName === 'SPAN' && node.className.indexOf('revealed') === -1) node.classList.add('revealed')
        // })

        while (TextRef.current.firstChild) TextRef.current.removeChild(TextRef.current.firstChild)
        let characters = []
        text.split("").forEach(char => {
            if(char === '\n'){
                TextRef.current.appendChild(document.createElement('br'))
                return
            }
            let newSpan = document.createElement('span')
            newSpan.classList.add('MontyHallSpan')
            newSpan.innerHTML = char
            TextRef.current.appendChild(newSpan)
            characters.push({span: newSpan, delay: 35})
        })

        revealOneCharacterAtATime(characters)

        
    }

    function revealOneCharacterAtATime(list){
        if(list.length <= 0) return
        let charToReveal = list.splice(0,1)[0]
        charToReveal.span.classList.add('revealed')
        setTimeout(() => {
            revealOneCharacterAtATime(list)
        }, charToReveal.delay)
    }

    function generatePrizes() {
        let random = Math.floor(Math.random()*100000)
        if(random % 3 === 0) return ['car', 'goat', 'goat']
        if(random % 3 === 1) return ['goat', 'car', 'goat']
        return ['goat', 'goat', 'car']
    }

    function generateSecondLine(chosenDoor, openedDoor) {
        let textToDisplay = `Awesome - you chose door ${chosenDoor + 1}. Now see that ${openedDoor + 1} has `
        textToDisplay += 'a goat inside. Would you like to change your choice of doors before we reveal the prizes? '
        textToDisplay += `\nClick on door ${chosenDoor + 1} to stay with your ogirinal choice, or click on the other door to switch.`

        return textToDisplay
    }

    function generateThirdLine(roundWon, didSwitch){
        let textToDisplay;
        if(roundWon && didSwitch) {
            textToDisplay = 'Congratulations! You decided to switch and won.'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        } else if(roundWon && !didSwitch) {
            textToDisplay = 'Huh: you didn\'t switch your door and still won!'
            textToDisplay += '\nCuriously, those who stay only have a 33% chance of winning! Want to play again?'
        } else if(!roundWon && didSwitch) {
            textToDisplay = 'Huh: you switched your door and lost...'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        } else if(!roundWon && !didSwitch){
            textToDisplay = 'Huh: you stayed with the original choice and lost...'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        }

        return textToDisplay

    }

    function chooseDoorToOpen(chosenDoor){
        console.log('here are the prizes:')
        console.log(doorPrizes)
        let options = [0,1,2].filter(x => {
            return (x != chosenDoor && doorPrizes[x] != 'car')
        })
        console.log('here are our options')
        console.log(options)

        if(options.length === 1) return options[0]
        else {
            let rand = Math.random();
            if(rand < 0.5) return options[0]
            return options[1]
        }
    }

    function revealDoor(index){
        let ref = getDoorRef(index);
        if(doorPrizes[index] === 'car') ref.current.src = openCar
        else if(doorPrizes[index] === 'goat') ref.current.src = openGoat
    }

    function playAgainClicked() {
        setDoorPrizes(generatePrizes())
        getDoorRef(0).current.src = closedDoor
        getDoorRef(1).current.src = closedDoor
        getDoorRef(2).current.src = closedDoor
        document.getElementById(`MontyHallDoor0Label`).innerHTML = 'Door 1'
        document.getElementById(`MontyHallDoor1Label`).innerHTML = 'Door 2'
        document.getElementById(`MontyHallDoor2Label`).innerHTML = 'Door 3'
        setSelectionStatus('none')
        chatBoxAddText(introText)
        document.getElementById('MontyHallPlayAgainBtn').classList.remove('revealed')
    }

    function showStatistics(){
        document.getElementsByClassName('MontyHallStatsTable')[0].classList.add('revealed')
    }
    function revealPlayAgainButton() {
        document.getElementById('MontyHallPlayAgainBtn').classList.add('revealed')
    }

    async function recordResult(didWin, didSwap) {
        // query the database
        // update the data depending on if won or lost
        // write back to the database

        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.REACT_APP_MH_DATABASE_DOCUMENT_ID)
        let temp_data = Object.assign({} , document.data())
        if(didSwap) temp_data.swap_total++;
        else temp_data.stay_total++;
        
        if(didSwap && didWin) temp_data.swap_success++;
        else if(!didSwap && didWin) temp_data.stay_success++;
        await setDoc(doc(FirestoreRef.current, 'guess-stats', process.env.REACT_APP_MH_DATABASE_DOCUMENT_ID), temp_data)

        // update the State object statsData
        let current_state = Object.assign({}, statsData)
        if(didSwap) current_state.swap_total++;
        else current_state.stay_total++;
        
        if(didSwap && didWin) current_state.swap_success++;
        else if(!didSwap && didWin) current_state.stay_success++;

        setStatsData(current_state)



    }
}

export default MontyHall
