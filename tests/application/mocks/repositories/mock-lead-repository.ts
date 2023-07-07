import { ApplicationError } from "@application/common";
import { ILeadRepository } from "@application/repositories";
import { Lead, LeadProps } from "@domain/lead";

export class MockLeadRepository implements ILeadRepository {
  public items: Lead[] = [];

  async create(lead: Lead): Promise<{ id: string }> {
    this.items.push(lead);
    return { id: lead.id };
  }
  async findByPurchaseId(purchaseId: string): Promise<LeadProps> {
    const lead = this.items.find(
      (item) => item.props.purchaseId === purchaseId
    );

    if (!lead) {
      throw new ApplicationError("Lead not found.", "LeadRepository");
    }

    return lead.props;
  }
}
