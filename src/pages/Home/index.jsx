import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import chat from '../../assets/chat-bubble.svg';
import './style.less';
import Comment from '../../components/Comment';
import LargePost from '../../components/LargePost';
import Post from '../../components/Post';
import {useState} from 'react';

function Home() {
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState("");
    const [postList, setPostList] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const checkSubmission = (e) => {
        if (e.key === 'Enter') {
            fetch('https://localhost/5000/comment', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    comment: comment
                })
            })
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }

    fetch('https://localhost/5000')
    .then(response => response.json())
    .then(data => setPostList(data));

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} alt="logo"/>
            <p>Logout</p>
        </header>
            <div className="App-body">
                <div className="App-left">
                    <div className="search-create-div">
                        <div className="search">
                            <img src={search} alt="search"/>
                            <input type="text" placeholder="Search" />
                        </div>
                        <div className="create" onClick={() => {window.location.href = "/create-post"}}>
                            <img src={chat} alt="chat"/>
                            Create Post
                        </div>
                    </div>
                    <Post username="Rinsworth" title="Your Name"/>
                    <Post username="sqirley" title="Haikyuu"/>
                    {postList
                    .map((post, index) => (
                    <Post
                        username={post.username}
                        title={post.title}
                        onClick={() => {setSelectedPost(post)}}
                        selected={post.uuid === selectedPost.uuid}
                    />
                    ))}
                </div>
                {selectedPost && <div className="App-right">
                    <div className="post-comment-div">
                        <LargePost username={username} title={selectedPost.title} body={selectedPost.content} spoiler={selectedPost.isSpoiler}/>
                        <div className="blank"></div>
                        {/* <Comment username="sqirley" comment="that movie was cool"/> */}
                        {selectedPost.comments.map((comment, index) => (
                            <Comment username={comment.username} comment={comment.content} spoiler={comment.isSpoiler}/>
                        ))}
                    </div>
                    <div className="message">
                        <input type="text" placeholder="Comment Here" value={comment} onChange={e => setComment(e.target.value)} onKeyDown={checkSubmission} />
                    </div>
                </div>}
                {!selectedPost && <div className="App-right"></div>}
            </div>
        </div>
    );
}

export default Home;