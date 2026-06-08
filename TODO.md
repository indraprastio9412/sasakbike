# TODO

- [ ] Fix tombol beli sekarang tidak mengarahkan ke WhatsApp
  - [ ] Update `src/lib/whatsapp-order.ts`: normalisasi nomor ke format internasional (62...)
  - [ ] Update `src/lib/whatsapp-order.ts`: ganti `window.open` menjadi `window.location.href`
  - [ ] Test manual: klik "Beli Sekarang" lalu submit "Kirim Pesanan via WhatsApp"
