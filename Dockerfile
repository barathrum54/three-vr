# Temel imaj olarak Node.js LTS sürümünü kullanın
FROM node:lts

# Çalışma dizinini ayarlayın
WORKDIR /app

# Uygulama bağımlılıklarını kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Uygulama kaynak kodunu kopyalayın
COPY . .

# Uygulamanın çalışacağı port
EXPOSE 8080

# Uygulamayı başlatın
CMD ["npm", "start"]
