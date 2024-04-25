/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from "react"

import icons from "../../media/icons.svg"
import ConnectedBotAi from "../api/connectedBotAi"
// import TranslitionObject from "../api/translitionObject"
import responseHandler from "../lib/responseHandler"
import responseDataUpdate from "../lib/responseDataUpdate"

export default class ContentFrame extends Component {
  constructor(props) {
    super(props)
    const storedChattingData = sessionStorage.getItem("storedChattingData")
    this.state = {
      chatting: storedChattingData ? JSON.parse(storedChattingData) : [{ text: null, type: null }],
    }
  }

  handlerResponce = async (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    const { chooseLang, dataForBot } = this.props.value
    document.querySelector("input").value = null

    // eslint-disable-next-line react/destructuring-assignment
    console.log(document.querySelector("input").textContent)
    responseHandler({ chooseLang, dataForBot, text: props, nameFunc: "sendText" }).then(
      (response) => {
        console.log(`response: ${response}`)
        this.setState({ chatting: response })
      }
    )
    //   chatting: await responseDataUpdate({ text: transENOnUK || dataResponse, type: "answer" }),
  } /*  handlerResponce = async (text) => {
    // eslint-disable-next-line react/destructuring-assignment
    const { chooseLang, dataForBot } = this.props.value
    // eslint-disable-next-line react/destructuring-assignment
    console.log(text)
    let transENOnUK = null
    const responseText = await ConnectedBotAi({
      nameFunc: "sendText",
      dataForBot,
      lang: chooseLang,
      data: { text },
    })
      .then((response) => response)
      .catch((error) => {
        // обробка помилки
        console.error(error)
      })
    const dataResponse = responseText.data.textList.join(" ")
    if (chooseLang == "uk") {
      transENOnUK = await TranslitionObject(dataResponse, "en")
        .then((responseTransliteOnUK) => {
          console.log(responseTransliteOnUK)
          return responseTransliteOnUK
        })
        .catch((error) => {
          // обробка помилки
          console.log(error)
        })
    }
    //  this.setState({
    //   chatting: await responseDataUpdate({ text: transENOnUK || dataResponse, type: "answer" }),
    // })

    // await this.{ text: transENOnUK || dataResponse, type: "answer" })
  }
  updateChat = async (value) => {
    const { chatting } = this.state
    let newMessages
    if (chatting[0].text !== null) {
      newMessages = [...chatting]
      newMessages.push(value)
    }
    // const stateUpdateData = {  }
    this.setState({ chatting: newMessages || [value] })
    sessionStorage.setItem("storedChattingData", JSON.stringify(newMessages || [value]))
  } */

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { chooseLang, dataForBot, rotateSVG } = this.props.value
    const { chatting } = this.state
    return (
      <div className="app-second-content">
        <div
          className="app-second-content-dialoge"
          ref={() => {
            document.querySelector(".app-second-content-dialoge").scrollTo({
              top: document.querySelector(".app-second-content-dialoge").scrollHeight,
              left: 0,
              behavior: "smooth",
            })

            // console.log(e.)
            // scrollHeight
          }}
        >
          {chatting.map((elem, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`chat-${index}`}
              // direction="down"
              className={`app-second-content-dialoge--${elem.type}`}
              // delay={600}
              // translateValue="50%"
              // springConfig={presets.slow}
            >
              {elem.text}
            </div>
          ))}
        </div>
        <div className="app-second-content-send">
          <div className="app-second-content-send-group">
            <div className="app-second-content-send-input">
              <input
                placeholder="Напишіть боту..."
                type="text"
                name="userMessage"
              />
            </div>
            <button
              className="app-second-content-send-button"
              type="button"
              aria-label="button-for-send-message-to-bot"
              onClick={() => {
                const valueText = document.querySelector("input").value
                responseDataUpdate({
                  text: valueText,
                  type: "question",
                }).then((responseValue) => {
                  this.setState({ chatting: responseValue })
                })
                this.handlerResponce(valueText)
              }}
            >
              <svg
                className="svg-icon"
                style={{ transform: `rotate(${rotateSVG}deg)` }}
              >
                <use href={`${icons}#send`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
