import React from "react"

import ApiGoogle from "../api/apiGoogle"

export default function BtnSubmit(updateBtnSubmit) {
  // eslint-disable-next-line no-unused-vars
  // const { updateBtnSubmit = this.props
  updateBtnSubmit(
    <md-filled-button
      type="submit"
      className="app-main-content-login-form--submit"
      onClick={ApiGoogle.handleAuthClick}
    >
      Увійти
    </md-filled-button>
  )
}
