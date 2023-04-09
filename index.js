const REPLY_SVG = `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
<path
  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
  fill="#5357B6"/>
</svg>`;
const EDIT_SVG = `<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>`;
const DELETE_SVG = `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>`;
const container = document.getElementById("container");

function hideNewReply() {
    const newReplyWindows = document.querySelectorAll('.new-reply');
    newReplyWindows.forEach(window => {
        window.style.height = 0;
        window.style.padding = 0;
    });
};
function showNewReplyWindow(event) {
    const newReplyParent = event.target.closest('.comment-body').parentElement;
    const newReply = newReplyParent.querySelector('.new-reply');
    newReply.style.height = 100 + 'px';
    newReply.style.padding = `10px 20px`;
};
function sendNewReply() {

    fetch('./data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(data => data.json())
        .then(data => console.log('success'));
}

function createCommentContent(comment, currentUser) {
    let icons = '';
    let author = `<p>${comment.user.username}</p>
                  `
    if (currentUser === comment.user.username) {
        author += `<p class='you'>you</p>`;
        icons = `<span class="icon icon-delete">${DELETE_SVG}Delete</span> 
                 <span class="icon icon-edit">${EDIT_SVG} Edit</span>`;
    }
    else {
        icons = `<span class="icon icon-reply">${REPLY_SVG}Reply</span>`;
    }
    author += `<p class=date-update>${comment.createdAt}`
    const commentContent = document.createElement('div');
    commentContent.setAttribute('class', 'comment-content');
    const commentTitle = document.createElement('div');
    commentTitle.setAttribute('class', 'comment-title');
    const commentTitleLeft = document.createElement('div');
    const imgUser = document.createElement('img');
    imgUser.setAttribute('src', comment.user.image.png);
    const pUserName = document.createElement('p');
    pUserName.setAttribute('class', 'user-name');
    pUserName.appendChild(imgUser);
    pUserName.innerHTML += author;
    commentTitleLeft.appendChild(imgUser);
    commentTitle.appendChild(pUserName);

    const commentTitleRight = document.createElement('div');
    commentTitleRight.setAttribute('class', 'comment-title-right');
    commentTitleRight.innerHTML = icons;
    commentTitle.appendChild(commentTitleRight);

    const commentText = document.createElement('p');
    commentText.setAttribute('class', 'comment-content');
    commentText.textContent = comment.content;
    commentContent.appendChild(commentTitle);
    commentContent.appendChild(commentText);

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

function createComment(comment, currentUser) {
    const commentBody = document.createElement('div');
    commentBody.setAttribute('class', 'comment-body');
    commentBody.appendChild(createCounter(comment));
    commentBody.appendChild(createCommentContent(comment, currentUser));
    return commentBody
}

function createLine() {
    const line = document.createElement('div');
    line.setAttribute('class', 'line');
    return line;
}

function createReply(reply, currentUser) {
    const replyContainer = document.createElement('div');
    replyContainer.setAttribute('class', 'reply-container');
    replyContainer.appendChild(createComment(reply, currentUser));
    replyContainer.appendChild(creatNewReply(reply, currentUser));
    return replyContainer;
}

function createReplies(replies, currentUser) {
    const repliesWindow = document.createElement('div');
    repliesWindow.setAttribute('class', 'replies-window');
    const repliesContent = document.createElement('div');
    repliesContent.setAttribute('class', 'replies-content');;
    repliesWindow.appendChild(createLine());
    replies.forEach(reply => {
        const replyWindow = document.createElement('div');
        replyWindow.setAttribute('class', 'reply-window');
        repliesContent.appendChild(createReply(reply, currentUser));
        if (Array.isArray(reply.replies)) {
            repliesContent.appendChild(createReplies(reply.replies, currentUser));
        }
        repliesWindow.appendChild(repliesContent, currentUser);
    })
    return repliesWindow;
}

function creatNewReply(comment, currentUser) {
    const newReply = document.createElement('div');
    newReply.setAttribute('class', 'new-reply');
    const imgUser = document.createElement('img');
    imgUser.setAttribute('src', `./images/avatars/image-${currentUser}.png`);
    const newReplyContent = document.createElement('div');
    newReplyContent.setAttribute('class', 'new-reply-content');
    newReplyContent.innerHTML = `
    <textarea></textarea>`;
    const bigReply = document.createElement('div');
    bigReply.setAttribute('class', 'big-button reply-button');
    bigReply.textContent = 'REPLY';
    newReply.appendChild(imgUser);
    newReply.appendChild(newReplyContent);
    newReply.appendChild(bigReply);
    return newReply;
}

function createCommentWindow(comment, currentUser) {
    const commentWindow = document.createElement('div');
    commentWindow.setAttribute('class', 'comment-window');
    commentWindow.appendChild(createComment(comment, currentUser));
    commentWindow.appendChild(creatNewReply(comment, currentUser));
    if (Array.isArray(comment.replies)) {
        commentWindow.appendChild(createReplies(comment.replies, currentUser));
    }
    return commentWindow
}

fetch('data.json', { method: "POST" })
    .then(res => res.json())
    .then(data => {
        function showComments(comments, currentUser) {
            if (Array.isArray(comments)) {
                const section = document.createElement('section');
                section.setAttribute('class', 'section')
                comments.forEach(comment => {
                    section.appendChild(createCommentWindow(comment, currentUser));
                })
                container.appendChild(section);
            }
        };
        showComments(data.comments, data.currentUser.username);


        const iconReply = document.querySelectorAll('.icon-reply');
        iconReply.forEach(item => {
            item.addEventListener('click', (event) => {
                hideNewReply();
                showNewReplyWindow(event);

            })
        });
        const bigButton = document.querySelectorAll('.big-button.reply-button');
        console.log(bigButton);
        bigButton.forEach(item => {
            item.addEventListener('click', event => console.log(event.target.closest('new-reply-content')));
        })


    })