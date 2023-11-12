'use client'

import { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from 'react-bootstrap/Modal';


function VerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            backdrop={props.backdrop}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thank You!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ wordWrap: "break-word" }}>
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [instructionsModalShow, setInstructionsModalShow] = useState(false);
    const [settingsModalShow, setSettingsModalShow] = useState(false);


    // const handleSendMessage = () => {
    //     if (userInput) {
    //         setMessages([...messages, { text: userInput, type: 'user' }]);
    //         // setTyping(true);

    //         // setTimeout(() => {
    //         //     // setMessages([...messages, { text: `Bot's response to : ${Math.floor(Math.random(0, 100) * 10)}`, type: 'bot', question: userInput }]);
    //         //     // console.log("waited 500ms");
    //         // fetchBotResponse(userInput); // Fetch bot response from the API

    //         // }, 2000);
    //         fetchBotResponse(userInput);
    //         setUserInput('');
    //     }
    // };

    // Inside the handleSendMessage function
    const handleSendMessage = async () => {
        if (userInput) {
            setMessages([...messages, { text: userInput, type: 'user' }]);

            // Simulate typing
            setMessages([...messages, {
                text: <>
                    <div className="spinner-grow" style={{ height: "20px", width: "20px" }}  role="status">
                        <span className="sr-only"></span>
                    </div>
                </>, type: 'bot'
            }]); // Added line

            // Fetch bot response after 2 seconds
            // setTimeout(async () => {
            //     await fetchBotResponse(userInput);
            // }, 2000);
            setTimeout(() => {
                fetchBotResponse(userInput); // Fetch bot response from the API
            }, 2000);

            // fetchBotResponse(userInput);


            setUserInput('');
        }
    };

    // const fetchBotResponse = async (userQuestion) => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:5000/chat`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ question: userQuestion })
    //         });
    //         if (response.ok) {
    //             const botResponse = await response.json();
    //             console.log(botResponse)
    //             // setTyping(false);
    //             setMessages([...messages, { text: botResponse.response, type: 'bot', question: userQuestion }]);
    //         } else {
    //             console.error('Failed to fetch bot response');
    //         }
    //     } catch (error) {
    //         console.error('Error while fetching bot response', error);
    //     }
    // };
    // Inside the fetchBotResponse function
    const fetchBotResponse = async (userQuestion) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userQuestion })
            });

            if (response.ok) {
                const botResponse = await response.json();

                // Append the new message instead of replacing the entire array
                setMessages([...messages, { text: botResponse.response, type: 'bot', question: userQuestion }]);
            } else {
                console.error('Failed to fetch bot response');
            }
        } catch (error) {
            console.error('Error while fetching bot response', error);
        }
    };




    return (<>
        <div>
            <button className='btn btn-light m-2' onClick={() => setSettingsModalShow(true)}>Settings</button>
            <button className='btn btn-light m-2' onClick={() => { setInstructionsModalShow(true); }}>Instructions</button>
        </div>
        <div className="chat-container">
            <div className="chat">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index}>

                            <div className="user" >
                                <div className='user-text rounded'>
                                    {message.question ? message.question : <>
                                        <div className="spinner-border text-light" style={{ height: "20px", width: "20px" }} role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </>}
                                </div>
                            </div>

                            {/* { typing  && <div className="bot" >
                                
                                Good question, let me think about it...
                            </div>
                            } */}


                            <div className={message.type}>
                                <div className='bot-text rounded'>
                                    {message.text}

                                </div>
                            </div>

                        </div>

                    ))}
                </div>
                <div className="user-input">
                    <input
                        className='rounded'
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your question..."
                    />
                    <button className='btn m-2 btn-dark' onClick={() => {
                        handleSendMessage();
                        console.log(messages);
                    }}>Send</button>
                </div>
            </div>
        </div>


        <VerticallyCenteredModal
            show={settingsModalShow}
            onHide={() => setSettingsModalShow(false)}
            backdrop="static"
            text={<>
                Thank you for using our chatbot. <br />
                <br />
                {/* ... (your existing instructions) */}
            </>} />

        <VerticallyCenteredModal
            show={instructionsModalShow}
            onHide={() => setInstructionsModalShow(false)}
            backdrop="static"
            text={<>
                Thank you for using our chatbot. <br />
                <br />
                Type in your question in the text box and press send. <br />
                Wait for the bot to respond. <br />
                You can ask the bot about the following topics: <br />
                <strong> 1. About the company </strong> <br />
                <strong> 2. About the product </strong> <br />
                <strong> 3. About the price </strong> <br />
                <strong> 4. About the delivery </strong> <br />
                <strong> 5. About the warranty </strong> <br />


                <hr />
                <strong> Note: </strong> <br /> The bot is trained on a small dataset. <br />

            </>} />


    </>);
}

export default HomePage;