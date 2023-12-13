FROM public.ecr.aws/docker/library/node:18-slim
WORKDIR /usr/app
COPY . /usr/app/
RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
