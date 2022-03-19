import { useState, useEffect } from "react";
import "./Dashboard.css";
export default function Dashboard() {
  const is_logged = localStorage.getItem("logged");
  const rftoken = localStorage.getItem("refresh_token");
  const token = localStorage.getItem("token");
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [errors, setErrors] = useState();
  const style = {
    width: "1000px",
    height: "400px",
    "background-color": "#1b1e21",
    color: "white",
  };
  const style2 = { padding: "20px" };
  const style3 = { padding: "10px", color: "rgb(173, 48, 48)" };
  return (
    <div>
      {is_logged ? (
        <div>
          <div className="fasgg">
            <h1>Dashboard</h1>
            <h2>Title: </h2>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              className="form-control"
              style={style}
              type="text"
              onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <input
              className="form-control"
              type="submit"
              value="Submit"
              onClick={async (e) => {
                e.preventDefault();
                await fetch("http://127.0.0.1:8080/v1/user/create_post", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify({
                    content: content,
                    title: title,
                  }),
                })
                  .then((resp) => resp.json())
                  .then(async (data) => {
                    if (data.status == "ok") {
                      window.location.href = "/posts";
                    } else {
                      setErrors(data.message);
                    }
                  });
              }}
            />
          </div>
          <p style={style3}>{errors}</p>
        </div>
      ) : (
        <div>
          <h1 style={style2}>Need to login.</h1>
        </div>
      )}
    </div>
  );
}
