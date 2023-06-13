export interface IDataValidation {
  validateCPF(cpf: string): Promise<string>;
  validateRG(rg: string): Promise<string>;
}
