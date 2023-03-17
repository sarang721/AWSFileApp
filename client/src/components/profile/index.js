import React from "react";
import "./index.css";
import {useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux"
import axios from "axios";
import AWS from 'aws-sdk'



function Nav(props) {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [bucketName,setBucketName]=useState();
    const [files,setFiles]=useState([]);
    const navigate=useNavigate();


    AWS.config.update({
        accessKeyId: 'AKIAQVGJSY6QRYZUEI7R',
        secretAccessKey: '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'
    })

    const [authenticated,
        setAuthenticated] = useState(false)

     
    const getFiles=async()=>
    {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`,
            },
          }

          const {data}=await axios.get("/getfiles",config);
          setFiles(data);
    }  

    const downloadfile=async(filename)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`,
            },
          }

          const {data}=await axios.post("/download",{filename},config);
    }
    
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    
    const uploadToCloud=async()=>{

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userData.token}`,
                },
              }
          
            const {data}=await axios.get("/uploadfile",config);

            const myBucket = new AWS.S3({
                params: { Bucket: data.bucket_name},
            })
            
            const params = {
                ACL: 'public-read',
                Body: selectedFile,
                Bucket: data.bucket_name,
                Key: selectedFile.name
            };

            myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                console.log("Uploading");
            })
            .send((err) => {
                if (err) console.log(err)
            })
    
    }

    useEffect(() => {

        if (props.auth.authData) {
            setAuthenticated(true);
            const items = JSON.parse(localStorage.getItem('user_info'));
            if (items) {
            setUserData(items);
            }

        } else {
            setAuthenticated(false)
        }


    }, [props.auth])

    function handleLogOut(e) {
        e.preventDefault()

        dispatch({type: "LOGOUT"})
        navigate("/");

    }

    return (
        <div className="container">
            <div>
                {authenticated ?
                 <div >
                    <div className="header">
                    <h3 className="heading">FileApp {bucketName}</h3>
                    
                    <div>
                     <div >
                        <h1 className="userinfo">Welcome {userData.result.firstName+" "+userData.result.lastName}</h1>
                         <button onClick={handleLogOut} className="logoutbtn" to="/">Logout</button>
                     </div>

                 </div>

                 </div>
                
                <div className="selectFile">
                    <h2>Select File to Upload</h2>
                    
                    <input type="file" onChange={handleFileInput}></input>
                    <button className="uploadbtn" onClick={uploadToCloud}>Upload</button>
                    </div>

                <div>
                    <button className="getFilesbtn" onClick={getFiles}>Get Files</button>

                     <div className="table">

            <table>
                <tr>
                     <th>
                        Sr.No
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Download
                    </th>
                </tr>

                {
                    files.size==0?
                    <h2>No Files</h2>
                    :(
                    files.map((val,index)=>{
                        return(
                            <tr>
                            <td>{index+1}</td>
                            <td>{val}</td>
                            <td><button className="downloadbtn" onClick={()=>downloadfile(val)}>Download</button></td>
                            
                </tr>


                        );
                    }))
                }

            </table>
        </div>   
                    
                    </div>

             </div>
                 : 
                <div
                
                >
                    <h1>Not Authorized....</h1>

                </div>
                }
              
            </div>

        </div>
    )
}

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(Nav);