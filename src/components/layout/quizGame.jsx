import React, { Component } from "react"
import BuilderHTMLStructure from "./builderHTMLStructure"

class QuizGame extends Component {
  constructor(props) {
    super(props)

    this.onClickHandlerLeaf = this.onClickHandlerLeaf.bind(this)

    this.state = {
      counterForm: 1,
    }
  }

  handleKeyPress(event) {
    // eslint-disable-next-line eqeqeq
    if (event.key == "Enter") {
      this.onClickHandlerLeaf("next")
    }
    return null
  }

  onClickHandlerLeaf = (value) => {
    const { counterForm } = this.state
    const { userData } = this.props

    if (value === "prev" && counterForm > 1) {
      this.setState((prevState) => ({ counterForm: prevState.counterForm - 1 }))
    }
    if (value === "next" && counterForm < userData.dataForm.result.items.length - 1) {
      this.setState((prevState) => ({ counterForm: prevState.counterForm + 1 }))
    }

    const input = document.querySelector("input")
    if (input) {
      document.querySelector("input").value = null
    }
  }

  render() {
    const { counterForm } = this.state
    const { userData } = this.props
    const { dataForm, onClick } = {
      dataForm: userData.dataForm,
    }

    const { title, description, questionItem } = dataForm.result.items[counterForm]
    const progressBarUpdate = Math.round((counterForm / dataForm.result.items.length) * 100)
    let currectQuestion
    const buttonCont = (
      <button
        type="button"
        onClick={() => onClick(document.querySelector("input").value)}
      >
        Send Answer
      </button>
    )
    Object.entries(questionItem.question)
      .reverse()
      // eslint-disable-next-line consistent-return
      .forEach(([key]) => {
        switch (key) {
          // make to component
          case "choiceQuestion":
            currectQuestion = questionItem.question.choiceQuestion.options.map((value, index) => (
              <div
                className="app-main-content-quiz-tests-content-elem"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => this.onClickHandlerLeaf("next")}
                onKeyUp={(e) => this.handleKeyPress(e)}
                role="button"
                tabIndex={0}
              >
                <div className="app-main-content-quiz-tests-content-elem--text">
                  {/* item.toString() */}
                  {Object.entries(value).map(([, item]) => item.toString())}
                </div>
              </div>
            ))
            break
          case "textQuestion":
            currectQuestion = (
              <div>
                {buttonCont}
                <input type="text" />
              </div>
            )
            break
          case "dateQuestion":
            currectQuestion = (
              <div>
                <input type="date" />
                {buttonCont}
              </div>
            )
            break
          case "ScaleQuestion":
            console.debug("don't work yet")
            break
          case "TimeQuestion ":
            console.debug("don't work yet")
            break
          case "RowQuestion":
            console.debug("don't work yet")
            break
          case "QuestionGroupItem":
            console.debug("don't work yet")
            break
          default:
            return null
        }
      })
    const contentValue = (
      <div className="app-main-content-quiz-tests">
        <span className="app-main-content-quiz-text--title">{title}</span>
        {description && (
          <span className="app-main-content-quiz-text--description">{description}</span>
        )}
        <div className="app-main-content-quiz-tests-content">{currectQuestion}</div>
      </div>
    )
    const footerValue = (
      <div className="app-main-footer">
        <div className="app-main-footer-buttons">
          <button
            className="app-main-footer-buttons-button--prev"
            type="button"
            onClick={() => {
              // console.log(`work`)
              this.onClickHandlerLeaf("prev")
            }}
          >
            prev
          </button>
          <span className="app-main-footer-button--counter">
            {counterForm}/{dataForm.result.items.length}
          </span>
          <button
            className="app-main-footer-buttons-button--next"
            type="button"
            onClick={() => this.onClickHandlerLeaf("next")}
          >
            next
          </button>
        </div>
      </div>
    )
    return (
      <BuilderHTMLStructure
        contentValue={contentValue}
        footerValue={footerValue}
        progressBarUpdate={progressBarUpdate}
        // eslint-disable-next-line react/destructuring-assignment
        secundomer={this.props.secundomer}
      />
    )
  }
}

export default QuizGame
