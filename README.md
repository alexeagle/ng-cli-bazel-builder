# ng-cli-bazel-builder
Angular CLI builders that delegate to Bazel under-the-hood.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "bazel-cli-test": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "targets": {
        "build": {
          "builder": "bazel-cli-builders:build",
          "options": {
            "bazelCommand": "build",
            "watch": true,
            "targetLabel": "//src:src"
          },
        },
```
