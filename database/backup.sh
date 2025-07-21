#!/bin/bash

# PostgreSQL Docker Backup Script
# ใช้งาน: ./backup.sh

# ตั้งค่าต่างๆ
DB_NAME="mydatabase"
DB_USER="myuser"
DB_PASSWORD="mypassword"
CONTAINER_NAME="ssrw-app-db-1"
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backup_${DB_NAME}_${DATE}.sql"

# สร้างโฟลเดอร์ backup หากไม่มี
mkdir -p ${BACKUP_DIR}

echo "เริ่มต้น backup ฐานข้อมูล ${DB_NAME}..."

# ทำ backup ฐานข้อมูล
docker exec -e PGPASSWORD=${DB_PASSWORD} ${CONTAINER_NAME} \
    pg_dump -U ${DB_USER} -h localhost ${DB_NAME} > ${BACKUP_DIR}/${BACKUP_FILE}

# ตรวจสอบผลลัพธ์
if [ $? -eq 0 ]; then
    echo "✅ Backup สำเร็จ!"
    echo "📁 ไฟล์: ${BACKUP_DIR}/${BACKUP_FILE}"
    echo "📊 ขนาด: $(du -h ${BACKUP_DIR}/${BACKUP_FILE} | cut -f1)"
else
    echo "❌ Backup ล้มเหลว!"
    exit 1
fi

# แสดงรายการ backup ทั้งหมด
echo ""
echo "📋 รายการ backup ทั้งหมด:"
ls -la ${BACKUP_DIR}/