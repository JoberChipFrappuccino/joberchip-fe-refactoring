# Joberchip frappuccino

# 데모

http://ec2-34-228-10-85.compute-1.amazonaws.com/

(임시 배포 주소입니다. 다른 프로젝트가 나오거나, 서버가 죽어 있을 수도 있습니다.)

## Skills 

Front Server: Node.js, Express, TypeScript
Front Application : react, zustand, sass (css module), Typescript, react-query(미정)
build tool : webpack
## 실행 방법

### Developmenet

```bash
# 번들링
npm run build:dev

# 서버 실행
npm run dev
```

### Production

```bash
# 번들링
npm run build:prod

# 서버 실행
npm run start
# 또는
npm run start:pm2
```


## 공유 페이지 접근 시퀀스 

![Alt text](image.png)

![Alt text](image-1.png)


## Mock API

### GET api/auth

```ts
type reqeust = {
  header: {
    Authenticaion: string
  }
}

type resposne = {
  userId: string
  email: string
  name: string
  profileImage: string
  accessToken: string
}
```

### POST api/auth/signin

```ts
type request = {
  body: {
    email: string
    password: string
  }
}

type resposne = {
  userId: string
  email: string
  name: string
  profileImage: string
  accessToken: string
}
```

### GET api/space

```ts
type reqeust = {
  query: {
    id: string
  }
}
type response = {
  "section_id": {
    layout: {
      styles: {
        [key: string]: string // 미정
      }
    }
    blocks: {
      blockId: string
      type: BlockType
      x: number
      y: number
      w: number
      h: number
    }[]
  }
}

// response.blocks는 확장 가능한 타입으로 정의
export type BlockWith<T> = T extends 'text'
  ? TextBlock & BlockBase
  : T extends 'image'
  ? ImageBlock & BlockBase
  : T extends 'link'
  ? LinkBlock & BlockBase
  : T extends 'space'
  ? PageBlock & BlockBase
  : never
```
