#!/bin/bash
# Visual QA capture for uture-motion-diagrams artifacts.
# Usage: visual-check.sh <file.html> [loop_seconds] [WxH]
# Captures the artifact at two moments — mid-narrative (40% of the loop)
# and the composed hold frame (85%) — using headless Chrome virtual time,
# so no server and no open browser window are needed.
# Prints the two PNG paths; READ them with the Read tool and inspect.
set -euo pipefail

FILE="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
LOOP="${2:-8}"
SIZE="${3:-1600,900}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTDIR="${TMPDIR:-/tmp}"
BASE="$OUTDIR/vqa-$(basename "$1" .html)"

for pct in 40 85; do
  ms=$(awk -v l="$LOOP" -v p="$pct" 'BEGIN { printf "%d", l * 1000 * p / 100 }')   # decimal loop lengths OK (e.g. 8.5)
  # --disable-threaded-animation forces opacity/transform animations onto the
  # main thread so virtual time actually advances them (otherwise compositor
  # animations freeze at their first frame and elements look missing).
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --disable-threaded-animation --run-all-compositor-stages-before-draw \
    --window-size="$SIZE" \
    --virtual-time-budget="$ms" \
    --screenshot="${BASE}-${pct}.png" \
    "file://$FILE" >/dev/null 2>&1
  echo "${BASE}-${pct}.png"
done
