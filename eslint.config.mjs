import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;



// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
// import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// export default [
//   // Convert traditional ESLint configs to flat config
//   ...compat.extends("next/core-web-vitals", "next/typescript"),

//   {
//     plugins: {
//       "@typescript-eslint": eslintPluginTypescript,
//       "unused-imports": eslintPluginUnusedImports,
//     },
//     rules: {
//       // Turn off base rule to avoid duplicate warnings
//       "no-unused-vars": "off",

//       // TS-specific unused vars rule
//       "@typescript-eslint/no-unused-vars": [
//         "error",
//         { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
//       ],

//       // Plugin to remove unused imports
//       "unused-imports/no-unused-imports": "error",
//       "unused-imports/no-unused-vars": [
//         "warn",
//         {
//           vars: "all",
//           varsIgnorePattern: "^_",
//           args: "after-used",
//           argsIgnorePattern: "^_"
//         }
//       ],
//     },
//   },
// ];
