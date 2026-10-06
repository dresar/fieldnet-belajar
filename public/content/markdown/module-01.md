# Ringkasan Cepat: Survei Lokasi & Rencana Instalasi

## 1. Poin Inti Survei
- Pastikan izin kerja (Permit to Work) dan denah gedung skala 1:100 sudah di tangan.
- Pisahkan jalur kabel data UTP minimal 30 cm dari kabel listrik PLN di plafon atau conduit.
- Ukur voltase Netral ke Ground di ruang rack dengan multimeter: batas aman harus di bawah 2.0V AC.
- Batas maksimal tarikan kabel UTP permanent link adalah 90 meter.
- Selalu tambahkan cadangan panjang kabel (slack) 15-20% pada perhitungan Bill of Quantities (BoQ).

## 2. Rumus Estimasi BoQ
```text
Total Kabel = (Jumlah Titik x Rata-rata Jarak Denah) x 1.15
Jumlah Roll UTP = Total Kabel / 305 meter (dibulatkan ke atas)
```
