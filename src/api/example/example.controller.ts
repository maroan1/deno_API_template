import type { Context } from "../../../deps.ts";
import { Status } from "../../../deps.ts";
import testService from "./example.service.ts";

function later(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

const helloWorld = async ({ response }: Context) => {
  await later(2000);
  response.status = Status.OK;
  response.body = {
    message: "Hello World! Testing",
  };
};

const sum = ({ request, response }: Context) => {
  const a = request.url.searchParams.get("a");
  const b = request.url.searchParams.get("b");
  const result = testService.sum(Number(a), Number(b));
  response.status = Status.OK;
  response.body = {
    message: `${a} + ${b} = ${result}`,
  };
};

const sumPost = async ({ request, response }: Context) => {
  if (!request.hasBody) {
    response.status = Status.BadRequest;
    response.body = {
      message: "Invalid data",
    };
    return;
  }
  const { a, b } = await request.body().value;
  const result = testService.sum(a, b);

  response.status = Status.OK;
  response.body = {
    message: `${a} + ${b} = ${result}`,
  };
};

export default {
  helloWorld,
  sum,
  sumPost,
};
