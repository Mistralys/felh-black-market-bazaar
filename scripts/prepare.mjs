import { existsSync } from 'node:fs';

if (!existsSync('build.config.json')) {
  console.log('\n\u26a0 build.config.json not found. Copy .build.config.example.json and set your deployPath.\n');
}
