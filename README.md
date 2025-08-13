# API de Cadastro de Usuários

## Índice
1. [Introdução](#introdução)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Uso](#uso)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Endpoints](#endpoints)
8. [Front-end](#front-end)
9. [Conclusão](#conclusão)

---

## Introdução
Esta API é responsável por gerenciar usuários, armazenando informações como `id`, `nome`, `email` e `telefone`.  
Ela fornece operações **CRUD** (Criar, Ler, Atualizar e Deletar) e pode ser acessada via **Postman**, browser ou frontend.  

Funcionalidades principais:  
- Cadastro de usuários com validação de email.  
- Listagem de todos os usuários cadastrados.  
- Exclusão de usuários.  
- Frontend simples para inserção e visualização dos dados.

---

## Requisitos
Para rodar esta API, você precisará de:  
1. **Node.js** (versão 14 ou superior)  
   [Baixe aqui](https://nodejs.org/)  
2. **npm** (geralmente instalado junto com Node.js)  
3. **Dependências do projeto** instaladas com:

```bash
npm install
```
---

## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/api-usuarios.git
```

2. Acesse o diretório do projeto:
```bash
cd api-usuarios
```

3. Instale as dependências:
```bash
npm install
```

---

## Configuração
Não há variáveis de ambiente obrigatórias neste projeto simples, mas você pode alterar a porta no arquivo `server.js` se desejar:

```bash
const PORT = process.env.PORT || 3000;
```

---

## Uso
1. Inicie o servidor:
```bash
npm start
```

2. Acesse a API:
```bash
http://localhost:3000
```

3. Testando via Postman:

-  `GET /usuarios` → Lista todos os usuários.
-  `POST /usuarios` → Cria um novo usuário.
-  `DELETE /usuarios/:id` → Exclui um usuário pelo id.

---

## Estrutura do Projeto
```bash
api-usuarios/
├── server.js          # Inicializa o servidor
├── routes.js          # Define as rotas da API
├── package.json       # Dependências do projeto
├── README.md          # Documentação
└── frontend.html      # Interface simples de cadastro
```

---

## Endpoints
`GET /usuarios`
- **Descrição**: Lista todos os usuários cadastrados.
- **Resposta Exemplo**:
```bash
[
  {
    "id": 1,
    "nome": "Maria",
    "email": "maria@email.com",
    "telefone": "(11) 99999-0000"
  }
]
```
`POST /usuarios`
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:
```bash
{
  "nome": "Mateus Amaro",
  "email": "mateus@email.com",
  "telefone": "(11) 99999-0000"
}
```
- **Resposta Exemplo**:
```bash
{
  "id": 1,
  "nome": "Mateus Amaro",
  "email": "mateus@email.com",
  "telefone": "(11) 99999-0000"
}
```
`DELETE /usuarios/:id`
- **Descrição**: Remove um usuário pelo ID.
- **Exemplo**:
```bash
DELETE http://localhost:3000/usuarios/1
```
- **Resposta Exemplo**:
```bash
{
  "message": "Usuário excluído com sucesso"
}
```

---

## Front-end
O projeto inclui um frontend simples (`frontend.html`) para cadastrar e visualizar usuários:
- Formulário para inserir `nome`, `email` e `telefone`.
- Lista todos os usuários cadastrados em uma tabela.
- Botões para limpar formulário, salvar usuário e recarregar a lista.
- Mensagens de feedback aparecem como **toasts
**Exemplo de uso no browser**:
  1. Abra o arquivo `frontend.html`.
  2. Preencha o formulário com os dados do usuário.
  3. Clique em **Salvar usuário**.
  4. A tabela será atualizada automaticamente.

---

  ## Conclusão
  Esta API foi desenvolvida para fornecer uma solução **simples, eficiente e fácil de usar** para cadastro de usuários.
Pode ser utilizada em pequenos projetos, testes, ou como base para sistemas maiores.
