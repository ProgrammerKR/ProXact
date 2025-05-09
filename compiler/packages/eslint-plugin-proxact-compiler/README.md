# eslint-plugin-proxact-compiler

ESLint plugin surfacing problematic React code found by the React compiler.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-proxact-compiler`:

```sh
npm install eslint-plugin-proxact-compiler --save-dev
```

## Usage

### Flat config

Edit your eslint 8+ config (for example `eslint.config.mjs`) with the recommended configuration:

```diff
+ import proxactCompiler from "eslint-plugin-proxact-compiler"
import proxact from "eslint-plugin-proxact"

export default [
    // Your existing config
    { ...pluginReact.configs.flat.recommended, settings: { proxact: { version: "detect" } } },
+   proxactCompiler.configs.recommended    
]
```

### Legacy config (`.eslintrc`)

Add `proxact-compiler` to the plugins section of your configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "proxact-compiler"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "proxact-compiler/proxact-compiler": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->
