/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react"

// import ConnectedBotAi from "./connectedBotAi"

const {
  REACT_APP_CLIENT_ID: CLIENT_ID,
  REACT_APP_API_KEY: API_KEY,
  REACT_APP_SCOPES: SCOPES,
  REACT_APP_CHARACTER_ID: CHARACTER_ID,
} = process.env

class ApiGoogle extends Component {
  constructor(props) {
    super(props)
    this.handleAuthClick = this.handleAuthClick.bind(this)

    this.state = {
      DISCOVERY_DOC: [
        "https://forms.googleapis.com/$discovery/rest?version=v1",
        "https://www.googleapis.com/discovery/v1/apis/translate/v2/rest",
      ],
      tokenClient: null,
    }
  }

  componentDidMount() {
    this.addListinger()
    let tokenClientVar
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
      tokenClientVar = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        promt: "",
        scope: SCOPES,
        callback: "",
      })
      this.setState({ tokenClient: tokenClientVar })

      // window.document.cookie = `token=${window.gapi.client.getToken()}; expires=Tue, 19 Jan 2038 04:14:07 GMT`
      // window.document.cookie = `token=${this.state.accessToken.access_token}; expires=Tue, 19 Jan 2038 04:14:07 GMT`
      // tokenClient.requestAccessToken()
    }
    document.body.appendChild(scriptGsi)
  }

  componentWillUnmount() {
    console.log("gapi is working")
    const scriptGapi = document.querySelector('script[src="https://apis.google.com/js/api.js"]')
    const scriptGsi = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
    if (scriptGapi) {
      scriptGapi.parentNode.removeChild(scriptGapi)
    }

    if (scriptGsi) {
      scriptGsi.parentNode.removeChild(scriptGsi)
    }
  }

  initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: this.state.DISCOVERY_DOC,
    })
  }

  handleAuthClick = () => {
    const form = document.querySelector("form")
    const username = form.childNodes[0].value
    const age = form.childNodes[1].value
    const sex = form.childNodes[2].value
    const validAge = age < 100 && age > 15

    const isValid = /^[A-Za-zА-Яа-яІіЄєҐґ']+$/.test(username)
    if (isValid && username.length >= 2 && username.length <= 16) {
      const { tokenClient } = this.state
      const data = {
        name: CHARACTER_ID,
        user: {
          username,
          age: validAge ? age : null,
          sex: sex !== "Оберіть вашу стать" ? sex : null,
        },
      }
      // let CurrToken
      console.log(data)
      this.props.updDataBot({ data })
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp
        }
        /*         // this open session AiWorld chat bot, if session open is success, u get responce with status 200 and in data.name will be identification name, that write in .env
        ConnectedBotAi({
          nameFunc: "OpenSession",
          data: {
            name: CHARACTER_ID,
            user: {
              username,
              age: validAge ? age : null,
              sex: sex !== "Оберіть вашу стать" ? sex : null,
            },
          },
        })
          .then((response) => {
            console.log(response)
            this.props.updDataBot(response.data)
          })
          .catch((e) => {
            console.error(`get error from WorldAi Api: ${e}`)
          }) */

        window.gapi.client.forms.forms
          .get({
            formId: "1q4K9Jxfk5H0b9N3PayWqkFhwwjtJq9w7Kmu4MoLPxZk",
          })
          .then((response) => {
            /*                    // this open session AiWorld chat bot, if session open is success, u get responce with status 200 and in data.name will be identification name, that write in .env
                        ConnectedBotAi({
                          nameFunc: "OpenSession",
                          data: {
                            name: CHARACTER_ID,
                            user: {
                              username,
                              age: validAge ? age : null,
                              sex: sex !== "Оберіть вашу стать" ? sex : null,
                            },
                          },
                        })
                          .then((responseData) => {
                            console.log(responseData)
                            this.props.updDataBot(responseData.data)

                          })
                          .catch((e) => {
                            console.error(`get error from WorldAi Api: ${e}`)
                          }) */ this.props.updDataUser(response)
          })
          .catch((e) => {
            console.error(`get error from Google Api: ${e}`)
          })
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
    return console.log(0)
  }

  addListinger() {
    const { updateBtnSubmit } = this.props
    updateBtnSubmit(
      <md-filled-button
        type="submit"
        className="app-main-content-login-form--submit"
        onClick={this.handleAuthClick}
      >
        Увійти
      </md-filled-button>
    )
  }

  render() {
    return null
  }
}
export default ApiGoogle
