#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * NITE Framework Installer with TypeScript Option
 * Usage: npx create-nite [projectName]
 */

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "nite-project";

const EXCLUDE = new Set([
  "node_modules",
  ".git",
  ".github",
  "installer.js",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  ".npmignore"
]);

const log = {
  title: m => console.log(chalk.cyanBright(`\n${m}`)),
  info: m => console.log(chalk.blue(`ℹ ${m}`)),
  success: m => console.log(chalk.green(`✔ ${m}`)),
  error: m => console.error(chalk.red(`✖ ${m}`))
};

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
    p.on("exit", code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`))));
  });
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(async function main() {
  log.title("🌙 NITE Framework Installer");

  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "installPath",
        message: "Where should we install Nite?",
        default: path.join(process.cwd(), projectName)
      },
      {
        type: "confirm",
        name: "useTypeScript",
        message: "Do you want to use TypeScript?",
        default: false
      },
      {
        type: "confirm",
        name: "useOOP",
        message: "Do you want to use OOP?",
        default: false
      },
    ]);

    const installPath = answers.installPath;
    const useTypeScript = answers.useTypeScript;
    const useOOP = answers.useOOP;

    log.info("Copying framework files...");
    copyDir(__dirname, installPath);
    log.success("Files copied");

    log.info("Installing framework dependencies...");
    let packageName = "nj-library";

    if (useTypeScript && useOOP) {
      packageName = "nite-typescript-oop";
    } else if (useTypeScript) {
      packageName = "nite-typescript";
    } else if (useOOP) {
      packageName = "nite-oop";
    }
    await run("npm", ["install", packageName], installPath);
    log.success(`${packageName} installed`);

    if (useTypeScript) {
      log.info("Installing TypeScript dev dependencies...");
      await run("npm", ["install", "--save-dev", "typescript", "@types/node"], installPath);
      log.success("TypeScript ready");
    }

    log.success("✅ Nite installed successfully!");
    console.log(chalk.greenBright(`
📁 Location: ${installPath}

Next steps:
  cd ${installPath}
  ${useTypeScript ? "Start creating TypeScript files" : "Start creating JavaScript files"}
  import { Watch, createNode, Text, SetChild, HandleEvent } from '${packageName}';
`));

  } catch (err) {
    log.error("Installation failed:");
    console.error(err);
    process.exit(1);
  }
})();
