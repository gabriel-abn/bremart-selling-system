import { ApplicationError } from "@application/common";
import { IDataValidation } from "@application/protocols/apis";

export class MockDataValidation implements IDataValidation {
  async validateCPF(cpf: string): Promise<string> {
    const valid = cpf.replaceAll("-", "").replaceAll(".", "");

    if (valid.length != 11 || cpf == "11100011100") {
      throw new ApplicationError("CPF is invalid.", "INVALID_CPF");
    }

    return valid;
  }
  async validateRG(rg: string): Promise<string> {
    const valid = rg.replaceAll("-", "").replaceAll(".", "");

    if (valid.length != 8 || rg == "12345678") {
      throw new ApplicationError("RG is invalid.", "INVALID_RG");
    }

    return valid;
  }

  async validateEmail(email: string): Promise<string> {
    if (!email.includes("@")) {
      throw new ApplicationError("Email is invalid.", "INVALID_EMAIL");
    }

    return email;
  }
}
