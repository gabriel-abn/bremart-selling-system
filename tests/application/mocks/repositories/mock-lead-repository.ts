import { ILeadRepository } from "@application/repositories";
import { Lead, LeadProps } from "@domain/lead";

export class MockLeadRepository implements ILeadRepository {
  public items: Lead[] = [];

  async create(lead: Lead): Promise<{ id: string }> {
    this.items.push(lead);
    return { id: lead.id };
  }
  async findByPurchaseId(purchaseId: string): Promise<LeadProps> {
    return this.items.find((item) => item.props.id === purchaseId).props;
  }
}
