FROM node:16

# Define o diretório que os próximos comandos serão executados
WORKDIR /node/app

# Copia a lista de dependencias para dentro do container
COPY package*.json ./

RUN npm install pm2 -g
# Instala todas as dependências
RUN npm install

# Copia todos os arquivos
COPY . .

EXPOSE 3000 3001

CMD [ "pm2-runtime", "ecosystem.config.js" ]