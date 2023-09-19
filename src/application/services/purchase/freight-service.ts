import { Address, Freight } from "@domain/entities";

export interface IFreightService {
  calculate(address: Address): Promise<Freight>;
}
