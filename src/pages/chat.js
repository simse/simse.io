import React, { createRef } from 'react'

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import styles from "../styles/pages/chat.module.scss"

class ChatPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [
                { from: "them", message: "Hello, I am an AI version of Simon. Ask me anything.", id: 1 }
            ],
            userId: null,
            currentMessage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.messagesDiv = createRef();
    }


    renderMessage(message) {
        let messageClass = styles["fromThem"]

        if (message.from === "me") {
            messageClass = styles["fromMe"]
        }

        return (
            <p className={messageClass} key={message.id}>{message.message}</p>
        )
    }

    createSession() {
        fetch("/api/chat/session")
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    this.setState({
                        userId: data.userId
                    })
                }
            })
    }

    componentDidMount() {
        this.createSession()
    }

    addMessage(message, from) {
        let tempArray = this.state.messages

        tempArray.push({
            message: message,
            from: from,
            id: tempArray.length + 1
        })

        this.setState({ messages: tempArray })

        this.messagesDiv.current.scrollTop = this.messagesDiv.current.scrollHeight
    }

    sendMessage(message) {
        fetch(`/api/chat/message?userId=${this.state.userId}&message=${message}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    this.addMessage(data.response, "them")
                }
            })
    }

    handleChange(event) {
        this.setState({ currentMessage: event.target.value });
    }

    handleSubmit(event) {
        this.addMessage(this.state.currentMessage, "me")
        this.sendMessage(this.state.currentMessage)
        event.preventDefault();

        this.setState({ currentMessage: "" })
    }

    render() {
        return (
            <>
                <SEO title="Chat" />

                <Navbar />

                <div className={styles.chat}>
                    <div className={styles.messages} ref={this.messagesDiv}>
                        {this.state.messages.map(message => this.renderMessage(message))}
                    </div>

                    <div className={styles.input}>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Enter a message" value={this.state.currentMessage} onChange={this.handleChange} />

                            <input type="submit" value="Send message" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default ChatPage