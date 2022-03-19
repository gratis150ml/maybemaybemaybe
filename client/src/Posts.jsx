import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Posts() {
  const is_logged = localStorage.getItem("logged");
  const is_admin = localStorage.getItem("admin");
  const style = { padding: "20px" };
  const [content, setContent] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/v1/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          const all = data.data;
          console.log(all);
          setContent(
            all.map((p) => (
              <>
                <div style={style} className="suha">
                  <Link to={"/post/" + p._id}>
                    <p>ID: {p._id}</p>
                  </Link>
                  <p>Owner: {p.owner}</p>
                  <p>Title: {p.title}</p>
                  {is_admin ? (
                    <div>
                      <Link
                        to={"/posts/"}
                        onClick={async (e) => {
                          e.preventDefault();
                          await fetch(
                            "http://localhost:8080/v1/post/delete/" + p._id,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: token,
                              },
                            }
                          );
                          window.location.href = "/posts";
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <br />
              </>
            ))
          );
        });
    }
  }, []);
  return (
    <div>
      {is_logged ? (
        <>
          <h1 style={style}>All posts</h1>
          <div style={style}>{content}</div>
        </>
      ) : (
        <div>
          <h1 style={style}>Need to login.</h1>
        </div>
      )}
    </div>
  );
}
