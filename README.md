
### DB 起動

postgresのDBを起動する。
```
docker-compose up -d db
```

#### Migaration

```
yarn
yarn run db:migrate
yarn run db:seed
```

### NestJS 起動 / Web

```
yarn run dev
```

- NestJS
  http://localhost:4000/


クエリは、http://localhost:4000/graphql で確認できる。
