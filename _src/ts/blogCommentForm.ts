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

  const newComment = document.createElement("li")
  newComment.innerHTML = `<strong>${username}</strong>: ${comment}`
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
  }

  setupCommentList()
  setupCommentForm(onSubmitSuccess)
}
