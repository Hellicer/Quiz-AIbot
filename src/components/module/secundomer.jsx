import { Component } from "react"

class Secundomer extends Component {
  componentDidMount() {
    this.updateTimer()
  }

  updateTimer = () => {
    const { data, updaterTimer } = this.props
    const newData = {
      second: data.second === 59 ? 0 : data.second + 1,
      minute: data.second === 59 ? data.minute + 1 : data.minute,
    }
    updaterTimer(newData, false)
  }

  render() {
    return null
  }
}

export default Secundomer
