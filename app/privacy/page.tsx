"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Privacy <span className="text-vln-sage">Policy</span>
              </h1>
              <p className="text-vln-gray mb-8">Last updated: January 1, 2025</p>
            </CSSFade>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <CSSFade delay={200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">1. Introduction</h2>
                  <p className="text-vln-gray leading-relaxed">
                    VLN, operated by Fused Gaming ("we," "us," or "our"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    By using our services, you consent to the data practices described in this policy.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={300}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Personal Information</h3>
                  <p className="text-vln-gray leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>Request a quote or consultation</li>
                    <li>Engage our services</li>
                    <li>Subscribe to our newsletter or communications</li>
                    <li>Contact us via email, form, or messaging platforms</li>
                  </ul>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    This information may include: name, email address, company name, job title, phone number, wallet addresses, and project details.
                  </p>

                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Technical Information</h3>
                  <p className="text-vln-gray leading-relaxed">
                    We automatically collect certain information when you visit our website:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>IP address and approximate geographic location</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referral source</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={400}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">3. How We Use Your Information</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process service requests and manage client relationships</li>
                    <li>Communicate with you about services, updates, and security advisories</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Analyze website usage to improve user experience</li>
                    <li>Comply with legal obligations and prevent fraud</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={500}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">4. Sharing of Information</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li><strong className="text-vln-white">Service Providers:</strong> With trusted third-party vendors who assist in operating our website and providing services (e.g., email providers, analytics tools). These vendors are contractually obligated to protect your information.</li>
                    <li><strong className="text-vln-white">Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
                    <li><strong className="text-vln-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, subject to confidentiality obligations.</li>
                    <li><strong className="text-vln-white">With Your Consent:</strong> When you explicitly authorize us to share information.</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={600}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">5. Client Code and Project Confidentiality</h2>
                  <p className="text-vln-gray leading-relaxed">
                    All client code, smart contracts, audit findings, and project-related information are treated as strictly confidential and are protected by separate confidentiality agreements.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We implement industry-standard security measures including:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>Encrypted storage of client data</li>
                    <li>Access controls and authentication</li>
                    <li>Secure communication channels</li>
                    <li>Employee confidentiality agreements</li>
                    <li>Regular security audits of our own infrastructure</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={700}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">6. Cookies and Tracking Technologies</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We use cookies and similar tracking technologies to improve your experience on our website. We currently use:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li><strong className="text-vln-white">Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong className="text-vln-white">Analytics Cookies:</strong> To understand how visitors use our site (via Cloudflare Web Analytics, which is privacy-focused and does not track personally identifiable information)</li>
                  </ul>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    You can control cookies through your browser settings. Disabling cookies may limit website functionality.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={800}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">7. Data Retention</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Client project data and audit reports are retained for a minimum of 7 years for legal and professional liability purposes. After this period, data may be anonymized or securely destroyed.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={900}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">8. Your Rights</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li><strong className="text-vln-white">Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong className="text-vln-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong className="text-vln-white">Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                    <li><strong className="text-vln-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong className="text-vln-white">Data Portability:</strong> Request transfer of your data to another service</li>
                  </ul>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    To exercise these rights, contact us at <a href="mailto:privacy@vln.gg" className="text-vln-sage hover:underline">privacy@vln.gg</a>.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1000}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">9. International Data Transfers</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1100}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">10. Children's Privacy</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">11. Changes to This Privacy Policy</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be communicated via email to registered users.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1300}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">12. Contact Us</h2>
                  <p className="text-vln-gray leading-relaxed">
                    For questions about this Privacy Policy or our data practices, contact us at:
                  </p>
                  <div className="mt-4 p-6 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
                    <p className="text-vln-white">
                      <strong>VLN - Fused Gaming</strong><br />
                      Privacy Officer<br />
                      Email: <a href="mailto:privacy@vln.gg" className="text-vln-sage hover:underline">privacy@vln.gg</a><br />
                      General Inquiries: <a href="mailto:info@vln.gg" className="text-vln-sage hover:underline">info@vln.gg</a><br />
                      Website: <a href="https://vln.gg" className="text-vln-sage hover:underline">vln.gg</a>
                    </p>
                  </div>
                </section>
              </CSSFade>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
