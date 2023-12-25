import { defaultFormOptions } from "./options/"
import { getFieldType } from "./lib"

export class Form {
  /**
   * @param { defaultFormOptions } options
   */
  constructor(options) {
    this.options = { ...defaultFormOptions, ...options }

    /** @type { HTMLFormElement } */
    this.$form =
      this.options.form instanceof HTMLElement
        ? this.options.form
        : document.querySelector(this.options.form)

    this.action = this.$form.getAttribute("action")
    this.method = this.$form.getAttribute("method") || "GET"

    /** @type { FormField[] } */
    this.fields = Array
      .from(this.$form.querySelectorAll(this.options.fieldSelector))
      .map(($field, index) => getFieldType(this, $field, index))

    /** @type { FormField[] | [] } */
    this.invalidFields = []

    /** @type { boolean } */
    this.isValid = false
    /** @type { boolean } */
    this.isDirty = false

    /**
     * @type FormData
     */
    this.data = new FormData()

    this.#init()
  }

  #init() {
    this.$form.setAttribute("novalidate", "novalidate")

    this.$form.addEventListener("submit", this.submitHandle)
  }

  #sendReq() {
    const xhr = new XMLHttpRequest()
    xhr.open(this.method, this.action)

    xhr.onreadystatechange = () => {
      if (xhr.status >= 400) {
        console.error("Request with error")
        return
      }

      console.log("Request is success")
      this.reset()
    }

    this.data = new FormData(this.$form)

    xhr.send(this.data)
  }

  submitHandle = (event) => {
    event.preventDefault()
    this.invalidFields = []
    this.isDirty = true

    this.validate()

    if (this.isValid) {
      this.#sendReq()
    } else {
      console.warn("Validation error", this.invalidFields)
    }
  }

  validate() {
    this.isValid = true

    this.invalidFields = this.fields.filter((field) => {
      field.validate()

      return !field.validationStatus
    })
  }

  reset() {
    this.$form.reset()
    this.isDirty = false

    this.fields.forEach((field) => field.reset())
  }
}