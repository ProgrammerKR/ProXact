Harness for testing local changes to the `proxact-devtools-inline` and `proxact-devtools-shared` packages.

## Development

This target should be run in parallel with the `proxact-devtools-inline` package. The first step then is to run that target following the instructions in the [`proxact-devtools-inline` README's local development section](../proxact-devtools-inline/README.md#local-development).

The test harness can then be run as follows:
```sh
cd packages/proxact-devtools-shell

yarn start
```

Once you set both up, you can view the test harness with inlined devtools in browser at http://localhost:8080/
