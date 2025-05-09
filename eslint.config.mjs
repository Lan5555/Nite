import js from "@eslint/js";
import globals from "globals";
//import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"],
    rules:{
      'semi': ['error', 'always'], // Enforce semicolons at the end of statements
      'eqeqeq': ['error', 'always'], // Enforce strict equality (===)
      'no-unused-vars': 'warn', // Warn about variables that are declared but not used
      'indent': ['error', 2], // Enforce 2-space indentation
      'no-debugger': 'warn', // Warn if debugger statements are used
      'prefer-const': 'error', // Prefer `const` over `let` when variables are not reassigned
      'no-undef': 'error', // Disallow the use of undeclared variables
      '@typescript-eslint/no-unused-expressions': 'off', // Disable this if you're not using TypeScript
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  //tseslint.configs.recommended,
]);