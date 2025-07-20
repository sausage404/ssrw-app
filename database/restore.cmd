docker run --rm -v pgdata:/data -v %cd%\backup:/backup alpine tar xzf /backup/pgdata.tar.gz -C /data
