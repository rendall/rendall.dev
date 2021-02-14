(() => {
  "use strict";
  !(function (e) {
    if (null !== document.querySelector("form[name=contact]")) {
      var n = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        t = function (e, n) {
          return new Promise(function (t, r) {
            var o = e
                .map(function (e) {
                  return e.name + "=" + encodeURI(e.value);
                })
                .join("&"),
              u = new XMLHttpRequest();
            u.open("POST", n),
              u.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
              ),
              (u.timeout = 5e3),
              u.addEventListener("load", function (e) {
                return 200 === u.status
                  ? t()
                  : r(u.status + ":" + u.statusText);
              }),
              u.send(o);
          });
        },
        r = function (e, n, t, o) {
          return (
            void 0 === t && (t = 0),
            void 0 === o && (o = null),
            null === e.item(t)
              ? null
              : r(e, n, t + 1, e.item(t).classList.remove(n))
          );
        };
      document
        .querySelector("form button")
        .addEventListener("click", function (e) {
          e.preventDefault(),
            r(document.getElementsByClassName("notify-invalid"), "is-invalid");
          var o = Array.from(document.querySelectorAll("form input,textarea")),
            u = o.reduce(function (e, t) {
              return (function (e) {
                switch (e.name) {
                  case "name":
                    return "" != e.value;
                  case "email":
                    return n.test(e.value);
                  case "message":
                    return (
                      "" != e.value &&
                      e.value.length > 5 &&
                      e.value.includes(" ")
                    );
                  case "form-name":
                    var t = document
                      .querySelector("form")
                      .attributes.getNamedItem("name").value;
                    return (
                      e.value !== t &&
                        console.warn(
                          "form-name field '" +
                            e.value +
                            "' does not equal form name '" +
                            t +
                            "'"
                        ),
                      !0
                    );
                  case "city":
                  case "confirm":
                    return !0;
                  default:
                    return (
                      console.warn("unknown field name '" + e.name + "'"), !0
                    );
                }
              })(t)
                ? e
                : (function () {
                    for (var e = 0, n = 0, t = arguments.length; n < t; n++)
                      e += arguments[n].length;
                    var r = Array(e),
                      o = 0;
                    for (n = 0; n < t; n++)
                      for (
                        var u = arguments[n], a = 0, c = u.length;
                        a < c;
                        a++, o++
                      )
                        r[o] = u[a];
                    return r;
                  })(e, [t.name]);
            }, []);
          0 === u.length
            ? t(o, "/")
                .then(function () {
                  return (
                    document
                      .querySelector(".contain-form")
                      .classList.add("is-success"),
                    document
                      .querySelector(".notify-success")
                      .classList.add("is-success"),
                    r(
                      document.getElementsByClassName("notify-error"),
                      "is-error"
                    ),
                    void (document.querySelector("#error-message").innerHTML =
                      "")
                  );
                })
                .catch(function (e) {
                  return (function (e) {
                    document
                      .querySelector(".notify-error")
                      .classList.add("is-error"),
                      (document.querySelector("#error-message").innerHTML = e),
                      console.error(e);
                  })(e);
                })
            : (function (e) {
                e.map(function (e) {
                  return document.querySelector(
                    "label[for=" + e + "] + .notify-invalid"
                  );
                }).forEach(function (e) {
                  return e.classList.add("is-invalid");
                });
              })(u);
        });
    }
  })();
})();
//# sourceMappingURL=home.js.map
