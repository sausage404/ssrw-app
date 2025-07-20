docker run --rm -v pgdata:/data -v %cd%\backup:/backup alpine tar czf /backup/pgdata.tar.gz -C /data .
