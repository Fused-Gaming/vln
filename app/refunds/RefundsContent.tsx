"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";

export default function RefundsContent() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Refund <span className="text-vln-sage">Policy</span>
              </h1>
              <p className="text-vln-gray mb-8">Last updated: January 1, 2025</p>
            </CSSFade>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <CSSFade delay={200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">1. Overview</h2>
                  <p className="text-vln-gray leading-relaxed">
                    VLN is committed to delivering high-quality security services. This Refund Policy outlines the circumstances under which refunds may be issued for our services.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    Due to the nature of security consulting and auditing work, refunds are evaluated on a case-by-case basis. This policy applies to all VLN services including audits, penetration testing, consulting, training, and incident response.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={300}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">2. Smart Contract Audit Refunds</h2>
                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Before Work Begins</h3>
                  <p className="text-vln-gray leading-relaxed">
                    If you cancel an audit engagement before work has commenced, you are eligible for a full refund of any upfront payment, minus a $500 administrative fee.
                  </p>

                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">After Work Begins</h3>
                  <p className="text-vln-gray leading-relaxed">
                    Once our team has started the audit process, refunds are prorated based on work completed:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>0-25% completion: 75% refund of total fee</li>
                    <li>25-50% completion: 50% refund of total fee</li>
                    <li>50-75% completion: 25% refund of total fee</li>
                    <li>75%+ completion: No refund available</li>
                  </ul>

                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Quality Guarantee</h3>
                  <p className="text-vln-gray leading-relaxed">
                    If you are dissatisfied with the quality of our audit report, we will work with you to address concerns at no additional cost. If issues cannot be resolved to your satisfaction, a partial refund may be issued at our discretion.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={400}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">3. Retainer Services Refunds</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Monthly retainer packages are billed in advance. Refunds for retainer services are handled as follows:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li><strong className="text-vln-white">First Month:</strong> Full refund available within 7 days if no consulting hours have been used</li>
                    <li><strong className="text-vln-white">Subsequent Months:</strong> Unused hours do not roll over and are not refundable</li>
                    <li><strong className="text-vln-white">Early Termination:</strong> If you terminate a retainer before the minimum commitment period, no refund is provided for remaining months, but you may use remaining hours through the original contract end date</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={500}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">4. Training Services Refunds</h2>
                  <p className="text-vln-gray leading-relaxed">
                    For VLN University training workshops and courses:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li><strong className="text-vln-white">Cancellation 30+ days before training:</strong> Full refund</li>
                    <li><strong className="text-vln-white">Cancellation 14-29 days before training:</strong> 50% refund</li>
                    <li><strong className="text-vln-white">Cancellation less than 14 days before training:</strong> No refund, but you may reschedule once at no charge</li>
                    <li><strong className="text-vln-white">After training begins:</strong> No refunds, but we&apos;ll work to address any concerns</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={600}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">5. Incident Response & Forensics Refunds</h2>
                  <p className="text-vln-gray leading-relaxed">
                    Due to the urgent and time-sensitive nature of incident response services, refunds are generally not available once work has commenced.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    For contingency-based fund recovery arrangements, fees are only charged upon successful recovery. No refund is necessary as payment is based on results.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    If we are unable to provide meaningful assistance due to circumstances beyond our control, we may waive fees or provide a partial refund at our discretion.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={700}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">6. Non-Refundable Items</h2>
                  <p className="text-vln-gray leading-relaxed">
                    The following are non-refundable:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-vln-gray">
                    <li>Free consultations or security scans</li>
                    <li>Fix verification services (included free with all audits)</li>
                    <li>Custom reports or additional deliverables beyond standard scope</li>
                    <li>Expedited or rush fees</li>
                    <li>Services delivered as specified in the agreement, even if results are not as expected</li>
                  </ul>
                </section>
              </CSSFade>

              <CSSFade delay={800}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">7. Refund Request Process</h2>
                  <p className="text-vln-gray leading-relaxed">
                    To request a refund:
                  </p>
                  <ol className="list-decimal pl-6 mt-3 space-y-3 text-vln-gray">
                    <li>Email <a href="mailto:refunds@vln.gg" className="text-vln-sage hover:underline">refunds@vln.gg</a> with your request</li>
                    <li>Include your invoice number, service details, and reason for the refund request</li>
                    <li>Our team will review your request within 3 business days</li>
                    <li>If approved, refunds are processed within 7-10 business days</li>
                    <li>Cryptocurrency refunds are returned to the original sending address at the current exchange rate</li>
                  </ol>
                </section>
              </CSSFade>

              <CSSFade delay={900}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">8. Dispute Resolution</h2>
                  <p className="text-vln-gray leading-relaxed">
                    If you disagree with a refund decision, you may escalate the matter to our senior management by emailing <a href="mailto:disputes@vln.gg" className="text-vln-sage hover:underline">disputes@vln.gg</a>.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We&apos;re committed to fair and reasonable outcomes. Most disputes are resolved through good-faith negotiation. If resolution cannot be reached, disputes will be handled according to the arbitration clause in our Terms of Service.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1000}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">9. Payment Method Considerations</h2>
                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Cryptocurrency Refunds</h3>
                  <p className="text-vln-gray leading-relaxed">
                    Refunds for cryptocurrency payments are returned in the same currency to the original sending address. Refund amounts are calculated based on the USD value at the time of refund, not the original payment date.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    We are not responsible for market fluctuations between payment and refund. Transaction fees (gas fees) are not refundable.
                  </p>

                  <h3 className="text-xl font-bold text-vln-white mb-3 mt-6">Wire Transfer Refunds</h3>
                  <p className="text-vln-gray leading-relaxed">
                    Wire transfer refunds are returned via the same method. Wire transfer fees ($25-50) are deducted from the refund amount.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1100}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">10. Changes to This Policy</h2>
                  <p className="text-vln-gray leading-relaxed">
                    We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Your continued use of our services after changes constitutes acceptance of the modified policy.
                  </p>
                  <p className="text-vln-gray leading-relaxed mt-4">
                    For services purchased before a policy change, the policy in effect at the time of purchase applies.
                  </p>
                </section>
              </CSSFade>

              <CSSFade delay={1200}>
                <section>
                  <h2 className="text-2xl font-bold text-vln-white mb-4">11. Contact Information</h2>
                  <p className="text-vln-gray leading-relaxed">
                    For questions about this Refund Policy or to request a refund:
                  </p>
                  <div className="mt-4 p-6 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
                    <p className="text-vln-white">
                      <strong>VLN - Fused Gaming</strong><br />
                      Refund Requests: <a href="mailto:refunds@vln.gg" className="text-vln-sage hover:underline">refunds@vln.gg</a><br />
                      Disputes: <a href="mailto:disputes@vln.gg" className="text-vln-sage hover:underline">disputes@vln.gg</a><br />
                      General Inquiries: <a href="mailto:info@vln.gg" className="text-vln-sage hover:underline">info@vln.gg</a><br />
                      Website: <a href="https://vln.gg" className="text-vln-sage hover:underline">vln.gg</a>
                    </p>
                  </div>
                </section>
              </CSSFade>

              <CSSFade delay={1300}>
                <div className="mt-12 p-6 rounded-vln border-2 border-vln-sage/40 bg-vln-sage/10">
                  <p className="text-sm text-vln-gray">
                    <strong className="text-vln-white">Our Commitment:</strong> We stand behind the quality of our work. If you&apos;re not satisfied with our services, we&apos;ll work with you to make it right. Our goal is long-term client relationships built on trust and exceptional security expertise.
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
