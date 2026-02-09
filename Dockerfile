FROM node:20-slim


# Instala OpenSSL (para evitar warning do Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências (incluindo Prisma)
RUN npm install

# Copia todo o código
COPY . .

# Gera o Prisma client
RUN npx prisma generate

# Expondo porta
EXPOSE 3000

# Comando default
CMD ["npm", "run", "dev"]


