
# AWSFileApp

Welcome to AWSFileApp, the ultimate solution for storing your files securely in the cloud! AWSFileApp app allows you to easily sign up and log in using your Google account.Once you're in, you can start uploading files to your personal Amazon S3 bucket with just a few clicks. 


## API Reference

#### Upload File to AWS S3

```http
  POST /uploadfile

  This route allows users to upload files to their private Amazon S3 bucket. 
  It is protected by the protect middleware to ensure that only authenticated users can upload files.
  The file is expected to be submitted from the frontend using a FormData object, with the file as the value of a key called "file".
  The upload middleware is used to handle the file upload.
```


#### Get all Files

```http
  GET /getfiles

  This route fetches all files stored in a user's Amazon S3 bucket and returns them to the frontend where they can be displayed or downloaded by the user.
  It is protected by the protect middleware to ensure that only authenticated users can access their files.
```

#### Download File 

```http
  POST /download

  This route allows users to download files stored in their private Amazon S3 bucket.
  It is protected by the protect middleware to ensure that only authenticated users can download their files.
  When a user accesses the /download route, they must provide the filename of the file they wish to download in the request body.
  The route will then use the AWS SDK to retrieve the file from the user's private Amazon S3 bucket and download it in local machine.
```





## Run 

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




