import { execSync } from "child_process";
import * as path from "path";
import { glob } from "glob";

async function main() {
  const scriptDir = path.join(__dirname, "scripts");
  const files = await glob(`${scriptDir}/**/*.ts`);

  for (const file of files) {
    console.log(`Running ${path.basename(file)}...`);
    try {
      execSync(`bun ${file}`, { stdio: "inherit" });
      console.log(`${path.basename(file)} completed successfully.`);
    } catch (error) {
      console.error(`Error running ${path.basename(file)}:`, error);
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error("Error in update-all:", error);
  process.exit(1);
});
