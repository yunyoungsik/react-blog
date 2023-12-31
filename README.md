## root
1. `npm install -g heroku`

## client   
1. `npx create-react-app .`   
2. `npm install react-router-dom`   
3. `npm install axios`   
4. `npm install http-proxy-middleware --save`   
5. `npm install sass`   
6. `npm install firebase`   
7. `npm install react-redux`   
8. `npm install @reduxjs/toolkit`   
   
## client - bootstrap   
1. `npm install react-bootstrap bootstrap`
2. `npm install @emotion/css`
3. `npm install @emotion/react`
4. `npm install @emotion/styled`

## server
1. `npm init -y`
2. `npm install express --save`
3. `npm install nodemon --save`
4. `npm install path --save`
5. `npm install mongoose --save`
6. `npm install multer --save`
7. `npm install --save aws-sdk@2.348.0`
8. `npm install multer-s3 --save`("multer-s3": "^2.10.0")

## 마크다운
- 파일생성 `echo "" > README.md`
- VScode 미리보기 ctrl + shift + v
- 마크다운에서 코드 적용하기 ```코드이름

## 트러블슈팅
`code: 8000`에러
- MongoDB주소나 비밀번호가 틀린경우 `code: 8000`에러가 뜸, 주소나 비밀번호를 확인해야함
   
`Request failed with status code 404`에러
- server쪽 index.js에서 우선 req로 확인을 해야함
```js
app.post("/api/test", (req, res) => { //<-- app.post로 설정되어 있어야함
    console.log(req);
    res.status(200).json({ success: true });
});
```
- client에 setupProxy.js를 생성 후 `npm install http-proxy-middleware --save`를 설치
```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:7777', // <--주소 수정해야함
            changeOrigin: true,
        })
    );
};
```

`깃허브 화살표 폴더` 문제   
1) .git 파일 제거
`rm -rf .git`
   
2) 스테이지에 존재하는 파일 제거
`git rm --cached . -rf`
   
빨간색은 add, commit을 하면 사라진다.   

## 제작과정

### client

- createProxyMiddleware
```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5050',
            changeOrigin: true,
        })
    );
};
```

### server
- index.js
```javascript
const express = require("express");
const app = express();
const port = 7777;

app.listen(port, () => {
    console.log("running -->" + port);
})

app.get("/", (req, res) => {
    res.send("Hello World");
})
```
   
- package.json
```javascript
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js" <--여기 수정
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.0.1",
    "path": "^0.12.7"
  }
}
```
   
- index.js(mongoose연결 후)
```javascript
const express = require("express");
const path = require("path");
const mogoose = require("mongoose");
const { default: mongoose } = require("mongoose");

//mongodb+srv://yunyoungsik91:<password>@cluster0.itbjva2.mongodb.net/?retryWrites=true&w=majority

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "..client/build")))

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://yunyoungsik91:yunyoungsik91@cluster0.itbjva2.mongodb.net/?retryWrites=true&w=majority"
    )
        .then(() => {
            console.log("listening -->" + port);
            console.log("mogoose --> connecting");
        })
        .catch((err) => {
            console.log(err)
        })

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true });
})
```

## 예제
```js
// 예제1
const [temp, setTemp] = useState([1, 2, 3]);
  return (
    <div>
      <h1>React</h1>
      {temp}
      <br />
      <button onClick={() => {
        let arr = [];
        arr = [...temp];
        arr.push(arr.length + 1);
        setTemp([...arr]);
      }}>
        버튼
      </button>
    </div>
  )
```
```js
// 예제2
const App = () => {
  const [content, setContent] = useState("");
  const onSubmit = () => {
    alert(content);
  }
  return (
    <div>
      <h1>React</h1>
      <div>
        {content}
      </div>

      <input type='text' value={content}
        onChange={(e) => {
          setContent(e.currentTarget.value);
        }}>
      </input>

      <br />

      <button
        onClick={() => {
          onSubmit();
        }}>
        입력
      </button>
    </div>
  )
}
```
```js
// 예제3
const App = () => {
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  const onSubmit = () => {
    let tempArr = [...contentList];
    tempArr.push(content)
    setContentList([...tempArr])
  }

  return (
    <div>
      <h1>React</h1>
      <div>
        {contentList.map((cont, key) => (
          <div key={key}>{cont}</div>
        ))}
      </div>

      <input type='text' value={content}
        onChange={(e) => {
          setContent(e.currentTarget.value);
        }}>
      </input>

      <br />

      <button
        onClick={() => {
          onSubmit();
        }}>
        입력
      </button>
    </div>
  )
}
```
```js
// 예제4
// App.js
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import List from './components/List'
import Upload from './components/Upload'
import Heading from './components/Heading'

const App = () => {
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List contentList={contentList} setContentList={setContentList} />} />
        <Route path="/upload" element={<Upload contentList={contentList} setContentList={setContentList} />} />
      </Routes>
    </>
  )
}

export default App

// List.js
import React from 'react'

const List = (props) => {
    return (
        <div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용 : {content}
                </div>
            ))}
        </div>
    )
}

export default List

// Upload.js
import React, { useState } from 'react'

const Upload = (props) => {
    const [content, setContent] = useState("");

    const onSubmit = () => {
        let tempArr = [...props.contentList];
        tempArr.push(content)
        props.setContentList([...tempArr]);
        setContent("");
    }

    return (
        <div>
            <input
                type="text"
                value={content}
                onChange={(e) => {
                    setContent(e.currentTarget.value);
                }}
            />
            <br />
            <button
                onClick={() => {
                    onSubmit();
                }}
            >입력</button>
        </div>
    )
}

export default Upload

// Heading.js
import React from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <div className='heading'>
            <div>Hello React</div>
            <Link to='/'>Home</Link>
            <Link to='/upload'>Upload</Link>
            <Link to='/list'>List</Link>
        </div>
    )
}

export default Heading
```#