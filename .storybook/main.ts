import type { StorybookConfig } from "@storybook/nextjs"
const config: StorybookConfig = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {},
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },
}
export default config
