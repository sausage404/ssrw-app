#!/bin/sh

echo "Starting backup..."

docker run --rm \
  -v pgdata:/data \
  -v $PWD/backup:/backup \
  alpine \
  tar czf /backup/pgdata.tar.gz -C /data .

if [ $? -eq 0 ]; then
  echo "Backup completed successfully!"
  ls -lh $PWD/backup/pgdata.tar.gz
else
  echo "Backup failed!"
fi
