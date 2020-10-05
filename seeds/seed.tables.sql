BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Italian', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'cane', 'dog', 2),
  (2, 1, 'gatto', 'cat', 3),
  (3, 1, 'blu', 'blue', 4),
  (4, 1, 'rosso', 'red', 5),
  (5, 1, 'giallo', 'yellow', 6),
  (6, 1, 'birra', 'beer', 7),
  (7, 1, 'colazione', 'breakfast', 8),
  (8, 1, 'formaggio', 'cheese', 9),
  (9, 1, 'padre', 'father', 10),
  (10, 1, 'madre', 'mother', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
