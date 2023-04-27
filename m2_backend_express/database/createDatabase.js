import db from './connection.js';

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") !== -1;
//const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    db.exec(`DROP TABLE users;`);
}

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
`);

// Seeding (DML)
if (isDeleteMode) {
    db.exec(`INSERT INTO users (username, password) VALUES ('aaa', '000');`);
}