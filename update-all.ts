import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const scriptDir = path.join(__dirname, "scripts");
  const files = fs.readdirSync(scriptDir);

  for (const file of files) {
    if (file.endsWith(".ts")) {
      const scriptPath = path.join(scriptDir, file);
      console.log(`Running ${file}...`);
      try {
        execSync(`bun ${scriptPath}`, { stdio: "inherit" });
        console.log(`${file} completed successfully.`);
      } catch (error) {
        console.error(`Error running ${file}:`, error);
        process.exit(1);
      }
    }
  }
}

main().catch((error) => {
  console.error("Error in update-all:", error);
  process.exit(1);
});
