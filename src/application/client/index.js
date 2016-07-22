/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 * The client-side entry point.
 */
/* global document, window, DEBUG */

import './polyfill'; // Apply polyfills
import debugLib from 'debug';
import React from 'react';
import { render } from 'react-dom';
import { createElementWithContext } from 'fluxible-addons-react';
// ref to universal pt of app
import app from 'application/app';

if (DEBUG) {
  window.React = React; // for chrome dev tool support
  debugLib.enable('*'); // show debug trail
}

const debug = debugLib('client');
// builds itself from all the stores, all the stores flattend into json
const dehydratedState = window.App; // sent from the server
// returns an error or fluxible context


debug('rehydrating app');
app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  if (DEBUG) {
    window.context = context;
  }

  debug('rendering app');
  render(
    createElementWithContext(context, {
      analytics: dehydratedState.analytics
    }),
    document.getElementById('application')
  );
});

//
