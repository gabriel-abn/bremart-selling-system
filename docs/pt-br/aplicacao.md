<!-- markdownlint-disable md033 md024 -->

# Aplicação

## Casos de uso e Serviços

Os **casos de uso** serão os processos da aplicação os quais os atores serão:

- Usuário
- Administrador
- Sistema externo

Os **serviços** serão os *casos de uso* os quais o ator é o próprio sistema, ou seja, serão processos internos da aplicação.

Todo caso de uso ou serviço tem seus casos de erro e casos de sucesso. Os casos de erro devem ser identificados por um nome e uma descrição.

Exemplo:

- Caso de erro:
  - CPF já presente no repositório (`CPF_EXISTS`: "CPF já presente no repositório.")

---

## User

### Casos de uso

<details>
  <summary> <b> Registrar um novo usuário </b> </summary>

- DOING (User) register-user
- Receber nome, cpf, email, data de nascimento e telefone
  - Casos de erro:
    - CPF já presente no repositório (`CPF_EXISTS`: "CPF já presente no repositório.")
    - CPF inválido (`INVALID_CPF`: "CPF inválido.")
    - Email inválido (`INVALID_EMAIL`: "Email inválido.")
    - Formato da data de nascimento inválida (`INVALID_DATE_FORMAT`: "Formato da data de nascimento inválida.")
    - Telefone inválido (`INVALID_PHONE_NUMBER`: "Telefone inválido.")
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
    - Token expirado (`EXPIRED_TOKEN`: "Token expirado.")
    - Token não corresponde com o email do usuário (`INVALID_TOKEN`: "Token não corresponde com o email do usuário.")
    - Email inválido (`INVALID_EMAIL`: "Email inválido.")
    - Email já verificado (`EMAIL_ALREADY_VERIFIED`: "Email já verificado.")
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
    - Código expirado (`EXPIRED_CODE`: "Código expirado.")
    - Código não corresponde com o número de telefone do usuário (`INVALID_CODE`: "Código não corresponde com o número de telefone do usuário.")
    - Número de telefone inválido (`INVALID_PHONE_NUMBER`: "Número de telefone inválido.")
    - Número de telefone já verificado (`PHONE_NUMBER_ALREADY_VERIFIED`: "Número de telefone já verificado.")
- Caso de sucesso:
  - Email do usuário
  - Confirmação de verificação do número de telefone

</details>

<details>
  <summary> <b> Fazer Sign In </b> </summary>

- DOING (User) sign-in
- Receber nome, cpf, email, data de nascimento e telefone
  - Casos de erro:
    - CPF já presente no repositório (`CPF_EXISTS`: "CPF já presente no repositório.")
    - CPF inválido (`INVALID_CPF`: "CPF inválido.")
    - Email já presente no repositório (`EMAIL_EXISTS`: "Email já presente no repositório.")
    - Email inválido (`INVALID_EMAIL`: "Email inválido.")
    - Formato da data de nascimento inválida (`INVALID_DATE_FORMAT`: "Formato da data de nascimento inválida.")
    - Formato do telefone inválido (`INVALID_PHONE_NUMBER_FORMAT`: "Formato do telefone inválido.")
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
    - Email não encontrado (`EMAIL_NOT_FOUND`: "Email não encontrado.")
    - Email não verificado (`EMAIL_NOT_VERIFIED`: "Email não verificado.")
- Verificar se a senha informada e a senha descriptografada são iguais
  - Casos de erro:
    - Senha inválida (`INVALID_PASSWORD`: "Senha inválida.")
    - Usuário desativado (`USER_DISABLED`: "Usuário desativado.")
- Caso de sucesso:
  - Informações do usuário
  - Token de autenticação

</details>

<details>
  <summary> <b> Adicionar um endereço de entrega </b> </summary>

- DOING (User) add-address
- Receber o id do usuário e os dados do endereço
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Endereço já cadastrado (`ADDRESS_ALREADY_EXISTS`: "Endereço já cadastrado.")
    - Formato do endereço inválido (`INVALID_ADDRESS_FORMAT`: "Formato do endereço inválido.")
- Caso de sucesso:
  - ID do endereço criptografado

</details>

<details>
  <summary> <b> Adicionar um produto ao carrinho </b> </summary>

- TODO (User) add-product-to-cart
- Receber o id do usuário e os dados do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto indisponível (`PRODUCT_UNAVAILABLE`: "Produto indisponível.")
    - Produto já adicionado ao carrinho (`PRODUCT_ALREADY_ADDED`: "Produto já adicionado ao carrinho.")
    - Quantidade inválida (`INVALID_QUANTITY`: "Quantidade inválida.")
- Caso de sucesso:
  - Índice do produto no carrinho
  - Valor total do carrinho

</details>

<details>
  <summary> <b> Remover um produto do carrinho </b> </summary>

- TODO (User) remove-product-from-cart
- Receber o id do usuário e o id do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto não adicionado ao carrinho (`PRODUCT_NOT_ADDED`: "Produto não adicionado ao carrinho.")
- Caso de sucesso:
  - Valor total do carrinho

</details>

<details>
  <summary> <b> Finalizar uma compra, pegando os produtos do carrinho e criando uma nova compra </b> </summary>

- TODO (User) finish-purchase
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todos os produtos do carrinho
  - Casos de erro:
    - Carrinho vazio (`EMPTY_CART`: "Carrinho vazio.")
- Criar uma nova compra com os produtos do carrinho
- Caso de sucesso:
  - ID da compra criptografado
  - Valor total da compra

</details>

<details>
  <summary> <b> Fazer o pagamento de uma compra </b> </summary>

- TODO (User) pay-purchase
- Receber o id do usuário e o id da compra
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - ID da compra não encontrado (`PURCHASE_NOT_FOUND`: "ID da compra não encontrado.")
    - ID da compra não pertence ao usuário (`PURCHASE_NOT_BELONG_TO_USER`: "ID da compra não pertence ao usuário.")
- Verificar status da compra
  - Casos de erro:
    - Compra já paga (`PURCHASE_ALREADY_PAID`: "Compra já paga.")
    - Compra cancelada (`PURCHASE_CANCELED`: "Compra cancelada.")
- Acionar serviço de pagamento pelo método de pagamento escolhido
- Caso de sucesso:
  - ID da compra criptografado
  - Valor total da compra

</details>

<details>
  <summary> <b> Cancelar uma compra </b> </summary>

- TODO (User) cancel-purchase
- Receber o id do usuário e o id da compra
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - ID da compra não encontrado (`PURCHASE_NOT_FOUND`: "ID da compra não encontrado.")
    - ID da compra não pertence ao usuário (`PURCHASE_NOT_BELONG_TO_USER`: "ID da compra não pertence ao usuário.")
- Verificar status da compra
  - Casos de erro:
    - Compra já paga (`PURCHASE_ALREADY_PAID`: "Compra já paga.")
    - Compra já cancelada (`PURCHASE_CANCELED`: "Compra cancelada.")
- Caso de sucesso:
  - ID da compra criptografado
  - Data de cancelamento

</details>

<details>
  <summary> <b> Mostrar o histórico de compras do usuário </b> </summary>

- TODO (User) show-purchase-history
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todas as compras do usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Lista de compras

</details>

<details>
  <summary> <b> Mostrar o carrinho </b> </summary>

- TODO (User) show-cart
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todos os produtos do carrinho
- Caso de sucesso:
  - ID do usuário criptografado
  - Lista de produtos do carrinho

</details>

<details>
  <summary> <b> Mostrar os dados do usuário </b> </summary>

- TODO (User) get-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Caso de sucesso:
  - ID do usuário criptografado
  - Dados do usuário
    - Nome
    - CPF
    - Email
    - Data de nascimento
    - Telefone

</details>

<details>
  <summary> <b> Atualizar os dados do usuário </b> </summary>

- TODO (User) update-user
- Receber o id do usuário e os dados do usuário
  - Casos de erro:
    - ID do usuário não encontrado
    - Formato da data de nascimento inválida
    - Formato do telefone inválido

</details>

<details>
  <summary> <b> Alterar a senha do usuário </b> </summary>

- TODO (User) change-password
- Receber o email do usuário e um campo opcional contendo um token de verificação e a nova senha
- Se o caso de uso receber apenas o email do usuário:
  - Enviar um email para o usuário com um link para alterar a senha
    - Casos de erro:
      - Email não encontrado (`EMAIL_NOT_FOUND`: "Email não encontrado.")
  - Caso de sucesso:
    - Email do usuário
    - Token de verificação
    - Tempo máximo de espera para verificação do email
- Se o caso de uso receber o email do usuário, a senha e o token de verificação:
  - Verificar se o token corresponde com o email do usuário
    - Casos de erro:
      - Token expirado (`EXPIRED_TOKEN`: "Token expirado.")
      - Token não corresponde com o email do usuário (`INVALID_TOKEN`: "Token não corresponde com o email do usuário.")
      - Email inválido (`INVALID_EMAIL`: "Email inválido.")
  - Alterar a senha do usuário
    - Casos de erro:
      - Email não encontrado (`EMAIL_NOT_FOUND`: "Email não encontrado.")
  - Caso de sucesso:
    - Email do usuário
    - Senha criptografada

</details>

<details>
  <summary> <b> Atualizar o número de telefone do usuário </b> </summary>

- TODO (User) change-phone-number
- Receber o id do usuário e um campo opcional contendo um token de verificação e o novo número de telefone
- Se receber o id do usuário e o novo número de telefone
  - Enviar um código de verificação para o novo número de telefone
    - Casos de erro:
      - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
      - Formato do telefone inválido (`INVALID_PHONE_NUMBER_FORMAT`: "Formato do telefone inválido.")
  - Caso de sucesso:
    - Id do usuário criptografado
    - Token de verificação
    - Tempo máximo de espera para verificação do número de telefone
- Se receber o id do usuário, o novo número de telefone e o token de verificação
  - Verificar se o código corresponde com o número de telefone do usuário
    - Casos de erro:
      - Código expirado (`EXPIRED_CODE`: "Código expirado.")
      - Código não corresponde com o número de telefone do usuário (`INVALID_CODE`: "Código não corresponde com o número de telefone do usuário.")
      - Número de telefone inválido (`INVALID_PHONE_NUMBER`: "Número de telefone inválido.")
  - Alterar o número de telefone do usuário
    - Casos de erro:
      - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
      - Formato do telefone inválido (`INVALID_PHONE_NUMBER_FORMAT`: "Formato do telefone inválido.")
  - Caso de sucesso:
    - ID do usuário criptografado
    - Número de telefone

</details>

<details>
  <summary> <b> Desativar o usuário </b> </summary>

- TODO (User) disable-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Usuário já desativado (`USER_DISABLED`: "Usuário já desativado.")
- Desativar o usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário

</details>

<details>
  <summary> <b> Remover usuário </b> </summary>

- TODO (User) remove-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Remover o usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário

</details>

<details>
  <summary> <b> Recuperar todos os usuários </b> </summary>

- DOING (User) get-all-users
- Recuperar todos os usuários
- Caso de sucesso:
  - Lista de usuários

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
