FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
RUN npm install

# Install development dependencies
RUN npm install -g ts-node nodemon

# Copy project files
COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]