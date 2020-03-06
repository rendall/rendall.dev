export const setupCommentForm = (sendFunc?:any) => {

    const hasCommentForm = document.querySelector('form[name=contact]') !== null;
    if (!hasCommentForm) return;

    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValidField = (field: { name: string, value: string }): boolean => {
        switch (field.name) {
            case "name": return field.value != ""
            case "email": return emailRegex.test(field.value)
            case "message": return field.value != "" && field.value.length > 5 && field.value.includes(" ")
            case "form-name": {
                const formName = document.querySelector('form')!.attributes!.getNamedItem('name')!.value
                if (field.value !== formName) console.warn(`form-name field '${field.value}' does not equal form name '${formName}'`)
                return true // Invalidating a hidden field would confuse the user.
            }
            case "city": return true;
            case "confirm": return true
            default: {
                console.warn(`unknown field name '${field.name}'`)
                return true // invalidating an unknown field would confuse the user
            }
        }
    }

    const sendMessage = (fields: { name: string, value: string }[], url: string) => {
        const sendExec = (resolve: Function, reject: Function) => {
            const params = fields.map(f => `${f.name}=${encodeURI(f.value)}`).join('&')
            const sendReq = new XMLHttpRequest()
            const onSendComplete = (e: Event) => sendReq.status === 200 ? resolve() : reject(`${sendReq.status}:${sendReq.statusText}`)

            sendReq.open('POST', url)
            sendReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            sendReq.timeout = 5000

            sendReq.addEventListener('load', onSendComplete)
            sendReq.send(params)
        }

        return new Promise(sendExec)
    }

    const showSuccess = () => {
        document.querySelector('.contain-form')!.classList.add('is-success')
        document.querySelector('.notify-success')!.classList.add('is-success')
        resetError()
        // console.log('success')
    }

    const showError = (e: string) => {
        document.querySelector('.notify-error')!.classList.add('is-error')
        document.querySelector('#error-message')!.innerHTML = e
        console.error(e)
    }

    const showInvalid = (invalidFields: string[]) => invalidFields.map(f => document.querySelector(`label[for=${f}] + .notify-invalid`)).forEach(div => div!.classList.add('is-invalid'))
    const resetState = (collection: HTMLCollectionOf<Element>, stateName: string, x: number = 0, dummy: any = null): void | null => collection.item(x) === null ? null : resetState(collection, stateName, x + 1, collection!.item(x)!.classList.remove(stateName))

    const resetError = () => {
        resetState(document.getElementsByClassName('notify-error'), 'is-error')
        document.querySelector('#error-message')!.innerHTML = ""

    }
    const onFormClick = (e: Event) => {
        e.preventDefault()

        resetState(document.getElementsByClassName('notify-invalid'), 'is-invalid')
        const fields: (HTMLInputElement | HTMLTextAreaElement)[] = Array.from(document.querySelectorAll('form input,textarea'))
        const invalidFields = fields.reduce((acc: string[], f) => isValidField(f) ? acc : [...acc, f.name], [])
        const isValid = invalidFields.length === 0
        const sendMessagePromise = sendFunc === undefined? sendMessage : sendFunc

        if (isValid) sendMessagePromise(fields, '/')
            .then(() => showSuccess())
            .catch((error:string) => showError(error))

        else showInvalid(invalidFields)
    }

    document.querySelector('form button')!.addEventListener('click', onFormClick)

    // The CSS-only 'hidden checkbox button toggle' hack does not play well with a11y.
    // It is more important that the site is navigable by keyboard than it do interesting things without javascript.
    const onFormToggle = (e: Event) => {
        e.preventDefault()
        const isSuccess = document.querySelector('.notify-success')!.classList.contains('is-success')

        if (isSuccess) {
            document.querySelector('.contain-form')!.classList.remove('is-success')
            document.querySelector('.contain-form')!.classList.add('is-visible')
            document.querySelector('.notify-success')!.classList.remove('is-success')
            resetError()
        }
        else document.querySelector('.contain-form')!.classList.toggle('is-visible')
    }

    // document.querySelector('#form-toggle')!.addEventListener('click', onFormToggle)

    // To include those browsers that do not use js, the form is visible by default and hidden with javascript.
    // document.querySelector('.contain-form').classList.remove('is-visible')
}