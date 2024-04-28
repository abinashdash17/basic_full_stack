import { useState, useEffect, useRef } from "react";
const BasicPost = () => {
  const [posts, setPosts] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const post_name = useRef();
  const post_content = useRef();
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    fetch("http://localhost:5000/new_post", {
      method: "post",
      body: JSON.stringify({
        post_name: post_name.current.value,
        post_content: post_content.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      setFormSubmitted(true);
    });
    console.log("data submitted");
  };
  useEffect(() => {
    if (formSubmitted) {
      fetch("http://localhost:5000/posts")
        .then((res) => res.json())
        .then((json) => {
          setPosts(json);
          // console.log(posts);
        });
      setFormSubmitted(false);
    }
  }, [formSubmitted]);
  return (
    <>
      <h1>all posts</h1>
      <ul>
        {posts === null && <div>No new posts</div>}
        {posts &&
          posts.length > 1 &&
          posts.map((post) => (
            <li key={post.post_name}>
              <h2 className="text-2xl">{post.post_name}</h2>
              <span>{post.post_content}</span>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={post_name}
          className="rounded-lg border-2 w-20"
          name="post_name"
        ></input>
        <input
          type="text"
          ref={post_content}
          className="rounded-lg border-2 w-20"
          name="post_content"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default BasicPost;
