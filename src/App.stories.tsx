import { ComponentStory, ComponentMeta } from "@storybook/react";
import App from "./App";
import {
  ReduxStoreProviderDecorator,
  HashRouterDecorator,
} from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "Todo/App",
  component: App,
  decorators: [ReduxStoreProviderDecorator, HashRouterDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppStory = Template.bind({});
