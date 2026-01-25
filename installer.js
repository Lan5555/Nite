#!/usr/bin/env node

/**
 * NITE Project Installer
 * Usage: npx create-nite [projectName]
 */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { prompt } from "inquirer";
import { spawn } from "child_process";

// Get project name from CLI argument
// eslint-disable-next-line no-undef
const projectName = process.argv[2] || "nite-project";

/**
 * Helper to run shell commands cross-platform
 */
function runCommand(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: true
    });
    child.on("exit", code => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
}

(async function main() {
  console.log("\n🚀 NITE Project Installer\n");

  // Ask user installation details
  const answers = await prompt([
    {
      type: "input",
      name: "installPath",
      message: "Where should we install your project?",
      // eslint-disable-next-line no-undef
      default: join(process.cwd(), projectName)
    },
    {
      type: "confirm",
      name: "useTypeScript",
      message: "Do you want to use TypeScript?",
      default: false
    }
  ]);

  const installDir = answers.installPath;
  const useTypeScript = answers.useTypeScript;

  // Create folder if it doesn't exist
  if (!existsSync(installDir)) {
    mkdirSync(installDir, { recursive: true });
    console.log(`Created folder: ${installDir}`);
  }

  // Step 1: Initialize package.json if missing
  const packageJsonPath = join(installDir, "package.json");
  if (!existsSync(packageJsonPath)) {
    console.log("\n📦 Initializing npm project...");
    await runCommand("npm", ["init", "-y"], installDir);
  }

  // Step 2: Install Nite library
  const packageName = useTypeScript ? "nite-typescript" : "nj-library";
  console.log(`\n📥 Installing ${packageName}...`);
  await runCommand("npm", ["install", packageName], installDir);

  // Step 3: Optional TypeScript build (if TypeScript project)
  if (useTypeScript) {
    console.log("\n⚡ TypeScript project detected. Installing TypeScript...");
    await runCommand("npm", ["install", "--save-dev", "typescript", "@types/node"], installDir);
    console.log("✅ TypeScript installed. You can now create TS files in your project.");
  }

  console.log(`
🎉 Nite project installed successfully at: ${installDir}

Next steps:
1. cd ${installDir}
2. ${useTypeScript ? "Create a TypeScript file in your project" : "Create a JavaScript file in your project"}
3. Import Nite like this:

   import { Watch, createNode, Text, SetChild, HandleEvent } from '${packageName}';

Happy coding! 🚀
`);
})();
