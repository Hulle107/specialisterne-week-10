-- ============================
--  USERS
-- ============================
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,                      -- hashed + saltet
    "updated_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for bedre query performance
CREATE INDEX IF NOT EXISTS "idx_users_username" ON "users"("username");
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users"("email");


-- ============================
--  TASKS
-- ============================
CREATE TABLE IF NOT EXISTS "tasks" (
    "id" SERIAL PRIMARY KEY,

    "owner_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "assigned_id" INTEGER REFERENCES "users"("id") ON DELETE SET NULL,

    "name" TEXT NOT NULL,
    "description" TEXT,

    "published_at" TIMESTAMP,
    "deadline_at" TIMESTAMP,
    "completed_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for bedre query performance
CREATE INDEX IF NOT EXISTS "idx_tasks_owner_id" ON "tasks"("owner_id");
CREATE INDEX IF NOT EXISTS "idx_tasks_assigned_id" ON "tasks"("assigned_id");
CREATE INDEX IF NOT EXISTS "idx_tasks_deadline" ON "tasks"("deadline_at");