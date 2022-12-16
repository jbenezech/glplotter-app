**_Work in progress_**

A demo application written in typescript that illustrates the integration of the [glplotter](https://github.com/jbenezech/glplotter) library in a React application.

The application can be packaged as a web app or as an Electron app.

Demo: https://demos.khlix.com/glplotter/react

# Prerequisites

This application uses _yarn v3_ and yarn workspaces.

# Get started

`yarn install`

## Start web app

`yarn web:start`

## Start electron app

`yarn electron:start`

# _TODO_

1. Tests
2. Tests
3. Tests

# Motivation

This is a simle demo app that aims to demonstrate the use of some librairies an techniques

## Libraries

- glplotter
- formik
- yup
- material-ui
- i18n

## Techniques

- Setting up a yarn workspace monorepo
- Sharing a React app between a Web and Electron app, with some platform-specific features
- Using shared workers to share a socket connection
- Using broadcast channels to communicate between workers
- Direct communication between electron windows using message ports
