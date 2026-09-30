#!/bin/bash
# ==============================================================
# God's Glory Tutors - Android APK Compilation Helper Script
# ==============================================================

echo "=========================================="
echo " Building God's Glory Tutors Android APK"
echo "=========================================="

# Step 1: Build the web assets
echo "[1/4] Building production web assets..."
npm run build

# Step 2: Check if Bubblewrap CLI is available for fast APK bundling
echo "[2/4] Initializing Android TWA / APK package..."
if command -v bubblewrap &> /dev/null; then
    echo "Bubblewrap found. Building APK package directly..."
    bubblewrap build
elif command -v npx &> /dev/null; then
    echo "Running Bubblewrap build via npx..."
    npx @bubblewrap/cli build
else
    echo "Notice: Install Android Studio or Bubblewrap CLI to build APK locally:"
    echo "npm install -g @bubblewrap/cli"
fi

echo "=========================================="
echo " Android App Configuration Ready!"
echo " Manifest: public/manifest.json"
echo " Icons: public/pwa-192x192.png, public/pwa-512x512.png"
echo " Capacitor Config: capacitor.config.json"
echo "=========================================="
