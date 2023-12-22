import React, { Component } from "react"
import axios from "axios"
import { INWORLD_KEY, CHARACTER_ID, WORKSPACE_ID } from "./ApiInworldAI"

export class ApiInworldAI extends Component {
  constructor(props) {
    const storedDataAi = sessionStorage.getItem("dataAi")
    super(props)
    // this.MySelect = this.MySelect.bind(this)
    this.GetResponce = this.GetResponce.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      response: null,
      sex: null,
      dataAi: storedDataAi ? JSON.parse(storedDataAi) : { dataAi: null },
      userMessage: null,
      chating: [{ text: null, type: null }]
    }
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  updateChat = (props) => {
    console.debug(props)

    // const { text, type } = props
    const { chating } = this.state
    if (chating.type) {
      console.log(chating.type)
      const newMessages = [...chating]
      newMessages.push(props)
      this.setState({ newMessages })
    } else {
      // eslint-disable-next-line react/destructuring-assignment
      this.setState({ chatting: { text: props.text, type: props.type } }, () => {
        // eslint-disable-next-line react/destructuring-assignment
        console.log(this.state.chating)
      })
    }
    // eslint-disable-next-line react/destructuring-assignment
    /*   this.setState(
      produce((draft) => {
        // Сохраняем предыдущие имена
        draft.history.push(props)
      })
    ) */
    /* {
      chatting: [
        ...state.chatting,
        {
          text,
          type
        }
      ]
    } */
    // this.setState((state) => )
    // this.setState({ userMessage: props })
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
    console.debug(props)
    /*  if (props) {
    } */
    const { url } = props
    let data = {}
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${INWORLD_KEY}`
    }

    if (props.nameFunc === "OpenSession") {
      const { endUserId, givenName, gender, age } = props.data.user
      /*     let user = {
        endUserId: "123v",
        givenName: "David",
        gender: "other",
        age: "18",
        role: "student"
      } */
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
      // console.debug(data)
    }

    console.debug(url, data, headers)

    axios
      .post(url, data, {
        headers
      })
      .then((responsedata) => {
        if (props.nameFunc === "OpenSession") {
          this.updateDataAi(responsedata)
        } else {
          console.debug(`%c ${responsedata}`, "debug")
          const answer = responsedata.data.textList.join(" ")
          this.updateChat({ answer, type: "answer" })
          // this.setState({ response: responsedata })
        }
        console.log(responsedata)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  GetResponce() {
    const options = [
      { value: "1", text: "male" },
      { value: "2", text: "female" },
      { value: "3", text: "other" }
    ]
    const { sex } = this.state
    // console.debug(`%cresponce form GetResponce: ${response}`, debug)
    return (
      <div className="app form-dir">
        <input
          type="text"
          id="username"
          placeholder="your name"
        />
        <input
          placeholder="age"
          type="number"
          name="
        age"
          id="age"
        />
        <select
          value="Оберіть свою стать"
          onChange={(e) => {
            this.setState({ sex: e.target.value })
          }}
        >
          <option
            disabled="disabled"
            title="Оберіть свою стать"
          >
            Оберіть свою стать
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.text}
            </option>
          ))}
        </select>
        {this.MySelect}
        <button
          type="button"
          onClick={() =>
            this.handleClick({
              nameFunc: "OpenSession",
              url: `https://studio.inworld.ai/v1/${CHARACTER_ID}:openSession`,
              data: {
                name: CHARACTER_ID,
                user: {
                  username: document.querySelector("#username").value,
                  age: document.querySelector("#age").value,
                  sex
                }
              }
            })
          }
        >
          Send Request
        </button>

        {/* {response && <div>{JSON.stringify(response)}</div>} */}
      </div>
    )
  }

  render() {
    const workspaceId = WORKSPACE_ID
    // eslint-disable-next-line react/destructuring-assignment
    const { dataAi: outDataAi } = this.state.dataAi
    const { response, chatting, userMessage: quiestion } = this.state
    let answer
    // let answers
    let chatUpdate
    if (response) {
      answer = response.data.textList.join(" ")
      console.log(response.data.textList)
      chatUpdate = (
        <>
          <p className="ai-chat-quiestion">{quiestion}</p>
          <p className="ai-chat-answer">{answer}</p>
        </>
      )
    }

    let urlSendText
    let sessionMetaday

    // eslint-disable-next-line react/destructuring-assignment
    if (outDataAi) {
      const { name, sessionCharacters } = outDataAi.data
      // const session = name
      console.debug(outDataAi.data, chatUpdate)
      const characterId = sessionCharacters[0].character

      sessionMetaday = name

      urlSendText = `https://studio.inworld.ai/v1/${workspaceId}/sessions/${name}/sessionCharacters/${characterId}:sendText`

      /*   if (chatting) {
          chatting.forEach((element) => {
            console.log(element)
            answers = (
              <div
                key={element.text}
                className={`.ai-chat${element.type}`}
              >
                {element.text}
              </div>
            )
          })
          console.log(answers)
        } */
    }
    // map(message =>{
    // })
    return (
      <div>
        {outDataAi ? (
          <div>
            <div className="ai-chat">
              <span>Chat:</span>
              <div className="ai-chat-chating">
                {chatting.map((elem) => (
                  <p key={elem.type}> {elem.text} </p>
                ))}
                {/* {chatting ? (

                        ) : (
                          <span> not yet.</span>
                        )} */}
              </div>
              <div className="ai-chat-func-elem">
                <input
                  placeholder="/// type you quiestions"
                  type="text"
                  id="get-answer"
                />
                <button
                  type="button"
                  onClick={() => {
                    const { value } = document.querySelector("#get-answer")
                    this.updateChat({ value, type: "question" })
                    console.debug(`%c value inp ${value}`, "debug")
                    this.handleClick({
                      nameFunc: "sendText",
                      url: urlSendText,
                      data: { text: value },
                      headers: { "Grpc-Metadata-session-id": sessionMetaday }
                    })
                  }}
                >
                  Get answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            data is not exist
            <this.GetResponce />
          </div>
        )}
      </div>
    )
  }
}
