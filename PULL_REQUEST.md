# feat: Rewrite SDK in TypeScript with full type definitions

## Summary

Complete rewrite of the IntaSend Node.js SDK from JavaScript to TypeScript, providing full type safety, improved developer experience, and IDE autocompletion.

## Changes

### New Features
- Full TypeScript source with strict mode enabled
- Strongly typed interfaces for all API payloads (`ChargePayload`, `PayoutPayload`, etc.)
- IntelliSense/autocomplete support in modern IDEs
- Type declarations (`.d.ts`) generated and published automatically

### Improvements
- Typed method signatures across all service classes
- Generic `send<T>()` method on the HTTP client for typed responses
- Cleaner module structure with centralized type definitions

### API Coverage
- **Collection** - M-Pesa STK Push, checkout, payment status
- **Payouts** - M-Pesa B2C/B2B, bank transfers, airtime, IntaSend transfers
- **Wallets** - Create, list, get, transactions, intra-transfer, funding
- **Refunds** - Create, list, get chargebacks

### Testing
- 74 unit tests across 6 test suites (Jest + ts-jest)
- Full `https` module mocking — no network calls required
- Coverage: client init, HTTP layer, collection, payouts, wallets, refunds

### Migration
This is a non-breaking change. Existing JavaScript users can continue using `const IntaSend = require('intasend-node')` without modifications, while TypeScript users gain full type safety.

---

## Usage Examples

### Initialize Client

```typescript
import IntaSend from 'intasend-node';

// Test mode
const intasend = new IntaSend('ISPubKey_test_xxx', 'ISSecretKey_test_xxx', true);

// Production mode
const intasend = new IntaSend('ISPubKey_live_xxx', 'ISSecretKey_live_xxx', false);
```

### Collection - M-Pesa STK Push

```typescript
const response = await intasend.collection().mpesaStkPush({
  phone_number: '254712345678',
  name: 'John Doe',
  email: 'john@example.com',
  amount: 100,
  api_ref: 'order-123',
});
```

### Collection - Checkout

```typescript
const checkout = await intasend.collection().charge({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  host: 'https://yoursite.com',
  amount: 1000,
  currency: 'KES',
  api_ref: 'order-456',
});
// Redirect customer to checkout.url
```

### Payouts - M-Pesa

```typescript
const payout = await intasend.payouts().mpesa({
  currency: 'KES',
  transactions: [
    { name: 'John Doe', account: '254712345678', amount: '500' },
  ],
});

// Approve payout
await intasend.payouts().approve(payout);
```

### Wallets

```typescript
// List wallets
const wallets = await intasend.wallets().list();

// Create wallet
const wallet = await intasend.wallets().create({
  label: 'Operations Wallet',
  wallet_type: 'WORKING',
  currency: 'KES',
});

// Get transactions
const transactions = await intasend.wallets().transactions('WALLET_ID');

// Intra-wallet transfer
await intasend.wallets().intraTransfer('SOURCE_ID', 'DEST_ID', 1000, 'Transfer');
```

### Refunds

```typescript
// Create refund
const refund = await intasend.refunds().create({
  invoice: 'INV-123',
  amount: 500,
  reason: 'CUSTOMER_REQUEST',
  reason_details: 'Customer cancelled order',
});

// List refunds
const refunds = await intasend.refunds().list();
```

---

## Type Definitions

All interfaces are exported for use in your TypeScript projects:

```typescript
import IntaSend, {
  ChargePayload,
  MpesaStkPushPayload,
  PayoutPayload,
  PayoutTransaction,
  PayoutProvider,
  CreateWalletPayload,
  CreateRefundPayload,
  FundMpesaPayload,
  FundCheckoutPayload,
} from 'intasend-node';
```

---

## Breaking Changes

None. This is a backward-compatible rewrite. Both `require()` and `import` patterns work.
