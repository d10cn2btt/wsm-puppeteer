## Wsm-Puppeteer
[![GitHub forks](https://img.shields.io/github/forks/d10cn2btt/wsm-puppeteer.svg?style=social&label=Fork)](https://github.com/d10cn2btt/wsm-puppeteer/fork)
[![GitHub stars](https://img.shields.io/github/forks/d10cn2btt/wsm-puppeteer.svg?style=social&label=Star)](https://github.com/d10cn2btt/wsm-puppeteer)
### Description
This extension will auto check timesheet for a user in system WSM. It will show badge if user's timesheet was IL or LE Then the user can submit the request via this Extension

### 1. Server
Use puppeteer to login and submit request
Puppeteer requires at least Node v6.4.0, but the examples below use async/await which is only supported in Node v7.6.0 or greater.
#### 1.1 Installation
To use Puppeteer in your project, run:
```bash
npm i --save puppeteer
# or "yarn add puppeteer"
```
Note: When you install Puppeteer, it downloads a recent version of Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win) that is guaranteed to work with the API. To skip the download, see [Environment variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables).

#### 1.2 Development & Run
You can use `nodemon` to continue develop server
```
npm i -g nodemon
nodemon server
# or "npm run nodemon"
```

### 2. Client
Use angular-cli to build template
#### 2.1 Prerequisites
Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together
with NPM 3 or higher.

#### 2.2 Installation
**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install -g @angular/cli
```
#### 2.3 Development
```bash
npm run serve-ext
# or "ng serve -dop=false"
```

#### 2.4 Build production
```bash
npm run build-ext
# or "ng build -prod -dop=false"
```

### Demo
![](https://i.imgflip.com/279ums.gif)
