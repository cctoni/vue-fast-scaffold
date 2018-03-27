const vueApi = require("./vueBasics");

const generateTest = componentName => {
  // TODO: generate an inital test
};

const getFileByName = args => {
  const array = args.split(`/`);

  return array[array.length - 1];
};

const getOptionsByName = options => {
  const currentOptions = options.split(`,`);

  let allOptions = ``;

  for (let option in currentOptions) {
    let apiMethod = vueApi[currentOptions[option]];

    if (apiMethod !== undefined) {
      allOptions = allOptions.concat(apiMethod + `,\n\n`);
    }
  }

  // remove any hanging comas from our options array
  return allOptions.substring(0, allOptions.length - 3);
};

const removeExtension = name => {
  return name.split(`.`)[0];
};

const addPadding = (lines, spaces) => {
  const lineByLine = lines.split(`\n`);
  let running = ``;

  for (let line in lineByLine) {
    running = running.concat(new Array(spaces).join(``) + lineByLine[line]);

    if (parseInt(line) === lineByLine.length - 1) {
      // do nothing
    } else {
      running += `\n`;
    }
  }

  return running;
};

const template = (name, options) => {
  if (options !== undefined) {
    options = options.length === 0 ? undefined : options;
  }

  const currentTemplate = `
        <template>
            <div></div>
        </template>
        
        <script>
            export default {
                name: '${name}$'${
    options !== undefined ? ",\n\n" + addPadding(options, 5) : ""
  }
            }
        </script>
        
        <style scoped>
        </style>
    `;

  return currentTemplate;
};

const testTemplate = name => {
  const currentTestTemplate = `
        import { shallow } from '@vue/test-utils'
        import ${name} from './${name}'

        describe(${name}, () => {
            it('renders', () => {
                const wrapper = shallow(${name})
            })
        })
    `;

  return currentTestTemplate;
};

exports.getFilename = getFileByName;
exports.template = template;
exports.testTemplate = testTemplate;
exports.removeExtension = removeExtension;
exports.getOptionsByName = getOptionsByName;
