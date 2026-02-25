#!/usr/bin/env python3
"""
Populate GitHub issues with comprehensive descriptions, diagrams, and success criteria.
Reads from PHASE_TRACKING.md and generates contextual descriptions for all blank issues.
"""

import subprocess
import json
import re
import sys

REPO = "Fused-Gaming/vln"

# Phase and Pillar context
PHASE_CONTEXT = {
    "Phase 1": {
        "version": "v0.11.0",
        "objective": "Brand & Distribution Layer",
        "pillars": {
            "Pillar 1": "Intake & Pipeline (Open Graph + Contact Flow)",
            "Pillar 2": "Production Infrastructure",
            "Pillar 3": "Documentation & Transparency"
        }
    },
    "Phase 2": {
        "version": "v1.1.0–1.3.0",
        "objective": "Operationalize Audits",
        "pillars": {
            "Pillar 1": "Authentication & Audit Requests (v1.1.0)",
            "Pillar 2": "Client Dashboard (v1.2.0)",
            "Pillar 3": "Payment & Automation (v1.3.0)"
        }
    },
    "Phase 3": {
        "version": "v2.0.0–2.2.0",
        "objective": "Productize Security",
        "pillars": {
            "Pillar 1": "Public API (v2.0.0)",
            "Pillar 2": "Continuous Security (v2.1.0)",
            "Pillar 3": "Enterprise Layer (v2.2.0)"
        }
    }
}

def get_issue(issue_num):
    """Fetch issue details from GitHub CLI"""
    try:
        result = subprocess.run(
            ["gh", "issue", "view", str(issue_num), "--repo", REPO, "--json", "title,body,number"],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error fetching issue {issue_num}: {e.stderr}")
        return None

def generate_description(title, phase, pillar):
    """Generate comprehensive description with diagrams"""

    if not phase or not pillar:
        return ""

    phase_info = PHASE_CONTEXT.get(phase, {})
    pillar_name = phase_info.get("pillars", {}).get(pillar, "")
    version = phase_info.get("version", "")
    objective = phase_info.get("objective", "")

    # Extract feature name from title (everything after the colon)
    feature_match = re.search(r':\s*(.+)$', title)
    feature_name = feature_match.group(1).strip() if feature_match else title

    # Determine dependencies based on phase/pillar
    if phase == "Phase 1":
        if pillar == "Pillar 1":
            dependencies = "Brand Foundation → Contact System → Intake Pipeline"
        elif pillar == "Pillar 2":
            dependencies = "Database → Session Layer → Monitoring"
        else:
            dependencies = "Architecture Docs → API Contracts → Transparency"
    elif phase == "Phase 2":
        if pillar == "Pillar 1":
            dependencies = "User Auth → Email Infrastructure → Audit Intake Form"
        elif pillar == "Pillar 2":
            dependencies = "Auth Complete → Dashboard UI → Report Viewer"
        else:
            dependencies = "Dashboard Ready → Stripe Integration → Payments"
    else:  # Phase 3
        if pillar == "Pillar 1":
            dependencies = "Auth Complete → API Foundation → SDKs & Tools"
        elif pillar == "Pillar 2":
            dependencies = "API Complete → Repository Watching → Analytics"
        else:
            dependencies = "API & Automation → SAML SSO → Compliance Docs"

    description = f"""## 🎯 {feature_name}

**Phase:** {phase} - {pillar_name}
**Version:** {version}
**Objective:** {objective}

### 📋 Feature Description

Implement {feature_name.lower()} to support {objective.lower()}.

### ✅ Deliverables

- [ ] Core functionality implemented
- [ ] TypeScript types defined
- [ ] Unit tests (80%+ coverage)
- [ ] Integration tests
- [ ] API documentation
- [ ] Component/function documentation
- [ ] Error handling & validation
- [ ] Performance optimized
- [ ] Accessibility checked (WCAG AA)
- [ ] Reviewed & approved

### 🔗 Dependencies

```mermaid
graph LR
    A["Phase {re.sub(r'Phase ', '', phase)} Start"] --> B["{dependencies.split(' → ')[0]}"]
    B --> C["{dependencies.split(' → ')[1] if len(dependencies.split(' → ')) > 1 else ''}"]
    C --> D["{feature_name}"]
    D --> E["Phase Complete"]
```

### 📊 Success Criteria

- [ ] Feature matches design specifications
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Lighthouse performance > 85
- [ ] No critical security vulnerabilities
- [ ] Code reviewed by team lead
- [ ] Documentation complete
- [ ] Ready for staging deployment

### 🚀 Implementation Notes

- Follow VLN brand guidelines (CLAUDE.md)
- Use Tailwind CSS for styling
- Prefer server components by default
- Add ARIA labels for accessibility
- Include proper error boundaries
- Add loading/skeleton states

### 📚 Related Issues

- **Phase {re.sub(r'Phase ', '', phase)} Overview:** #{get_phase_issue_number(phase)}
- **Phase Tracking:** https://github.com/Fused-Gaming/vln/docs/planning/PHASE_TRACKING.md

---

**Estimate:** TBD (adjust in project)
**Priority:** Medium (adjust based on sprint planning)
"""

    return description

def get_phase_issue_number(phase):
    """Get the main phase issue number"""
    phase_issues = {
        "Phase 1": "64",
        "Phase 2": "114",
        "Phase 3": "149"
    }
    return phase_issues.get(phase, "")

def extract_phase_and_pillar(title):
    """Extract phase and pillar from issue title"""

    # Match "Phase X - Pillar Y: ..."
    match = re.search(r'Phase\s+(\d+)\s*-\s*Pillar\s+(\d+)', title)
    if match:
        phase_num = match.group(1)
        pillar_num = match.group(2)
        return f"Phase {phase_num}", f"Pillar {pillar_num}"

    # Match "Phase X: ..." (main phase issue)
    match = re.search(r'Phase\s+(\d+)', title)
    if match:
        phase_num = match.group(1)
        return f"Phase {phase_num}", None

    return None, None

def update_issue(issue_num, body):
    """Update GitHub issue with new description"""
    try:
        # Use gh issue edit command
        subprocess.run(
            ["gh", "issue", "edit", str(issue_num), "--repo", REPO, "--body", body],
            check=True,
            capture_output=True
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error updating issue {issue_num}: {e.stderr}")
        return False

def main():
    """Main function"""
    print("🚀 Populating GitHub issues with descriptions...")

    # Get all open issues
    try:
        result = subprocess.run(
            ["gh", "issue", "list", "--repo", REPO, "--state", "open", "--limit", "300"],
            capture_output=True,
            text=True,
            check=True
        )
    except subprocess.CalledProcessError as e:
        print(f"Error fetching issues: {e.stderr}")
        sys.exit(1)

    # Parse issue numbers from output
    issues = []
    for line in result.stdout.strip().split('\n'):
        if line.strip():
            parts = line.split()
            if parts and parts[0].isdigit():
                issues.append(int(parts[0]))

    updated = 0
    skipped = 0

    for issue_num in sorted(issues):
        issue = get_issue(issue_num)

        if not issue:
            continue

        # Skip if issue already has a body
        if issue.get('body', '').strip():
            print(f"⏭️  Issue #{issue_num}: Already has description")
            skipped += 1
            continue

        title = issue.get('title', '')
        phase, pillar = extract_phase_and_pillar(title)

        # Skip phase overview issues (they already have descriptions)
        if not pillar and phase:
            print(f"⏭️  Issue #{issue_num}: Phase overview issue")
            skipped += 1
            continue

        if not phase:
            print(f"⏭️  Issue #{issue_num}: Could not determine phase")
            skipped += 1
            continue

        # Generate description
        description = generate_description(title, phase, pillar)

        if not description:
            print(f"⏭️  Issue #{issue_num}: Could not generate description")
            skipped += 1
            continue

        # Update issue
        if update_issue(issue_num, description):
            print(f"✅ Issue #{issue_num}: Updated with comprehensive description")
            updated += 1
        else:
            print(f"❌ Issue #{issue_num}: Failed to update")

    print(f"\n✅ Complete! Updated {updated} issues, skipped {skipped}")

if __name__ == "__main__":
    main()
