/* eslint-disable no-unused-vars */
/*
1. зробити вспливаюце вікна помилок. Зоокрема вивід:
      * комноненту connectedBotAi в axios та translition
      * комноненту apiGoogle в ConnectedBotAi
2. якщо налаштування мови відризняєця від тої що вводо юзер - видавати помилку в чат-діалогі: мова введення відрізняється від обранної
3. Зробити
*/

import React, { Component } from "react"
import "./App.css"
import { Console } from "winston/lib/winston/transports"
import ApiAIworld from "./components/layout/chatFrame"
// import ApiGoogle from "./components/apiGoogle"
import Secundomer from "./components/module/secundomer"
import LoginFrame from "./components/layout/loginFrame"
import QuizGame from "./components/layout/quizGame"
import ConnectedBotAi from "./components/api/connectedBotAi"
// import ContentFrame from "./components/layout/asideContent"
import responceHandler from "./components/lib/responseHandler"

class App extends Component {
  constructor(props) {
    super(props)
    const storedTimer = sessionStorage.getItem("storedTimer")
    const storedUserData = sessionStorage.getItem("userDataForm")
    const storedData = sessionStorage.getItem("dataForm")
    // this.onClickHandlerLeaf = this.onClickHandlerLeaf.bind(this)

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      secundomer: storedTimer ? JSON.parse(storedTimer).secundomer : { minute: 0, second: 0 },
      userData: storedData ? JSON.parse(storedData) : { dataForm: null },
      dataForBot: storedUserData ? JSON.parse(storedUserData) : null,
      isLogined: false,
      btnSubmit: null,
      showComponent: false,
      activateTimer: false,
      requestBot: null,
    }
  }

  componentDidMount() {
    const { userData } = this.state
    if (userData.dataForm !== null) {
      this.setState({ isLogined: true })
    }
  }

  componentDidUpdate() {
    const { requestBot, secundomer, activateTimer, userData, dataForBot } = this.state
    if (!activateTimer && userData.dataForm != null) {
      this.setState({ activateTimer: true })
      this.interval = setInterval(() => {
        this.setState({ showComponent: true })
      }, 1000)
    }
    // eslint-disable-next-line eqeqeq
    if (secundomer.minute > 10 && secundomer.minute % 15 == 0 && secundomer.minute != requestBot) {
      this.setState({ requestBot: secundomer.minute })
      responceHandler({
        nameFunc: "checkStatus",
        dataForBot,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  requestConnectBotAi() {
    // this open session AiWorld chat bot, if session open is success, u get responce with status 200 and in data.name will be identification name, that write in .env
    const { data } = this.props
    console.log(data)
    ConnectedBotAi({
      nameFunc: "OpenSession",
      data,
    })
      .then((response) => {
        console.log(response)
        sessionStorage.setItem("userDataForm", JSON.stringify(response.data))
        this.setState({ dataForBot: response.data })
      })
      .catch((e) => {
        console.error(`get error from WorldAi Api: ${e}`)
      })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { btnSubmit, isLogined, showComponent, secundomer, dataForBot, userData, counterForm } =
      this.state

    return (
      <>
        {isLogined ? (
          <QuizGame
            userData={userData}
            counterForm={counterForm}
            secundomer={secundomer}
          />
        ) : (
          <LoginFrame
            stateUpdateDataUser={(isLoginedValue, userDataValue) => {
              sessionStorage.setItem("dataForm", JSON.stringify({ dataForm: userDataValue }))
              this.setState({
                isLogined: isLoginedValue,
                userData: { dataForm: userDataValue },
              })
            }}
            stateUpdateDataBot={(props) => {
              this.requestConnectBotAi(props)
            }}
          />
        )}
        {showComponent && (
          <Secundomer
            updaterTimer={(props) => {
              this.setState({ secundomer: props, showComponent: false })
              sessionStorage.setItem("storedTimer", JSON.stringify({ secundomer: props }))
            }}
            data={secundomer}
          />
        )}
        <ApiAIworld dataForBot={dataForBot} />
      </>
    )
  }
}

export default App
