import { IUUIDGenerator } from "@domain/common";

export class UUIDGeneratorMock implements IUUIDGenerator {
  generate() {
    return "UUID" + Math.floor(Math.random() * 100).toString() + "MOCK";
  }
}
