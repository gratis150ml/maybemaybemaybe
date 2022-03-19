import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Post() {
  const is_logged = localStorage.getItem("logged");
  const token = localStorage.getItem("token");
  const [content, setContent] = useState();
  const { id } = useParams();
  const style = {
    padding: "20px",
    border: "0.5px solid rgb(131, 129, 129)",
    "border-radius": "6px",
    width: "400px",
  };
  const style2 = { padding: "20px" };
  useEffect(() => {
    fetch("http://127.0.0.1:8080/v1/post/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const all = data.data;
        console.log(all);
        setContent(
          <div style={style2}>
            <div style={style}>
              <p>Owner: {all.owner}</p>
              <p>Title: {all.title}</p>
              <p>Content: {all.content}</p>
              <p>Views: {all.views}</p>
              <p>Likes: {all.likes}</p>
              <p>Dislikes: {all.dislikes}</p>
              <p>Updated at: {all.updatedAt}</p>
              <p>Created at: {all.createdAt}</p>
              <p>Replys: {all.replys}</p>
            </div>
          </div>
        );
      })
      .catch(setContent(<p style={style2}>404 Not Found</p>));
  }, []);
  return <>{content}</>;
}
