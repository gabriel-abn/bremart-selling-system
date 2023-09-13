import { IEmailSender } from "@application/protocols";

export class SpyEmailSender implements IEmailSender {
  params: IEmailSender.Params[] = [];

  async sendEmail(params: IEmailSender.Params): Promise<IEmailSender.Result> {
    this.params.push(params);
  }
}
