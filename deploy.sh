#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Server configuration
FTP_HOST="ftp.sjamartialarts.com"
FTP_USER="translator@translator.psanguan.com"
FTP_PASS="b.LB-r#o?=ttOIUX"
REMOTE_PATH="/home/sjamarti/translator.psanguan.com/public/build"
LOCAL_BUILD_PATH="./public/build"

echo -e "${BLUE}🚀 Starting deployment process...${NC}"
echo -e "${YELLOW}================================${NC}"

# Step 1: Clean previous build
echo -e "${YELLOW}🧹 Cleaning previous build...${NC}"
if [ -d "$LOCAL_BUILD_PATH" ]; then
    rm -rf $LOCAL_BUILD_PATH
    echo -e "${GREEN}✅ Previous build cleaned${NC}"
fi

# Step 2: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Step 3: Build project
echo -e "${YELLOW}🔨 Building project...${NC}"
NODE_OPTIONS="--max-old-space-size=4096" npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Project built successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Step 4: Upload to server using lftp
echo -e "${YELLOW}📤 Uploading to server...${NC}"

# Create lftp script
cat > /tmp/ftp_upload.txt << EOF
set ftp:ssl-allow no
set ssl:verify-certificate no
open $FTP_HOST
user $FTP_USER $FTP_PASS
mirror -R --delete --verbose $LOCAL_BUILD_PATH $REMOTE_PATH
quit
EOF

# Execute upload
lftp -f /tmp/ftp_upload.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Upload completed successfully!${NC}"
    echo -e "${BLUE}🌐 Your site should be updated at: https://translator.psanguan.com${NC}"
else
    echo -e "${RED}❌ Upload failed${NC}"
    exit 1
fi

# Clean up
rm /tmp/ftp_upload.txt

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${YELLOW}================================${NC}"