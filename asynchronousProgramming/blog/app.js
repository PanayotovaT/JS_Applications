const viewBtn = document.getElementById('btnViewPost');

function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    viewBtn.addEventListener('click', displayPost);
    viewBtn.disabled = true;


}

attachEvents();

async function getPosts() {

    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();
    const select = document.getElementById('posts');
    select.innerHTML = '';
    viewBtn.disabled = false;

    Object.values(data).map(createOption).forEach(o => select.appendChild(o));
}

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;

    return result;
}

function displayPost() {
    const postId = document.getElementById('posts').value;
    getCommentsById(postId);
    
}
async function getCommentsById(postId) {
    
    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';

    const commentUrl = 'http://localhost:3030/jsonstore/blog/comments';
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const [postResponse, commentsResonse] = await Promise.all([
        fetch(postUrl),
        fetch(commentUrl)
    ])

    const postData = await postResponse.json();
    console.log(postData);

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const commentsData = await commentsResonse.json();

    const comments = Object.values(commentsData).filter(c => c.postId == postId);

    comments.map(createComment).forEach(c => commentsUl.appendChild(c));
    
}

function createComment(comment) {
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}