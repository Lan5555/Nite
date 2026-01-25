#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * NITE Project Installer
 * Usage: npx create-nite [projectName]
 */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { spawn } from "child_process";

const projectName = process.argv[2] || "nite-project";

const log = {
  title: msg => console.log(chalk.cyanBright(`\n${msg}`)),
  info: msg => console.log(chalk.blue(`ℹ ${msg}`)),
  success: msg => console.log(chalk.green(`✔ ${msg}`)),
  warn: msg => console.log(chalk.yellow(`⚠ ${msg}`)),
  error: msg => console.log(chalk.red(`✖ ${msg}`))
};

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
  log.title("🚀 NITE Project Installer");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "installPath",
      message: "Where should we install your project?",
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

  if (!existsSync(installDir)) {
    mkdirSync(installDir, { recursive: true });
    log.success(`Created folder: ${installDir}`);
  } else {
    log.info(`Using existing folder: ${installDir}`);
  }

  const packageJsonPath = join(installDir, "package.json");
  if (!existsSync(packageJsonPath)) {
    log.info("Initializing npm project...");
    await runCommand("npm", ["init", "-y"], installDir);
    log.success("package.json created");
  }

  const packageName = useTypeScript ? "nite-typescript" : "nj-library";
  log.info(`Installing ${chalk.bold(packageName)}...`);
  await runCommand("npm", ["install", packageName], installDir);
  log.success(`${packageName} installed`);

  if (useTypeScript) {
    log.info("Installing TypeScript dependencies...");
    await runCommand("npm", ["install", "--save-dev", "typescript", "@types/node"], installDir);
    log.success("TypeScript ready");
  }

  console.log(chalk.greenBright(`
🎉 Nite project installed successfully!

📁 Location: ${installDir}

Next steps:
  cd ${installDir}
  import { Watch, createNode, Text, SetChild, HandleEvent } from '${packageName}';

Happy coding with Nite 🌙
`));
})();
