FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências (incluindo Prisma)
RUN npm install

# Copia todo o código
COPY . .

# Expondo porta
EXPOSE 3000

# Comando default
CMD ["npm", "run", "dev"]
