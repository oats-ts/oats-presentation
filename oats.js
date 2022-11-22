const oats = require('@oats-ts/openapi')
const prettierOptions = require('./.prettierrc.json')

oats.generate({
  reader: oats.readers.file.json('book-store.json'),
  validator: oats.validator(),
  generator: oats.generator({
    nameProvider: oats.nameProviders.default(),
    pathProvider: oats.pathProviders.default('src/generated'),
    children: oats.presets.fullStack(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier(prettierOptions),
  }),
  plugins: [oats.loggers.simple()],
})
