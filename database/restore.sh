#!/bin/sh

echo "Starting restore..."

docker run --rm \
  -v pgdata:/data \
  -v $PWD/backup:/backup \
  alpine \
  tar xzf /backup/pgdata.tar.gz -C /data

if [ $? -eq 0 ]; then
  echo "Restore completed successfully!"
else
  echo "Restore failed!"
fi
