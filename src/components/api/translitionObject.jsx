/* eslint-disable eqeqeq */
export default async function TranslitionObject(text, source, funcType) {
  console.log(text != undefined, funcType !== "OpenSession", source == "uk")

  if (text != undefined && funcType !== "OpenSession") {
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
        target,
      })
      .then(
        (response) => response.result.data.translations[0].translatedText,
        (reason) => {
          console.log(`Error: ${reason.result.error.message}`)
        }
      )
    console.log(answer)
    return answer
  }
  return text
}
