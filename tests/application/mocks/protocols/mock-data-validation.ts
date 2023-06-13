import { ApplicationError } from "@application/common";
import { IDataValidation } from "@application/protocols";

export class MockDataValidation implements IDataValidation {
  async validateCPF(cpf: string): Promise<string> {
    const valid = cpf.replaceAll("-", "").replaceAll(".", "");

    if (valid.length != 11) {
      throw new ApplicationError("CPF is invalid.", this.constructor.name);
    }

    return valid;
  }
  async validateRG(rg: string): Promise<string> {
    const valid = rg.replaceAll("-", "").replaceAll(".", "");

    if (valid.length != 8) {
      throw new ApplicationError("RG is invalid.", this.constructor.name);
    }

    return valid;
  }
}
