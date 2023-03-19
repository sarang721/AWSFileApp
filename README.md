
# AWSFileApp

Welcome to AWSFileApp, the ultimate solution for storing your files securely in the cloud! AWSFileApp app allows you to easily sign up and log in using your Google account.Once you're in, you can start uploading files to Amazon S3 bucket with just a few clicks. You can also list all your uploaded files and download . The bucket to which files are uploaded are fully private and only root user can access that.

<img width="954" alt="Screenshot 2023-03-17 194749" src="https://user-images.githubusercontent.com/63876450/226199336-f67daa3b-09a5-417b-a4be-17fb7247dbc2.png">

## API Reference

#### Upload File to AWS S3

```text
  POST /uploadfile
```
  This route allows users to upload files to their private Amazon S3 bucket. 
  It is protected by the protect middleware to ensure that only authenticated users can upload files.
  The file is expected to be submitted from the frontend using a FormData object, with the file as the value of a key called "file".
  The upload middleware is used to handle the file upload.



#### Get all Files

```text
  GET /getfiles
```
  This route fetches all files stored in a user's Amazon S3 bucket and returns them to the frontend where they can be displayed or downloaded by the user.
  It is protected by the protect middleware to ensure that only authenticated users can access their files.


#### Download File 

```text
  POST /download
```
  This route allows users to download files stored in their private Amazon S3 bucket.
  It is protected by the protect middleware to ensure that only authenticated users can download their files.
  When a user accesses the /download route, they must provide the filename of the file they wish to download in the request body.
  The route will then use the AWS SDK to retrieve the file from the user's private Amazon S3 bucket and download it in local machine.






## Run 

Clone the project

```bash
  git clone https://github.com/sarang721/AWSFileApp
```
Go to the project directory

```bash
  cd AWSFileApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server
  npm run start
```
Start the frontend

```bash
  cd client
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT_ID`

`CLIENT_SECRET`

`JWT_SECRET`

`ACCESS_KEY`

`SECRET_KEY_ACCESS`

`MONGO_URL`

`BUCKET_NAME`




