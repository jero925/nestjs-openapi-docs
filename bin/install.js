#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const SKILL_NAME = 'nestjs-openapi-docs';
const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILES = ['SKILL.md', 'README.md', 'CHANGELOG.md', 'LICENSE'];

function printHelp() {
  console.log(`nestjs-openapi-docs

Installs the ${SKILL_NAME} agent skill.

Usage:
  npx nestjs-openapi-docs
  npx nestjs-openapi-docs --project <path>
  npx nestjs-openapi-docs --user
  npx nestjs-openapi-docs --target <path>
  npx nestjs-openapi-docs --help

Options:
  --project <path>  Install into <path>/.agents/skills/${SKILL_NAME}
  --user            Install into the current user's ~/.agents/skills/${SKILL_NAME}
  --target <path>   Install directly into a specific destination folder
  --force           Overwrite existing files
  --help            Show this help message

Default behavior:
  Installs into the current working directory as a project-level skill.
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const options = {
    project: null,
    user: false,
    target: null,
    force: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg.startsWith('--project=')) {
      options.project = arg.slice('--project='.length);
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = arg.slice('--target='.length);
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--user') {
      options.user = true;
      continue;
    }

    if (arg === '--force') {
      options.force = true;
      continue;
    }

    if (arg === '--project' || arg === '--target') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail(`${arg} requires a path value.`);
      }
      if (arg === '--project') {
        options.project = value;
      } else {
        options.target = value;
      }
      i += 1;
      continue;
    }

    fail(`Unknown argument: ${arg}`);
  }

  if (options.user && options.project) {
    fail('Use either --user or --project, not both.');
  }
  if (options.user && options.target) {
    fail('Use either --user or --target, not both.');
  }
  if (options.project && options.target) {
    fail('Use either --project or --target, not both.');
  }

  return options;
}

function resolveDestination(options) {
  if (options.target) {
    return path.resolve(options.target);
  }

  if (options.user) {
    return path.join(os.homedir(), '.agents', 'skills', SKILL_NAME);
  }

  const projectRoot = path.resolve(options.project || process.cwd());
  return path.join(projectRoot, '.agents', 'skills', SKILL_NAME);
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(sourcePath, destinationPath, force) {
  if (!force && fs.existsSync(destinationPath)) {
    fail(`File already exists: ${destinationPath}. Re-run with --force to overwrite.`);
  }

  fs.copyFileSync(sourcePath, destinationPath);
}

function install(options) {
  const destinationDir = resolveDestination(options);
  ensureDirectory(destinationDir);

  for (const fileName of SOURCE_FILES) {
    const sourcePath = path.join(ROOT_DIR, fileName);
    const destinationPath = path.join(destinationDir, fileName);
    copyFile(sourcePath, destinationPath, options.force);
  }

  console.log(`Installed ${SKILL_NAME} to:`);
  console.log(destinationDir);
  console.log('');
  console.log('Installed files:');
  for (const fileName of SOURCE_FILES) {
    console.log(`- ${fileName}`);
  }
}

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

install(options);
