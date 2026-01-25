#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * NITE Framework Installer
 * Usage: npx create-nite [projectName]
 */

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

// ---------- ESM __dirname FIX (WINDOWS SAFE) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- CONFIG ----------
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

// ---------- LOGGER ----------
const log = {
  title: m => console.log(chalk.cyanBright(`\n${m}`)),
  info: m => console.log(chalk.blue(`ℹ ${m}`)),
  success: m => console.log(chalk.green(`✔ ${m}`)),
  error: m => console.log(chalk.red(`✖ ${m}`))
};

// ---------- HELPERS ----------
function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
    p.on("exit", code => (code === 0 ? resolve() : reject()));
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

// ---------- MAIN ----------
(async function main() {
  log.title("🌙 NITE Framework Installer");

  const { installPath } = await inquirer.prompt([
    {
      type: "input",
      name: "installPath",
      message: "Where should we install Nite?",
      default: path.join(process.cwd(), projectName)
    }
  ]);

  log.info("Copying framework files...");
  copyDir(__dirname, installPath);
  log.success("Files copied");

  log.info("Installing dependencies...");
  await run("npm", ["install"], installPath);
  log.success("Dependencies installed");

  console.log(chalk.greenBright(`
✅ Nite installed successfully!

📁 Location: ${installPath}

Next steps:
  cd ${installPath}
  npm install (if needed)
  start building with Nite 🌙
`));
})();
