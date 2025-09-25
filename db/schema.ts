// login,session,login verifikasi google,verifikasi github, midtrans, doku, stripe, xendit, qris
// username: text("username").notNull(),
// u/ urusan kriteria data di schema gaperlu bikin ribet dg notnull krn nyusahin
// password: text("password").notNull(), 
// 

/*
CARA UPDATE SCHEMA:
wajib sambil buka neon, ada bagian SQL editor u/ ngisi perintah SQL

berikut SQL u/ bersihin database:

DO $$ DECLARE
    r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
                EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    END LOOP;
                    END $$;

setelah dieksekusi SQL diatas dan databsae bersih baru antum : npx drizzle-kit push
gabisa dari terminal, karena kita pakai databse online gratisan
*/

import { uuid, integer, text, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";
export const user = pgTable("user", { //users = nama sql table kita di neon postgreSQL const nya bebas
  id: text("id").primaryKey(),
  name: text("name"),
  username: text("username"),
  email: text("email").notNull().unique(),
  password: text("password"), 
  surat: integer("surat"),
  ayat: integer("ayat"),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
// export const session = pgTable("session", { 
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: text("userId").notNull().unique(), 
//   token: text("token").notNull(), 
//   expiresAt: text("expiresAt").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });
// export const account = pgTable("account", { 
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: text("userId").notNull().unique(), 
//   accessToken: text("accessToken").notNull(), 
//   refreshToken: text("refreshToken").notNull(), 
//   password: text("password").notNull(),
//   accessTokenExpiresAt: timestamp("accessTokenExpiresAt").defaultNow(),
//   refreshTokenExpiresAt: timestamp("refreshTokenExpires").defaultNow(),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

// ekspor skema user u/ fitur hafalan quran
export type User = typeof user.$inferSelect //tp const hrs sama ky disini
// ekspor skema u/ fitur session, verifikasi email, serta lupa password
export const schema = {user,session,account,verification} 

/*
betulin fitur password di user-form
biar ketika create da pass, sm edit nya jg ada
formreset, routerefresh,
*/