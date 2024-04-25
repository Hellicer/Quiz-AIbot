/* eslint-disable eqeqeq */
import axios from "axios"
import TranslitionObject from "./translitionObject"
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const {
  REACT_APP_INWORLD_KEY: INWORLD_KEY,
  REACT_APP_CHARACTER_ID: CHARACTER_ID,
  REACT_APP_WORKSPACE_ID: WORKSPACE_ID,
} = process.env

export default async function ConnectedBotAi(props) {
  const { nameFunc, dataForBot, lang } = props

  console.log(nameFunc, dataForBot, lang)
  console.log(nameFunc == "checkStatus")

  let data = {}
  let url = `https://api.inworld.ai/v1/`
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${INWORLD_KEY}`,
  }

  if (nameFunc === "OpenSession") {
    const { endUserId, username, sex, age } = props.data.user
    const user = {
      endUserId: endUserId || "123v",
      givenName: username || "David",
      sex: sex || "other",
      age: age || "18",
      role: "student",
    }
    url += `${CHARACTER_ID}:openSession`
    console.log(url)
    data = { name: props.data.name, user, ...data }
  } else {
    const { name, sessionCharacters } = dataForBot
    const characterId = sessionCharacters[0].character
    const headerData = { "Grpc-Metadata-session-id": name }
    headers = Object.assign(headerData, headers)
    url += `${WORKSPACE_ID}/sessions/${name}/sessionCharacters/${characterId}`
    if (nameFunc === "checkStatus") {
      url = `${url}:sendTrigger`
      data = {
        triggerEvent: { trigger: `${WORKSPACE_ID}/triggers/give_quest` },
      }
    } else {
      url = `${url}:sendText`
      data = props.dataText
    }
  }
  console.log(url)
  const response = await TranslitionObject(
    nameFunc == "sendText" ? props.dataText.text : undefined,
    lang,
    nameFunc
  )
    .then((responseTranslite) => {
      if (nameFunc == "sendText") {
        data.text = responseTranslite
      }
    })
    .catch((error) => {
      // обробка помилки
      console.error(error)
    })
    .then(() =>
      axios
        .post(url, data, {
          headers,
        })
        .then((responseAxios) => {
          console.log(responseAxios)
          return responseAxios
        })
        .catch((error) => {
          // обробка помилки
          console.error(error)
          // eslint-disable-next-line no-unused-expressions
          error.response.status == 400
        })
    )
    .catch((error) => {
      // обробка помилки

      console.error(error)

      // eslint-disable-next-line no-unused-expressions
      error.response.status == 400
    })

  console.debug("debug response", response)
  return response
}
