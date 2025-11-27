# 🛒 Supermercado Asteroide

Sistema de gerenciamento de produtos para supermercado desenvolvido como exemplo de aplicação CRUD completa.

## 📋 Sobre o Projeto

Este projeto foi criado com o objetivo de exemplificar a implementação de um sistema CRUD (Create, Read, Update, Delete) completo, integrando um frontend em HTML/CSS/JavaScript com um backend desenvolvido em Java 17.

O sistema simula o gerenciamento de produtos de um supermercado, permitindo operações básicas de cadastro, listagem, edição e exclusão de itens.

## Repositórios
- **Backend (Java)**: https://github.com/PedroVictor-PV/crud-web-backend/tree/main

## ✨ Funcionalidades

### 1. **Adicionar Produto**
- Cadastro de novos produtos no sistema
- Campos: Nome, Preço e Quantidade em Estoque
- Validação de campos obrigatórios
- Feedback visual ao usuário após a operação

### 2. **Listar Produtos**
- Visualização de todos os produtos cadastrados em formato de tabela
- Exibição de: ID, Nome, Preço e Estoque
- Atualização automática da lista após operações
- Mensagem quando não há produtos cadastrados

### 3. **Editar Produto**
- Atualização de informações de produtos existentes
- Formulário pré-preenchido com dados atuais
- Possibilidade de cancelar a edição
- Campos: Nome, Preço e Quantidade em Estoque

### 4. **Excluir Produto**
- Remoção de produtos do sistema
- Confirmação antes da exclusão
- Atualização automática da lista após exclusão

### 5. **Indicador de Carregamento**
- Feedback visual durante requisições ao backend
- Melhora a experiência do usuário em operações assíncronas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e layout responsivo
- **JavaScript (ES6+)**: Lógica de negócio e integração com API
- **Fetch API**: Comunicação assíncrona com o backend

### Backend
- **Java 17**: Linguagem de programação
- **API REST**: Arquitetura de comunicação
- **Porta 8080**: Servidor local

## 🚀 Como Executar

### Pré-requisitos
- Backend Java 17 rodando em `http://localhost:8080`
- Navegador web moderno

### Passos
1. Certifique-se de que o backend está rodando na porta 8080
2. Abra o arquivo `index.html` em um navegador web
3. O sistema carregará automaticamente a lista de produtos

## 📡 Integração com Backend

O frontend se comunica com o backend através dos seguintes endpoints:

- **GET** `/produtos` - Listar todos os produtos
- **GET** `/produtos/{id}` - Buscar produto por ID
- **POST** `/produtos` - Criar novo produto
- **PUT** `/produtos/{id}` - Atualizar produto existente
- **DELETE** `/produtos/{id}` - Excluir produto

### Estrutura do JSON
```json
{
  "id": 1,
  "nome": "Produto Exemplo",
  "preco": 10.50,
  "quantidadeEstoque": 100
}
```

## 📁 Estrutura de Arquivos

```
supermercado-asteroide/
│
├── index.html          # Estrutura HTML da aplicação
├── style.css           # Estilos e layout
├── produtos.js         # Lógica JavaScript e integração com API
├── assets/
│   └── logo.jpg        # Logo do supermercado
└── README.md           # Documentação do projeto
```

## 🎨 Interface

A interface apresenta:
- Design clean e profissional
- Cores azul (#004aad) e amarelo (#ffcc00) como identidade visual
- Formulários bem estruturados e validados
- Tabela responsiva para listagem de produtos
- Feedback visual para todas as operações

## 📝 Validações

O sistema inclui validações para:
- Campos obrigatórios não podem estar vazios
- Preço deve ser maior ou igual a zero
Estoque deve ser maior ou igual a zero
Confirmação antes de excluir produtos

🔄 Tratamento de Erros

Mensagens de erro amigáveis ao usuário
Logs no console para debugging
Verificação de disponibilidade do backend
Tratamento de respostas não-OK da API

👥 Autor
Este projeto foi desenvolvido como material educacional para demonstração de conceitos de desenvolvimento web fullstack.
- Pedro Victor Cavalcante De Brito
- Guilherme Vasconcelos Duarte
- Gabriel Luiz Do Reis Feitosa Oliveira
