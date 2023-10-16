FROM public.ecr.aws/docker/library/node:18-slim
WORKDIR /app
COPY ./apps/frontend .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]
