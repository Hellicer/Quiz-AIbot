/* eslint-disable react/no-unused-state */
import React, { Component } from "react"
import axios from "axios"
// eslint-disable-next-line import/no-extraneous-dependencies
import TextTransition, { presets } from "react-text-transition"
// eslint-disable-next-line no-unused-vars
import App from "../App"
// import produce from "immer"
// const MyContext = React.createContext()

/* past variable
const INWORLD_SECRET = "PsXFBfKqj9VIfTHjiSIiQ8a7W6O6oLosiZ3QvQzDn08co0Gc5UzCDWflJEpvzcIk"
const INWORLD_SCENE = "workspaces/default-a2ru8__cojiasbjy4syh-g/scenes/test_scene"
isLogged: false
INWORLD_KEY: "sftjsL5XFgBlPGrATd02TljYFc053kJ1",
INWORLD_SECRET: "PsXFBfKqj9VIfTHjiSIiQ8a7W6O6oLosiZ3QvQzDn08co0Gc5UzCDWflJEpvzcIk",
INWORLD_SCENE: "workspaces/default-a2ru8__cojiasbjy4syh-g/scenes/test_scene",
CHARACTER_ID: "workspaces/default-a2ru8__cojiasbjy4syh-g/characters/course-tutor",
PORT: "8000"
    const workspaceId = "default-j_2vxrpapritcwrnvaiufq"
    // const characterId = "workspaces/default-a2ru8__cojiasbjy4syh-g/characters/course-tutor"
      const myKey =
      "Basic c2Z0anNMNVhGZ0JsUEdyQVRkMDJUbGpZRmMwNTNrSjE6UHNYRkJmS3FqOVZJZlRIamlTSWlROGE3VzZPNm9Mb3NpWjNRdlF6RG4wOGNvMEdjNVV6Q0RXZmxKRXB2emNJaw=="
      const sceneid = "workspaces/default-a2ru8__cojiasbjy4syh-g/scenes/test_scene"
      const inworld_key = "sftjsL5XFgBlPGrATd02TljYFc053kJ1"
      const inworld_secret = "PsXFBfKqj9VIfTHjiSIiQ8a7W6O6oLosiZ3QvQzDn08co0Gc5UzCDWflJEpvzcIk"
      const saySome = "Hello (In)world!"

    character_id = x4.json()["sessionCharacters"][0]["character"]
session_id = x4.json()["name"]
workspace_id = "{WORKSPACE_ID}"

url = f'https://studio.inworld.ai/v1/{workspace_id}/sessions/{session_id}/sessionCharacters/{character_id}:sendText'
headers = {"Content-Type": "application/json", "authorization": my_key, "Grpc-Metadata-session-id": session_id}

myobj = {"text": i_want_to_say}
// const url = `https://studio.inworld.ai/v1/${CHARACTER_ID}:simpleSendText`


 */

class ApiInworldAI extends Component {
  WORKSPACE_ID = "workspaces/default-a2ru8__cojiasbjy4syh-g"

  INWORLD_KEY =
    "c2Z0anNMNVhGZ0JsUEdyQVRkMDJUbGpZRmMwNTNrSjE6UHNYRkJmS3FqOVZJZlRIamlTSWlROGE3VzZPNm9Mb3NpWjNRdlF6RG4wOGNvMEdjNVV6Q0RXZmxKRXB2emNJaw=="

  CHARACTER_ID = "workspaces/default-a2ru8__cojiasbjy4syh-g/characters/course-tutor"

  // eslint-disable-next-line no-unused-vars
  // debug = "font-size: 10px;  color: cornflowerblue"

  constructor(props) {
    const storedDataAi = sessionStorage.getItem("dataAi")

    super(props)
    // this.MySelect = this.MySelect.bind(this)
    this.GetResponce = this.GetResponce.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getMessages = this.getMessages.bind(this)
    this.app = new App()
    this.state = {
      response: null,
      sex: null,
      dataAi: storedDataAi ? JSON.parse(storedDataAi) : { dataAi: null },
      userMessage: null,
      chatting: [{ text: null, type: null }],
      height: null,
      chooseLang: "uk"
    }
  }

  getMessages = (props) => {
    console.log(this.state)
    props.map((elem) => <p key={elem.type}> {elem.text} </p>)
  }

  updateChat = async (props) => {
    const DataChat = props
    const { chatting } = this.state
    console.log(DataChat.text)
    // const app = new App()
    await this.app.TranslitionObject(DataChat.text, "en", "uk").then((response) => {
      console.log(response)
      DataChat.text = response
      if (chatting[0].text) {
        const newMessages = [...chatting]
        newMessages.push(DataChat)
        this.setState({ chatting: newMessages })
        // eslint-disable-next-line react/destructuring-assignment
        console.log(this.state.chatting)
      } else {
        this.setState({ chatting: [DataChat] })
        // eslint-disable-next-line react/destructuring-assignment
        console.log(this.state.chatting)
      }
    })
  }

  updateDataAi = (props) => {
    // Обновляем состояние компонента
    this.setState({
      dataAi: { dataAi: props }
    })
    // Сохраняем данные в sessionStorage
    sessionStorage.setItem("dataAi", JSON.stringify({ dataAi: props }))
  }

  handleClick = async (props) => {
    // console.debug(props)
    const { url, lang } = props
    let data = {}
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${this.INWORLD_KEY}`
    }
    if (props.nameFunc === "OpenSession") {
      const { endUserId, givenName, gender, age } = props.data.user
      const user = {
        endUserId: endUserId || "123v",
        givenName: givenName || "David",
        gender: gender || "other",
        age: age || "18",
        role: "student"
      }
      data = { name: props.data.name, user, ...data }
      console.debug(data)
    } else {
      data = props.data
      headers = Object.assign(props.headers, headers)
    }

    /*  if (lang === "uk") {
      await this.app.TranslitionObject(data.text, "en", "uk").then((response) => {
        data.text = response
      })
    } */
    await this.app.TranslitionObject(data.text, lang).then((response) => {
      console.log(response)
      data.text = response

      axios
        .post(url, data, {
          headers
        })
        .then((responsedata) => {
          if (props.nameFunc === "OpenSession") {
            this.updateDataAi(responsedata)
          } else {
            const answer = responsedata.data.textList.join(" ")
            this.updateChat({ text: answer, type: "answer" })
            // eslint-disable-next-line react/destructuring-assignment
            console.debug(this.state.chatting)
            // this.setState({ response: responsedata })
          }
          console.log(responsedata)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  GetResponce() {
    const options = [
      { value: "male", text: "Чоловік" },
      { value: "female", text: "Жінка" },
      { value: "other", text: "Інше" }
    ]
    const { sex } = this.state
    // console.debug(`%cresponce form GetResponce: ${response}`, debug)
    return (
      <div className="app-ai-form-dir">
        <span>Chat bot offline</span>
        <input
          type="text"
          id="username"
          placeholder="Ваше ім'я"
        />
        <input
          placeholder="Вік"
          type="number"
          name="
        age"
          id="age"
        />
        <select name="choice">
          <option title="Оберіть свою стать">Оберіть свою стать</option>
          {options.map((option) => (
            <option
              onClick={(e) => this.setState({ sex: e.target.value })}
              key={option.value}
              value={option.value}
            >
              {option.text}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            // console.log(sex)
            // this.setState({ sex: document.querySelector("select").target.value })
            this.handleClick({
              nameFunc: "OpenSession",
              url: `https://studio.inworld.ai/v1/${this.CHARACTER_ID}:openSession`,
              data: {
                name: this.CHARACTER_ID,
                user: {
                  username: document.querySelector("#username").value,
                  age: document.querySelector("#age").value,
                  sex
                }
              }
            })
          }}
        >
          Активувати чат бот
        </button>

        {/* {response && <div>{JSON.stringify(response)}</div>} */}
      </div>
    )
  }

  render() {
    const workspaceId = this.WORKSPACE_ID
    // eslint-disable-next-line react/destructuring-assignment
    const { dataAi: outDataAi } = this.state.dataAi
    const { response, chatting, chooseLang, userMessage: quiestion } = this.state
    let answer
    // let chooseLang = "uk"
    // let answers
    let chatUpdate
    if (response) {
      answer = response.data.textList.join(" ")
      console.log(response.data.textList)
      // eslint-disable-next-line no-unused-vars
      chatUpdate = (
        <>
          <p className="ai-chat-quiestion">{quiestion}</p>
          <p className="ai-chat-answer">{answer}</p>
        </>
      )
    }
    let urlSendText
    let sessionMetaday

    if (outDataAi) {
      const { name, sessionCharacters } = outDataAi.data
      // const session = name

      console.debug(chooseLang)
      const characterId = sessionCharacters[0].character

      sessionMetaday = name

      urlSendText = `https://studio.inworld.ai/v1/${workspaceId}/sessions/${name}/sessionCharacters/${characterId}:sendText`
    }
    return (
      <div
        className="app-ai--fullheight"
        id="appaiconainer"
      >
        <div
          className="app-ai-chat"
          id="appaichat"
        >
          <div className="app-ai-navbar">
            <span className="item-top">Chat bot</span>
            <label htmlFor="uk">
              Укр.
              <input
                onClick={(event) => {
                  console.log(event.target.value)
                  this.setState({ chooseLang: event.target.value })
                }}
                type="radio"
                id="uk"
                name="lang"
                value="uk"
                defaultChecked
              />
            </label>
            <label htmlFor="en">
              Англ.
              <input
                onClick={(event) => {
                  this.setState({ chooseLang: event.target.value })
                }}
                type="radio"
                id="en"
                name="lang"
                value="en"
              />
            </label>
            <button
              aria-label="min or max window"
              type="button"
              className="app-ai-navbar-roll--down"
              onClick={(e) => {
                // console.log(document.querySelector("#appaichat"))
                // const chating = document.querySelector(".app-ai-chat-chating")
                const chat = document.querySelector("#appaiconainer")
                const funcBar = document.querySelector(".app-ai-chat-func-elem")
                console.log(funcBar)
                const chating = document.querySelector(".app-ai-chat-chating")
                const dir = document.querySelector(".app-ai-form-dir")
                if (funcBar && chating) {
                  funcBar.classList.toggle("display-none")
                  chating.classList.toggle("display-none")
                }
                if (dir) {
                  dir.classList.toggle("display-none")
                }

                // eslint-disable-next-line no-unused-expressions
                e.target.className === "app-ai-navbar-roll--down"
                  ? ((e.target.className = "app-ai-navbar-roll--up"),
                    chat.classList.replace("app-ai--fullheight", "app-ai--miniheight"))
                  : ((e.target.className = "app-ai-navbar-roll--down"),
                    chat.classList.replace("app-ai--miniheight", "app-ai--fullheight"))
                // chating.classList.replace("display-none", "display-block"),
                // chat.classList.replace("app-ai--miniheight", "app-ai--fullheight")
              }}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        {outDataAi ? (
          <>
            {chatting ? (
              <div
                className="app-ai-chat-chating display-block"
                ref={() => {
                  document.querySelector(".app-ai-chat-chating").scrollTo({
                    top: document.querySelector(".app-ai-chat-chating").scrollHeight,
                    left: 0,
                    behavior: "smooth"
                  })
                }}
              >
                <div
                  className="app-ai-chat-chating-elem
                "
                >
                  {chatting.map((elem, index) => (
                    <TextTransition
                      // eslint-disable-next-line react/no-array-index-key
                      key={`chat-${index}`}
                      direction="down"
                      className={`app-ai-chat-chating-${elem.type}`}
                      delay={600}
                      translateValue="50%"
                      springConfig={presets.slow}
                    >
                      {elem.text}
                    </TextTransition>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="app-ai-chat-func-elem item-bottom">
              <input
                placeholder="/// type you quiestions"
                type="text"
                id="get-answer"
              />
              <button
                type="submit"
                onClick={() => {
                  this.updateChat({
                    text: document.querySelector("#get-answer").value,
                    type: "question"
                  })

                  this.handleClick({
                    nameFunc: "sendText",
                    url: urlSendText,
                    lang: chooseLang,
                    data: { text: document.querySelector("#get-answer").value },
                    headers: { "Grpc-Metadata-session-id": sessionMetaday }
                  })
                  // console.debug(this.callMethod())
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <this.GetResponce />
        )}
      </div>
    )
  }
}
export default ApiInworldAI
