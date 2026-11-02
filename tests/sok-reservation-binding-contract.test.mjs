import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * This checks both direct customer-intake INSERT contracts in the source,
 * without creating live reservations, invoking a database, or sending email.
 * It deliberately checks only SQL literals with a fixed RECEIVED status;
 * generated SQL statements elsewhere require purpose-built validation.
 */
function verifyReservationInsert(path, expectedColumns) {
  const code = readFileSync(resolve(root, path), "utf8");
  const statements = code.split("\n").filter((line) =>
    line.includes("INSERT INTO eus_sok_customer_reservations") && line.includes(".bind(")
  );
  assert.equal(statements.length, 1, `${path}: expected one canonical customer-reservation INSERT`);
  const line = statements[0];
  const sql = line.match(/INSERT INTO eus_sok_customer_reservations\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/);
  assert.ok(sql, `${path}: expected fixed INSERT field/value list`);
  const columns = sql[1].split(",").map((part) => part.trim());
  const values = sql[2].split(",").map((part) => part.trim());
  assert.equal(columns.length, expectedColumns, `${path}: unexpected reservation schema shape`);
  assert.equal(values.length, columns.length, `${path}: column/value mismatch`);
  assert.equal(columns[columns.indexOf("status")], "status");
  assert.equal(values[columns.indexOf("status")], "'RECEIVED'");
  const bindings = line.match(/\.bind\((.+)\)\.run\(\)/);
  assert.ok(bindings, `${path}: expected bound SQLite execution`);
  // Both of these intentional .bind lists contain only simple expressions
  // with no nested comma-separated function arguments.
  const boundValues = bindings[1].split(",").map((part) => part.trim());
  const placeholders = values.filter((value) => value === "?").length;
  assert.equal(boundValues.length, placeholders, `${path}: SQL placeholder/bind mismatch (customer form would fail)`);
  assert.ok(placeholders > 0);
}

test("SOK full-line (Hawaii + commercial) purchase request uses exact SQL binding count", () => {
  verifyReservationInsert("site/sok-full-line-runtime.js", 20);
});

test("SOK availability reservation uses exact SQL binding count", () => {
  verifyReservationInsert("site/sok-availability-runtime.js", 18);
});
