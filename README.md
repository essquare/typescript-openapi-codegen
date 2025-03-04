# Typescript OpenAPI Codegen - Fork of [OpenAPI Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)

[![NPM][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Coverage][coverage-image]][coverage-url]
[![Quality][quality-image]][quality-url]
[![Code Climate][climate-image]][climate-url]
[![Downloads][downloads-image]][downloads-url]
[![Build][build-image]][build-url]

> Node.js library that generates Typescript clients based on the OpenAPI specification.

## Why?
- Frontend ❤️ OpenAPI, but we do not want to use JAVA codegen in our builds
- Quick, lightweight, robust and framework-agnostic 🚀
- Supports generation of TypeScript clients
- Supports generations of Fetch, [Node-Fetch](#node-fetch-support), [Axios](#axios-support), [Angular](#angular-support) and XHR http clients
- Supports OpenAPI specification v2.0 and v3.0
- Supports JSON and YAML files for input
- Supports generation through CLI, Node.js and NPX
- Supports tsc and @babel/plugin-transform-typescript
- Supports aborting of requests (cancelable promise pattern)
- Supports external references using [json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser/)

## Install

```
npm i @essquare/typescript-openapi-codegen --save-dev
```

## Usage

```
$ openapi --help

  Usage: openapi [options]

  Options:
    -V, --version             output the version number
    -i, --input <value>       OpenAPI specification, can be a path, url or string content (required)
    -o, --output <value>      Output directory (required)
    -c, --client <value>      HTTP client to generate [fetch, xhr, node, axios, angular] (default: "fetch")
    --name <value>            Custom client class name
    --useOptions              Use options instead of arguments
    --useUnionTypes           Use union types instead of enums
    --exportCore <value>      Write core files to disk (default: true)
    --exportServices <value>  Write services to disk (default: true)
    --exportModels <value>    Write models to disk (default: true)
    --exportSchemas <value>   Write schemas to disk (default: false)
    --indent <value>          Indentation options [4, 2, tab] (default: "4")
    --postfix <value>         Service name postfix (default: "Service")
    --request <value>         Path to custom request file
    -h, --help                display help for command

  Examples
    $ openapi --input ./spec.json --output ./generated
    $ openapi --input ./spec.json --output ./generated --client xhr
```

Documentation
===
- [Basic usage](docs/basic-usage.md)
- [OpenAPI object](docs/openapi-object.md)
- [Client instances](docs/client-instances.md) `--name`
- [Argument vs. Object style](docs/arguments-vs-object-style.md) `--useOptions`
- [Enums vs. Union types](docs/enum-vs-union-types.md) `--useUnionTypes`
- [Runtime schemas](docs/runtime-schemas.md) `--exportSchemas`
- [Enum with custom names and descriptions](docs/custom-enums.md)
- [Nullable props (OpenAPI v2)](docs/nullable-props.md)
- [Authorization](docs/authorization.md)
- [External references](docs/external-references.md)
- [Canceling requests](docs/canceling-requests.md)
- [Custom request file](docs/custom-request-file.md)

Support
===
- [Babel support](docs/babel-support.md)
- [Axios support](docs/axios-support.md)
- [Angular support](docs/angular-support.md)
- [Node-Fetch support](docs/node-fetch-support.md)

[npm-url]: https://www.npmjs.com/package/@essquare/typescript-openapi-codegen
[npm-image]: https://img.shields.io/npm/v/@essquare/typescript-openapi-codegen.svg
[license-url]: LICENSE
[license-image]: https://img.shields.io/npm/l/@essquare/typescript-openapi-codegen.svg
[coverage-url]: https://codecov.io/gh/essquare/typescript-openapi-codegen
[coverage-image]: https://img.shields.io/codecov/c/github/essquare/typescript-openapi-codegen.svg
[quality-url]: https://lgtm.com/projects/g/essquare/typescript-openapi-codegen
[quality-image]: https://img.shields.io/lgtm/grade/javascript/g/essqure/typescript-openapi-codegen.svg
[climate-url]: https://codeclimate.com/github/essqure/typescript-openapi-codegen
[climate-image]: https://img.shields.io/codeclimate/maintainability/essqure/typescript-openapi-codegen.svg
[downloads-url]: http://npm-stat.com/charts.html?package=@essquare/typescript-codegen-openapi
[downloads-image]: http://img.shields.io/npm/dm/@essquare/typescript-openapi-codegen.svg
[build-url]: https://circleci.com/gh/essquare/typescript-openapi-codegen/tree/master
[build-image]: https://circleci.com/gh/essquare/typescript-openapi-codegen/tree/master.svg?style=svg
