import { setupCommentForm } from "./commentForm"

type Comment = {
  username: string
  comment: string
  timestamp: Number
}

type CommentStore = Comment[]

const COMMENT_STORE_KEY = "blog_comments"

const addCommentToList = (username: string, comment: string) => {
  const commentList = document.getElementById("comment-list")
  if (!commentList) {
    console.error("Comment list element not found")
    return
  }

  // Split the comment into paragraphs and create an HTML paragraph element for each
  const paragraphs = comment
    .replace(/\n+/g, "\n")
    .split("\n")
    .map((paragraph) => {
      const paragraphEl = document.createElement("p")
      paragraphEl.classList.add("comment-paragraph")
      paragraphEl.classList.add("comment__text")
      const paragraphText = document.createTextNode(paragraph.trim())
      paragraphEl.appendChild(paragraphText)
      return paragraphEl
    })

  // Create a new list item for the comment
  const newComment = document.createElement("li")
  newComment.classList.add("comment")

  // Create a header section for the comment, including the username and timestamp
  const header = document.createElement("header")
  header.classList.add("comment-header")
  const usernameEl = document.createElement("p")
  usernameEl.classList.add("username")
  usernameEl.classList.add("comment__author")
  const usernameText = document.createTextNode(username)
  usernameEl.appendChild(usernameText)
  const timestampEl = document.createElement("time")
  timestampEl.classList.add("timestamp")
  timestampEl.classList.add("comment__date")
  timestampEl.setAttribute("datetime", new Date().toISOString())
  const timestampText = document.createTextNode("just now")
  timestampEl.appendChild(timestampText)
  header.appendChild(usernameEl)
  header.appendChild(timestampEl)

  // Add the paragraphs and header to the new list item, then add it to the comment list
  newComment.appendChild(header)
  paragraphs.forEach((paragraph) => {
    newComment.appendChild(paragraph)
  })
  commentList.appendChild(newComment)
}

const addCommentToStore = (
  username: string,
  comment: string,
  commentStore: CommentStore
) => {
  const timestamp = new Date().getTime()
  const newComment = { username, comment, timestamp }
  commentStore.push(newComment)
  localStorage.setItem(COMMENT_STORE_KEY, JSON.stringify(commentStore))
}

const removeCommentFromStore = (
  username: string,
  comment: string,
  commentStore: CommentStore
) => {
  const matchingComment = commentStore.find(
    (c: any) => c.username === username && c.comment === comment
  )
  if (matchingComment) {
    commentStore.splice(commentStore.indexOf(matchingComment), 1)
    localStorage.setItem(COMMENT_STORE_KEY, JSON.stringify(commentStore))
  }
}

const compareCommentsToStore = (
  commentList: HTMLElement,
  commentStore: CommentStore
) => {
  const listItems = Array.from(commentList.getElementsByTagName("li"))
  listItems.forEach((item: HTMLElement) => {
    const username = item.getElementsByTagName("strong")[0].innerText
    const comment = item.lastChild!.textContent!
    const matchingComment = commentStore.find(
      (c: any) => c.username === username && c.comment === comment
    )
    if (matchingComment) {
      removeCommentFromStore(username, comment, commentStore)
    }
  })
  commentStore.forEach((c: any) => addCommentToList(c.username, c.comment))
}

function updateTimestamps() {
  const now = new Date()

  const timestampEls = document.querySelectorAll(".timestamp")
  timestampEls.forEach((el) => {
    const datetimevalue = el.getAttribute("datetime")
    const datetime = datetimevalue ? new Date(datetimevalue) : now
    const diff = (now.getTime() - datetime.getTime()) / 1000

    if (diff < 60) {
      el.textContent = "just now"
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60)
      el.textContent = `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600)
      el.textContent = `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const dateStr = datetime.toLocaleDateString()
      el.textContent = dateStr
    }
  })
}
export const setupBlogComment = () => {
  const commentStore: CommentStore = JSON.parse(
    localStorage.getItem(COMMENT_STORE_KEY) || "[]"
  )

  const onSubmitSuccess = (
    fields: (HTMLInputElement | HTMLTextAreaElement)[]
  ) => {
    const usernameField = fields.find((f) => f.name === "name")
    const commentField = fields.find((f) => f.name === "message")
    if (!usernameField || !commentField) return

    addCommentToList(usernameField.value, commentField.value)
    addCommentToStore(usernameField.value, commentField.value, commentStore)
    usernameField.value = ""
    commentField.value = ""
  }

  const setupCommentList = () => {
    const commentList = document.getElementById("comment-list")
    if (!commentList) return
    compareCommentsToStore(commentList, commentStore)
    updateTimestamps()
  }

  setupCommentList()
  setupCommentForm(onSubmitSuccess)
}
