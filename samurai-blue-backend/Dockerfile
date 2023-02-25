FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 4242
CMD ["node", "server.js"]