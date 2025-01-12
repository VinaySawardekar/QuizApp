# QuizApp

Quiz App RestAPI's Using Nodejs and Express

### <span style="color:red">IMPORTANT: </span><span style="color:blue">VSCode Extension</span>(To see UI for any md file)

- Install [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- To run above extension, right click on any `*.md` file, and click on `Markdown Preview Enhanced: Open Preview to the Side`

#### Documents Updates

| Version | Create         | Update         |
| :------ | :------------- | :------------- |
| `1.0.0` | `Jan 12, 2025` | `Jan 12, 2025` |

##### <span style="color:red">IMPORTANT: </span> When ever you update this document, change the <span style="color:green">update date</span> and <span style="color:green">version</span>

#### Document Description

Contains document of the Backend resources such as Node.js, that are being using in our project.

## Prerequisites

- **Node.js** (v22 or above)
- **Docker** (if running in a container)

### Install node@v22.13.x

1. Install Locally

   - Install Node.js
     Minimum Node.js version required is **v22.13.x**
     Here **x** mean any patch version of Node.js
     Using npx you can install desired version

     ```sh
     a)Install NVM:   curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
     b) Activate NVM:  . ~/.nvm/nvm.sh
     c) Install Node(choose version):  nvm install 22.13.1
     d) Use Node Version: nvm use 22.13.1
     e) Confirm Successful Installation:   node -e "console.log('Running Node.js ' + process.version)"
     f) Make node version 22.13.1 as default: nvm alias default 22.13.1
     ```

     Now close and re-open your terminal and check Node.js version and if it is not 22.13.x follow below methods
     <space></space>
     <br>
     Method-1 (For MacOS & Linux):<br>

     ```sh
     a) Suppose node already exist but old version and using nvm alias default 22.13.1 it is not setting to default.
     b)  https://askubuntu.com/a/921794  Follow this answer in .bashrc file in last edit node version (or below steps)
         b.1) sudo vim .bashrc
         b.2) Press press Esc + i
         b.3) Edit last lines with Node version you want
         b.4) Press :wq
     ```

     Method-2(All OS):<br>

     ```sh
     a) https://stackoverflow.com/a/74500030/11926970 Follow this answer  nvm alias default node
     ```

### Setup the Environment Variables

- Create a new file with name `.env` at the root of server folder.
- Copy the contents `.env.sample` to the `.env`.
- Update the values of the keys in `.env` as per your configuration.

## Installation

### Run Locally

Clone the project (via HTTP)

```bash
git clone --single-branch -b main https://github.com:VinaySawardekar/QuizApp.git
```

Clone the project (via SSH)

```bash
git clone --single-branch -b main git@github.com:VinaySawardekar/QuizApp.git
```

Install dependencies

```bash
npm install
```

### Running Tests

The application includes comprehensive tests to ensure functionality and reliability.

#### Testing Frameworks

- **Jest**: Used for running unit tests and assertions.
- **Supertest**: Used for testing HTTP endpoints and ensuring API functionality.

```bash
npm run test
```

### Running the application

#### Start the server

```bash
  npm  start
```

##### To Start it with nodemon

```bash
  npm run start:dev
```

#### Build the server

```bash
  npm  build
```

or

```bash
  npm run build
```

##### Health Check

To check whether the Server is Running or not.

Go on this Link: `{{HOST}}/api/v1/health-check`

If Everything is fine then it will give response like this:

```
{
  "status": "success",
  "message": "Success.",
  "data": [
    {
      "upTime": 278.131926708,
      "date": 1713335777089
    }
  ]
}
```

#### Swagger Documentation

##### Generate the Swagger Documentation if it doesn't exist.

```bash
  npm run swagger-autogen
```

Go on this Link: `{{HOST}}/docs`
On local: http://localhost:8081/docs

#### Postman Collection Documentation

Go on this Link: [Postman Collection](https://documenter.getpostman.com/view/18304204/2sAYQWKZLc)

#### Project Contributors

| Name                                                              | Email                         |
| :---------------------------------------------------------------- | :---------------------------- |
| [Vinay Sawardekar](https://www.linkedin.com/in/vinay-sawardekar/) | <vinaysawardekar99@gmail.com> |
