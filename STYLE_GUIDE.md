# Coding Style

## JavaScript (React) Convention

React (Native) and JavaScript (Including Typescript), in general, follow different conventions, especially with React’s component naming.

1. File and Folder Names
    * Folder Names: Use kebab-case for all folder names to ensure consistency and readability.
    * File Names:
        * Use kebab-case for non-component files (like utility files, configuration files, etc.).
        * Use PascalCase specifically for component files (`.jsx` / `.tsx`) to differentiate them clearly as React components.
        * Don't repeat the folder name.

```bash
src/
└── components/
    └── user/
        └── Avatar.tsx # instead of UserAvatar
        └── Profile.tsx
└── utils/
    └── calculate.ts
```

2. Constant, Variable, and Function Names

    * **Constants**: Use UPPER_SNAKE_CASE for constant values that won’t change. This helps distinguish constants from other variables.
    * **Variables**: Use camelCase for variable names, which is standard in JavaScript and aligns with idiomatic code style.
    * **Functions**: Use camelCase for function names, as this is conventional in JavaScript. Avoid using snake_case for functions since camelCase is clearer and consistent with JavaScript style.
    * Use descriptive names to make code self-explanatory

```ts
// Constant
const API_BASE_URL = "https://api.example.com"; 

// Variable
let userName = "Alice";                         

// Function
const calculateTotal = (price, tax) => price + 
tax; 

```

3. Component Names
    * **Component Names**: Use PascalCase for all component names. This is the standard in React and helps distinguish components from regular functions.

```ts
// File: User.tsx
export const Profile = () => {
    return <div>User Profile</div>;
};

export const Settings = () => {
    return <div>User Settings</div>;
};
```

4. Type and Interface Names
    * **Type and Interface Names**: Use PascalCase for naming types and interfaces, following TypeScript conventions.

```ts
interface User {
    id: number;
    name: string;
}

interface UserProfileProps {
    user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return <div>{user.name}</div>;
};

```

5. Export and Import
    * **Use Named Export**s: Prefer named exports for components instead of default exports. Named exports make it easier to import specific components and help prevent accidental renaming during imports.

```ts
// @/componenets/custom/User.tsx
export const Profile = () => {
    return <div>User Profile</div>;
};

export const Settings = () => {
    return <div>User Settings</div>;
};

```

```ts
// index.tsx
export { Profile, Settings } from '@/componenets/custom/User.tsx';
```

6. Understand when to use a technique vs another (TODO: Make your own explanation)

    * Interface, type and generic
    * Arrow function vs `function` keyword
    * Hoisting

## General

* Write readable and maintainable code with meaningful variable names.
* Avoid large functions; break them down if necessary.
* Comment complex logic but avoid over-commenting obvious code.

| **Convention**        | **Go**                                            | **JavaScript / React**                                             |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| **File Names**        | `snake_case`                                      | `kebab-case` for non-components;<br /> `PascalCase` for components |
| **Folder Names**      | `snake_case`                                      | `kebab-case`                                                       |
| **Variable Names**    | `camelCase`                                       | `camelCase`                                                        |
| **Constant Names**    | `camelCase` (unexported), `PascalCase` (exported) | `UPPER_SNAKE_CASE`                                                 |
| **Function Names**    | `camelCase` (unexported), `PascalCase` (exported) | `camelCase`                                                        |
| **Component Names**   | N/A                                               | `PascalCase`                                                       |
| **Type Names**        | `PascalCase`                                      | `PascalCase`                                                       |
| **Interface Names**   | `PascalCase`                                      | `PascalCase`                                                       |
| **Custom Hook Names** | N/A                                               | `camelCase`, starts with `use`                                     |
| **Imports**           | N/A                                               | Named imports preferred, organized with index files                |
| **Exports**           | N/A                                               | Named exports preferred (no default)                               |
| **Package Naming**    | `lowercase`                                       | N/A                                                                |
