export interface IVoucherInterface {
  validateVoucher(
    voucher: string
  ): Promise<{ valid: boolean; discountAmount: number }>;
}
