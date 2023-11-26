## 개발 환경
<li> Ubuntu , Window , WebStrom </li>
<li> Node.js , GraphQL, Prisma , TypeScript , MySQL </li>

<br>

### Installation

```
$ docker-compose build
```

### Running the app

```
$ docker-compose up
```

### Seed
```
$ npx prisma db seed
```

<br>

## 요구사항 분석
- ORM 사용하여 구현 : ORM인 `prisma` 사용
- RDBMS 사용  : `mysql` 사용
- 코드 가독성을 위해 `prettier` 설정
- 필요한 테이블  : `User` `Post` `Comment`  테이블 생성
- 스키마 접급 방식 : `schema-first` 방식으로 구현 

<br>

## 구현 과정

### 1. Entity Diagram

![스크린샷](https://github.com/developersomin/bold9-homework-test/assets/127207131/4f0bce83-5690-41b6-b7a4-4e2b55e91c28)


`User` 와 `Post` 일대다 관계 구현

`Post` 와 `Comment` 일대다 관계 구현

<br>

### 2-1. 유저 생성
<details>
<summary> 유저 생성 성공 </summary>

```graphql
# 유저 생성
mutation  {
    createUser(createUserInput: {
        name: "ahngiwon123",
        email: "ahngiwon123@naver.com",
        password: "dsadsa111"
    }) {
        id
        name
        email
        createdAt
    }
}
```

```graphql
# 결과
{
  "data": {
    "createUser": {
      "id": "2c74d6cf-8fb4-4691-ad56-283085b2e1f8",
      "name": "ahngiwon123",
      "email": "ahngiwon123@naver.com",
      "createdAt": "2023-11-26T18:51:20.927Z"
    }
  }
}
```

</details>

<details>
<summary> 유저 생성 실패 (동일한 이메일로 등록) </summary>

```graphql
# 동일한 email을 저장할려고 할 때
{
  "errors": [
    {
      "message": "중복된 email 이 있습니다.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createUser"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: 중복된 email 이 있습니다.",
            "    at UserService.createUser (file:///C:/Users/ahngi/WebstormProjects/homework/bold9-homework-test/dist/src/user/user.service.js:25:19)"
          ]
        }
      }
    }
  ],
  "data": {
    "createUser": null
  }
}
```

</details>

<details>
<summary> 유저 생성 실패 (필수 필드 미입력) </summary>

```graphql
# 필수 필드 값 입력 안했을 때
# name , password , email 필수 입력
{
  "error": {
    "errors": [
      {
        "message": "Field CreateUserInput.password of required type String! was not provided.",
        "locations": [
          {
            "line": 3,
            "column": 22
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED",
          "exception": {
            "stacktrace": [
              "GraphQLError: Field CreateUserInput.password of required type String! was not provided.",
              "    at Object.ObjectValue (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\rules\\ValuesOfCorrectType.js:93:31)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:324:29)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:375:25)",
              "    at visit (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:242:26)",
              "    at Object.validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\validate.js:73:24)",
              "    at validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:233:34)",
              "    at Object.<anonymous> (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:119:42)",
              "    at Generator.next (<anonymous>)",
              "    at fulfilled (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:5:58)",
              "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
            ]
          }
        }
      }
    ]
  }
}
```

</details>




### 2-2. 게시글 작성
<details>
<summary> 게시글 작성 성공 </summary>

 - title , authorId 필수 입력 값
 - isPublished 디폴트 값으로 false 설정

```graphql
# 게시글 작성
mutation  {
    createPost(createPostInput: {
        title: "dsa",
        authorId: "2c74d6cf-8fb4-4691-ad56-283085b2e1f8"
    }) {
        id
        title
        content
        authorId
        isPublished
        createdAt
    }
}
```

```graphql
# 성공
{
  "data": {
    "createPost": {
      "id": "79f9d63c-0153-415a-bce7-42bd96abccbd",
      "title": "dsa",
      "content": null,
      "authorId": "2c74d6cf-8fb4-4691-ad56-283085b2e1f8",
      "isPublished": false,
      "createdAt": "2023-11-26T19:00:37.860Z"
    }
  }
}
```

```graphql
# 게시글 작성
mutation  {
  createPost(createPostInput: {
    title: "dsa",
    isPublished: true,
    content: "취준생 화이팅"
    authorId: "2c74d6cf-8fb4-4691-ad56-283085b2e1f8"
  }) {
    id
    title
    content
    authorId
    isPublished
    createdAt
  }
}
```

```graphql
# 성공
{
  "data": {
    "createPost": {
      "id": "16c563d0-2811-4407-bc7a-4fb82837aed3",
      "title": "dsa",
      "content": "취준생 화이팅",
      "authorId": "2c74d6cf-8fb4-4691-ad56-283085b2e1f8",
      "isPublished": true,
      "createdAt": "2023-11-26T19:11:27.966Z"
    }
  }
}
```
</details>

<details>
<summary> 게시글 작성 실패 (저자ID 없을때)</summary>

저자 ID가 잘못 입력 되었을 때 오류 발생
```graphql
# 결과
{
  "errors": [
    {
      "message": "저자 ID 가 존재 하지 않습니다.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createPost"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: 저자 ID 가 존재 하지 않습니다.",
            "    at PostService.createPost (file:///C:/Users/ahngi/WebstormProjects/homework/bold9-homework-test/dist/src/post/post.service.js:32:19)"
          ]
        }
      }
    }
  ],
  "data": {
    "createPost": null
  }
}
```
</details>

<details>
<summary> 게시글 작성 실패 (필수 필드 미입력)</summary>

```graphql
#결과
{
  "error": {
    "errors": [
      {
        "message": "Field CreatePostInput.title of required type String! was not provided.",
        "locations": [
          {
            "line": 3,
            "column": 22
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED",
          "exception": {
            "stacktrace": [
              "GraphQLError: Field CreatePostInput.title of required type String! was not provided.",
              "    at Object.ObjectValue (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\rules\\ValuesOfCorrectType.js:93:31)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:324:29)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:375:25)",
              "    at visit (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:242:26)",
              "    at Object.validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\validate.js:73:24)",
              "    at validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:233:34)",
              "    at Object.<anonymous> (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:119:42)",
              "    at Generator.next (<anonymous>)",
              "    at fulfilled (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:5:58)",
              "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
            ]
          }
        }
      }
    ]
  }
}
```
</details>



### 2-3 댓글 작성

<details>
<summary> 댓글 작성 성공 </summary>

```graphql
# 댓글 작성
mutation  {
  createComment(createCommentInput: {
    content: "dsadsa",
    postId: "16c563d0-2811-4407-bc7a-4fb82837aed3"
  }) {
    id
    content
    postId
    createdAt
  }
}
```

```graphql
# 성공
{
  "data": {
    "createComment": {
      "id": "abf08a83-e750-4644-8f31-78c37191c509",
      "content": "dsadsa",
      "postId": "16c563d0-2811-4407-bc7a-4fb82837aed3",
      "createdAt": "2023-11-26T19:21:04.945Z"
    }
  }
}
```

</details>

<details>
<summary> 댓글 작성 실패 (게시글ID 없을때)</summary>

```graphql
#결과
{
  "errors": [
    {
      "message": "요청하신 게시물 ID가 없습니다.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createComment"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: 요청하신 게시물 ID가 없습니다.",
            "    at CommentService.createComment (file:///C:/Users/ahngi/WebstormProjects/homework/bold9-homework-test/dist/src/comment/comment.service.js:14:19)"
          ]
        }
      }
    }
  ],
  "data": {
    "createComment": null
  }
}
```

</details>

<details>
<summary> 댓글 작성 실패 (필수 필드 미입력)</summary>

```graphql
#결과
{
  "error": {
    "errors": [
      {
        "message": "Field CreateCommentInput.content of required type String! was not provided.",
        "locations": [
          {
            "line": 3,
            "column": 25
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED",
          "exception": {
            "stacktrace": [
              "GraphQLError: Field CreateCommentInput.content of required type String! was not provided.",
              "    at Object.ObjectValue (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\rules\\ValuesOfCorrectType.js:93:31)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:324:29)",
              "    at Object.enter (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:375:25)",
              "    at visit (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\language\\visitor.js:242:26)",
              "    at Object.validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\graphql\\validation\\validate.js:73:24)",
              "    at validate (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:233:34)",
              "    at Object.<anonymous> (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:119:42)",
              "    at Generator.next (<anonymous>)",
              "    at fulfilled (C:\\Users\\ahngi\\WebstormProjects\\homework\\bold9-homework-test\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:5:58)",
              "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
            ]
          }
        }
      }
    ]
  }
}
```
</details>

### 2-4. 유저의 게시글과 게시글의 댓글 조회

<details>
<summary> 조회 성공 </summary>

```graphql
# 조회
query{
  getPosts(userId:"439bee8c-647e-4996-a260-d37fd506d307") {
    id
    content
    comments {
      id
      content
    }
  }
}
```

```graphql
# 성공
{
  "data": {
    "getPosts": [
      {
        "id": "21341f30-f724-4c9e-9a77-10245d9c50ac",
        "content": "graphql",
        "comments": [
          {
            "id": "135831ca-e6f9-4312-b992-e2b0cbc04f75",
            "content": "coma"
          },
          {
            "id": "4d418970-5a07-4cff-a37d-c436c42bb6ba",
            "content": "cetera"
          },
          {
            "id": "5e90d1e7-ad42-4d09-892f-405d065410ae",
            "content": "vulnus"
          },
          {
            "id": "81d2a68c-bf17-441e-9116-bb8bd39117ca",
            "content": "saepe"
          },
          {
            "id": "929913c7-8b77-4493-8d5b-a5b835c2f9a0",
            "content": "ullam"
          },
          {
            "id": "a908332a-8ab3-4c9b-91e0-dbc11cca4cb7",
            "content": "caritas"
          },
          {
            "id": "d069f0e4-9e73-446c-8748-8496a75d7d20",
            "content": "aliquam"
          },
          {
            "id": "e69528da-890f-42aa-bd35-8217718b5fb5",
            "content": "bardus"
          },
          {
            "id": "f22fbcbb-b63b-44df-8a3a-cf983581c480",
            "content": "taedium"
          },
          {
            "id": "f732d344-669a-461b-880e-cdff6763119d",
            "content": "currus"
          }
        ]
      },
      {
        "id": "6fa66427-dd13-4920-8043-9d6c9b726156",
        "content": "graphql",
        "comments": [
          {
            "id": "27bba8b6-f305-48ef-9759-6d1671f7716f",
            "content": "aegrus"
          },
          {
            "id": "557d89ae-c068-4b46-a4d2-189852e6f3fe",
            "content": "dignissimos"
          },
          {
            "id": "566a38c6-951d-4b85-a01b-d10493056013",
            "content": "perferendis"
          },
          {
            "id": "6c16f318-a64e-44c2-ac76-486e7882f2a6",
            "content": "aedificium"
          },
          {
            "id": "78f67f47-77bb-41b0-829a-257c14a66f03",
            "content": "tot"
          },
          {
            "id": "948c6d82-fcce-48e2-bb90-1e0a244ed8ab",
            "content": "bis"
          },
          {
            "id": "9925ece0-1460-4fe0-be3e-01ebee2f3ddb",
            "content": "aestas"
          },
          {
            "id": "b925b5fc-b1cb-44a2-a962-1cb45df59c1a",
            "content": "vestigium"
          },
          {
            "id": "cf275500-6f87-4fda-a746-fee99bcde29a",
            "content": "conitor"
          },
          {
            "id": "fbddd1f2-ab7f-4114-9a5e-3aad851094a1",
            "content": "alioqui"
          }
        ]
      },
        ... more Post
        ]
      }
    ]
  }
}
```
</details>

### 3. seed file 생성

![시드](https://github.com/developersomin/bold9-homework-test/assets/127207131/e7606ce0-ea67-4c16-b3b9-4f9897db654d)

- test를 위한 더미데이터 생성
- Post: is_published 는 50% 확률로 true 와 false 생성
- Post: content 는 50% 확률로 graphql 문자열 포함

### 4. Github

![git](https://github.com/developersomin/bold9-homework-test/assets/127207131/0343d7ab-ffe4-47bb-ab11-64413275c50a)

- 개인 과제이지만 git flow 전략 사용 