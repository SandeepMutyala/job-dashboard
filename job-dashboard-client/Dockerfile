# Stage 1: Build
FROM node:20.19 AS build 

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Copy the environment file (for Vite)
COPY .env.dev .env

# Build the Vite app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
