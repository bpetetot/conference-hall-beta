import { configure, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';

import React from 'react'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'styles/themes/default.css'
import 'styles/components/input.css'

addDecorator(story => (
  <div className="default-theme">{story()}</div>
));

configure(
  [
    require.context('../docs', true, /\.story\.mdx$/),
    require.context('../src', true, /\.story\.mdx$/),
  ],
  module
);
