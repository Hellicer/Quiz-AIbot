/* eslint-disable no-undef */
import React, { Component } from "react"

class builderHTMLStructure extends Component {
  constructor(props) {
    super(props)
    // const storedTimer = sessionStorage.getItem("storedTimer")

    this.state = {
      //   secundomer: storedTimer ? JSON.parse(storedTimer).secundomer : { minute: 0, second: 0 },
    }
  }

  render() {
    // ' progressBarUpdate = 0 '  -  it's was in past variant
    const { contentValue, footerValue, progressBarUpdate, secundomer } = this.props
    // console.log(this.props)
    // const { secundomer } = this.state
    const navbar = (
      <div className="app-main-navbar">
        <span className="app-main-navbar-progress">
          <span
            style={{ width: `${progressBarUpdate || 0}%` }}
            className="app-main-navbar-progress--bar"
          />
        </span>
        <div className="app-main-navbar-timer">
          <div className="app-main-navbar-timer-minute">
            {" "}
            {secundomer ? secundomer.minute : `0`}
          </div>
          :
          <div className="app-main-navbar-timer-second">{secundomer ? secundomer.second : `0`}</div>
        </div>
      </div>
    )
    return (
      <section className="app-main">
        {navbar}
        <div className="app-main-content">{contentValue}</div>
        {footerValue}
      </section>
    )
  }
}

export default builderHTMLStructure
