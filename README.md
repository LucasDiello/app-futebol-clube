## **Projeto de Gerenciamento de Times e Partidas**

Este é um projeto de gerenciamento de times e partidas, onde é possível cadastrar times, realizar partidas e acompanhar o desempenho dos times em uma tabela de classificação. O projeto está dividido em backend e frontend.


#### **Migrations e Models**

Foram desenvolvidas migrações e modelos para as tabelas de times, usuários e partidas conforme solicitado nos requisitos. As migrações estão na pasta `src/database/migrations` e os modelos na pasta `src/database/models`.

#### **Endpoints**

Os endpoints foram desenvolvidos para realizar as seguintes operações:

- `/teams`: Retorna todos os times cadastrados.
- `/teams/:id`: Retorna os dados de um time específico.
- `/login`: Permite o acesso com dados válidos e inválidos.
- `/login/role`: Retorna os dados do usuário com base no token válido fornecido.
- `/matches`: Gerencia as partidas, incluindo filtragem, cadastro e finalização.
- `/leaderboard/home`: Retorna informações de desempenho dos times da casa.
- `/leaderboard/away`: Retorna informações de desempenho dos times visitantes.
- `/leaderboard`: Retorna a classificação geral dos times.

#### **Testes**

Foram desenvolvidos testes para garantir a qualidade do código. Eles estão localizados na pasta `src/tests` e cobrem os requisitos mínimos de cobertura especificados, bem como o bônus.

#### **Middleware**

Um middleware de validação de token foi implementado para verificar a autenticidade do token fornecido pelo usuário.

### **Frontend**

O frontend do projeto ainda está em desenvolvimento e em breve estará disponível para fornecer uma interface amigável para interagir com o sistema de gerenciamento de times e partidas.

### **Setup do Projeto**

Para configurar e executar o projeto, siga estas etapas:

1. Instale as dependências do backend e do frontend executando `npm install` na raiz do projeto.
2. Configure o banco de dados de acordo com as migrações fornecidas.
3. Execute o backend com `npm start`.
4. O frontend estará disponível em breve para testes e interações.

Obrigado por escolher nosso projeto! Se tiver alguma dúvida ou problema, não hesite em entrar em contato conosco.
