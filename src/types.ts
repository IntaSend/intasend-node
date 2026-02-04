export interface ChargePayload {
  first_name: string;
  last_name: string;
  email: string;
  host: string;
  amount: number;
  currency: string;
  api_ref?: string;
  [key: string]: unknown;
}

export interface MpesaStkPushPayload {
  phone_number: string;
  name: string;
  email: string;
  amount: number;
  api_ref?: string;
  [key: string]: unknown;
}

export interface PayoutTransaction {
  name: string;
  account: number | string;
  amount: string;
  account_type?: string;
  account_reference?: string;
}

export type PayoutProvider =
  | 'MPESA-B2C'
  | 'MPESA-B2B'
  | 'PESALINK'
  | 'INTASEND'
  | 'AIRTIME';

export interface PayoutPayload {
  provider?: PayoutProvider;
  currency: string;
  requires_approval?: 'YES' | 'NO';
  transactions: PayoutTransaction[];
  [key: string]: unknown;
}

export interface CreateWalletPayload {
  label: string;
  wallet_type: string;
  currency: string;
  [key: string]: unknown;
}

export interface CreateRefundPayload {
  invoice: string;
  amount: number;
  reason: string;
  reason_details?: string;
  [key: string]: unknown;
}

export interface FundMpesaPayload {
  phone_number: string;
  name: string;
  email: string;
  amount: number;
  api_ref?: string;
  [key: string]: unknown;
}

export interface FundCheckoutPayload {
  first_name: string;
  last_name: string;
  email: string;
  host: string;
  amount: number;
  currency: string;
  api_ref?: string;
  [key: string]: unknown;
}
