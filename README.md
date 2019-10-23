# Blog page app where users can post comments and they are able to view the comments

# Requirements to install before running the app
- NodeJS: the Javascript language that runs a server using javascript
- Git Bash: the terminal application for executing commands
- MongoDB: the NoSQL object database application for storing data entries as json objects.
- Postman: the application for testing the PAI endpoints
- Yarn: the package manager that download depedencies and libraries for javascript

## Installation, setup and configuration
- Download and install NodeJS from this link https://nodejs.org/en/
- Downloand and install Git bash from this link https://git-scm.com/downloads
- Download and install MongoDB from this link https://www.filehorse.com/download-mongodb/
- Download and install PostMan from this link https://www.getpostman.com/downloads/
- Download and install Yarn from this link https://yarnpkg.com/en/docs/install#windows-stable

### On windows pc, configure the environmental variable settings if they are not configured in the Path yet.
  - Add npm to the system variables Path: `C:\Users\Nsengiyunva\AppData\Roaming\npm`
  - Add nodejs to the system variables Path: `C:\Program Files\nodejs`
  - Add mongodb to the Path too: `C:\Program Files\MongoDB\Server\4.2\bin`
  - Add git to the path: `G:\Git\Git\cmd`
  - Add yarn to the path: `C:\Program Files (x86)\Yarn\bin\`

### After configuring the system, download the codebase using git:
    - Launch Git Bash terminal window
    - `git clone https://github.com/Margienabs/blog_page.git`
    - Then run `git status` to check which branch you are on
    - Navigate to the development branch: `post-form-comments` by running `git checkout post-form-comments`
    

### Running the application
- Launch Git Bash terminal window
- run `mongod` from the git bash terminal to launch MongoDB
- navigate to the repository location that you have just downloaded.
- Make sure you are on the right branch by running `git status`
- run `yarn install` to install all the libraries
- run `yarn start` to launch the server and API
- Open your favorite browser preferably Google Chrome and run `http://localhost:3000/`
- Add some comments from the web form and submit. The comments will be listed on the page and displayed with pagination links. On each page, there will 2 comments displayed.
