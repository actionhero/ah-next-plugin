// learn more about the next.js app options here https://nextjs.org/docs/advanced-features/custom-server

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

export const DEFAULT = {
  next: (config) => {
    return {
      dev: process.env.NEXT_DEVELOPMENT_MODE
        ? process.env.NEXT_DEVELOPMENT_MODE === "false"
          ? false
          : true
        : env === "development",
      quiet: false,
    };
  },
};
