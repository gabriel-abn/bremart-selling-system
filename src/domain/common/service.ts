export interface Service<Params, Result> {
  execute: (data: Params) => Promise<Result>;
}
