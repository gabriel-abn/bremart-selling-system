import { IFreightService } from "@application/services/purchase";
import { Freight } from "@domain/entities";

export class FreightServiceSpy implements IFreightService {
  async calculate(): Promise<Freight> {
    return new Freight(50, 0, 0);
  }
}
