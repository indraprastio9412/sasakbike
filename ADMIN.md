# Panel Admin — Sasak Bike

## Login

- URL: `/admin/login`
- Username: `indra`
- Password: `2026`

Setelah login berhasil akan diarahkan otomatis ke `/admin/dashboard`.
Sesi login disimpan di `localStorage` browser (tombol **Logout** di kanan
atas dashboard untuk keluar).

## Fitur Dashboard (`/admin/dashboard`)

### Tab Produk
- **Tambah Produk** — nama, tagline, harga, kategori, ukuran, kata kunci
  pencarian, varian warna (label + warna aksen + upload foto), dan
  spesifikasi (baris label/nilai bebas, contoh: Frame, Rem, Velg, dst).
- **Edit Produk** — bisa mengedit produk apa pun, termasuk 6 produk bawaan
  situs.
- **Hapus Produk** — produk langsung hilang dari situs (halaman Produk,
  Beranda, dan detail produk).

### Tab Pesanan
- Daftar seluruh pesanan yang masuk lewat tombol **"Kirim Pesanan via
  WhatsApp"** (baik dari halaman produk maupun dari Keranjang).
- Ubah status pesanan: Baru → Diproses → Selesai (atau Dibatalkan).
- Lihat detail pesanan (item, alamat, link Google Maps).
- Tombol chat langsung ke nomor WhatsApp pembeli.
- Hapus catatan pesanan.

## Catatan Penting

Situs ini adalah **front-end statis** (tanpa server/database). Supaya fitur
admin tetap bisa berfungsi tanpa backend, semua data (produk yang
ditambah/diedit/dihapus, dan daftar pesanan) disimpan di **localStorage
browser** tempat admin login & login dilakukan.

Artinya:
- Data **tersimpan permanen di browser/perangkat itu**, tidak terhapus saat
  refresh atau tutup tab.
- Data **tidak otomatis sinkron antar perangkat/browser lain**. Kalau admin
  login dari HP lalu dari laptop, datanya tidak akan sama persis, karena
  masing-masing browser punya storage sendiri.
- Kalau cache/data browser dibersihkan ("clear site data"), produk
  tambahan & riwayat pesanan akan ikut hilang (produk bawaan situs tidak
  akan hilang, karena itu tetap ada di kode).
- Login admin ini juga hanya gerbang sederhana di sisi browser (kredensial
  ada di kode front-end) — cukup untuk mencegah pengunjung biasa membuka
  dashboard, tapi bukan sistem keamanan tingkat produksi untuk data
  sensitif.

Kalau nanti situs ini butuh data produk/pesanan yang benar-benar
tersentral (bisa diakses dari mana saja, banyak admin sekaligus, dll),
langkah berikutnya adalah menambahkan backend/database sungguhan
(misalnya Supabase, Firebase, atau API sendiri).
