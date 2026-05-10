---
title: Projects
description: Active project documentation — bid proposals, case studies, and client deliverables managed through the VLN agent swarm platform
---

This section documents active projects where VLN's agent swarm infrastructure — built on Claude Flow v3 and the Anthropic SDK — is being used to research, plan, and deliver client engagements.

## Active Projects

### PeraltaCC — ERP Automation Bid

Fused Gaming's response to **RFP 25-26-09** from the Peralta Community College District: a district-wide ERP workflow automation and functional alignment platform powered by Claude Flow v3.

| Document | Description |
|---|---|
| [Overview & Architecture](./peraltacc) | Full proposal, tech stack, solution architecture, team, financials, and schedule |
| [Requirements & Compliance](./peraltacc-requirements) | Requirements Traceability Matrix (21+ requirements) and compliance checklist |
| [Case Studies & References](./peraltacc-case-studies) | Three higher education ERP case studies and reference letters |
| [Team & Engagement Brief](./peraltacc-team) | Consultant bios, RACI matrix, and team engagement strategy |

**RFP submission deadline:** May 23, 2026 (estimated)  
**Contract value:** $2,250,000 fixed-price  
**Status:** Phase 1 complete — Phase 2 (proposal development) begins May 1, 2026

---

## Platform

All project documentation in this section is generated and maintained by a multi-agent swarm running on:

- **Claude Flow v3** (`claude-flow@3.5.x`) — multi-agent orchestration
- **`@anthropic-ai/sdk`** — Anthropic Claude API
- **`@h4shed/skill-syncpulse`** — parallel thread execution
- **Source:** [`fused-gaming/peraltacc`](https://github.com/Fused-Gaming/PeraltaCC)
