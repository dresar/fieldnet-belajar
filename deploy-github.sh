#!/usr/bin/env bash
set -e

echo "=== FieldNet Belajar: GitHub Deployment Helper ==="

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo "Penggunaan: ./deploy-github.sh <URL_REPOSITORY_GITHUB>"
  echo "Contoh: ./deploy-github.sh https://github.com/username/fieldnet-belajar.git"
  exit 1
fi

echo "1. Menyiapkan remote GitHub origin..."
if git remote | grep -q "origin"; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo "2. Memastikan seluruh perubahan ter-commit..."
git add .
if ! git diff-index --quiet HEAD --; then
  git commit -m "chore: pembaruan rilis dan alur kerja CI/CD APK"
fi

echo "3. Melakukan push ke branch main..."
git branch -M main
git push -u origin main

echo ""
echo "=== PUSH BERHASIL! ==="
echo "Alur kerja GitHub Actions sekarang sedang berjalan otomatis untuk:"
echo " 1. Mengkompilasi file APK Android via Gradle."
echo " 2. Membuat GitHub Release v1.0.0."
echo " 3. Mengunggah berkas FieldNet-Belajar-v1.0.0.apk."
echo " 4. Men-deploy aplikasi web ke GitHub Pages."
echo ""
echo "Silakan pantau proses build di tab 'Actions' pada repositori GitHub kamu."
