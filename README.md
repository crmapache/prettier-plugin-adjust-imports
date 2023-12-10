# Prettier plugin sort react imports

A prettier plugins that change imports through the alias to relative if necessary.

### The Problem

When your IDE automatically imports any component or variable, it does not always do it well 
and often imports through a very long alias, something that lies very nearby in the same alias branch.
As a result import look ugly and can produce cyclic dependency.

### Solution

```javascript
// src/pages/admin/users/UsersView/UsersView.tsx

// before
import { UsersTable } from "@pages/admin/users/UsersView/components";

// after plugin do its job
import { UsersTable } from './components';
```

### Requirements

- ***src*** root folder
- ***tsconfig.json*** file in project root
- compilerOptions.paths with aliases in ***tsconfig.json*** file
- only ***ESM*** imports

### Install

```shell script
npm install -D prettier-plugin-adjust-imports
```

or, using yarn

```shell script
yarn add -D prettier-plugin-adjust-imports
```

### Usage
Add plugin in prettier config file.

```ecmascript 6
module.exports = {
  "plugins": ["prettier-plugin-adjust-imports"]
}
```
