#!/bin/sh

CONTAINER=ssrw-app_db_1
DB=mydatabase
USER=myuser
FILE=./backups/backup.sql

echo "Copying backup file..."
docker cp $FILE $CONTAINER:/tmp/restore.sql

echo "Restoring..."
docker exec -i $CONTAINER psql -U $USER -d $DB -f /tmp/restore.sql

echo "Done."
