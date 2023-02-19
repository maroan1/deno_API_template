import { assertEquals, describe, it } from "../../../devDeps.ts";
import exampleService from "./example.service.ts";
describe("Example", () => {
  describe("sum", () => {
    it('adds two positive numbers', () => {
      const expected = 5;

      const actual = exampleService.sum(2, 3);

      assertEquals(actual, expected);
    });

    it('adds two negative numbers', () => {
      const expected = -5;

      const actual = exampleService.sum(-2, -3);

      assertEquals(actual, expected);
    });

    it('adds a positive and a negative number', () => {
      const expected = -1;

      const actual = exampleService.sum(-2, 1);

      assertEquals(actual, expected);
    });

    it('adds two decimal numbers', () => {
      const expected = 0.5;

      const actual = exampleService.sum(0.2, 0.3);

      assertEquals(actual, expected);
    });

    it('adds a number and zero', () => {
      const expected = 2;

      const actual = exampleService.sum(2, 0);

      assertEquals(actual, expected);
    });
  });
});
