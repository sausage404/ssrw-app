#!/bin/sh

CONTAINER=ssrw-app-db-1
DB=mydatabase
USER=myuser
FILE=./backups/backup_mydatabase_20250727_160844.sql

echo "Copying backup file..."
docker cp $FILE $CONTAINER:/tmp/restore.sql

echo "Restoring..."
docker exec -i $CONTAINER psql -U $USER -d $DB -f /tmp/restore.sql

echo "Done."
