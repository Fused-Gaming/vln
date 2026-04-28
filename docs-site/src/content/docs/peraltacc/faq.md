---
title: Peralta FAQ & Troubleshooting
description: Frequently asked questions and troubleshooting guide for Peralta deployment
---

# Peralta FAQ & Troubleshooting

Common questions about Peralta deployment and operations.

## General Questions

### What is Peralta?
Peralta is VLN's enterprise deployment and operations framework providing infrastructure-as-code templates, deployment automation, monitoring setup, and operational procedures.

### What does Peralta deploy?
Peralta deploys:
- Kubernetes or cloud-native infrastructure
- ACE Blackjack services
- Database (PostgreSQL)
- Caching layer (Redis)
- Monitoring stack (Prometheus, Grafana)
- Logging stack (ELK)
- API gateway and load balancing

### What cloud providers are supported?
- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- Microsoft Azure
- Kubernetes (any distribution)

### How long does deployment take?
- Kubernetes: 1-2 hours
- AWS: 2-3 hours
- GCP: 2-3 hours
- Azure: 2-3 hours

### What's the cost?
Pricing depends on:
- Cloud provider rates
- Number of players/throughput
- Multi-region deployment
- Custom features

Contact sales@vln.gg for estimate.

## Prerequisites & Setup

### Q: What tools do I need?
**A:** Required:
- Terraform >= 1.0
- Ansible >= 2.10
- Docker >= 24.0
- kubectl >= 1.27
- Git

### Q: I don't have any of these tools
**A:** Install them:

**macOS:**
```bash
brew install terraform ansible docker kubernetes-cli git
```

**Ubuntu/Debian:**
```bash
# Add HashiCorp repo
curl https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

# Install
sudo apt-get update
sudo apt-get install terraform ansible docker.io

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/
```

### Q: Do I need cloud provider CLI tools?
**A:** Recommended:
- AWS CLI for AWS deployments
- gcloud for GCP
- az for Azure

### Q: What permissions do I need?
**A:** Full administrative access to cloud account for initial setup. After deployment, use least-privilege IAM roles.

## Deployment

### Q: Can I deploy to multiple clouds simultaneously?
**A:** Yes! The architecture supports multi-cloud deployment. See [Multi-Region Setup](/docs/peraltacc/deployment/multi-region).

### Q: What's the difference between environments?
**A:**
- **Development**: Single node, minimal redundancy
- **Staging**: Full production configuration
- **Production**: Multi-AZ, multi-region ready

### Q: Can I deploy to an existing Kubernetes cluster?
**A:** Yes, that's recommended:

1. Ensure cluster meets requirements (1.27+, 3+ nodes)
2. Configure kubeconfig
3. Run Helm deployment

### Q: Terraform plan shows unexpected changes
**A:**
1. Review the planned changes
2. Check terraform.tfvars for unintended edits
3. Ensure remote state is current
4. Run `terraform refresh` to sync state

### Q: Deployment fails halfway through
**A:**
1. Check logs for error message
2. Fix the issue
3. Re-run: `terraform apply` (idempotent)
4. Or use Ansible directly for specific components

### Q: How do I roll back a deployment?
**A:** Several options:

```bash
# Option 1: Revert Terraform state
terraform destroy -target=aws_instance.app
terraform apply

# Option 2: Kubernetes rollback
kubectl rollout undo deployment/peralta-api

# Option 3: Git rollback
git checkout HEAD~1 -- terraform/
terraform apply
```

## Configuration

### Q: How do I change database size?
**A:** Edit `terraform/environments/prod/terraform.tfvars`:

```hcl
db_instance_class = "db.r5.xlarge"  # Change this
```

Then:
```bash
terraform plan
terraform apply
```

### Q: How do I enable multi-region?
**A:** 

1. Update `terraform.tfvars` with regions
2. Configure replication settings
3. Run terraform
4. Configure DNS failover

See [Multi-Region Setup](/docs/peraltacc/deployment/multi-region).

### Q: How do I use custom SSL certificates?
**A:**

```hcl
# terraform.tfvars
ssl_certificate_arn = "arn:aws:acm:..."
```

Or manually:
1. Create certificate in AWS ACM/GCP
2. Update load balancer configuration
3. Configure DNS

### Q: How do I change application configuration?
**A:** Use Ansible to update running services:

```bash
ansible-playbook playbooks/configure-app.yml \
  -i inventory/prod/hosts.yml \
  -e "config_var=value"
```

### Q: How do I add environment variables?
**A:** 

**For secrets:**
```bash
# Use AWS Secrets Manager
aws secretsmanager create-secret \
  --name peralta/api-key \
  --secret-string "value"
```

**Then reference in deployment:**
```hcl
environment_variables = {
  API_KEY = aws_secretsmanager_secret.api_key.id
}
```

## Operations

### Q: How do I check if services are healthy?
**A:**

```bash
# Kubernetes
kubectl get pods -A
kubectl describe pod <pod-name>

# Or use dashboard
kubectl proxy
# Visit http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

### Q: How do I view logs?
**A:**

**Kubernetes:**
```bash
kubectl logs deployment/peralta-api
kubectl logs -f deployment/peralta-api  # Follow logs
```

**Cloud:**
- AWS CloudWatch
- Google Cloud Logging
- Azure Monitor

**ELK Stack:**
```
https://your-domain.com/kibana
```

### Q: Services keep restarting
**A:**
1. Check logs: `kubectl logs <pod-name>`
2. Check resource limits: `kubectl top pods`
3. Check readiness probes: `kubectl describe pod <pod-name>`
4. Check configuration: `kubectl get configmap`
5. Contact support with logs

### Q: Database connection pool exhausted
**A:**
1. Increase pool size in configuration
2. Check for connection leaks in application
3. Add database replicas for read scaling
4. Monitor active connections

### Q: High CPU usage
**A:**
1. Check slow queries
2. Verify indexes are optimal
3. Scale horizontally (add more pods)
4. Review application code for inefficiencies

### Q: High memory usage
**A:**
1. Check container memory limits
2. Look for memory leaks in logs
3. Scale memory allocation up
4. Reduce cache TTL if cache-related

### Q: Network connectivity issues
**A:**
1. Check VPC/security groups
2. Verify DNS resolution
3. Test network paths
4. Review firewall logs

## Monitoring & Alerts

### Q: Where do I view metrics?
**A:** 

```
https://your-domain.com/grafana
```

Login with:
- Username: admin
- Password: (set during deployment)

### Q: How do I create custom alerts?
**A:** In Grafana:
1. Create alert rule
2. Set threshold
3. Configure notification channel
4. Test alert

### Q: I'm not receiving alerts
**A:**
1. Check alert rules are enabled
2. Verify notification channel is configured
3. Test channel manually
4. Check email spam folder

### Q: How do I export metrics?
**A:** Prometheus API:

```bash
# Query metrics
curl "http://prometheus:9090/api/v1/query?query=up"

# Export metrics
curl "http://prometheus:9090/api/v1/series?match[]=up"
```

## Scaling

### Q: How do I scale up?
**A:**

**Horizontal (more nodes):**
```hcl
# terraform.tfvars
app_desired_count = 10  # Increase replicas
```

```bash
terraform apply
```

**Vertical (bigger nodes):**
```hcl
instance_type = "t3.xlarge"  # Bigger instances
```

### Q: How do I scale database?
**A:**

```bash
# AWS RDS
aws rds modify-db-instance \
  --db-instance-identifier peralta-prod \
  --db-instance-class db.r5.2xlarge \
  --apply-immediately
```

### Q: Can I add read replicas?
**A:** Yes, via Terraform:

```hcl
read_replicas = [
  { az = "us-east-1b" },
  { az = "us-east-1c" }
]
```

### Q: Auto-scaling not working
**A:**
1. Check HPA is enabled
2. Verify metrics are available
3. Check resource limits
4. Review HPA events: `kubectl describe hpa`

## Backups & Recovery

### Q: How often are backups created?
**A:** Daily by default, configurable:

```hcl
backup_retention_days = 30
backup_window          = "03:00-04:00"
```

### Q: How do I restore from backup?
**A:**

```bash
# List available backups
aws rds describe-db-snapshots \
  --db-instance-identifier peralta-prod

# Restore
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier peralta-prod-restored \
  --db-snapshot-identifier <snapshot-id>
```

### Q: How do I test backups?
**A:** Restore to staging environment monthly.

### Q: Where are backups stored?
**A:** 
- AWS: S3 (encrypted)
- GCP: Cloud Storage
- Azure: Blob Storage

### Q: What about application data backups?
**A:** Application files are:
- In containerized system (immutable)
- Configuration in version control
- Data in database (covered by DB backups)

## Troubleshooting

### Q: Nodes not joining cluster
**A:**
1. Check node prerequisites
2. Verify network connectivity
3. Check security group rules
4. Review Ansible logs

### Q: Database migration failures
**A:**
1. Check database is accessible
2. Verify schema is correct
3. Check disk space
4. Review error logs

### Q: API returning 503 errors
**A:**
1. Check service health: `kubectl get pods`
2. Check logs: `kubectl logs <pod>`
3. Verify database connectivity
4. Check external dependencies

### Q: Terraform state corruption
**A:**
```bash
# Refresh state
terraform refresh

# Inspect state
terraform state list
terraform state show <resource>

# If necessary, recover from backup
aws s3 cp s3://terraform-state/backup/terraform.tfstate .
```

### Q: Certificate expiring soon
**A:**
1. Renew certificate with provider (AWS ACM auto-renews)
2. Update in load balancer
3. Verify renewal: `openssl s_client -connect domain:443`

## Security

### Q: How do I secure API keys?
**A:** Use secrets manager:
- AWS Secrets Manager
- Google Secret Manager
- Azure Key Vault

### Q: Can I restrict access by IP?
**A:** Yes, via security groups:

```hcl
ingress_security_group = {
  cidr_blocks = ["203.0.113.0/24"]
}
```

### Q: How do I enable VPN access?
**A:** Configure VPN gateway:

```hcl
enable_vpn_gateway = true
vpn_cidr           = "10.0.0.0/16"
```

### Q: Are backups encrypted?
**A:** Yes, AES-256-GCM at rest, TLS in transit.

## Getting Help

**Still need help?**

- 📖 [Deployment Guide](/docs/peraltacc/deployment)
- 🏗️ [Architecture](/docs/peraltacc/architecture)
- ⚙️ [Configuration](/docs/peraltacc/configuration)
- 🚀 [Operations](/docs/peraltacc/operations)
- 🐛 [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- 📧 [support@vln.gg](mailto:support@vln.gg)
