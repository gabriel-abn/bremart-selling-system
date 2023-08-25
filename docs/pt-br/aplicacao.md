# Aplicação

## Casos de uso e Serviços

Os **casos de uso** serão os processos da aplicação os quais os atores serão:

- Usuário
- Administrador
- Sistema externo

Os **serviços** serão os *casos de uso* os quais o ator é o próprio sistema, ou seja, serão processos internos da aplicação.

---

### User

#### TODO (User) Registrar um novo usuário

- Receber nome, cpf, email, data de nascimento e telefone
  - Casos de erro:
    - CPF já presente no repositório
    - CPF inválido
    - Email inválido
    - Formato da data de nascimento inválida
    - Telefone inválido
- A senha deve ser gerada automaticamente
- A senha deve ser criptografada antes do armazenamento
- O usuário deve receber um email de confirmação
- Caso de Sucesso:
  - ID do usuário criptografado
  - Email do usuário
  - Senha criptografada
  - Data de criação

#### TODO (User) Verificar email

- Receber o email do usuário e o token de verificação
- Verificar se o token corresponde com o email do usuário
  - Casos de erro:
    - Token expirado
    - Token não corresponde com o email do usuário
    - Email inválido
    - Email já verificado
- Caso de Sucesso:
  - Email do usuário
  - Token de autenticação

#### TODO (User) Verificar número de telefone

- Receber o número de telefone do usuário e o código de verificação
- Verificar se o código corresponde com o número de telefone do usuário
  - Casos de erro:
    - Código expirado
    - Código não corresponde com o número de telefone do usuário
    - Número de telefone inválido
    - Número de telefone já verificado
- Caso de sucesso:
  - Email do usuário
  - Confirmação de verificação do número de telefone

#### TODO (User) Fazer login

#### TODO (User) Adicionar um endereço de entrega

#### TODO (User) Adicionar um produto ao carrinho

#### TODO (User) Remover um produto do carrinho

#### TODO (User) Finalizar uma compra, pegando os produtos do carrinho e criando uma nova compra

#### TODO (User) Fazer o pagamento de uma compra

#### TODO (User) Cancelar uma compra

#### TODO (User) Mostrar o histórico de compras

#### TODO (User) Mostrar o carrinho

#### TODO (User) Mostrar os dados do usuário

#### TODO (User) Atualizar email do usuário

#### TODO (User) Atualizar os dados do usuário

#### TODO (User) Atualizar a senha do usuário

#### TODO (User) Atualizar o número de telefone do usuário

#### TODO (User) Desativar o usuário

#### TODO (User) Remover usuário

---
