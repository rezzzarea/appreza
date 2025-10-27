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

import { relations, sql } from "drizzle-orm";
import { uuid, integer, text, boolean, pgTable, timestamp, jsonb } from "drizzle-orm/pg-core";
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
// skema / struktur tabel / struktur database u/ jurnal/notebooks seperti 1 binder 
  // 1 binder itu yg ada di aplikasi antum, 1 kategori dari binder itu adalah 1 notebook
  // 1 notebook itu isinya banyak halaman, nah halaman itu adalah notes
export const notebooks = pgTable("notebooks", {
  // struktur skema 
    // ketika ada yg default di ujung akhir kolom skema db itu berarti datanya akan terisi secara otomatis
    // id / tulisan yg warna biru itu adalah nama variabel yg akan kita pakai di aplikasi kita
    // "id" yg diantara tanda kutip itu adalah nama kolom yg akan muncul database kita (neon)
    // setelah titik dua (:) ada tulisan text/integer/boolean/timestamp itu adalah tipe data dari kolom tsb
    // text itu string di javascript, integer itu number di javascript
    // kenapa ngga uuid untuk tipe data id? selain untuk konsisten, juga untuk memudahkan interaksi database kalau pakai string
    // takutnya kalau pakai uuid, ntar pas interaksi database perlu di parse dulu dll konflik segala macem jd amannya text
    // opsi tipe data uuid untuk kolom id 
    // sebab pentingnya memahami uuid (Universally Unique Identifier) selain agar tidak ada data yg bentrok, juga membantu u/ migrasi database seandainya kita akan ganti provider database, dan uuid terbaik a/ yg pakai strip karena fleksible u/ berbagai tipe dan provider database spt mysql, postgreSQL, mongodb, dll
    // id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(), 
    // id: text("id").primaryKey().default("gen_random_uuid()"), 
    // sebab kenapa ana ga pakai foreign key u/ sangkutin ke tabel user? krn di aplikasi kita user itu bisa punya banyak kategori jurnal / notebook, dan di tabel notes / halaman catetan itu udh ada foreign key yg nyangkut ke tabel notebooks, jadi udh ga perlu lagi nyangkut ke tabel user
    // dan fitur foreign key dan relations ini akan bermanfaat u/ nanti kita upgrade aplikasi kita terutama di tabel user misalnya nanti akan ada role user, misalnya ada:
      // role owner yg bs otak atik segalanya, 
      // role admin (kepsek/pemilik perusahaan) yg dia bisa lihat seluruh data, gabisa edit, tapi punya fitur u/ negur / nampilin broadcast di aplikasinya u/ seluruh user sehingga nanti kalau ada user biasa / user orang tua bisa menerima pesan penting dari pemilik perusahaan atau negur secara individu misalnya ada user yang datanya belum dibuat laporannya nanti pemilik perusahaannya bisa langsung negur misalnya eh kok data yg ini belum diupdata ada masalah apa? sehingga gaperlu capek" buka wa & bisa langsung negur semua yg berkaitan dg kerjaan di aplikasi saja gaperlu merembet segala keluar aplikasi lain untuk ngingetin
      // role user biasa / murid / pegawai yg tugasnya a/ untuk menginput data yg nanti dia bisa liat sendiri kategori jurnalnya, halaman note dia sendiri, dan dia gabisa liat data orang lain
      // role guest/supervisor yg bs liat data org lain tp gabisa ngedit, misal org tua bs liat data anaknya tp gabisa ngedit
      // role auditor/akuntan yg bs liat data org lain tp gabisa ngedit, misal akuntan bs liat data keuangan perusahaan tp gabisa ngedit
      // user guru/supervisor, user orang tua yg hanya bisa melihat saja. dll
      // membuat tabel a/ momen u/ menentukan data apa saja, dan sedetil apa informasi yg kita inginkan dari tabel tersebut mulai dari id nya, nama nya mungkin, apakah tabel ini akan berkaitan dg tabel lain, apakah tabel ini akan diakses oleh user tertentu saja, dll
  id: text("id").primaryKey().default(sql`gen_random_uuid()`), //gen_random_uuid() itu function bawaan postgreSQL
  name: text("name").notNull(), //nama kategori di jurnal antum
  userId: text("user_id"), //id user yg punya kategori di jurnal tsb
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
});
// skema / struktur tabel / struktur database u/ tiap lembar/halaman di dalam 1 kategori jurnal
  // tujuannya knp dikasih struktur skema agar bisa kita sangkutin nanti dengan kategori jurnal yg udh buat atau bahkan mengembangkan fitur2 lain spt tag, sharing, kolaborasi, komentar, dll
  // sistem databasenya a/ kita buat catetan yaitu di bagian notes ada foreign key (references) yg wajib nyangkut yaitu notebookId yg merujuk ke tabel notebooks, maksudnya kita harus akses notebook / kategori jurnal nya dulu baru bisa bikin halaman note, sistemnya adalah ga pusing di akhir karena kita wajibin di aplikasi kita untuk mastiin kategori jurnalnya diawal sebelum buat lembar catatan baru / note, dan foreign key yg kita pasang disini berfungsi sebagai anak dari tabel notebooks
  // fungsi skema atau tabel notes ini a/ sebagai anak dari notebooks, jadi di dalam aplikasi antum wajib ada kategori jurnalnya dulu baru bisa bikin halaman note, jadi kalau notebooks / kategori jurnalnya diapus maka isi notes yg ada didalamnya akan ikutan terhapus semua halaman note di dalamnya, itulah yg dimaksud dengan cascade
  // fungsi onDelete:"cascade" itu adalah ketika kita hapus kategori jurnalnya, maka semua halaman note di dalam kategori jurnal tsb akan terhapus semua
export const notes = pgTable("notes", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(), //judul halaman
  content: jsonb("content").notNull(), //isi halaman
  notebookId: text("notebook_id").references(() => notebooks.id, { onDelete: "cascade" }), //id kategori jurnal yg punya halaman tsb
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  // knp ana g pakaikan userId? krn udh ada di tabel notebooks
  // userId: text("user_id"), //id user yg punya halaman tsb
})
// relasi notebook tujuannya u/ memudahkan interaksi database ketika kita mau join / gabungin tabel notebooks dengan tabel notes
  // fungsi utamanya nanti adalah u/ bikin fitur nampilin daftar kategori jurnal beserta jumlah halaman note di dalamnya yg akan kita tampilkan di sidebar dashboard aplikasi kita
  // relasi ini adalah relasi 1 ke banyak (one to many) yaitu 1 notebook itu bisa punya banyak notes
  // relasi ini juga memudahkan kita u/ query / ambil data dari 2 tabel sekaligus
  // sebab kita membuat skema / database sebelum membuat fitur agar tidak bingung di akhir dan membuat kita punya gambaran yg jelas tentang alur data di aplikasi kita
  // maksudnya disini a/ notebooks yg ada disini adalah kategori jurnal, dan user itu adalah pemilik dari kategori jurnal tsb
  // jg fungsi relations disini a/ menyatakan bahwa 1 kategori jurnal itu punya beberapa halaman note dan hanya punya 1 user / pemilik kategori sesuai dengan userId yg ada di tabel notebooks yg mana userId itu telah tersangkut dengan userId dg foreign key yg merujuk ke tabel user
export const notebookRelations = relations(notebooks,({one,many})=>({
  notes: many(notes),
  user: one(user,{
    fields:[notebooks.userId],
    references:[user.id]
  })
}))
// relasi notes tujuannya u/ memudahkan interaksi database ketika kita mau join / gabungin tabel notes dengan tabel notebooks
  // relasi ini adalah relasi banyak ke 1 (many to one) yaitu banyak notes itu hanya punya 1 notebook
  // relasi ini juga memudahkan kita u/ query / ambil data dari 2 tabel sekaligus
  // note relations ini adalah kebalikan dari notebookRelations karena relasinya adalah banyak ke 1 (many to one) fungsi relasi ini adalah u/ bikin fitur nampilin daftar halaman note beserta kategori jurnalnya yg akan kita tampilkan di halaman dashboard aplikasi kita
export const noteRelations = relations(notes,({one})=>({
  notebook: one(notebooks,{
    fields:[notes.notebookId],
    references:[notebooks.id]
  }),
}))




// ekspor skema user u/ fitur hafalan quran
export type User = typeof user.$inferSelect //tp const hrs sama ky disini
// ekspor skema u/ fitur session, verifikasi email, serta lupa password
// export type InsertNote u/ tipe data u/ insert ke tabel notes
// export type Note u/ tipe data u/ select dari tabel notes
// ekspor skema u/ fitur login via google, github, password email, dll
export type InsertNote = typeof notes.$inferInsert
export type Note = typeof notes.$inferSelect
export type InsertNotebook = typeof notebooks.$inferInsert
export type Notebook = typeof notebooks.$inferSelect & {notes: Note[]}
export const schema = {user,session,account,verification,notebooks,notes,notebookRelations,noteRelations} 

/*
betulin fitur password di user-form
biar ketika create da pass, sm edit nya jg ada
formreset, routerefresh,
*/