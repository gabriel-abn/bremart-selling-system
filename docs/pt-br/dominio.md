# Domínio

O domínio dessa aplicação se baseia em um sistema de vendas de uma plataforma de e-commerce, onde o usuário pode cadastrar produtos, categorias, marcas, etc. O usuário pode também realizar compras, adicionar produtos ao carrinho, etc.

## Entidades

> Todas as entidades abaixo herdam de uma classe abstrata base chamada `Entity`, que possui um atributo `id` que é o identificador único da entidade, as propriedades da classe filha, e propriedades de auditoria, como `createdAt` e `updatedAt`.

### User

O usuário é a entidade que representa o usuário da aplicação. Ele pode ser um cliente ou um administrador. Nesse serviço em específico, todo usuário é um cliente. A parte administrativa do negócio será tratada em outro serviço.

- **id**: Identificador único do usuário.
- **name**: Nome do usuário.
- **email**: Email do usuário.
- **password**: Senha do usuário.
- **birthdate**: Data de nascimento do usuário.
- **cpf**: CPF do usuário.
- **rg**: RG do usuário.
- **phone**: Telefone do usuário.

---

### Purchase

A entidade `Purchase` representa uma compra realizada por um usuário. Ela possui um relacionamento com a entidade `User`, que representa o usuário que realizou a compra, e com a entidade `PurchaseItem`, que representa os itens que foram comprados.

- **id**: Identificador único da compra.
- **userId**: Usuário que realizou a compra.
- **total**: Valor total da compra.
- **items**: Itens que foram comprados.
- **paymentType**: Tipo de pagamento da compra.

O campo `paymentType` representa um tipo de pagamento que pode ser utilizado em uma compra. Cada tipo de pagamento possui uma regra de negócio diferente que será tratada no momento da efetivação da compra, na entidade `Payment`.

---

### PurchaseItem

A entidade `PurchaseItem` representa um item que foi comprado por um usuário. Ela possui um relacionamento com a entidade `Product`, que representa o produto que foi comprado, e com a entidade `Purchase`, que representa a compra que o item foi comprado. A entidade `Product` não será detalhada nesse documento, pois ela pertence a outro serviço, logo, a entidade `PurchaseItem` possui apenas o identificador do produto que será recuperado através de uma chamada a um repositório.

- **id**: Identificador único do item.
- **productId**: Identificador do produto do item.
- **name**: Nome do produto.
- **quantity**: Quantidade do item.
- **price**: Preço do item.
- **uniqueDiscount**: Desconto único do item.

---

### Lead

A entidade `Lead` representa um lead que foi gerado por um usuário. Ela possui um relacionamento com a entidade `User`, que representa o usuário que gerou o lead, e com a entidade `Purchase`, que representa a compra que o lead foi gerado.

- **id**: Identificador único do lead.
- **userId**: Usuário que gerou o lead.
- **purchaseId**: Compra que o lead foi gerado.
- **paymentId**: Identificador do pagamento do lead.
- **discountCoupon**: Cupom de desconto do lead.
- **discountAmount**: Valor do desconto do lead.
- **status**: Status do lead.

---

### Payment

A entidade `Payment` representa um pagamento que foi realizado por um usuário. Ela possui um relacionamento com a entidade `Lead` que representa o lead que foi pago com a transação de pagamento.

- **id**: Identificador único do pagamento.
- **leadId**: Lead que foi pago.
- **type**: Tipo do pagamento.
- **status**: Status do pagamento.
- **amount**: Valor do pagamento.
- **paymentDate**: Data do pagamento.
