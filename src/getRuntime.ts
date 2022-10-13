export const getRuntime = () => {
  try {
    // @ts-ignore
    const runtime = process.argv0;

    if (runtime === "node") {
      return "node";
    } else {
      return "bun";
    }
  } catch (error: any) {
    if (error.message === "process is not defined") {
      return "deno";
    }

    throw error;
  }
};

export type Runtime = ReturnType<typeof getRuntime>;
