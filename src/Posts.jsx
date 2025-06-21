import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="my-3 post-card">
             <div className="dp d-flex align-items-center my-2">
              <img
                src={post.user.profile_pic}
                alt="profile"
                style={{ width: "40px", borderRadius: "50%" }}
              />
              <h3 style={{ marginLeft: "10px" }}>{post.user.username}</h3>
            </div>
            <div>
              <img
                className="image"
                src={post.image}
                alt="post"
                style={{ width: "300px" }}
              />
            </div>
            <p>{post.caption}</p>
            <div>
              <i className="bi bi-heart"></i> <span>Like</span>
              <i
                className="bi bi-chat mx-3"
                style={{ cursor: "pointer" }}
                onClick={() => toggleComments(post.id)}
              ></i>
              <span>Comment</span>
              <i className="bi bi-send-fill mx-3"></i> <span>Share</span>
            </div>
            <strong>120 Likes</strong>

            {showComments[post.id] && (
              <div className="mt-2">
                {post.comments.map((comment, index) => (
                  <p key={index}>
                    <b>{comment.user}</b>: {comment.comment}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
