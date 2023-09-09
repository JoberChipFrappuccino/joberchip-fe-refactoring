# Joberchip frappuccino demo app

## Skills 

Front Server: Node.js, Express, TypeScript
Front Application : react, zustand, sass (css module), tailwind, Typescript
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
```

## Demo API

### GET api/auth

```ts
type reqeust = {
  header: {
    Authenticaion: string
  }
}

type resposne = {
  user_id: string
  email: string
  name: string
  profile_image: string
  access_token: string
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
  user_id: string
  email: string
  name: string
  profile_image: string
  access_token: string
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
      block_id: string
      type: BlockType
      start_row: number
      start_col: number
      end_row: number
      end_col: number
    }[]
  }
}

// response.blocks는 확장 가능
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
