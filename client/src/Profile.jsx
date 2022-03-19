import "./Profile.css";
import { useState, useEffect } from "react";
export default function Profile() {
  const [content, setContent] = useState(
    <div class="text-center">
      <div class="spinner-border"></div>
    </div>
  );
  const is_logged = localStorage.getItem("logged");
  const rftoken = localStorage.getItem("refresh_token");
  const token = localStorage.getItem("token");
  const [errors2, setErrors2] = useState();
  const [id, setID] = useState();
  const [email, setEmail] = useState();
  const [is_banned, setIs_banned] = useState();
  const [rank, setRank] = useState();
  const [username2, setUsername2] = useState();
  const [desc, setDesc] = useState();
  const [desc2, setDesc2] = useState();
  const style = { color: "#dd3e3e" };
  const style2 = { padding: "20px" };
  useEffect(() => {
    const opt = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    fetch("http://127.0.0.1:8080/v1/user/info", opt)
      .then((resp) => resp.json())
      .then((data) => {
        setID(data.data._id);
        setEmail(data.data.email);
        setIs_banned(data.data.is_banned);
        setRank(data.data.rank);
        setUsername2(data.data.username);
        setDesc(data.data.description);
      });
  }, []);
  return (
    <div>
      {is_logged ? (
        <div className="profile">
          <h1>Profile</h1>
          <p>ID: {id}</p>
          <p>Username: {username2}</p>
          <p>Email: {email}</p>
          <p>is_banned: {is_banned === true ? "true" : "false"}</p>
          <p>Rank: {rank === 0 ? "normal" : "high"}</p>
          <p>Description: {desc}</p>
          <div className="div3">
            <label to="text">Change description</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setDesc2(e.target.value)}
            />
            <br />
            <input
              className="form-control"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const opt = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify({
                    description: desc2,
                  }),
                };
                fetch("http://127.0.0.1:8080/v1/user/change_description", opt)
                  .then((resp) => resp.json())
                  .then((data) => {
                    if (data.status == "ok") {
                      window.location.href = "/profile";
                    } else {
                      setErrors2(data.message);
                    }
                  });
              }}
            />
          </div>
          <br />
          <p style={style}>{errors2}</p>
        </div>
      ) : (
        <div>
          <h1 style={style2}>Need to login.</h1>
        </div>
      )}
    </div>
  );
}
