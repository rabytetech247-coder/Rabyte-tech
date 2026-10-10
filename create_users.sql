DELETE FROM users WHERE username IN ('admin', 'superadmin', 'testuser');

INSERT INTO users (id, email, password_hash, username, name, role) VALUES ('admin_user_001', 'admin@example.com', '$2b$10$YesCV2qfKwiprMFPq.QbauI22zRLTdC6Ti9bBoUcmPBZrlcOkQQHa', 'admin', 'Administrator', 'admin');

INSERT INTO users (id, email, password_hash, username, name, role) VALUES ('superadmin_user_001', 'superadmin@example.com', '$2b$10$qMpaOxgpeUckSw5WJzHGG.9PFsbSiQP/j.msnq9.m1hnLfFzYSbl2', 'superadmin', 'Super Administrator', 'superadmin');

INSERT INTO users (id, email, password_hash, username, name, role) VALUES ('test_user_001', 'test@example.com', '$2b$10$gKVBiakS2OfZW/sGK28IVu2vHBO7SDo2Qr8//oN6R3ZpM8SuaA.J.', 'testuser', 'Test User', 'user');
