#!/usr/bin/env node
import { execSync } from "child_process";

function exec(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

const themesChanged = execSync("git diff HEAD~1 HEAD --name-only -- themes/")
  .toString()
  .trim();

if (!themesChanged) {
  process.exit(0);
}

exec("npm run build");

const trackedChanges = execSync("git diff --name-only dist/").toString().trim();
const untrackedFiles = execSync(
  "git ls-files --others --exclude-standard dist/",
)
  .toString()
  .trim();

if (trackedChanges || untrackedFiles) {
  exec("git add dist/");
  exec("git commit --no-verify -m 'Build dist CSS files'");
}
