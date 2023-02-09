import { assertEquals, describe, it } from "../../../devDeps.ts";
import exampleService from "./example.service.ts";
describe("Example", () => {
  describe("sum", () => {
    it("should return the sum of two numbers", () => {
      const result1 = exampleService.sum(1, 2);
      const result2 = exampleService.sum(2, -20);
      const result3 = exampleService.sum(0, 0);
      const result4 = exampleService.sum(0, 1.5);
      const result5 = exampleService.sum(1.5, 0);
      const result6 = exampleService.sum(1.5, 1.5);
      const result7 = exampleService.sum(-1.5, -1.5);
      const result8 = exampleService.sum(160, 68);

      assertEquals(result1, 3);
      assertEquals(result2, -18);
      assertEquals(result3, 0);
      assertEquals(result4, 1.5);
      assertEquals(result5, 1.5);
      assertEquals(result6, 3);
      assertEquals(result7, -3);
      assertEquals(result8, 228);
    });
  });
});
