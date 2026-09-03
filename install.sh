#!/usr/bin/env bash
# Install the blog-writing Agent Skills into an AI agent (macOS / Linux).
#
# Thin wrapper around scripts/install-skills.mjs: verifies Node.js is present,
# then forwards all arguments to the installer.
#
# Examples:
#   ./install.sh --list
#   ./install.sh --agent claude --scope global
#   ./install.sh --agent kiro --target ../my-blog-repo
#   ./install.sh --agent all --scope global --force
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required but was not found on PATH." >&2
  echo "Install it from https://nodejs.org and try again." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLER="$SCRIPT_DIR/scripts/install-skills.mjs"

if [ ! -f "$INSTALLER" ]; then
  echo "Error: cannot find installer at $INSTALLER. Run from the repo root." >&2
  exit 1
fi

exec node "$INSTALLER" "$@"
