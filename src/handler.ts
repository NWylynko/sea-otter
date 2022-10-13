import { Router } from "./app";
import { Handler } from "./servers";

export const handler = (router: Router) => {
  const x: Handler = (props) => {
    const route = router.find("GET", "/");

    if (!route) {
      throw new Error(`Route not found`);
    }

    if (props.runtime === "node") {
      const response = route.handler(props.conn.req, props.conn.res, {}, {}, {});

      console.log(response);
    }

    return new Response("hello");
  };
  return x;
};
