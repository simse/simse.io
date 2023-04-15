# check if current node is primary
LITEFS_PRIMARY_FILE=/litefs/.primary
if [ ! -f "$FILE" ]; then
  pnpx prisma migrate deploy
fi

node server/server.js