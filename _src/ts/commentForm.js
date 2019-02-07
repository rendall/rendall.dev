export const setupCommentForm = (sendFunc) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidField = (field) => {
        switch (field.name) {
            case "name": return field.value != "";
            case "email": return emailRegex.test(field.value);
            case "message": return field.value != "";
            case "form-name": {
                const formName = document.querySelector('form').attributes.getNamedItem('name').value;
                if (field.value !== formName)
                    console.warn(`form-name field '${field.value}' does not equal form name '${formName}'`);
                return true;
            }
            case "confirm": return true;
            default: {
                console.warn(`unknown field name '${field.name}'`);
                return true;
            }
        }
    };
    const sendMessage = (fields, url) => {
        const sendExec = (resolve, reject) => {
            const params = fields.map(f => `${f.name}=${encodeURI(f.value)}`).join('&');
            const sendReq = new XMLHttpRequest();
            const onSendComplete = (e) => sendReq.status === 200 ? resolve() : reject(`${sendReq.status}:${sendReq.statusText}`);
            sendReq.open('POST', url);
            sendReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            sendReq.timeout = 5000;
            sendReq.addEventListener('load', onSendComplete);
            sendReq.send(params);
        };
        return new Promise(sendExec);
    };
    const showSuccess = () => {
        document.querySelector('.contain-form').classList.add('is-success');
        document.querySelector('.notify-success').classList.add('is-success');
        resetError();
        console.log('success');
    };
    const showError = (e) => {
        document.querySelector('.notify-error').classList.add('is-error');
        document.querySelector('#error-message').innerHTML = e;
        console.error(e);
    };
    const showInvalid = (invalidFields) => invalidFields.map(f => document.querySelector(`label[for=${f}] + .notify-invalid`)).forEach(div => div.classList.add('is-invalid'));
    const resetState = (collection, stateName, x = 0, dummy = null) => collection.item(x) === null ? null : resetState(collection, stateName, x + 1, collection.item(x).classList.remove(stateName));
    const resetError = () => {
        resetState(document.getElementsByClassName('notify-error'), 'is-error');
        document.querySelector('#error-message').innerHTML = "";
    };
    const onFormClick = (e) => {
        e.preventDefault();
        resetState(document.getElementsByClassName('notify-invalid'), 'is-invalid');
        const fields = Array.from(document.querySelectorAll('form input,textarea'));
        const invalidFields = fields.reduce((acc, f) => isValidField(f) ? acc : [...acc, f.name], []);
        const isValid = invalidFields.length === 0;
        const sendMessagePromise = sendFunc === undefined ? sendMessage : sendFunc;
        if (isValid)
            sendMessagePromise(fields, '/')
                .then(() => showSuccess())
                .catch((error) => showError(error));
        else
            showInvalid(invalidFields);
    };
    document.querySelector('form button').addEventListener('click', onFormClick);
    const onFormToggle = (e) => {
        e.preventDefault();
        const isSuccess = document.querySelector('.notify-success').classList.contains('is-success');
        if (isSuccess) {
            document.querySelector('.contain-form').classList.remove('is-success');
            document.querySelector('.contain-form').classList.add('is-visible');
            document.querySelector('.notify-success').classList.remove('is-success');
            resetError();
        }
        else
            document.querySelector('.contain-form').classList.toggle('is-visible');
    };
    document.querySelector('#form-toggle').addEventListener('click', onFormToggle);
};
