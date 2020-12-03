import React, { createRef } from 'react'

import SEO from "../components/seo"
import Navbar from "../components/navbar"
import ArrowUpIcon from "../icons/arrow-up.svg"

import styles from "../styles/pages/chat.module.scss"

class ChatPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [
                /*{ from: "them", message: "Hello, I am an AI version of Simon. Ask me anything.", id: 1 }*/
            ],
            userId: null,
            currentMessage: "",
            senderLoading: true
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

                    this.removeLoadingIndicator()
                    this.addMessage("Hello, I am an AI version of Simon. Ask me anything.", "them")
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


    }

    sendMessage(message) {
        this.addLoadingIndicator()

        fetch(`/api/chat/message?userId=${this.state.userId}&message=${message}`)
            .then(response => response.json())
            .then(data => {
                this.removeLoadingIndicator()

                if (data.status === "OK") {
                    this.addMessage(data.response, "them")
                }
            })
    }

    handleChange(event) {
        this.setState({ currentMessage: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.currentMessage === "") return

        this.addMessage(this.state.currentMessage, "me")
        this.sendMessage(this.state.currentMessage)

        this.setState({ currentMessage: "" })
    }

    addLoadingIndicator() {
        this.setState({ senderLoading: true })
    }

    removeLoadingIndicator() {
        this.setState({ senderLoading: false })
    }

    componentDidUpdate() {
        this.messagesDiv.current.scrollTop = this.messagesDiv.current.scrollHeight
        //this.scrollToTop(this.messagesDiv.current, this.messagesDiv.current.scrollHeight, 250)
    }

    render() {
        return (
            <>
                <SEO title="Chat" />

                <Navbar />

                <div className={styles.chat}>
                    <div className={styles.messages} ref={this.messagesDiv}>
                        {this.state.messages.map(message => this.renderMessage(message))}

                        {this.state.senderLoading && <div className={styles.typingIndicator}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                    </div>

                    <div className={styles.input}>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Enter a message" value={this.state.currentMessage} onChange={this.handleChange} />

                            <button type="submit" aria-label="send message"><ArrowUpIcon /></button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default ChatPage