---
title: Peralta Deployment Guide
description: Step-by-step deployment procedures for Peralta infrastructure
---

# Peralta Deployment Guide

Complete guide to deploying Peralta across different cloud providers and on-premises environments.

## Deployment Paths

Choose your deployment target:

### 1. Kubernetes (Recommended)
**Best for:** Existing Kubernetes cluster or cloud-managed K8s service  
**Time:** 1-2 hours  
**Complexity:** Low

[Deploy to Kubernetes →](/docs/peraltacc/deployment/kubernetes)

### 2. AWS
**Best for:** AWS-native infrastructure  
**Time:** 2-3 hours  
**Complexity:** Medium

[Deploy to AWS →](/docs/peraltacc/deployment/aws)

### 3. Google Cloud
**Best for:** GCP environment  
**Time:** 2-3 hours  
**Complexity:** Medium

[Deploy to Google Cloud →](/docs/peraltacc/deployment/gcp)

### 4. Azure
**Best for:** Azure environment  
**Time:** 2-3 hours  
**Complexity:** Medium

[Deploy to Azure →](/docs/peraltacc/deployment/azure)

## Pre-Deployment Checklist

Before starting deployment, verify:

### Infrastructure Requirements
- [ ] Cloud provider account with appropriate permissions
- [ ] Sufficient quota for desired resources
- [ ] VPC/network planning completed
- [ ] Domain names registered (if custom domains needed)
- [ ] SSL certificates obtained or ready to generate

### Tools & Access
- [ ] Terraform installed and tested
- [ ] Ansible installed and tested
- [ ] Cloud CLI configured (aws/gcloud/az)
- [ ] kubectl configured (for K8s deployments)
- [ ] Git repository cloned

### Configuration Files
- [ ] terraform.tfvars created with values
- [ ] ansible/inventory configured
- [ ] SSH keys generated (if needed)
- [ ] API keys/secrets prepared

### Knowledge
- [ ] Read [Architecture Overview](/docs/peraltacc/architecture)
- [ ] Review configuration options for your cloud provider
- [ ] Understand your deployment environment

## Deployment Phases

All deployments follow these phases:

### Phase 1: Infrastructure
```bash
# Initialize and validate Terraform
terraform init
terraform fmt
terraform validate

# Plan deployment
terraform plan -out=tfplan

# Apply infrastructure
terraform apply tfplan
```

**Outputs:**
- VPC and networking
- Database (RDS/Cloud SQL)
- Load balancer configuration
- Security groups/firewall rules
- Storage buckets

### Phase 2: Base Configuration
```bash
# Configure compute instances with Ansible
ansible-playbook playbooks/configure-base.yml \
  -i inventory/prod/hosts.yml
```

**Configures:**
- Operating system security hardening
- System package updates
- Container runtime (Docker)
- Monitoring agents
- Logging agents

### Phase 3: Application Deployment
```bash
# Deploy Peralta services
ansible-playbook playbooks/deploy.yml \
  -i inventory/prod/hosts.yml

# Verify deployment
ansible-playbook playbooks/verify.yml \
  -i inventory/prod/hosts.yml
```

**Deploys:**
- Containerized services
- Database migrations
- Configuration management
- Health checks

### Phase 4: Post-Deployment Validation
```bash
# Run validation tests
bash scripts/validate-deployment.sh

# Check all services healthy
kubectl get pods -A
# or
ansible all -i inventory/prod/hosts.yml -m ping
```

## Configuration Management

### Environment-Specific Variables

Create `terraform/environments/{environment}/terraform.tfvars`:

```hcl
# Development
environment = "development"
node_count  = 1
db_instance  = "db.t3.small"
min_replicas = 1
max_replicas = 2

# Staging
environment = "staging"
node_count  = 3
db_instance  = "db.r5.large"
min_replicas = 2
max_replicas = 5

# Production
environment = "production"
node_count  = 5
db_instance  = "db.r5.xlarge"
min_replicas = 3
max_replicas = 10
```

## Post-Deployment Steps

### 1. Verify Services

```bash
# Check API endpoint
curl https://api.your-domain.com/health

# Expected response:
# {"status":"ok","version":"1.0.0"}
```

### 2. Configure Monitoring

```bash
# Access Grafana dashboard
open https://monitoring.your-domain.com

# Configure alerts and dashboards
```

### 3. Test Critical Paths

```bash
# Test game flow
curl -X POST https://api.your-domain.com/api/sessions \
  -H "Authorization: Bearer $API_KEY" \
  -d '{...}'
```

### 4. Setup Backups

```bash
# Verify database backups
aws rds describe-db-instances \
  --db-instance-identifier peralta-prod

# Check backup retention
```

### 5. Enable Auto-Scaling

```bash
# Configure Horizontal Pod Autoscaler
kubectl autoscale deployment peralta-api \
  --min=3 --max=10 --cpu-percent=70

# Configure Cluster Autoscaler
# (Already configured in Terraform)
```

## Scaling the Deployment

### Horizontal Scaling

```bash
# Scale application pods
kubectl scale deployment peralta-api --replicas=5

# Or update HPA
kubectl patch hpa peralta-api-hpa -p '{"spec":{"minReplicas":5}}'
```

### Vertical Scaling

```bash
# Update node instance type
# Edit terraform.tfvars
instance_type = "t3.xlarge"

# Apply changes
terraform plan
terraform apply
```

## Troubleshooting

### Services Not Starting

```bash
# Check pod logs
kubectl logs deployment/peralta-api

# Describe pod for events
kubectl describe pod <pod-name>

# Check resource constraints
kubectl top nodes
kubectl top pods
```

### Database Connection Issues

```bash
# Test database connection
psql postgres://user:pass@db-host:5432/ace

# Check security group rules
aws ec2 describe-security-groups \
  --group-ids sg-xxxxx
```

### Performance Issues

```bash
# Check metrics
kubectl get hpa peralta-api-hpa --watch

# View Prometheus metrics
open https://monitoring.your-domain.com/prometheus

# Check database query performance
# See database monitoring guide
```

## Rollback Procedures

If deployment fails:

### Option 1: Terraform Rollback

```bash
# Revert to previous state
git checkout HEAD~1 -- terraform/

# Apply previous state
terraform apply
```

### Option 2: Kubernetes Rollback

```bash
# Rollback deployment
kubectl rollout undo deployment/peralta-api

# Check rollout history
kubectl rollout history deployment/peralta-api
```

## Maintenance Windows

### Planned Maintenance

```bash
# Update services with zero downtime
kubectl set image deployment/peralta-api \
  peralta-api=peralta:new-version \
  --record

# Monitor rollout
kubectl rollout status deployment/peralta-api
```

### Database Maintenance

```bash
# Perform maintenance on read replicas first
# Then promote new primary
aws rds modify-db-instance \
  --db-instance-identifier peralta-prod-replica-1 \
  --apply-immediately
```

## Next Steps

1. **Choose deployment method** - Select Kubernetes, AWS, GCP, or Azure
2. **Review prerequisites** - Check all requirements are met
3. **Follow cloud-specific guide** - Go to your chosen deployment path
4. **Validate deployment** - Run verification scripts
5. **Configure monitoring** - Set up alerts and dashboards
6. **Plan backups** - Configure backup retention

## Quick Links

- [Architecture Overview](/docs/peraltacc/architecture)
- [Getting Started](/docs/peraltacc/getting-started)
- [Configuration Guide](/docs/peraltacc/configuration)
- [Operations Guide](/docs/peraltacc/operations)
- [Security Guide](/docs/peraltacc/security)

## Support

For deployment issues:
- **Kubernetes Issues**: [Kubernetes Deployment](/docs/peraltacc/deployment/kubernetes)
- **AWS Issues**: [AWS Deployment](/docs/peraltacc/deployment/aws)
- **Cloud Issues**: Check cloud-specific deployment guide
- **General Help**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Email**: security@vln.gg
