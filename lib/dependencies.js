const { execSync } = require('child_process');

// ─── Get current Node major version ──────────────────────────────────────────

const getNodeMajor = () => {
    return parseInt(process.versions.node.split('.')[0], 10);
};

// ─── Get latest version of a package compatible with current Node ─────────────

const getLatestVersion = (packageName) => {
    try {
        const version = execSync(`npm show ${packageName} version`, { stdio: 'pipe' })
            .toString()
            .trim();
        return version;
    } catch {
        return null;
    }
};

// ─── Fetch latest versions for all packages in parallel ──────────────────────

const resolveLatestVersions = (packages) => {
    console.log('\n🔍 Resolving latest compatible package versions...\n');
    const resolved = {};
    for (const pkg of packages) {
        try {
            const version = getLatestVersion(pkg);
            if (version) {
                resolved[pkg] = `^${version}`;
                console.log(`  ✔ ${pkg}@${version}`);
            } else {
                resolved[pkg] = 'latest';
                console.log(`  ⚠ ${pkg} → fallback to latest`);
            }
        } catch {
            resolved[pkg] = 'latest';
        }
    }
    return resolved;
};

// ─── Basic install ────────────────────────────────────────────────────────────

const installDependencies = (dbDependencies) => {
    console.log('\n📦 Installing dependencies...');
    const commonDependencies = ['express', 'ws', 'dotenv'];
    const dbPackages = Object.keys(dbDependencies);
    execSync(`npm install ${[...commonDependencies, ...dbPackages].join(' ')}`, { stdio: 'inherit' });
    execSync('npm install --save-dev nodemon', { stdio: 'inherit' });
    console.log('\n✅ Dependencies installed successfully.');
};

// ─── Advanced install ─────────────────────────────────────────────────────────

const installAdvancedDependencies = (dbChoice) => {
    const nodeMajor = getNodeMajor();
    console.log(`\n🖥  Detected Node.js v${process.versions.node} (major: ${nodeMajor})`);

    // ── Runtime deps ──────────────────────────────────────────────────────────
    const depNames = [
        'express',
        'cors',
        'dotenv',
        'cookie-parser',
        'bcryptjs',
        'jsonwebtoken',
        'zod',
        'multer',
        'nodemailer',
        'node-cache',
        'axios',
        'winston',
        'winston-daily-rotate-file',
        'morgan',
    ];
    if (dbChoice === 'mongodb') depNames.push('mongoose');
    if (dbChoice === 'postgresql') depNames.push('@prisma/client', '@prisma/adapter-pg', 'pg');

    // ── Dev deps ──────────────────────────────────────────────────────────────
    const devDepNames = [
        'nodemon',
        'typescript',
        'ts-node-dev',
        '@types/express',
        '@types/cors',
        '@types/cookie-parser',
        '@types/bcryptjs',
        '@types/jsonwebtoken',
        '@types/multer',
        '@types/nodemailer',
        '@types/morgan',
        '@types/node',
        'eslint',
        'prettier',
        'typescript-eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
    ];
    if (dbChoice === 'postgresql') devDepNames.push('prisma');

    // ── Resolve latest versions ───────────────────────────────────────────────
    const resolvedDeps = resolveLatestVersions(depNames);
    const resolvedDevDeps = resolveLatestVersions(devDepNames);

    // ── Write resolved versions into package.json ─────────────────────────────
    const fs = require('fs');
    const path = require('path');
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    pkg.dependencies = { ...pkg.dependencies, ...resolvedDeps };
    pkg.devDependencies = { ...pkg.devDependencies, ...resolvedDevDeps };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('\n✅ package.json updated with resolved versions');

    // ── Install ───────────────────────────────────────────────────────────────
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    if (dbChoice === 'postgresql') {
        console.log('\n🔧 Initializing Prisma...');
        execSync('npx prisma generate', { stdio: 'inherit' });
    }

    console.log('\n✅ All dependencies installed successfully.');
};

module.exports = { getLatestVersion, resolveLatestVersions, installDependencies, installAdvancedDependencies };
