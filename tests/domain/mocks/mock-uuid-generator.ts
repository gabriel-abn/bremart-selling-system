import { IUUIDFactory } from "@domain/common";

export class UUIDGeneratorMock implements IUUIDFactory {
  generate() {
    return "UUID" + Math.floor(Math.random() * 100).toString() + "MOCK";
  }
}
