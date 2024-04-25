import React, { Component } from "react"
import icons from "../../media/icons.svg"
// import ApiGoogle from "./apiGoogle"
import ContentFrame from "./asideContent"

class ApiAIworld extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toogleFrame: false,
      minValue: "24px",
      rotateSVG: 0,
      chooseLang: "uk",
    }
  }

  render() {
    const { toogleFrame, minValue, rotateSVG, chooseLang } = this.state
    const { dataForBot } = this.props
    return (
      <aside
        className="app-second"
        style={{ padding: minValue }}
      >
        <div className="app-second-navbar">
          <div className="app-second-navbar-indicator">
            <span>Shat bot</span>
            <md-circular-progress indeterminate />
          </div>
          <div className="app-second-navbar-selector">
            EN
            <md-switch
              selected
              onClick={() => {
                this.setState({ chooseLang: chooseLang === "uk" ? "en" : "uk" })
              }}
            />
            UK
          </div>

          <div className="app-second-navbar-minimizate">
            <button
              type="button"
              aria-label="minimizate-chatBot-frame"
              onClick={() => {
                this.setState({
                  toogleFrame: !toogleFrame,
                  minValue: toogleFrame ? "24px" : "8px 24px",
                  rotateSVG: toogleFrame ? 0 : 180,
                })
              }}
            >
              <svg
                className="svg-icon"
                style={{ transform: `rotate(${rotateSVG}deg)` }}
              >
                <use href={`${icons}#minimizate`} />
              </svg>
            </button>
          </div>
        </div>

        {!toogleFrame ? <ContentFrame value={{ rotateSVG, chooseLang, dataForBot }} /> : null}
      </aside>
    )
  }
}
export default ApiAIworld
