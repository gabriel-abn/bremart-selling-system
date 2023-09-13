export namespace IEmailSender {
  export type Params = {
    to: string;
    subject: string;
    template: string;
    params: Record<string, any>;
  };

  export type Result = void;
}

export interface IEmailSender {
  sendEmail: (params: IEmailSender.Params) => Promise<IEmailSender.Result>;
}
