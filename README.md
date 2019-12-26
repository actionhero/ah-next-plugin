# AH-Next-Plugin

For booting a Next.JS React application inside of Actionhero.

## Why?

Actionhero is a great server framework. Next.js is a great react+frontend framework. If you wan to have one server to run both your API and HTML frontend, this project is for you?

## How?

This project works by creating an action which, when requested by a client over HTTP, passes the connection over to Next for rendering. We use an Actionhero initializer to configure the routes and Next.js server.

## Configuration

Your project will likely be configured with an `api` and `web` directory at the top level. The `api` directory would be the Actionhero project, and `web` would be the next project. Since Actionhero and Next have different ways of transpiling typescript (Actionhero use `typescript` while Next.js users `Babel` to handle `.tsx` files), it is important to have these 2 directories separate for the `build` step. This project's layout is a good example of this.

The `web` directory is a normal Next.JS project. No changes are needed.

To configure your Actionhero server to also run Next:

1. Add this plugin to your actionhero project `npm install ah-next-plugin` Ensure you also `npm install next react react-com @types/react-dom`. These are peer dependencies of this project:

2. Include it in your `config/plugins.ts`.

```ts
import { join } from "path";

export const DEFAULT = {
  plugins: () => {
    return {
      "ah-next-plugin": {
        path: join(__dirname, "..", "node_modules", "ah-next-plugin")
      }
    };
  }
};
```

3. Change your default route in `config/servers/web.ts` to be "api" rather than "file" (we want to pass all file handling over to next)
4. Change the location of `config.general.paths.public` (in `config/servers/api.ts`) to the public directory in your next.js project. Be sure to make this an array with one entry, for example: `[path.join(process.cwd(), "..", "web", "public")]`)
5. Create a new `config.general.paths.next` (in `config/servers/api.ts`) to the location of your next.js project. Be sure to make this an array with one entry, for example: `[path.join(process.cwd(), "..", "web")]`)

That's it! Now if you visit the root URL of your Actionhero project, you will see Next rendering the contents of `pages/index.ts`!

## Deployment

In the `build` step of your project, be sure to also compile the next.js project. An example of the scripts from a `package.json`, which is uses yarn to test, lint, build, and run a project like this is below:

```json
{
  "scripts": {
    "build": "yarn build-api && yarn build-web",
    "build-api": "cd api && rm -rf dist && tsc --declaration",
    "build-web": "cd web && next build",
    "start": "cd api && actionhero start",
    "dev": "cd api && ts-node-dev --transpile-only --ignore-watch=\"../web\" --no-deps --notify=false ./../node_modules/.bin/actionhero start",
    "test": "yarn test-api && yarn test-web",
    "pretest": "yarn lint && yarn build",
    "test-api": "cd api && jest",
    "test-web": "cd web && jest",
    "lint": "yarn lint-api && yarn lint-web",
    "lint-api": "cd api && prettier --check src/**/*.ts __tests__/**/*.ts",
    "lint-web": "cd web && prettier --check pages/**/*.tsx components/**/*.tsx __tests__/**/*.tsx"
  }
}
```
