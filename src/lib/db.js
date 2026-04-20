import fs from 'fs';
import path from 'path';

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

export const recordScan = (userId, stationId) => {
  const db = getDb();
  db.scans.push({
    userId,
    stationId,
    timestamp: new Date().toISOString()
  });
  saveDb(db);
};

export const getScansByUser = (userId) => {
  const db = getDb();
  return db.scans.filter(s => s.userId === userId);
};

export const clearUserSession = (userId) => {
  const db = getDb();
  db.scans = db.scans.filter(s => s.userId !== userId);
  saveDb(db);
};
