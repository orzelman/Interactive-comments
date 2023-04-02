const REPLY_SVG = `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
<path
  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
  fill="#5357B6"/>
</svg>`;
const container = document.getElementById("container");

function createCommentContent(comment) {
    const commentContent = document.createElement('div');
    commentContent.setAttribute('class', 'comment-content');
    commentContent.innerHTML = `
    <div class="comment-title">
        <div class="comment-title-left">
            <img src='${comment.user.image.png}'>
            <p class="user name">${comment.user.username}</p>
            <p class="date-update">${comment.createdAt}</p>
        </div>
        <div class="comment-title-right">${REPLY_SVG}
            <p class="reply">Reply</p>
        </div>
    </div>
    <div class="comment-content">${comment.content}</div>`;
    return commentContent;
}

function createCounter(comment) {
    const counterContainer = document.createElement('div');
    counterContainer.setAttribute('class', 'counter-container');
    const counter = document.createElement('div');
    counter.setAttribute('class', 'counter');
    counter.innerHTML = `
        <p class="plus-minus">+</p>
        <p class="counter-digit">${comment.score}</p>
        <p class="plus-minus">-</p>`;
    counterContainer.appendChild(counter);
    return counterContainer;
}

function createComment(comment) {
    const commentBody = document.createElement('div');
    commentBody.setAttribute('class', 'comment-body');
    commentBody.appendChild(createCounter(comment));
    commentBody.appendChild(createCommentContent(comment));
    return commentBody
}

function createLine() {
    const line = document.createElement('div');
    line.setAttribute('class', 'line');
    return line;
}

function createReply(reply) {
    const replyContainer = document.createElement('div');
    replyContainer.setAttribute('class', 'reply-container');
    replyContainer.appendChild(createComment(reply));
    return replyContainer;
}

function createReplies(replies) {
    const repliesWindow = document.createElement('div');
    repliesWindow.setAttribute('class', 'replies-window');
    const repliesContent = document.createElement('div');
    repliesContent.setAttribute('class', 'replies-content');;
    repliesWindow.appendChild(createLine());
    replies.forEach(reply => {
        const replyWindow = document.createElement('div');
        replyWindow.setAttribute('class', 'reply-window');
        repliesContent.appendChild(createReply(reply));
        if (Array.isArray(reply.replies)) {
            repliesContent.appendChild(createReplies(reply.replies));
        }
        repliesWindow.appendChild(repliesContent);
    })
    return repliesWindow;
}

function createCommentWindow(comment) {
    const commentWindow = document.createElement('div');
    commentWindow.setAttribute('class', 'comment-window');
    commentWindow.appendChild(createComment(comment));
    if (Array.isArray(comment.replies)) {
        commentWindow.appendChild(createReplies(comment.replies));
    }
    return commentWindow
}

fetch('data.json', { method: "POST" })
    .then(res => res.json())
    .then(data => {
        console.log(data.comments.find(obj => obj.id === 2).replies.find(obj => obj.id === 3));

        function showComments(comments) {
            if (Array.isArray(comments)) {
                const section = document.createElement('section');
                section.setAttribute('class', 'section')
                comments.forEach(comment => {
                    section.appendChild(createCommentWindow(comment));
                })
                container.appendChild(section);
            }
        }

        showComments(data.comments)
    })