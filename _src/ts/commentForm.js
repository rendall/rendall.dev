var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export var setupCommentForm = function (sendFunc) {
    var hasCommentForm = document.querySelector("form[name=contact]") !== null;
    if (!hasCommentForm)
        return;
    var emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidField = function (field) {
        switch (field.name) {
            case "name":
                return field.value != "";
            case "email":
                return emailRegex.test(field.value);
            case "message":
                return (field.value != "" &&
                    field.value.length > 5 &&
                    field.value.includes(" "));
            case "form-name": {
                var formName = document
                    .querySelector("form")
                    .attributes.getNamedItem("name").value;
                if (field.value !== formName)
                    console.warn("form-name field '" + field.value + "' does not equal form name '" + formName + "'");
                return true;
            }
            case "city":
                return true;
            case "confirm":
                return true;
            default: {
                console.warn("unknown field name '" + field.name + "'");
                return true;
            }
        }
    };
    var sendMessage = function (fields, url) {
        var sendExec = function (resolve, reject) {
            var params = fields
                .map(function (f) { return f.name + "=" + encodeURI(f.value); })
                .join("&");
            var sendReq = new XMLHttpRequest();
            var onSendComplete = function (e) {
                return sendReq.status === 200
                    ? resolve()
                    : reject(sendReq.status + ":" + sendReq.statusText);
            };
            sendReq.open("POST", url);
            sendReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            sendReq.timeout = 5000;
            sendReq.addEventListener("load", onSendComplete);
            sendReq.send(params);
        };
        return new Promise(sendExec);
    };
    var showSuccess = function () {
        document.querySelector(".contain-form").classList.add("is-success");
        document.querySelector(".notify-success").classList.add("is-success");
        resetError();
    };
    var showError = function (e) {
        document.querySelector(".notify-error").classList.add("is-error");
        document.querySelector("#error-message").innerHTML = e;
        console.error(e);
    };
    var showInvalid = function (invalidFields) {
        return invalidFields
            .map(function (f) { return document.querySelector("label[for=" + f + "] + .notify-invalid"); })
            .forEach(function (div) { return div.classList.add("is-invalid"); });
    };
    var resetState = function (collection, stateName, x, dummy) {
        if (x === void 0) { x = 0; }
        if (dummy === void 0) { dummy = null; }
        return collection.item(x) === null
            ? null
            : resetState(collection, stateName, x + 1, collection.item(x).classList.remove(stateName));
    };
    var resetError = function () {
        resetState(document.getElementsByClassName("notify-error"), "is-error");
        document.querySelector("#error-message").innerHTML = "";
    };
    var onFormClick = function (e) {
        e.preventDefault();
        resetState(document.getElementsByClassName("notify-invalid"), "is-invalid");
        var fields = Array.from(document.querySelectorAll("form input,textarea"));
        var invalidFields = fields.reduce(function (acc, f) { return (isValidField(f) ? acc : __spreadArrays(acc, [f.name])); }, []);
        var isValid = invalidFields.length === 0;
        var sendMessagePromise = sendFunc === undefined ? sendMessage : sendFunc;
        if (isValid)
            sendMessagePromise(fields, "/")
                .then(function () { return showSuccess(); })
                .catch(function (error) { return showError(error); });
        else
            showInvalid(invalidFields);
    };
    document.querySelector("form button").addEventListener("click", onFormClick);
    var onFormToggle = function (e) {
        e.preventDefault();
        var isSuccess = document
            .querySelector(".notify-success")
            .classList.contains("is-success");
        if (isSuccess) {
            document.querySelector(".contain-form").classList.remove("is-success");
            document.querySelector(".contain-form").classList.add("is-visible");
            document.querySelector(".notify-success").classList.remove("is-success");
            resetError();
        }
        else
            document.querySelector(".contain-form").classList.toggle("is-visible");
    };
};
