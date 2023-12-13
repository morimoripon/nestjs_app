
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

### ECRプッシュ

docker tag <nestjs_app-frontendのimageID> 383384144925.dkr.ecr.ap-northeast-1.amazonaws.com/nest_app_nextjs
docker tag <nestjs_app-apiのimageID> 383384144925.dkr.ecr.ap-northeast-1.amazonaws.com/nest_app_nestjs

docker push 383384144925.dkr.ecr.ap-northeast-1.amazonaws.com/nest_app_nextjs:latest 
docker push 383384144925.dkr.ecr.ap-northeast-1.amazonaws.com/nest_app_nestjs:latest 

※Your authorization token has expired.が出る場合
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 383384144925.dkr.ecr.ap-northeast-1.amazonaws.com