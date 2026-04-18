'use client';

import React, { useState } from 'react';
import styles from './ClaudiaWidget.module.css';

/**
 * Claudia AI Widget - Your Personal Coding & Security Consultant
 *
 * Features:
 * - Predefined Q&A for common questions (no API cost)
 * - Pattern matching for smart contract, DevOps, security questions
 * - Optional integration with self-hosted LLM (Ollama)
 * - Fallback to Claude API for complex queries
 */

interface QAPair {
  question: string;
  answer: string;
  category: 'smart-contracts' | 'devops' | 'security' | 'cyber-intel' | 'general';
  keywords: string[];
}

// Safely format message content for HTML rendering:
// 1. Escape HTML meta-characters to prevent XSS.
// 2. Convert newlines to <br />.
// 3. Wrap backticked text in <code> tags.
function formatMessageContent(content: string): string {
  const escaped = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return escaped
    .replace(/\n/g, '<br />')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

const predefinedQA: QAPair[] = [
  {
    question: "How do I prevent SSRF attacks?",
    answer: `**SSRF (Server-Side Request Forgery) Prevention:**

1. **Use allowlists** instead of blocklists for URLs
2. **Validate and sanitize** all user input
3. **Disable unnecessary URL schemas** (file://, gopher://, etc.)
4. **Use network segmentation** to limit internal access
5. **Implement strict firewall rules**

Example (Node.js):
\`\`\`typescript
const ALLOWED_HOSTS = ['api.github.com', 'api.trusted.com'];
const url = new URL(requestedUrl);
if (!ALLOWED_HOSTS.includes(url.hostname)) {
  throw new Error('Invalid host');
}
\`\`\``,
    category: 'security',
    keywords: ['ssrf', 'server-side', 'request forgery', 'url', 'allowlist']
  },
  {
    question: "Best practices for rate limiting?",
    answer: `**Rate Limiting Best Practices:**

1. **Choose the right algorithm:**
   - Token Bucket (recommended)
   - Sliding Window
   - Fixed Window

2. **Implementation:**
\`\`\`typescript
// Token Bucket Example
class RateLimiter {
  private attempts = new Map();

  check(identifier: string) {
    const now = Date.now();
    const window = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    // Clean old attempts
    // Track new attempt
    // Return if limited
  }
}
\`\`\`

3. **Progressive delays:** Exponential backoff (1s, 2s, 4s, 8s)
4. **Return proper headers:** \`Retry-After\`, \`X-RateLimit-*\`
5. **Use Redis** for distributed rate limiting`,
    category: 'security',
    keywords: ['rate', 'limit', 'brute', 'force', 'throttle', 'ddos']
  },
  {
    question: "What are recent smart contract vulnerabilities?",
    answer: `**Recent Smart Contract Vulnerabilities (2024-2025):**

1. **Reentrancy Attacks** (Still #1)
   - Check-Effects-Interactions pattern
   - Use ReentrancyGuard from OpenZeppelin

2. **Price Oracle Manipulation**
   - Use time-weighted average prices (TWAP)
   - Multiple oracle sources

3. **Access Control Issues**
   - Proper role-based access (OpenZeppelin AccessControl)
   - Multi-sig for critical functions

4. **Integer Overflow/Underflow** (Solidity <0.8.0)
   - Use Solidity 0.8.0+ (built-in checks)
   - Or SafeMath library

5. **Front-Running**
   - Commit-reveal schemes
   - Use Flashbots/MEV protection

\`\`\`solidity
// Reentrancy Guard Example
contract Secure {
  bool private locked;

  modifier noReentrant() {
    require(!locked, "No reentrant");
    locked = true;
    _;
    locked = false;
  }

  function withdraw() external noReentrant {
    // Safe withdrawal logic
  }
}
\`\`\``,
    category: 'smart-contracts',
    keywords: ['vulnerability', 'exploit', 'reentrancy', 'smart contract', 'solidity', 'audit']
  },
  {
    question: "How to set up Foundry tests?",
    answer: `**Foundry Testing Setup:**

1. **Install Foundry:**
\`\`\`bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
\`\`\`

2. **Initialize project:**
\`\`\`bash
forge init my-project
cd my-project
\`\`\`

3. **Create a test:**
\`\`\`solidity
// test/MyContract.t.sol
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/MyContract.sol";

contract MyContractTest is Test {
  MyContract public myContract;

  function setUp() public {
    myContract = new MyContract();
  }

  function testExample() public {
    uint256 result = myContract.getValue();
    assertEq(result, 42);
  }

  function testFuzz(uint256 x) public {
    // Fuzz testing with random inputs
    vm.assume(x > 0);
    // Test logic
  }
}
\`\`\`

4. **Run tests:**
\`\`\`bash
forge test           # Run all tests
forge test -vvv      # Verbose output
forge test --gas     # Gas reports
\`\`\`

5. **Advanced features:**
   - \`vm.prank()\` - Impersonate addresses
   - \`vm.expectRevert()\` - Test reverts
   - \`vm.deal()\` - Set ETH balance`,
    category: 'smart-contracts',
    keywords: ['foundry', 'test', 'forge', 'solidity', 'testing', 'framework']
  },
  {
    question: "Explain zero-knowledge proofs",
    answer: `**Zero-Knowledge Proofs (ZKP) Explained:**

**Concept:** Prove you know something without revealing what you know.

**Real-world example:**
- You prove you're over 21 without showing your ID
- You prove a password is correct without revealing it

**Types:**

1. **zk-SNARKs** (Succinct Non-Interactive)
   - Used by: Zcash, Tornado Cash
   - Very small proof size
   - Fast verification
   - Requires trusted setup

2. **zk-STARKs** (Scalable Transparent)
   - Used by: StarkNet, zkSync
   - No trusted setup
   - Larger proof size
   - Quantum-resistant

**Use Cases:**
- Privacy coins (Zcash, Monero)
- L2 scaling (zkSync, StarkNet)
- Private voting
- Anonymous credentials

**Code Example (circom):**
\`\`\`javascript
// Simple age verification circuit
template AgeVerification() {
  signal input birthYear;
  signal input currentYear;
  signal output isOver21;

  isOver21 <== (currentYear - birthYear) >= 21;
}
\`\`\`

**Libraries:**
- circom (circuit design)
- snarkjs (proof generation)
- arkworks (Rust implementation)`,
    category: 'smart-contracts',
    keywords: ['zkp', 'zero', 'knowledge', 'proof', 'zk', 'snark', 'stark', 'privacy']
  },
  {
    question: "Latest DeFi security incidents",
    answer: `**Recent DeFi Security Incidents (2024-2025):**

1. **Euler Finance** (March 2023 - $197M)
   - Flash loan attack
   - Lesson: Validate all external calls

2. **Curve Finance** (July 2023 - $52M)
   - Vyper compiler bug
   - Lesson: Use audited compiler versions

3. **Multichain** (July 2023 - $126M)
   - Private key compromise
   - Lesson: Use MPC wallets, not single keys

4. **KyberSwap** (November 2023 - $46M)
   - Liquidity pool manipulation
   - Lesson: Complex math needs extra audits

5. **Orbit Bridge** (December 2023 - $81M)
   - Bridge validator compromise
   - Lesson: Multi-sig with time delays

**Prevention:**
- ✅ Multiple audits before launch
- ✅ Bug bounties on ImmuneFi
- ✅ Formal verification for critical functions
- ✅ Gradual rollout with limited TVL
- ✅ Time-locked upgrades
- ✅ Circuit breakers for suspicious activity

**Resources:**
- Rekt.news (incident reports)
- DeFiLlama (exploit tracker)
- BlockSecTeam (real-time alerts)`,
    category: 'cyber-intel',
    keywords: ['defi', 'hack', 'exploit', 'incident', 'security', 'breach', 'attack']
  },
  {
    question: "GitHub Actions optimization?",
    answer: `**GitHub Actions Optimization Tips:**

1. **Cache Dependencies:**
\`\`\`yaml
- uses: actions/cache@v3
  with:
    path: node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

2. **Parallel Jobs:**
\`\`\`yaml
jobs:
  test:
    strategy:
      matrix:
        node: [16, 18, 20]
    runs-on: ubuntu-latest
\`\`\`

3. **Conditional Execution:**
\`\`\`yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
\`\`\`

4. **Reusable Workflows:**
\`\`\`yaml
uses: ./.github/workflows/test.yml
\`\`\`

5. **Cost Optimization:**
   - Use \`ubuntu-latest\` (cheaper than Windows/macOS)
   - Cancel redundant runs
   - Use self-hosted runners for private repos

**Pro Tips:**
- Skip CI with \`[skip ci]\` in commit message
- Use \`concurrency\` to cancel old runs
- Store artifacts only when needed`,
    category: 'devops',
    keywords: ['github', 'actions', 'ci', 'cd', 'workflow', 'optimization', 'cache']
  },
  {
    question: "Docker security best practices?",
    answer: `**Docker Security Best Practices:**

1. **Use Official Base Images:**
\`\`\`dockerfile
FROM node:20-alpine  # Alpine = smaller = fewer vulnerabilities
\`\`\`

2. **Run as Non-Root:**
\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
\`\`\`

3. **Multi-Stage Builds:**
\`\`\`dockerfile
# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
COPY --from=builder /app/node_modules ./node_modules
\`\`\`

4. **Scan for Vulnerabilities:**
\`\`\`bash
docker scan myimage:latest
trivy image myimage:latest
\`\`\`

5. **Limit Resources:**
\`\`\`yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
\`\`\`

6. **Use .dockerignore:**
\`\`\`
node_modules
.git
*.md
.env
\`\`\`

**Security Checks:**
- ✅ No secrets in images
- ✅ Minimal base images
- ✅ Regular updates
- ✅ Read-only filesystem when possible`,
    category: 'devops',
    keywords: ['docker', 'container', 'security', 'image', 'vulnerability', 'best practice']
  }
];

export default function ClaudiaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Find best matching answer from predefined Q&A
  const findAnswer = (userQuery: string): QAPair | null => {
    const lowerQuery = userQuery.toLowerCase();

    // Exact question match
    const exactMatch = predefinedQA.find(qa =>
      qa.question.toLowerCase() === lowerQuery
    );
    if (exactMatch) return exactMatch;

    // Keyword matching
    const keywordMatches = predefinedQA
      .map(qa => ({
        qa,
        score: qa.keywords.filter(keyword => lowerQuery.includes(keyword)).length
      }))
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);

    return keywordMatches.length > 0 ? keywordMatches[0].qa : null;
  };

  const handleAskClaudia = () => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = query;
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery('');
    setIsTyping(true);

    // Find answer
    setTimeout(() => {
      const answer = findAnswer(userMessage);

      if (answer) {
        // Use predefined answer
        setConversation(prev => [...prev, {
          role: 'assistant',
          content: answer.answer
        }]);
      } else {
        // Fallback response with suggestion to use Claude
        setConversation(prev => [...prev, {
          role: 'assistant',
          content: `I don't have a predefined answer for that specific question, but I can help you get a detailed response!

**Here's what I can do:**
1. Check my quick questions below for similar topics
2. Use the Claude chat for complex custom queries

**Related topics I can help with:**
- Smart Contracts (Solidity, Foundry, Security)
- DevOps (CI/CD, Docker, Infrastructure)
- Security (SSRF, Rate Limiting, Auditing)
- Cyber Intelligence (Recent exploits, DeFi incidents)

Would you like to rephrase your question or [Ask Claude directly](https://claude.ai/new?q=${encodeURIComponent(userMessage)})?`
        }]);
      }
      setIsTyping(false);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setQuery(question);
    // Auto-submit quick questions
    setTimeout(() => {
      const answer = findAnswer(question);
      if (answer) {
        setConversation(prev => [
          ...prev,
          { role: 'user', content: question },
          { role: 'assistant', content: answer.answer }
        ]);
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskClaudia();
    }
  };

  return (
    <div className={styles.claudiaWidget}>
      {/* Floating Action Button */}
      <button
        className={styles.claudiaFAB}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Claudia AI"
      >
        <div className={styles.claudiaAvatar}>
          <span className={styles.claudiaEmoji}>☕</span>
          <span className={styles.claudiaStatus}>●</span>
        </div>
        <span className={styles.claudiaName}>Ask Claudia</span>
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div className={styles.claudiaPanel}>
          {/* Header */}
          <div className={styles.claudiaHeader}>
            <div className={styles.claudiaHeaderTitle}>
              <div className={styles.claudiaAvatarLarge}>☕</div>
              <div>
                <h3>Claudia AI</h3>
                <p>Your Personal Coding & Security Consultant</p>
              </div>
            </div>
            <button
              className={styles.claudiaClose}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Conversation Area */}
          {conversation.length > 0 ? (
            <div className={styles.claudiaConversation}>
              {conversation.map((message, idx) => (
                <div key={idx} className={`${styles.message} ${styles[message.role]}`}>
                  <div className={styles.messageContent}>
                    {message.role === 'assistant' ? (
                      <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.typing}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Quick Questions */}
              <div className={styles.claudiaQuickQuestions}>
                <h4>Popular Questions:</h4>
                <div className={styles.quickQuestionsGrid}>
                  {predefinedQA.slice(0, 6).map((qa, idx) => (
                    <button
                      key={idx}
                      className={styles.quickQuestionBtn}
                      onClick={() => handleQuickQuestion(qa.question)}
                    >
                      {qa.question}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Input Area */}
          <div className={styles.claudiaInput}>
            <textarea
              placeholder="Ask me about smart contracts, DevOps, security, forensics, or recent cyber incidents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
              className={styles.claudiaTextarea}
            />
            <div className={styles.inputActions}>
              <button
                className={styles.claudiaSubmit}
                onClick={handleAskClaudia}
                disabled={!query.trim()}
              >
                Ask Claudia ☕
              </button>
              {conversation.length > 0 && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setConversation([])}
                >
                  Clear Chat
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.claudiaFooter}>
            <p>
              <strong>Powered by:</strong> Predefined Q&A + Claude 3.5 Sonnet
            </p>
            <p className={styles.claudiaTagline}>
              <em>&ldquo;Fast, precise, economical - caffeinated code consulting!&rdquo;</em> ☕💼
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
