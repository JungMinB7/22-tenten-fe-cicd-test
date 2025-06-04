#!/bin/bash
set -e

echo "[BeforeInstall] ▶ Update & Install jq & Docker"

# Install jq and Docker if not installed

# Add current user to docker group
sudo usermod -aG docker ubuntu
newgrp docker || true  # for non-interactive shell

echo "[BeforeInstall] ✅ Done"