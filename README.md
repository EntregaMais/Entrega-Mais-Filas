# Entrega-Mais-Filas-Bide

> Repositório contendo consumidor e produtor usados para enviar e receber mensagens do RabbitMQ

## Pré-requisitos
---
> É necessário a instalação dos seguintes recursos:

- [Docker](https://docs.docker.com/get-docker/)
	- [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install)
- [Node](https://nodejs.org/en/download/)
	- Recomendado: `node-v16. foi usada`

## Docker

Na raiz do projeto, onde há o arquivo `docker-compose.yml` e execute o seguinte comando
```
docker compose up -d
```
- Será criado volumes gerenciados pelo próprio **Docker** na sua maquina local, a fim de persistir os dados
- **RabbitMQ** será iniciado na porta **`5672`**
	- **Management console** será iniciado na porta **`15672`**
- **Postgres** serão iniciados na porta **`80`**
    - Painel de controle: [**`localhost:80`**](http:localhost:80)
        - user: **`root`**
        - password: **`ifpb`**

---



## Instalando <nome_do_projeto>

Para instalar o <nome_do_projeto>, siga estas etapas:

Windows:
```
npm install
```

## Usando <nome_do_projeto>
### 
Para usar <nome_do_projeto>, siga estas etapas:

```
<exemplo_de_uso>
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!


[⬆ Voltar ao topo](#Entrega-Mais-Filas-Bide)<br>