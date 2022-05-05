FROM --platform=linux/amd64 node:10-alpine

# Create app directory
WORKDIR /app

# Copy dependencies 
COPY package*.json ./

# Install dependencies 
RUN npm install

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]