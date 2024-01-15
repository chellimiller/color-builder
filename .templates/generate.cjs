#!/usr/bin/env node

const Mustache = require('mustache');
const fs = require('fs/promises');
const path = require('path');
const { words, capitalize, kebabCase } = require('lodash');

const PACKAGE_ROOT = path.dirname(__dirname);

/**
 * Converts a string value to PascalCase.
 *
 * @param {string} value
 * @returns {string}
 */
function toPascalCase(value) {
  return words(value).map(capitalize).join('');
}

/**
 * Converts a string value to PascalCase.
 *
 * @param {string} value
 * @returns {string}
 */
function toViewName(value) {
  const pascalCase = toPascalCase(value);
  return pascalCase.endsWith('View') ? pascalCase : `${pascalCase}View`;
}

/**
 * Loads the specified template.
 * Ignores sub-directories within the template.
 *
 * @param {string} name
 * @returns {Promise<{ name: string, content: string }[]>}
 */
async function loadTemplates(name) {
  const directory = path.join(__dirname, name);
  const files = (
    await fs.readdir(directory, {
      withFileTypes: true,
    })
  ).filter((item) => item.isFile());

  const templates = await Promise.all(
    files.map((file) =>
      fs
        .readFile(path.join(directory, file.name), { encoding: 'utf-8' })
        .then((content) => ({ name: file.name, content }))
    )
  );

  return templates;
}

require('yargs')
  .scriptName('generate')
  .usage('$0 <cmd> [args]')
  .command('component [name]', 'Generates a new UI component', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the component.',
        type: 'string',
        require: true,
        coerce: toPascalCase,
      });
      yargs.option('description', {
        describe: 'Description of the component. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: namePascalCase, description } = args;
      const nameKebabCase = kebabCase(namePascalCase);

      const name = {
        pascalCase: namePascalCase,
        kebabCase: nameKebabCase,
      };

      const templates = await loadTemplates('Component');

      const componentPath = path.join(
        PACKAGE_ROOT,
        'src',
        'ui',
        namePascalCase
      );

      await fs.mkdir(componentPath, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              componentPath,
              template.name
                .replace('Component', namePascalCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      console.log(`Successfully created ${namePascalCase}`);
    },
  })
  .command('view [name]', 'Generates a new view', {
    builder: (yargs) => {
      yargs.positional('name', {
        describe: 'The name of the view.',
        type: 'string',
        require: true,
        coerce: toViewName,
      });
      yargs.option('description', {
        describe: 'Description of the view. Will be used for JSDocs.',
        alias: 'd',
        type: 'string',
        default: '@todo Add description',
        require: false,
      });
    },
    handler: async (args) => {
      const { name: namePascalCase, description } = args;
      const nameKebabCase = `view-${kebabCase(namePascalCase)}`;

      const name = {
        pascalCase: namePascalCase,
        kebabCase: nameKebabCase,
      };

      const templates = await loadTemplates('View');

      const componentPath = path.join(
        PACKAGE_ROOT,
        'src',
        'views',
        namePascalCase
      );

      await fs.mkdir(componentPath, { recursive: true });

      await Promise.all(
        templates.map((template) =>
          fs.writeFile(
            path.join(
              componentPath,
              template.name
                .replace('View', namePascalCase)
                .replace(/\.mustache$/, '')
            ),
            Mustache.render(template.content, { name, description })
          )
        )
      );

      console.log(`Successfully created ${namePascalCase}`);
    },
  })
  .demandCommand(1, 'No command was specified')
  .strictCommands()
  .help()
  .alias('h', 'help')
  .alias('v', 'version').argv;
