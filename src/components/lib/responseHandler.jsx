/* eslint-disable eqeqeq */

import ConnectedBotAi from "../api/connectedBotAi"
import TranslitionObject from "../api/translitionObject"
import responseDataUpdate from "./responseDataUpdate"

export default async function responceHandler(props) {
  // text was instead of props
  const { chooseLang, dataForBot, data, nameFunc } = props
  console.log(chooseLang)
  let transENOnUK = null
  const responseText = await ConnectedBotAi({
    nameFunc,
    dataForBot,
    lang: chooseLang,
    dataText: { data } || null,
  })
    .then((response) => {
      console.log(response)
      return response
    })
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
  const responseData = await responseDataUpdate({
    text: transENOnUK || dataResponse,
    type: "answer",
  })
  return responseData
}
