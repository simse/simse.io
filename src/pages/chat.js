import React from 'react'

import SEO from "../components/seo"
import Navbar from "../components/navbar"

import styles from "../styles/pages/chat.module.scss"

class ChatPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [
                {from: "them", message: "Hello, I am an AI version of Simon. Ask me anything."},
                {from: "me", message: "Yooo my slime"}
            ]
        }
    }

    renderMessage(message) {
        let messageClass = styles["fromThem"]

        if (message.from === "me") {
            messageClass = styles["fromMe"]
        }

        return (
            <p className={messageClass} key={message.message}>{message.message}</p>
        )
    }

    render() {
        return (
            <>
                <SEO title="Chat" />

                <Navbar />

                <div className={styles.chat}>
                    <div className={styles.messages}>
                        {this.state.messages.map(message => this.renderMessage(message))}
                    </div>

                    <div className={styles.input}>
                        <input type="text" placeholder="Enter a message" />
                    </div>
                </div>
            </>
        )
    }
}

export default ChatPage