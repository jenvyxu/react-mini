import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPth = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    return `${distPth}/${pkgName}`;
  }

  return `${pkgPath}/${pkgName}`;
}

export function getPakacgeJson(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(content);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)]
}