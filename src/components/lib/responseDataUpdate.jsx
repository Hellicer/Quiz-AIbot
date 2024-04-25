export default async function updateChat(props) {
  const storedChattingData = sessionStorage.getItem("storedChattingData")
  const chatting = storedChattingData
    ? JSON.parse(storedChattingData)
    : [{ text: null, type: null }]
  console.debug(props)
  let newMessages
  if (chatting[0].text !== null) {
    newMessages = [...chatting]
    newMessages.push(props)
  }
  // const stateUpdateData = {  }
  // this.setState({ chatting: newMessages || [value] })
  sessionStorage.setItem("storedChattingData", JSON.stringify(newMessages || [props]))
  console.debug(newMessages || [props])
  return newMessages || [props]
}
