import { setupCommentForm } from "./commentForm";
import { onFontLoad } from "./fontLoad";
onFontLoad("Montserrat", function () { document.querySelector("html").classList.add("web-font"); });
setupCommentForm();
