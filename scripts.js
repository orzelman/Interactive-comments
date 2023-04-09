function activeEvents() {

    function hideNewReply() {
        const newReplyWindows = document.querySelectorAll('.new-reply');
        newReplyWindows.forEach(window => {
            window.style.height = 0;
            window.style.padding = 0;
        });
    }
    function showNewReplyWindow(event) {
        const newReplyParent = event.target.closest('.comment-body').parentElement;
        const newReply = newReplyParent.querySelector('.new-reply');
        newReply.style.height = 100 + 'px';
        newReply.style.padding = `10px 20px`;
    }

    const iconReply = document.querySelectorAll('.icon-reply');
    iconReply.forEach(item => {
        item.addEventListener('click', (event) => {
            hideNewReply();
            showNewReplyWindow(event);

        })
    });


}