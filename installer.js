#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * NITE Framework Installer with TypeScript Option
 * Usage: npx create-nite [projectName]
 */

import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "nite-project";

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: true
    });

    p.on("exit", code => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed`));
    });
  });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(async () => {
  console.log(chalk.cyan("\n🌙 NITE CLI\n"));

  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "path",
        message: "Project folder:",
        default: path.join(process.cwd(), projectName)
      },
      {
        type: "list",
        name: "template",
        message: "Choose template:",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
          { name: "OOP (JS)", value: "oop" },
          { name: "TypeScript + OOP", value: "ts-oop" }
        ]
      }
    ]);

    const installPath = answers.path;
    const template = answers.template;

    console.log(chalk.blue("\n📦 Creating project..."));

    // 1. Copy selected template
    const templatePath = path.join(__dirname, "templates", template);
    copyDir(templatePath, installPath);

    console.log(chalk.green("✔ Template copied"));

    // 2. Install dependencies inside the NEW project
    console.log(chalk.blue("\n📦 Installing dependencies..."));
    await run("npm", ["install"], installPath);

    console.log(chalk.green("✔ Dependencies installed"));

    console.log(chalk.greenBright(`
✔ Project created successfully!

📁 Location: ${installPath}

Next steps:
  cd ${projectName}
  npm start
`));

  } catch (err) {
    console.error(chalk.red("\n✖ Installation failed:"));
    console.error(err);
  }
})();