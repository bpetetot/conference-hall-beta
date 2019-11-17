import { configure, addDecorator, addParameters } from '@storybook/react';

import React from 'react'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'styles'

addDecorator(story => (
  <div className="default-theme">{story()}</div>
));

configure(
  [
    require.context('../docs/app', false, /home\.story\.mdx$/),
    require.context('../docs/app', false, /install\.story\.mdx$/),
    require.context('../src', true, /\.story\.mdx$/),
    require.context('../docs', true, /\.story\.mdx$/),
  ],
  module
);
