# 08 — Terms & References

**Document:** VLN-2026-PCC-001-TER  
**Version:** 1.0.0  
**Status:** Final  
**Date:** 2026-04-28  
**Classification:** Confidential

---

## Legal Framework

### Governing Agreement

This proposal is subject to VLN's standard **Master Services Agreement (MSA)** and **Statement of Work (SOW)**. Upon proposal acceptance, both parties will execute:

1. **MSA** — Governing terms for all VLN engagements
2. **SOW** — Specific to this engagement (scope, timeline, deliverables, fees)
3. **Mutual NDA** — Covering all information exchanged during the engagement
4. **Rules of Engagement Letter** — Signed authorization for active testing

---

### Key Legal Terms (Summary)

| Term | Position |
|------|---------|
| Jurisdiction | England & Wales |
| Liability Cap | Greater of 12 months of fees paid or $100,000 |
| Consequential Damages | Excluded by both parties |
| IP Ownership | Deliverables become PeraltaCC property upon final payment |
| Data Retention | VLN destroys all client data within 30 days of engagement close |
| Disclosure | Coordinated disclosure, no public release without written approval |
| Force Majeure | Standard clause (natural disasters, government action, platform outages) |

---

### Confidentiality

All information exchanged under this engagement is **strictly confidential**. This includes:

- Architecture documentation and system diagrams
- Source code and deployment scripts
- Vulnerability findings and audit reports
- Client personnel names and contact details
- Pricing and commercial terms

VLN will not reference PeraltaCC as a client in any marketing material without prior written consent.

---

## Disclosure Policy

VLN follows a **responsible disclosure** model:

1. **Day 0:** Critical/High findings communicated immediately via encrypted channel
2. **Day 1:** Written finding report delivered to PeraltaCC
3. **Day 30:** PeraltaCC completes remediation (target)
4. **Day 90:** VLN reserves the right to publish a sanitized advisory if no remediation is made
5. **Day 90+:** Any publication requires PeraltaCC approval; VLN will not publish without it during an active engagement

For findings that represent **systemic industry risk** (not specific to PeraltaCC), VLN may publish general advisories with all client-identifying information removed.

---

## References & Standards

### Security Frameworks Referenced

| Framework | Body | Usage |
|-----------|------|-------|
| OWASP Testing Guide v4.2 | OWASP Foundation | Platform security testing |
| OWASP Smart Contract Top 10 | OWASP Foundation | Contract risk classification |
| SWC Registry | SmartContractSecurity | Solidity vulnerability classification |
| SCSVS v1.0 | OWASP Foundation | Smart contract security verification |
| CVSS v3.1 | FIRST.org | Vulnerability severity scoring |
| STRIDE | Microsoft | Threat modeling |
| NIST SP 800-115 | NIST | Technical guide to information security testing |

### VLN Internal Protocols Referenced

| Protocol | Version | Usage |
|----------|---------|-------|
| VLN Statistical Analysis Protocol | v2.0 | RNG subsystem analysis |
| VLN Risk Graph Model | v1.0 | Wallet flow analysis |
| VLN Severity Model | v1.5 | Finding classification (supplements CVSS) |
| VLN Report Template | v3.1 | Deliverable formatting standard |

---

## Contact & Acceptance

### Acceptance Instructions

To accept this proposal, PeraltaCC should:

1. Reply to engage@vln.gg with written confirmation of acceptance
2. VLN will issue the MSA and SOW for signature within 2 business days
3. Upon execution, VLN will issue the 40% kickoff invoice
4. Access provisioning should be completed by **2026-05-09** (3 days before kickoff)

---

### Primary Contacts

**VLN – Vulnerability Lab Network**

| Role | Name | Contact |
|------|------|---------|
| Engagement Manager | VLN Team | engage@vln.gg |
| Emergency (24/7) | Security Hotline | security@vln.gg |
| Technical Lead | Lead Analyst | Available via Engagement Manager |

**Fused Gaming (Parent Company)**

GitHub: github.com/Fused-Gaming  
Discord: discord.gg/vln  
Web: vln.gg

---

## Proposal Validity

This proposal, including all pricing and terms, is valid until **2026-05-28**.

After this date, VLN reserves the right to revise rates and availability. PeraltaCC is encouraged to execute the agreement by **2026-05-07** to guarantee the 2026-05-12 start date.

---

*This concludes the PeraltaCC Engagement Proposal — VLN-2026-PCC-001*  
*All documents in this package are version-controlled. Refer to [index.md](./index.md) for the full document list.*
