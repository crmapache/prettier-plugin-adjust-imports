# Prettier plugin adjust imports

A prettier plugin to sort import declarations through the alias to relative if necessary.

### The Problem

When your IDE automatically imports any component or variable, it does not always do it well 
and often imports through a very long alias, something that lies very nearby in the same alias branch.
As a result import look ugly and can produce cyclic dependency.

### Solution

```javascript
// src/pages/admin/users/UsersView/UsersView.tsx

// before
import { UsersTable } from "@pages/admin/users/UsersView/components";
import { UsersViewProps } from '@pages/admin/users/UsersView/UsersView.types';
import { RolesTable } from '@pages/admin/roles/RolesView/components';

// after plugin do its job
import { UsersTable } from './components';
import { UsersViewProps } from './UsersView.types';
import { RolesTable } from '../../roles/RolesView/components';
```

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

Add config to project root.  
It is not required. You can do it only if you need.

```ecmascript 6
// adjust-imports-plugin.config.json
```

```json
{
  "aliases": {
    "@shared": ["components/shared"],
    "@shared/*": ["components/shared/*"],
    "@features": ["components/features"],
    "@features/*": ["components/features/*"]
  },
  "ascendingDepth": 0,
  "descendingDepth": 0
}
```

| Name            | Required | Initial value | Description                                                                                  |
|-----------------|----------|---------------|----------------------------------------------------------------------------------------------|
| aliases         | false    | {}            | Your project aliases. You only need it if you don't have tsconfig.json in your project root. |
| ascendingDepth  | false    | 0             | The maximum degree of nesting above the source file. 0 means no limits.                      |
| descendingDepth | false    | 0             | The maximum degree of nesting below the source file. 0 means no limits.                      |
