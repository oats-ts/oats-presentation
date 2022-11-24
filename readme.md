# Oats demo - BudapestJS 2022 November

- More info and documentation: https://oats-ts.github.io/docs
- Presentation: https://docs.google.com/presentation/d/1OX4OVkWEMDeo0YMBMVTb-E44nwB9dTI_uPMyvXM-F3I

## Generating

- Ensure you have access to the `node` and `npm` commands
- Run `npm ci` to install dependencies
- Run `npm run oats` to generate the missing code

## Configuring Oats

- Check [oats.js](oats.js) for the configuration
- Create configuration using the [configuration editor](https://oats-ts.github.io/docs/editor)
- The source OpenAPI document is [book-store.json](book-store.json)

## Server side code

- Check [BookStoreApiImpl.ts](src/BookStoreApiImpl.ts) for the business logic
- Check [startBookStoreServer.ts](src/startBookStoreServer.ts) for how the server is assembled
- Run `npm start` for starting a standalone server

## Cliend side code

- Check [BookStore.test.ts](src/BookStore.test.ts) for tests using the client side SDK code to interact with the backend. This you can use this exact code in your frontend apps as well.
