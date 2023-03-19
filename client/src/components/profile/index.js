import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function Profile(props) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  const getFiles = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const { data } = await axios.get("/getfiles", config);
      setFiles(data);
    } catch (err) {
      alert("Some Error Occured while getting files");
    }
  };

  const downloadfile = async (filename) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const res = await axios.post("/download", { filename }, config);
      alert(res.data);
    } catch (err) {
      alert("Some error occured while downloading file");
    }
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadToCloud = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      await axios.post("/uploadfile", formData, config);
      alert("File Uploaded");
    } catch (err) {
      alert("Problem occured while uploading the file");
    }
  };

  useEffect(() => {
    if (props.auth.authData) {
      setAuthenticated(true);
      const items = JSON.parse(localStorage.getItem("user_info"));
      if (items) {
        setUserData(items);
      }
    } else {
      setAuthenticated(false);
    }
  }, [props.auth]);

  function handleLogOut(e) {
    e.preventDefault();

    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <div className="container">
      <div>
        {authenticated ? (
          <div>
            <div className="header">
              <h3 className="heading">FileApp</h3>

              <div>
                <div>
                  <h1 className="userinfo">
                    Welcome{" "}
                    {userData.result.firstName + " " + userData.result.lastName}
                  </h1>
                  <button onClick={handleLogOut} className="logoutbtn" to="/">
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="selectFile">
              <h2>Select File to Upload</h2>

              <input type="file" onChange={handleFileInput}></input>
              <button
                className="uploadbtn"
                disabled={!selectedFile}
                onClick={uploadToCloud}
              >
                Upload
              </button>
            </div>

            <div>
              <button className="getFilesbtn" onClick={getFiles}>
                Get Files
              </button>

              <div className="table">
                <table>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Download</th>
                  </tr>

                  {files.size == 0 ? (
                    <h2>No Files</h2>
                  ) : (
                    files.map((val, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val}</td>
                          <td>
                            <button
                              className="downloadbtn"
                              onClick={() => downloadfile(val)}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Not Authorized....</h1>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Profile);
