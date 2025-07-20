docker run --rm -v pgdata:/data -v %cd%\backup:/backup alpine tar czf /backup/pgdata.tar.gz -C /data .

@REM docker exec postgres_ssrw pg_dump -U myuser -d mydatabase -f /tmp/backup.sql

@REM docker cp postgres_ssrw:/tmp/backup.sql ./backup.sql

@REM docker exec postgres_ssrw pg_dump -U myuser -d mydatabase -F c -f /tmp/backup.backup

@REM docker cp postgres_ssrw:/tmp/backup.backup ./backup.backup