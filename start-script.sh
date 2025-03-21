#!/bin/bash

# Navigate to the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if Docker is running
if ! systemctl is-active --quiet docker; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Start Docker Compose services
echo "Starting Docker Compose services..."
docker compose up -d

# Wait for a few seconds to ensure services are up
sleep 10

# Install node packages
echo "Installing node packages..."
npm install --force

# Start the Next.js server
echo "Starting Next.js server..."
npm run dev