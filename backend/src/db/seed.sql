-- create demo user with email hire-me@anshumat.org and password HireMe@2025!
-- we'll insert hashed password via seed script, but here's sample SQL insertion if hash known
INSERT INTO users (email, password_hash)
VALUES ('hire-me@anshumat.org', '<BCRYPT_HASH_OF_HireMe@2025!>')
ON CONFLICT DO NOTHING;


