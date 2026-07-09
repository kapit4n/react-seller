#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$ROOT_DIR/server"
CLIENT_DIR="$ROOT_DIR/client"

cleanup() {
  echo ""
  echo "Shutting down..."
  [[ -n "$SERVER_PID" ]] && kill "$SERVER_PID" 2>/dev/null
  [[ -n "$CLIENT_PID" ]] && kill "$CLIENT_PID" 2>/dev/null
  wait 2>/dev/null
}
trap cleanup INT TERM EXIT

start_dir() {
  local dir="$1"
  local name="$2"
  if [ ! -d "$dir/node_modules" ]; then
    echo "Installing dependencies for $name..."
    (cd "$dir" && npm install)
  fi
}

start_dir "$SERVER_DIR" "server"
start_dir "$CLIENT_DIR" "client"

echo "Starting server (LoopBack 4)..."
(cd "$SERVER_DIR" && npm start) &
SERVER_PID=$!

echo "Starting client (React)..."
(cd "$CLIENT_DIR" && npm run dev) &
CLIENT_PID=$!

echo "Server PID: $SERVER_PID | Client PID: $CLIENT_PID"
echo "Press Ctrl+C to stop both."

wait
