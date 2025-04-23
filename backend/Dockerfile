FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies cleanly
COPY package*.json ./

# Remove prebuilt native modules and rebuild bcrypt from source
RUN npm install --build-from-source

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
