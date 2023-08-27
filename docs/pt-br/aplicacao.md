<!-- markdownlint-disable md033 md024 -->

# Aplicação

## Casos de uso e Serviços

Os **casos de uso** serão os processos da aplicação os quais os atores serão:

- Usuário
- Administrador
- Sistema externo

Os **serviços** serão os *casos de uso* os quais o ator é o próprio sistema, ou seja, serão processos internos da aplicação.

---

## User

### Casos de uso

<details>
  <summary> <b> Registrar um novo usuário </b> </summary>

- DOING (User) register-user
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
  - Tempo máximo de espera para verificação do email

</details>

<details>
  <summary> <b> Verificar email </b> </summary>

- DOING (User) verify-email
- Receber o email do usuário e o token de verificação
- Verificar se o token corresponde com o email do usuário
  - Casos de erro:
    - Token expirado
    - Token não corresponde com o email do usuário
    - Email inválido
    - Email já verificado
- Caso de Sucesso:
  - ID do usuário criptografado
  - Email do usuário
  - Tempo máximo de espera para verificação do email

</details>

<details>
  <summary> <b> Verificar número de telefone </b> </summary>

- DOING (User) verify-phone
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

</details>

<details>
  <summary> <b> Fazer Sign In </b> </summary>

- DOING (User) sign-in
- Receber nome, cpf, email, data de nascimento e telefone
  - Casos de erro:
    - CPF já presente no repositório
    - CPF inválido
    - Email já presente no repositório
    - Email inválido
    - Formato da data de nascimento inválida
    - Formato do telefone inválido
- Mandar email de verificação
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário
  - Tempo máximo de espera para verificação do email

</details>

<details>
  <summary> <b> Fazer Login </b> </summary>

- DOING (User) login
- Receber email e senha
- Recuperar senha criptografada do usuário
  - Casos de erro:
    - Email não encontrado
    - Email não verificado
- Verificar se a senha informada e a senha descriptografada são iguais
  - Casos de erro:
    - Senha inválida
    - Usuário desativado
- Caso de sucesso:
  - Informações do usuário
  - Token de autenticação

</details>

<details>
  <summary> <b> Adicionar um endereço de entrega </b> </summary>

- DOING (User) add-address
- Receber o email do usuário e os dados do endereço
  - Casos de erro:
    - Email não encontrado
    - Endereço já cadastrado
    - Formato do endereço inválido
  - Caso de sucesso:
    - ID do endereço criptografado
    - Email do usuário

</details>

<details>
  <summary> <b> Adicionar um produto ao carrinho </b> </summary>

- Receber o email do usuário e os dados do produto
  - Casos de erro:
    - Email não encontrado
    - Produto não encontrado
    - Produto indisponível
    - Produto já adicionado ao carrinho
    - Quantidade inválida
  - Caso de sucesso:
    - ID do produto criptografado
    - Email do usuário

</details>

<details>
  <summary> <b> Remover um produto do carrinho </b> </summary>

</details>

<details>
  <summary> <b> Finalizar uma compra, pegando os produtos do carrinho e criando uma nova compra </b> </summary>

</details>

<details>
  <summary> <b> Fazer o pagamento de uma compra </b> </summary>

</details>

<details>
  <summary> <b> Cancelar uma compra </b> </summary>

</details>

<details>
  <summary> <b> Mostrar o histórico de compras do usuário </b> </summary>

</details>

<details>
  <summary> <b> Mostrar o carrinho </b> </summary>

</details>

<details>
  <summary> <b> Mostrar os dados do usuário </b> </summary>

</details>

<details>
  <summary> <b> Atualizar email do usuário </b> </summary>

</details>

<details>
  <summary> <b> Atualizar os dados do usuário </b> </summary>

</details>

<details>
  <summary> <b> Atualizar a senha do usuário </b> </summary>

</details>

<details>
  <summary> <b> Atualizar o número de telefone do usuário </b> </summary>

</details>

<details>
  <summary> <b> Desativar o usuário </b> </summary>

</details>

<details>
  <summary> <b> Remover usuário </b> </summary>

</details>

<details>
  <summary> <b> Recuperar todos os usuários </b> </summary>

</details>

### Serviços

---

## Purchase

### Casos de uso

<details>
  <summary> <b> Criar uma nova compra </b> </summary>

</details>

### Serviços

---

## Payments

### Casos de uso

<details>
  <summary> <b> Registrar um pagamento </b> </summary>

</details>

### Serviços
