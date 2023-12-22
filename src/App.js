/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react"
import "./App.css"
// import axios from "axios"

const DISCOVERY_DOC = [
  "https://forms.googleapis.com/$discovery/rest?version=v1",
  "https://www.googleapis.com/discovery/v1/apis/translate/v2/rest"
]
const CLIENT_ID = "924990453973-8gphvq8jl2n8298usfip89j89phb72gv.apps.googleusercontent.com"
const API_KEY = "AIzaSyDi_nt9WpDRo1eyNd5-xruGjzR0uHKYg6c"
// eslint-disable-next-line no-unused-vars
const SCOPES =
  // eslint-disable-next-line no-multi-str
  "https://www.googleapis.com/auth/cloud-translation \
  https://www.googleapis.com/auth/drive"

let tokenClient

class App extends Component {
  static EndGame() {
    return (
      <>
        <div className="progress">
          <div
            style={{ width: "100%" }}
            className="progress__inner"
          />
        </div>
        <ul>
          <h1>End Form </h1>
          <div className="app-achivment">
            <div className="app-achivment-content">
              <h3> Галілео Галілей!</h3>

              <img
                width="100"
                height="100"
                src="https://img.icons8.com/clouds/100/medal2.png"
                alt="medal2"
              />
              <span> Ви пройшли тест першим з групи!</span>
            </div>

            <div className="app-achivment-content">
              <h3> Оце швидкість! </h3>

              <img
                width="96"
                height="96"
                src="https://img.icons8.com/doodle/96/ranners-crossing-finish-line.png"
                alt="ranners-crossing-finish-line"
              />
              <span> Оце швидкість! Вітаю, ви пройшли тест найшвидшим! </span>
            </div>
          </div>
        </ul>
        <div>
          <button
            className="app-button"
            type="button"
          >
            Send Form
          </button>
        </div>
      </>
    )
  }

  constructor(props) {
    const storedData = sessionStorage.getItem("dataForm")
    // eslint-disable-next-line no-unused-vars
    const storedTimer = sessionStorage.getItem("storedTimer")
    console.log()
    // const stored = sessionStorage.getItem("dataForm")
    super(props)
    this.QuizGame = this.QuizGame.bind(this)
    this.state = {
      userData: storedData ? JSON.parse(storedData) : { dataForm: null },
      isLoggedIn: false,
      counterForm: 0,
      secundomer: storedTimer ? JSON.parse(storedTimer).secundomer : { minute: 0, second: 0 }
    }
    this.initializeGapiClient = this.initializeGapiClient.bind(this)
    // this.TranslitionObject = this.TranslitionObjecpropst.bind(thisprops)
  }

  componentDidMount() {
    const scriptGapi = document.createElement("script")
    scriptGapi.src = "https://apis.google.com/js/api.js"
    scriptGapi.async = true
    scriptGapi.defer = true
    scriptGapi.onload = () => window.gapi.load("client", this.initializeGapiClient)
    document.body.appendChild(scriptGapi)

    const scriptGsi = document.createElement("script")
    scriptGsi.src = "https://accounts.google.com/gsi/client"
    scriptGsi.async = true
    scriptGsi.defer = true
    scriptGsi.onload = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        promt: "",
        scope: SCOPES,
        callback: ""
      })
      window.document.cookie = `token=${window.gapi.client.getToken()}; expires=Tue, 19 Jan 2038 04:14:07 GMT`
      // window.document.cookie = `token=${this.state.accessToken.access_token}; expires=Tue, 19 Jan 2038 04:14:07 GMT`
      // tokenClient.requestAccessToken()
    }
    document.body.appendChild(scriptGsi)
  }

  componentWillUnmount() {
    console.log("gapi is working")
    const scriptGapi = document.querySelector('script[src="https://apis.google.com/js/api.js"]')
    const scriptGsi = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
    console.log(scriptGapi)
    console.log(scriptGsi)
    if (scriptGapi) {
      // document.body.removeChild(scriptGapi)
      scriptGapi.parentNode.removeChild(scriptGapi)
    }

    if (scriptGsi) {
      scriptGsi.parentNode.removeChild(scriptGsi)
      // document.body.removeChild(scriptGsi)
    }
  }

  onClickHandler = (props) => {
    const { counterForm } = this.state
    console.log(counterForm)

    if (props === "prev" && counterForm >= 1) {
      this.setState((prevState) => ({ counterForm: prevState.counterForm - 1 }))
    }
    if (props === "next") {
      this.setState((prevState) => ({ counterForm: prevState.counterForm + 1 }))
    }

    const input = document.querySelector("input")
    if (input) {
      document.querySelector("input").value = null
    }
  }

  /*   updateDataToken = (props) => {
    if (!this.state.accessToken) {
      this.setState({
        accessToken: { dataToken: props }
      })
      sessionStorage.setItem("storedToken", JSON.stringify({ dataToken: props }))
    }
  } */

  updateDataForms = (props) => {
    // Обновляем состояние компонента
    this.setState({
      userData: { dataForm: props }
    })
    // Сохраняем данные в sessionStorage
    sessionStorage.setItem("dataForm", JSON.stringify({ dataForm: props }))
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  updateTimer = () => {
    /*    this.setState((state) => ({
      second: state.second === 59 ? 0 : state.second + 1,
      minute: state.second === 59 ? state.minute + 1 : state.minute
    })) */
    this.setState((prevState) => ({
      secundomer: {
        ...prevState.secundomer,
        second: prevState.secundomer.second === 59 ? 0 : prevState.secundomer.second + 1,
        minute:
          prevState.secundomer.second === 59
            ? prevState.secundomer.minute + 1
            : prevState.secundomer.minute
      }
    }))
    const obj = {
      secundomer: {
        second: this.state.secundomer.second,
        minute: this.state.secundomer.minute
      }
    }
    console.log(obj)
    sessionStorage.setItem("storedTimer", JSON.stringify(obj))
  }

  // eslint-disable-next-line class-methods-use-this
  initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOC
    })
  }

  handleAuthClick = () => {
    // let CurrToken
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp
      }
      console.log(window.gapi.client.getToken())
      await this.callForms()
    }
    if (window.document.cookie === null) {
      tokenClient.requestAccessToken({ prompt: "consent" })
    } else {
      tokenClient.requestAccessToken({ prompt: "" })
    }

    const timer = setTimeout(() => {
      window.document.cookie = `token=${window.gapi.client.getToken()}; expires=Tue, 19 Jan 2038 04:14:07 GMT`
    }, 20000)

    return () => clearTimeout(timer)
  }

  // eslint-disable-next-line class-methods-use-this
  callForms = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const formResponse = await window.gapi.client.forms.forms.get({
        formId: "1q4K9Jxfk5H0b9N3PayWqkFhwwjtJq9w7Kmu4MoLPxZk"
      })
      this.updateDataForms(formResponse)
      this.setState({ isLoggedIn: true })
      return formResponse
    } catch (err) {
      throw err
    }
  }

  // eslint-disable-next-line class-methods-use-this, react/no-unused-class-component-methods
  async TranslitionObject(text, source) {
    let target
    if (source === "uk") {
      target = "en"
    } else {
      target = "uk"
    }

    const answer = await window.gapi.client.language.translations
      .list({
        q: text,
        source,
        target
      })
      .then(
        (response) => response.result.data.translations[0].translatedText,
        (reason) => {
          console.log(`Error: ${reason.result.error.message}`)
        }
      )
    return answer
  }

  loginBlock(props) {
    return (
      <div className="app-auth-google">
        <button
          type="button"
          id="authorize_button"
          onClick={this.handleAuthClick}
        >
          {props}
        </button>

        {props !== "Authorize" ? (
          <button
            type="button"
            id="signout_button"
          >
            Sign Out
          </button>
        ) : null}
        {this.state.userData.dataForm ? (
          <span className="">
            {this.state.secundomer.minute} : {this.state.secundomer.second}
          </span>
        ) : null}
      </div>
    )
  }

  QuizGame(props) {
    const { counterForm, dataForm, onClick } = props.value
    const { title, description, questionItem } = dataForm.result.items[counterForm]
    const questions = questionItem.question
    const progressBar = Math.round((counterForm / dataForm.result.items.length) * 100)
    let currectQuestion
    const buttonCont = (
      <button
        type="button"
        onClick={() => onClick(document.querySelector("input").value)}
      >
        Send Answer
      </button>
    )
    Object.entries(questionItem.question)
      .reverse()
      // eslint-disable-next-line consistent-return
      .forEach(([key]) => {
        switch (key) {
          case "choiceQuestion":
            // questions = ;
            currectQuestion = questions.choiceQuestion.options.map((value, index) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions, react/no-array-index-key, jsx-a11y/no-noninteractive-element-interactions
              <li
                className="app-content-elem"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => this.onClickHandler("next")}
              >
                {Object.entries(value).map(([key1, item]) => (
                  <span key={key1}>{item.toString()}</span>
                ))}
              </li>
            ))
            break
          case "textQuestion":
            currectQuestion = (
              <li>
                {buttonCont}
                <input type="text" />
              </li>
            )
            break
          case "dateQuestion":
            currectQuestion = (
              <li>
                <input type="date" />
                {buttonCont}
              </li>
            )
            break
          case "ScaleQuestion":
            console.debug("don't work yet")
            break
          case "TimeQuestion ":
            console.debug("don't work yet")
            break
          case "RowQuestion":
            console.debug("don't work yet")
            break
          case "QuestionGroupItem":
            console.debug("don't work yet")
            break
          default:
            return null
        }
      })
    return (
      <>
        <div className="progress">
          <div
            style={{ width: `${progressBar}%` }}
            className="progress__inner"
          />
        </div>
        <ul className="app-list">
          <h3 className="app-list-title">{title} </h3>
          {description ? <h6 className="app-list-description">{description} </h6> : null}
          <div className="app-list-content"> {currectQuestion}</div>
        </ul>
        <div className="app-ai-footer">
          <button
            id="button-prev"
            type="button"
            onClick={() => this.onClickHandler("prev")}
          >
            попередній
          </button>
          <span className="app-ai-footer-counter"> {counterForm + 1} </span>
          <button
            id="button-continie"
            type="button"
            onClick={() => this.onClickHandler("next")}
          >
            {" "}
            наступний
          </button>
        </div>
      </>
    )
  }

  render() {
    const { userData, isLoggedIn, counterForm } = this.state
    const { dataForm, onClick } = {
      dataForm: userData.dataForm
    }
    if (dataForm != null) {
      return (
        <div className="app-auth">
          {isLoggedIn ? this.loginBlock("Refresh") : this.loginBlock("Authorize")}

          {dataForm.result.items.length > this.state.counterForm ? (
            <this.QuizGame value={{ dataForm, onClick, counterForm }} />
          ) : (
            <App.EndGame />
          )}
        </div>
      )
    }

    return (
      <div className="app-auth">
        <h2> Увійдіть в свій Google аккаунт задля отримання quiz-тесту:</h2>
        {this.loginBlock("Authorize")}
      </div>
    )
  }
}
export default App
