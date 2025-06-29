# Serverless Poll API

## Description

This project is a serverless poll (survey) application built using AWS Lambda and related AWS services. It provides a simple API to create polls, retrieve polls and results, and vote on polls.

## Features

- Add new polls with multiple options.
- Retrieve polls by ID.
- Retrieve poll results by ID.
- Retrieve all polls.
- Vote on polls.
- Authentication required for creating polls and voting.
- Unauthenticated users can only fetch polls and results (GET requests).
- Authentication uses AWS Cognito; you must register and log in to obtain an authorization token.

## Prerequisites

- You must have an **AWS account** and proper permissions to deploy and test the serverless application locally.
- AWS CLI configured locally with your credentials.
- Serverless Framework installed.

## How to Test Locally (Using Postman or Similar)

1. **Deploy or run your serverless stack locally**  
   Make sure you have AWS credentials set up so the functions can access AWS services like Cognito and DynamoDB.

2. **Register a new user**  
   Send a POST request to `/user/signup` with required user details.

   ```json
   {
     "email": "example@gmail.com",
     "password": "example123"
   }
   ```

4. **Log in to obtain authorization token**  
   Send a POST request to `/user/login` with credentials.  
   The response will include a token you will use in the `Authorization` header.

5. **Use the token to access protected endpoints**  
   For POST or PUT requests to create polls or vote, include the header:

6. **Available API endpoints:**

| Method | Path                  | Description                       | Authorization required? |
|--------|-----------------------|---------------------------------|------------------------|
| POST   | `/user/signup`         | Register a new user              | No                     |
| POST   | `/user/login`          | Log in and get auth token        | No                     |
| POST   | `/polls/add`           | Add a new poll                   | Yes                    |
| GET    | `/polls/get`           | Get all polls                   | No                     |
| GET    | `/polls/{id}/results`  | Get results of poll by ID        | No                     |
| PUT    | `/polls/{id}/vote`     | Vote on a poll                  | Yes                    |
| POST   | `/user/private`        | Example of protected route       | Yes                    |

## Example Request Bodies

**Add Poll:**

```json
{
"pollid": 1,
"question": "favourite color",
"options": ["blue", "red"],
"votes": [0, 0]
}
```

**Vote:**

```json
{
"optionIndex": 1
}
```

## Notes

- The API uses JWT tokens from AWS Cognito for authorization.
- You must be authenticated to create polls or vote.
- Unauthenticated users can only read poll data.
- AWS credentials and access are required to run and test this project locally.
