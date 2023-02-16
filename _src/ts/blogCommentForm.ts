/** Give the illusion that the Netlify Form is a commenting system! */
import { setupCommentForm } from "./commentForm"

type Comment = {
  author: string
  comment: string
  post: string
  timestamp: number
}

type CommentStore = Comment[]

const COMMENT_STORE_KEY = "blog_comments"

/** Comment added only to local view and not to the server */
const addCommentToList = (
  author: string,
  comment: string,
  datetime: number
) => {
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
      paragraphEl.classList.add("comment__text")
      const paragraphText = document.createTextNode(paragraph.trim())
      paragraphEl.appendChild(paragraphText)
      return paragraphEl
    })

  // Create a new list item for the comment
  const newComment = document.createElement("li")
  newComment.classList.add("comment")

  // Create a header section for the comment, including the author and timestamp
  const header = document.createElement("header")
  header.classList.add("comment__header")
  const authorEl = document.createElement("p")
  authorEl.classList.add("comment__author")
  const authorText = document.createTextNode(author)
  authorEl.appendChild(authorText)
  const timestampEl = document.createElement("time")
  timestampEl.classList.add("comment__date")
  timestampEl.setAttribute("datetime", `${datetime}`)
  const timestampText = document.createTextNode(
    new Date(datetime).toLocaleDateString()
  )
  timestampEl.appendChild(timestampText)
  header.appendChild(authorEl)
  header.appendChild(timestampEl)

  // Add the paragraphs and header to the new list item, then add it to the comment list
  newComment.appendChild(header)
  paragraphs.forEach((paragraph) => {
    newComment.appendChild(paragraph)
  })
  commentList.appendChild(newComment)
}

const addCommentToLocalStore = (
  author: string,
  comment: string,
  post: string,
  commentStore: CommentStore
) => {
  const timestamp = new Date().getTime()
  const newComment: Comment = { author, comment, post, timestamp }
  const newStore: CommentStore = [...commentStore, newComment]
  localStorage.setItem(COMMENT_STORE_KEY, JSON.stringify(newStore))
}

/** Replace the local store */
const overwriteCommentStore = (commentStore: CommentStore) =>
  commentStore && commentStore?.length > 0
    ? localStorage.setItem(COMMENT_STORE_KEY, JSON.stringify(commentStore))
    : localStorage.removeItem(COMMENT_STORE_KEY)

/** Display comments that are in the local store but are not in the updated, static comment list. Return those comments */
const refreshLocalCommentList = (
  commentList: HTMLUListElement,
  postComments: CommentStore
) => {
  const lastUpdatedRaw = commentList.dataset.lastupdated ?? "0"
  const lastUpdated = parseInt(lastUpdatedRaw)

  const unaddressedComments = postComments.filter(
    (c) => c.timestamp > lastUpdated
  )
  unaddressedComments.forEach((c: Comment) =>
    addCommentToList(c.author, c.comment, c.timestamp)
  )

  return unaddressedComments
}

/** Adds functionality to Netlify Forms that will display the submission as a comment on the page */
export const setupBlogComment = () => {
  const commentStore: CommentStore = JSON.parse(
    localStorage.getItem(COMMENT_STORE_KEY) || "[]"
  )

  const onSubmitSuccess = (
    fields: (HTMLInputElement | HTMLTextAreaElement)[]
  ) => {
    const authorField = fields.find((f) => f.name === "name")
    const commentField = fields.find((f) => f.name === "message")
    const formNameField = fields.find((f) => f.name === "form-name")
    if (!authorField || !commentField || !formNameField) return

    addCommentToList(
      authorField.value,
      commentField.value,
      new Date().getTime()
    )

    addCommentToLocalStore(
      authorField.value,
      commentField.value,
      formNameField.value,
      commentStore
    )
    authorField.value = ""
    commentField.value = ""
  }

  const setupCommentList = () => {
    const commentList = document.getElementById(
      "comment-list"
    ) as HTMLUListElement
    if (!commentList) return

    const post = commentList.getAttribute("name")

    const postComments = commentStore.filter((c) => c.post === post)
    const otherComments = commentStore.filter((c) => c.post !== post)
    const remainingComments = refreshLocalCommentList(commentList, postComments)

    console.log({ post, postComments, otherComments })

    overwriteCommentStore([...otherComments, ...remainingComments])
  }

  setupCommentList()
  setupCommentForm(onSubmitSuccess, (_, fields) => onSubmitSuccess(fields))
}
