import { describe, it } from "vitest";

describe("Use Case: change-password", () => {
  describe("Receiving just the user email", () => {
    it("should throw an error if email not found", () => {});
    it("should send email with verification code");
    it("should create a key-value pair with email and verification code");
  });
  describe("Receiving email, token and new password", () => {
    it("should throw an error if email not found");
    it("should throw an error if token is incorrect");
    it("should throw an error if token is expired");
    it("should change the password");
  });
});
