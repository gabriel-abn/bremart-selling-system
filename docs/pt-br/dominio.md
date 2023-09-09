# Domínio

O domínio dessa aplicação se baseia em um sistema de vendas de uma plataforma de e-commerce, onde o usuário pode cadastrar produtos, categorias, marcas, etc. O usuário pode também realizar compras, adicionar produtos ao carrinho, etc.

## Entidades

> Todas as entidades abaixo herdam de uma classe abstrata base chamada `Entity`, que possui um atributo `id` que é o identificador único da entidade, as propriedades da classe filha, e propriedades de auditoria, como `createdAt` e `updatedAt`.

### User

Um **User** deve ter, no mínimo, os seguintes atributos:

```typescript
type UserProps = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthDate: Date;
  phone: string;
  addresses?: Address[];
  defaultAddress?: Address;
  shoppingCart?: Product[];
  purchaseHistory?: Purchase[];
  // Compras com o pagamento pendente
  // Compras com o pagamento aprovado e pendente de entrega
  // Compras com o pagamento aprovado e entregue
}
```

- Regras de negócio:
  - Os campos iniciais são o email e senha
  - A data de nascimento deve ser maior que 18 anos
  - A senha e o nome de usuário podem ser alterados
  - Um usuário pode ter vários endereços de entrega, porém apenas um endereço padrão
  - Se apenas um endereço for dado, ele será o padrão

---

### Address

```typescript
type Address = {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
```

O Address será um Value Object, ou seja, ele não terá um ID próprio, mas sim a base do ID do usuário que o possui. O ID do endereço terá como base o ID do usuário. O CEP será formatado como `00000-000`.

---

### Product

```typescript
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
}
```

O Product será uma entidade que não fará parte do CRUD dessa aplicação. Ele virá de outro microserviço, que será responsável por gerenciar os produtos.

---

### Purchase

```typescript
type Purchase = {
  products: Product[];
  userId: string;
  address: Address; 
  status?: PurchaseStatus;
  discountVoucher?: string;
  discountPercentage: number;
  discountValue: number;
  purchaseValue: number;
  freightValue: number;
  freightDiscountPercentage: number;
  freightDiscountValue: number;
  totalValue: number;
  deliveryStatus?: DeliveryStatus;
}

enum PurchaseStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PENDING_DELIVERY = 'PENDING_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

type DeliveryStatus = {
  purchaseId: string;
  trackingId: string;
  description: string;
  location: string;
}
```

Uma **Purchase** terá uma lista de produtos, um tipo de pagamento, um status, um valor de desconto e um valor total. Representa a compra de um usuário.

- Regras de negócio:
  - Sobre o valor da compra:
    - O valor total será inicialmente calculado com base na soma de todos os produtos na compra
    - Inicialmente, o valor total deve ser maior que 0
    - O cálculo final do valor total será o seguinte:
      `purchaseValue = purchaseValue * (1 - discountPercentage) - discountValue`
    - O valor do desconto deve ser maior ou igual a 0 e menor que o valor total
    - Se a porcentagem do desconto for 100%, o valor total deve ser 0
    - Se o valor total for maior que 300 e o pagamento for feito por pix, o desconto deve ser de 10%
  - Sobre o frete:
    - O valor do frete deve ser maior ou igual a 0
    - O cálculo do frete será o seguinte:
      `freightValue = freightValue * (1 - freightDiscountPercentage) - freightDiscountValue`
  - O cálculo do valor total será o seguinte:
    `totalValue = purchaseValue + freightValue`
  - Sobre o status:
    - O status da compra inicial deve ser `PENDING_PAYMENT`
  - Sobre o status de entrega:
    - O status de entrega deve ser `null` inicialmente
  
---

### Payment

```typescript
type Payment = {
  purchaseId: string;
  paymentType: PaymentType;
  status: PaymentStatus;
  value: number;
}

enum PaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BOLETO = 'BOLETO',
  PIX = 'PIX',
}

enum PaymentStatus {
  NOT_PAID = 'NOT_PAID',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
}
```

Um **Payment** representa um pagamento de uma compra. Ele terá um tipo de pagamento, um status e um valor.

- Regras de negócio:
  - Todo pagamento começa com o status `PENDING`
  - O tipo de pagamento deve ser um dos seguintes: `CREDIT_CARD`, `DEBIT_CARD`, `BOLETO` ou `PIX`
