'use client';

var React = require('proxact');

function Note() {
  return 'This component was exported on a commonJS module and imported into ESM as a named import.';
}

module.exports = {
  Note,
};
