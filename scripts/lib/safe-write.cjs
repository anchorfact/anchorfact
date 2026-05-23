/**
 * Safe atomic file write — write to temp then rename.
 *
 * @module safe-write
 *
 * Why: Node's `writeFileSync` can corrupt files if the process
 * crashes mid-write. This ensures either the old file stays intact
 * or the new file is complete on disk.
 *
 * Usage:
 *   const { writeFileAtomic, writeFileAtomicWithBackup } = require('./lib/safe-write.cjs');
 *   writeFileAtomic('/path/to/file.md', content);
 *   writeFileAtomicWithBackup('/path/to/file.md', content, '.backups');
 */

const fs = require('fs');
const path = require('path');

/**
 * Write content to a file atomically (write → fsync → rename).
 *
 * @param {string} filepath - Absolute or relative path to target file
 * @param {string} content - File content to write
 * @param {object} [opts] - Options
 * @param {string} [opts.encoding='utf8'] - File encoding
 * @param {string} [opts.tmpDir] - Custom temp directory (default: same as target)
 * @returns {boolean} true on success
 * @throws {Error} on I/O failure (target file is NOT modified on error)
 */
function writeFileAtomic(filepath, content, opts = {}) {
  const encoding = opts.encoding || 'utf8';
  const dir = opts.tmpDir || path.dirname(filepath);
  const tmp = path.join(dir, `.tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);

  try {
    // Write to temp
    fs.writeFileSync(tmp, content, encoding);
    // Ensure it's flushed to disk (skip fsync on Windows — not supported on read-only fds)
    if (process.platform !== 'win32') {
      const fd = fs.openSync(tmp, 'r');
      fs.fsyncSync(fd);
      fs.closeSync(fd);
    }
    // Atomic rename (same filesystem = instant)
    fs.renameSync(tmp, filepath);
    return true;
  } catch (e) {
    // Clean up temp on failure
    try { fs.unlinkSync(tmp); } catch (_) { /* ignore */ }
    throw e;
  }
}

/**
 * Write atomically with automatic backup of the previous version.
 *
 * @param {string} filepath - Target file
 * @param {string} content - New content
 * @param {object|string} [opts] - Options object, or backup directory as string
 * @param {string} [opts.backupDir='.backups'] - Where to store backups
 * @param {number} [opts.maxBackups=5] - Keep at most N backups
 * @param {string} [opts.encoding='utf8'] - File encoding
 * @returns {boolean} true on success
 */
function writeFileAtomicWithBackup(filepath, content, opts = {}) {
  if (typeof opts === 'string') opts = { backupDir: opts };
  const backupDir = opts.backupDir || '.backups';
  const maxBackups = opts.maxBackups || 5;
  const encoding = opts.encoding || 'utf8';

  // Create backup of existing file
  if (fs.existsSync(filepath)) {
    try {
      const old = fs.readFileSync(filepath, encoding);
      if (old !== content) {
        // Ensure backup dir exists
        if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

        const base = path.basename(filepath);
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backup = path.join(backupDir, `${base}.${stamp}.bak`);
        fs.writeFileSync(backup, old, encoding);

        // Rotate old backups
        const backups = fs.readdirSync(backupDir)
          .filter(f => f.startsWith(base + '.') && f.endsWith('.bak'))
          .sort()
          .reverse();
        for (let i = backups.length - 1; i >= maxBackups - 1; i--) {
          try { fs.unlinkSync(path.join(backupDir, backups[i])); } catch (_) { /* ignore */ }
        }
      }
    } catch (_) { /* backup is best-effort */ }
  }

  return writeFileAtomic(filepath, content, { encoding });
}

module.exports = { writeFileAtomic, writeFileAtomicWithBackup };
