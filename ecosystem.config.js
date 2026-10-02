const path = require("path");
const fs = require("fs");

/**
 * Helper to safely load env variables from a file if dotenv is not present.
 */
function parseEnvFile(filePath) {
  const envObj = {};
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIdx = line.indexOf("=");
      if (eqIdx !== -1) {
        const key = line.slice(0, eqIdx).trim();
        let val = line.slice(eqIdx + 1).trim();
        // Remove surrounding quotes if present
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        envObj[key] = val;
      }
    }
  }
  return envObj;
}

// Read env files in hierarchical order: .env -> .env.production -> .env.local -> .env.production.local
const loadedEnv = {
  ...parseEnvFile(path.join(__dirname, ".env")),
  ...parseEnvFile(path.join(__dirname, ".env.production")),
  ...parseEnvFile(path.join(__dirname, ".env.local")),
  ...parseEnvFile(path.join(__dirname, ".env.production.local")),
};

module.exports = {
  apps: [
    {
      name: "vs-business",
      // Direct Next.js binary ensures clean process signals and avoids extra npm wrapper
      script: "node_modules/next/dist/bin/next",
      args: "start -p " + (loadedEnv.PORT || process.env.PORT || 3010),
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      // Default development environment
      env: {
        NODE_ENV: "development",
        PORT: 3010,
      },
      // Production environment activated via: pm2 start ecosystem.config.js --env production
      env_production: {
        NODE_ENV: "production",
        PORT: loadedEnv.PORT || 3010,
        ...loadedEnv,
      },
    },
  ],
};
