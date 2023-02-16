# cv3_nodejs

### Description

This is a back end server with node js and DB is built with sqlite3.<br>
The port is 5000.<br>
This has to work with a front end server, https://github.com/iirtrtrt/cv3_nextjs<br>

## Getting Started

### Prerequisites

Recommended versions:<br>
node18 LTS

A .env file is requiered.
Please create .env on the root directory.

The .env file format is below:<br>
LOGIN_EMAIL=라방바이메일<br>
LOGIN_PASSWORD=라방바비밀번호<br>
DB_PATH=./db.sqlite3<br>
ACCESS_TOKEN=anything<br><br>
![image](https://user-images.githubusercontent.com/69069300/219335205-dce74ff0-f4e5-4262-aaf3-3c1959517a84.png)
![image](https://user-images.githubusercontent.com/69069300/219335026-3e1c79d2-3bb6-4207-9c42-2a96503ccd64.png)

## Installation

### Localhost

1. Download:

```sh
git clone https://github.com/iirtrtrt/cv3_nodejs.git
```

2. Go to the root directory:

```sh
cd ./cv3_nodejs
```

## Run

### Localhost

1. Install packages:

```sh
npm install
```

2. Run server:

```sh
npm run start
```

서버 실행시, sqlite3 DB는 자동 생성됩니다.
