# Al-Khair Charity Web Application

A complete, production-ready web application for a charity organization built with React, Node.js/Express, and MongoDB Atlas.

## 🏗️ Project Structure

```
charity-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── donationController.js
│   │   │   └── contactController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── logger.js
│   │   ├── models/
│   │   │   ├── Donation.js
│   │   │   └── Contact.js
│   │   ├── routes/
│   │   │   ├── donationRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   └── healthRoutes.js
│   │   └── server.js              # Express server entry point
│   ├── public/                     # React build output (generated)
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Donate.jsx
│   │   │   └── Contact.jsx
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd charity-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/charity-db

# Start development server
npm run dev
```

### 3. Frontend Setup (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:5000`.

### 4. Production Build

```bash
cd backend

# Build frontend and copy to backend/public
npm run build-client

# Start production server
npm start
```

## 📡 API Endpoints

| Method | Endpoint       | Description                    |
|--------|----------------|--------------------------------|
| GET    | /api/health    | Health check                   |
| POST   | /api/donate    | Submit a donation              |
| GET    | /api/donations | Get all donations (admin)      |
| POST   | /api/contact   | Submit a contact message       |
| GET    | /api/contacts  | Get all contact messages       |

### Sample Donation Request

```json
POST /api/donate
{
  "fullName": "Ahmed Al-Rashid",
  "phoneNumber": "+966501234567",
  "amount": 500,
  "donationType": "one-time",
  "notes": "For orphan support program"
}
```

## 🌐 AWS EC2 Deployment Guide

### Step 1: Launch EC2 Instance

1. Go to AWS Console → EC2 → Launch Instance
2. Choose **Amazon Linux 2023** or **Ubuntu 22.04 LTS**
3. Select instance type (t2.micro for free tier, t3.small recommended)
4. Configure security group:
   - SSH (port 22) - Your IP
   - HTTP (port 80) - Anywhere
   - HTTPS (port 443) - Anywhere
5. Create or select a key pair for SSH access
6. Launch the instance

### Step 2: Connect to EC2 & Install Dependencies

```bash
# Connect via SSH
ssh -i your-key.pem ec2-user@your-ec2-public-ip

# Update system packages (Amazon Linux)
sudo yum update -y

# Or for Ubuntu
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Node.js

```bash
# Install Node.js 18 using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node -v  # Verify installation
```

### Step 4: Install Nginx

```bash
# Amazon Linux
sudo yum install nginx -y

# Ubuntu
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Install PM2

```bash
npm install -g pm2
```

### Step 6: Clone and Setup Application

```bash
# Clone your repository
cd ~
git clone <your-repository-url> charity-app
cd charity-app

# Setup backend
cd backend
npm install

# Create .env file
cp .env.example .env
nano .env  # Edit with your actual values
```

**Set your environment variables:**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/charity-db
NODE_ENV=production
```

### Step 7: Build Frontend

```bash
# From backend directory
npm run build-client
```

### Step 8: Start Application with PM2

```bash
# Start the application
pm2 start src/server.js --name charity-app

# Save the process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command that appears
```

### Step 9: Configure Nginx Reverse Proxy

```bash
# Edit Nginx configuration
sudo nano /etc/nginx/conf.d/charity-app.conf
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    # Or use your EC2 public IP if no domain

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 10: Enable HTTPS with Let's Encrypt (Optional but Recommended)

```bash
# Install Certbot
# Amazon Linux
sudo yum install certbot python3-certbot-nginx -y

# Ubuntu
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is enabled by default
# Test renewal with:
sudo certbot renew --dry-run
```

## 🔧 Useful PM2 Commands

```bash
# View all processes
pm2 list

# View logs
pm2 logs charity-app

# Restart application
pm2 restart charity-app

# Stop application
pm2 stop charity-app

# Delete from PM2
pm2 delete charity-app

# Monitor resources
pm2 monit
```

## 🔄 Updating the Application

```bash
cd ~/charity-app

# Pull latest changes
git pull origin main

# Install any new dependencies
cd backend
npm install

# Rebuild frontend if needed
npm run build-client

# Restart the application
pm2 restart charity-app
```

## 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with password
4. Add your EC2 IP to the IP Access List (or use 0.0.0.0/0 for development)
5. Get your connection string and update `.env`

## 🔒 Security Checklist

- [ ] Change default ports if needed
- [ ] Enable HTTPS with SSL certificate
- [ ] Configure proper firewall rules
- [ ] Use strong MongoDB passwords
- [ ] Keep Node.js and npm packages updated
- [ ] Enable MongoDB Atlas IP whitelisting
- [ ] Set up regular backups

## 📝 License

MIT License - feel free to use this project for your charity organization.

## 🤝 Support

For issues and feature requests, please create an issue in the repository.
