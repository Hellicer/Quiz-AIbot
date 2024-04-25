import React, { Component } from "react"
import ApiGoogle from "../api/apiGoogle"

// import WorldAI from "../api/worldAI"

import BuilderHTMLStructure from "./builderHTMLStructure"

class LoginFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnSubmit: null,
    }
  }

  render() {
    const { stateUpdateDataUser, stateUpdateDataBot } = this.props
    const { btnSubmit } = this.state
    const options = [
      { value: "male", text: "Чоловік" },
      { value: "female", text: "Жінка" },
      { value: "other", text: "Інше" },
    ]
    const inputNameField = (
      <md-outlined-text-field
        required="true"
        label="Ім'я"
        id="InputUserName"
        value=""
        minlength="2"
        maxlength="16"
      />
    )
    const loginFrameBlock = (
      <div className="app-main-content-login">
        <span className="app-main-content-login-text--title">Вхід до Google-аккаунту</span>
        <form
          className="app-main-content-login-form"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {inputNameField}
          <md-outlined-text-field
            label="Ваш вік"
            type="number"
            min="16"
            max="99"
            id="InputUserAge"
          />
          <md-outlined-select>
            <md-select-option
              selected
              disabled
              value="Оберіть вашу стать"
            >
              <div slot="headline">Оберіть вашу стать</div>
            </md-select-option>
            {options.map((option) => (
              <md-select-option
                onClick={
                  (e) => console.log(e.target.value) // this.setState({ sex: e.target.value })
                }
                key={option.value}
                value={option.value}
              >
                {option.text}
              </md-select-option>
            ))}
          </md-outlined-select>
          {btnSubmit}
        </form>
      </div>
    )
    const footer = (
      <div className="app-main-footer">
        <div className="app-main-footer--decor" />
      </div>
    )

    return (
      <>
        {/* <WorldAI /> */}
        <ApiGoogle
          btnSubmit={btnSubmit}
          onUpdate={this.handleUpdate}
          updateBtnSubmit={(newValue) => {
            this.setState({ btnSubmit: newValue })
          }}
          updDataUser={(userData) => {
            stateUpdateDataUser(true, userData)
          }}
          updDataBot={(getDataForBot) => {
            console.log(getDataForBot)
            stateUpdateDataBot(getDataForBot)
          }}
        />
        <BuilderHTMLStructure
          contentValue={loginFrameBlock}
          footerValue={footer}
        />
      </>
    )
  }
}
export default LoginFrame
