# TODO

- [x] Fix tombol beli sekarang tidak mengarahkan ke WhatsApp
  - [x] Normalisasi nomor ke format internasional (62...) — sudah benar di `src/lib/whatsapp-config.ts`
  - [x] `src/lib/whatsapp-order.ts`: ganti `window.open` (yang selalu return null karena opsi "noopener") menjadi `window.location.href` agar redirect selalu jalan, di semua browser
  - [x] Test: build, type-check, dan lint lolos tanpa error

- [x] Fitur Halaman Administrator
  - [x] Login admin di `/admin/login` (username: `indra`, password: `2026`)
  - [x] Dashboard admin di `/admin/dashboard` (terlindungi, redirect ke login jika belum masuk)
  - [x] Tambah Produk, Edit Produk, Hapus Produk
  - [x] Kelola Pesanan (lihat detail, ubah status, hapus, chat WhatsApp pembeli)

Lihat `ADMIN.md` untuk detail & catatan penting soal fitur admin.
