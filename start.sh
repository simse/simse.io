export DATABASE_URL="file:/litefs/simse.db"

# check if current node is primary
LITEFS_PRIMARY_FILE=/litefs/.primary
if [ ! -f "$FILE" ]; then
  pnpx prisma migrate deploy
fi

pnpx prisma generate

node .