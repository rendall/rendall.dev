export const setupCommentForm = (
  onSubmitSuccess?: (fields: (HTMLInputElement | HTMLTextAreaElement)[]) => void
) => {
  const hasCommentForm = document.querySelector("form[name]") !== null
  if (!hasCommentForm) {
    console.warn("No comment form found on page.")
    return
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValidField = (field: { name: string; value: string }): boolean => {
    switch (field.name) {
      case "name":
        return field.value != ""
      case "email":
        return emailRegex.test(field.value)
      case "message":
        return (
          field.value != "" &&
          field.value.length > 5 &&
          field.value.includes(" ")
        )
      case "form-name": {
        const formName = document
          .querySelector("form")!
          .attributes!.getNamedItem("name")!.value
        if (field.value !== formName)
          console.warn(
            `form-name field '${field.value}' does not equal form name '${formName}'`
          )
        return true // Invalidating a hidden field would confuse the user.
      }
      case "city":
        return true
      case "confirm":
        return true
      default: {
        console.warn(`unknown field name '${field.name}'`)
        return true // invalidating an unknown field would confuse the user
      }
    }
  }

  const sendMessage = (
    fields: { name: string; value: string }[],
    url: string
  ) => {
    const sendExec = (resolve: Function, reject: Function) => {
      const params = fields
        .map((f) => `${f.name}=${encodeURI(f.value)}`)
        .join("&")
      const sendReq = new XMLHttpRequest()
      const onSendComplete = (e: Event) =>
        sendReq.status === 200
          ? resolve()
          : reject(`${sendReq.status}:${sendReq.statusText}`)

      sendReq.open("POST", url)
      sendReq.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
      sendReq.timeout = 5000

      sendReq.addEventListener("load", onSendComplete)
      sendReq.send(params)
    }

    return new Promise(sendExec)
  }

  const showSuccess = () => {
    document.querySelector(".contain-form")!.classList.add("is-success")
    document.querySelector(".notify-success")!.classList.add("is-success")
    resetError()
  }

  const showError = (e: string) => {
    document.querySelector(".notify-error")!.classList.add("is-error")
    document.querySelector("#error-message")!.innerHTML = e
    console.error(e)
  }

  const showInvalid = (invalidFields: string[]) =>
    invalidFields
      .map((f) => document.querySelector(`label[for=${f}] + .notify-invalid`))
      .forEach((div) => div!.classList.add("is-invalid"))
  const resetState = (
    collection: HTMLCollectionOf<Element>,
    stateName: string,
    x: number = 0,
    dummy: any = null
  ): void | null =>
    collection.item(x) === null
      ? null
      : resetState(
          collection,
          stateName,
          x + 1,
          collection!.item(x)!.classList.remove(stateName)
        )

  const resetError = () => {
    resetState(document.getElementsByClassName("notify-error"), "is-error")
    document.querySelector("#error-message")!.innerHTML = ""
  }
  const onFormClick = (e: Event) => {
    e.preventDefault()

    resetState(document.getElementsByClassName("notify-invalid"), "is-invalid")
    const fields: (HTMLInputElement | HTMLTextAreaElement)[] = Array.from(
      document.querySelectorAll("form input,textarea")
    )
    const invalidFields = fields.reduce(
      (acc: string[], f) => (isValidField(f) ? acc : [...acc, f.name]),
      []
    )
    const isValid = invalidFields.length === 0

    if (isValid)
      sendMessage(fields, "/")
        .then(() => {
          showSuccess()
          if (onSubmitSuccess) onSubmitSuccess(fields)
        })
        .catch((error: string) => showError(error))
    else showInvalid(invalidFields)
  }

  document.querySelector("form button")!.addEventListener("click", onFormClick)

  console.info("Comment form setup complete")
}
