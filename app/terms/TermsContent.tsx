"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Terms of <span className="text-vln-sage">Service</span>
              </h1>
              <p className="text-vln-gray mb-8">Last updated: January 1, 2025</p>
            </CSSFade>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <CSSFade delay={200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">1. Agreement to Terms</h2>
                  <p className="text-vln-gray leading-relaxed">
                    By accessing or using VLN&apos;s security services (&quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use our Services.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    VLN is operated by Fused Gaming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms constitute a legally binding agreement between you and Fused Gaming.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={300}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">2. Services Description</h2>
                  <p className="text-vln-gray leading-relaxed">
                    VLN provides smart contract security audits, penetration testing, incident response, forensic analysis, secure development consulting, and security training services for blockchain and decentralized applications.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Our Services are provided on an as-ordered basis through individual service agreements, retainer contracts, or one-time engagements as specified in our proposals and invoices.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={400}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">3. No Guarantee of Security</h2>
                  <p className="text-vln-gray leading-relaxed">
                    <strong className="text-vln-white">IMPORTANT:</strong> No security audit or testing can guarantee that software is completely free from vulnerabilities. Our Services provide a professional assessment based on industry best practices, but we cannot guarantee that all vulnerabilities will be discovered or that no future vulnerabilities will emerge.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    You acknowledge that smart contract security is an evolving field and that new attack vectors and vulnerabilities may be discovered after our audit is complete.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={500}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">4. Confidentiality</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We treat all client code, findings, and project information as confidential. We will not disclose your code, audit results, or any proprietary information to third parties without your express written consent, except as required by law.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We may request permission to use anonymized case studies or statistics derived from our work for marketing purposes. Such use will only occur with your explicit approval.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={600}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">5. Payment Terms</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Payment terms are specified in individual service agreements or invoices. Standard payment terms are 50% upfront and 50% upon delivery of final deliverables.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We accept wire transfer, cryptocurrency (ETH, BTC), and stablecoins (USDC, USDT). All prices are quoted in USD. Cryptocurrency payments are converted at the exchange rate at the time of payment.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Late payments may incur interest charges of 1.5% per month or the maximum allowed by law, whichever is lower.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={700}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">6. Intellectual Property</h2>
                  <p className="text-vln-gray leading-relaxed">
                    You retain all rights to your code and project materials. We retain rights to our audit methodologies, tools, templates, and general security knowledge.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Audit reports and findings are provided for your use only and may not be redistributed, sold, or shared publicly without our written consent. You may share reports with investors, partners, or auditors under confidentiality obligations.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={800}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">7. Limitation of Liability</h2>
                  <p className="text-vln-gray leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, VLN AND FUSED GAMING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR STOLEN FUNDS, ARISING FROM YOUR USE OF OUR SERVICES.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Our total liability for any claims arising from our Services shall not exceed the fees paid for the specific service giving rise to the claim.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={900}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">8. Indemnification</h2>
                  <p className="text-vln-gray leading-relaxed">
                    You agree to indemnify and hold harmless VLN, Fused Gaming, and our employees from any claims, damages, or losses arising from: (a) your use of our Services, (b) your violation of these Terms, or (c) your violation of any third-party rights.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1000}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">9. Termination</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Either party may terminate an engagement with written notice. Termination does not relieve you of payment obligations for work completed prior to termination.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We reserve the right to refuse service or terminate engagements if we determine that a project involves illegal activity, violates our ethical standards, or poses unacceptable risks.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1100}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">10. Governing Law</h2>
                  <p className="text-vln-gray leading-relaxed">
                    These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Fused Gaming operates, without regard to conflict of law principles.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Any disputes arising from these Terms or our Services shall be resolved through binding arbitration or in the courts of our jurisdiction, as specified in individual service agreements.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">11. Changes to Terms</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our Services after changes constitutes acceptance of the modified Terms.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Material changes will be communicated to active clients via email or through our service platforms.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1300}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">12. Contact Information</h2>
                  <p className="text-vln-gray leading-relaxed">
                    For questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 p-6 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
                    <p className="text-vln-white">
                      <strong>VLN - Fused Gaming</strong><br />
                      Email: <a href="mailto:info@vln.gg" className="text-vln-sage hover:underline">info@vln.gg</a><br />
                      Website: <a href="https://vln.gg" className="text-vln-sage hover:underline">vln.gg</a><br />
                      Telegram: <a href="https://t.me/vlngg" className="text-vln-sage hover:underline">@vlngg</a>
                    </p>
                  </div>
                </section>
              </CSSFade>

              <CSSFade delay={1400}>
                <div className="mt-12 p-6 rounded-vln border-2 border-vln-amber/40 bg-vln-amber/10">
                  <p className="text-sm text-vln-gray">
                    <strong className="text-vln-white">Disclaimer:</strong> This document provides general terms of service. Individual service agreements may contain additional or different terms. In case of conflict, the terms of the specific service agreement shall prevail.
                  </p>
                </div>
              </CSSFade>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
