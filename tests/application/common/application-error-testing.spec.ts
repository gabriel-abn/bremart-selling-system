import { ApplicationError } from "@application/common";
import { describe, expect, it } from "vitest";

describe("Application error", () => {
  it("should return detailed error message", () => {
    expect(() => {
      throw new ApplicationError("Error message", "Use case name");
    }).toThrow("Use case name: Error message");
  });
});
