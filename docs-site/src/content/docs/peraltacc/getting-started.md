---
title: Getting Started with Peralta
description: Initial setup and prerequisites for Peralta deployment
---

# Getting Started with Peralta

This guide will help you prepare for your first Peralta deployment.

## What You'll Need

### Tools & Dependencies

**Required:**
- Terraform >= 1.0.x
- Ansible >= 2.10.x
- Docker >= 24.0.x
- kubectl >= 1.27.x
- Git

**Recommended:**
- AWS CLI v2 (for AWS deployments)
- gcloud CLI (for GCP deployments)
- az CLI (for Azure deployments)
- Helm >= 3.0 (for Kubernetes)

### Installation

**macOS (Homebrew)**
```bash
# Install required tools
brew install terraform ansible docker kubectl git

# AWS CLI
brew install awscliv2

# GCP CLI
brew install --cask google-cloud-sdk
```

**Ubuntu/Debian**
```bash
# Add HashiCorp repository
curl https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

# Install tools
sudo apt-get update
sudo apt-get install terraform ansible

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

### Cloud Provider Credentials

#### AWS
```bash
# Configure AWS CLI
aws configure

# Verify access
aws sts get-caller-identity
```

#### Google Cloud
```bash
# Initialize gcloud
gcloud init

# Create service account
gcloud iam service-accounts create peralta-deployer

# Authenticate
gcloud auth application-default login
```

#### Azure
```bash
# Login to Azure
az login

# Set active subscription
az account set --subscription "SUBSCRIPTION_ID"
```

## Environment Preparation

### 1. Clone the Repository

```bash
# Clone Peralta
git clone https://github.com/Fused-Gaming/peralta.git
cd peralta

# Verify structure
ls -la
# Expected: terraform/, ansible/, docs/, etc.
```

### 2. Set Up Project Directory

```bash
# Create deployment workspace
mkdir -p deployments/my-project
cd deployments/my-project

# Copy templates
cp -r ../../terraform . 
cp -r ../../ansible .
```

### 3. Configure Environment

Create `terraform/environments/prod/terraform.tfvars`:

```hcl
# Basic Configuration
project_name = "my-vln-project"
environment  = "production"
region       = "us-east-1"

# Cloud Configuration
cloud_provider = "aws"  # or "gcp", "azure"
vpc_cidr        = "10.0.0.0/16"

# Database Configuration
db_engine_version = "14.7"
db_instance_class = "db.r5.xlarge"
db_allocated_storage = 1000
db_backup_retention = 30

# Application Configuration
app_instance_type = "t3.large"
app_desired_count = 3
app_max_capacity  = 10

# Tags
tags = {
  Environment = "production"
  ManagedBy   = "terraform"
  Owner       = "your-team"
}
```

### 4. Configure Ansible Inventory

Create `ansible/inventory/prod/hosts.yml`:

```yaml
all:
  vars:
    ansible_user: ec2-user
    ansible_ssh_private_key_file: ~/.ssh/peralta-prod.pem
    ansible_python_interpreter: /usr/bin/python3

  children:
    web:
      hosts:
        web-1:
          ansible_host: 10.0.1.10
        web-2:
          ansible_host: 10.0.1.11
    
    db:
      hosts:
        db-primary:
          ansible_host: 10.0.2.10
```

## Pre-Deployment Checklist

Before deploying, verify:

- [ ] All tools installed and in PATH
- [ ] Cloud provider credentials configured and tested
- [ ] Repository cloned and accessible
- [ ] terraform.tfvars created with correct values
- [ ] Ansible inventory configured
- [ ] SSH keys generated (if needed)
- [ ] Sufficient cloud provider quota/limits
- [ ] SSL certificates ready (if using custom domains)

## Verify Everything Works

```bash
# Test Terraform
cd terraform
terraform fmt
terraform validate

# Test Ansible
cd ../ansible
ansible all -i inventory/prod/hosts.yml -m ping

# Verify Docker
docker run hello-world

# Check kubectl
kubectl version --client
```

## Choose Your Deployment Path

### 🚀 Quick Start (Kubernetes)
**Best for:** Existing Kubernetes cluster  
**Time:** 1-2 hours  
**Complexity:** Low

→ [Deploy to Kubernetes](/docs/peraltacc/deployment/kubernetes)

### 🏢 AWS Deployment
**Best for:** AWS-native infrastructure  
**Time:** 2-3 hours  
**Complexity:** Medium

→ [Deploy to AWS](/docs/peraltacc/deployment/aws)

### ☁️ Google Cloud Deployment
**Best for:** GCP environment  
**Time:** 2-3 hours  
**Complexity:** Medium

→ [Deploy to GCP](/docs/peraltacc/deployment/gcp)

### 🌐 Azure Deployment
**Best for:** Azure environment  
**Time:** 2-3 hours  
**Complexity:** Medium

→ [Deploy to Azure](/docs/peraltacc/deployment/azure)

### 🌍 Multi-Cloud Deployment
**Best for:** High availability across regions  
**Time:** 6-8 hours  
**Complexity:** High

→ [Multi-Region Setup](/docs/peraltacc/deployment/multi-region)

## Next Steps

1. **Verify Prerequisites** - Run through the pre-deployment checklist
2. **Choose Cloud Provider** - Select your deployment target
3. **Configure Variables** - Update terraform.tfvars for your environment
4. **Review Architecture** - Understand what will be deployed
5. **Execute Deployment** - Follow the appropriate deployment guide

## Getting Help

- **Setup Issues**: [Prerequisites Guide](/docs/peraltacc/prerequisites)
- **Deployment Help**: [Full Deployment Guide](/docs/peraltacc/deployment)
- **Troubleshooting**: [FAQ & Troubleshooting](/docs/peraltacc/faq)
- **Support**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues) or security@vln.gg

---

**Ready to deploy?** Choose your path above and follow the guide.
