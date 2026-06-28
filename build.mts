import { bundle } from "lightningcss";
import fs from "node:fs";
import path from "node:path";

const variants = fs.globSync("themes/elmer-*.css");

for (const variant of variants) {
  const { code } = bundle({
    filename: variant,
    minify: false,
  });
  fs.writeFileSync(path.join("dist", path.basename(variant)), code, "utf-8");
}
