import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

// Production (Vercel): scans are stored in Upstash Redis, one list per user.
// Local dev without Redis credentials: falls back to data/db.json.
// The Vercel Marketplace integration may expose either naming scheme.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const scansKey = (userId) => `scans:${userId}`;

// --- Local JSON file fallback ---

const dataDir = path.join(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'db.json');

const initDb = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ scans: [] }, null, 2));
  }
};

const getDb = () => {
  initDb();
  try {
    return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  } catch (e) {
    return { scans: [] };
  }
};

const saveDb = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};

// --- Public API ---

export const recordScan = async (userId, stationId) => {
  const scan = { userId, stationId, timestamp: new Date().toISOString() };

  if (redis) {
    await redis.rpush(scansKey(userId), scan);
    return;
  }

  const db = getDb();
  db.scans.push(scan);
  saveDb(db);
};

export const getScansByUser = async (userId) => {
  if (redis) {
    return await redis.lrange(scansKey(userId), 0, -1);
  }

  const db = getDb();
  return db.scans.filter(s => s.userId === userId);
};

export const clearUserSession = async (userId) => {
  if (redis) {
    await redis.del(scansKey(userId));
    return;
  }

  const db = getDb();
  db.scans = db.scans.filter(s => s.userId !== userId);
  saveDb(db);
};
