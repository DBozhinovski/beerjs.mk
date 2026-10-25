#!/usr/bin/env bash
# Run `pnpm cms:pull` to replace the local CMS data with a copy of production.
# Production is the source of truth for content. This command does not change
# production content. It writes one temporary snapshot file inside the container
# and removes it again.
# The previous local database goes to data/backups/ first.
# Set CMS_REMOTE (an SSH target such as root@host) and CMS_APP (the Coolify
# application UUID) in the environment or in .env.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .env ]; then
  CMS_REMOTE="${CMS_REMOTE:-$(sed -n 's/^CMS_REMOTE=//p' .env)}"
  CMS_APP="${CMS_APP:-$(sed -n 's/^CMS_APP=//p' .env)}"
fi
: "${CMS_REMOTE:?Set CMS_REMOTE, for example root@host, in .env}"
: "${CMS_APP:?Set CMS_APP, the Coolify application UUID, in .env}"

database="data/emdash.db"
# ls fails on processes of other users. That must not hide a match under pipefail.
if [ -e "$database" ] && { ls -l /proc/[0-9]*/fd 2>/dev/null || true; } | grep -qF "$(realpath "$database")"; then
  echo "A process has $database open. Stop the dev server first: pnpm astro dev stop" >&2
  exit 1
fi

container="$(ssh "$CMS_REMOTE" "docker ps --filter name=^${CMS_APP}- --format '{{.Names}}' | head -n 1")"
if [ -z "$container" ]; then
  echo "No running container for application $CMS_APP on $CMS_REMOTE." >&2
  exit 1
fi
echo "Pulling from $container"

remote_snapshot="/tmp/cms-pull-$$.db"
cleanup() { ssh "$CMS_REMOTE" "docker exec $container rm -f $remote_snapshot" || true; }
trap cleanup EXIT

# VACUUM INTO writes a consistent copy while the site keeps running.
ssh "$CMS_REMOTE" "docker exec -i $container node --no-warnings - /app/data/emdash.db $remote_snapshot" <<'EOF'
const { DatabaseSync } = require("node:sqlite");
const [source, target] = process.argv.slice(2);
new DatabaseSync(source).exec(`VACUUM INTO '${target}'`);
EOF

mkdir -p data/backups
snapshot="$(mktemp data/backups/.incoming-XXXXXX.db)"
ssh "$CMS_REMOTE" "docker exec $container cat $remote_snapshot" > "$snapshot"

check="$(node --no-warnings -e '
const { DatabaseSync } = require("node:sqlite");
console.log(new DatabaseSync(process.argv[1], { readOnly: true }).prepare("PRAGMA integrity_check").get().integrity_check);
' "$snapshot")"
if [ "$check" != "ok" ]; then
  rm -f "$snapshot"
  echo "The snapshot failed the integrity check: $check" >&2
  exit 1
fi

stamp="$(date +%Y%m%d-%H%M%S)"
for suffix in "" "-wal" "-shm"; do
  if [ -e "$database$suffix" ]; then mv "$database$suffix" "data/backups/emdash-$stamp.db$suffix"; fi
done
chmod 644 "$snapshot"
mv "$snapshot" "$database"

ssh "$CMS_REMOTE" "docker exec $container tar -C /app/data -cf - uploads" | tar -C data -xf -

echo "Pulled production into $database. The previous local database is in data/backups/emdash-$stamp.db."
