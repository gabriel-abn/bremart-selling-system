import { IVoucherInterface } from "@application/protocols/apis";

export class MockVoucherValidator implements IVoucherInterface {
  async validateVoucher(
    voucher: string
  ): Promise<{ valid: boolean; discountAmount: number }> {
    if (voucher == "invalid") {
      return {
        valid: false,
        discountAmount: 0,
      };
    }

    return {
      valid: true,
      discountAmount: 0.15,
    };
  }
}
