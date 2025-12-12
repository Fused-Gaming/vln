"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import StaggerFade from "@/components/animations/stagger-fade";
import Button from "@/components/ui/button";
import { Check, DollarSign, Users, Gift, TrendingUp } from "lucide-react";

export default function ReferralsPage() {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerCompany: "",
    referrerPhone: "",
    referralName: "",
    referralEmail: "",
    referralCompany: "",
    serviceNeeded: "",
    estimatedDealSize: "",
    relationship: "",
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend/email
    console.log("Referral submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const commissionStructure = [
    {
      service: "Smart Contract Audits",
      commission: "10%",
      example: "$200 - $1,000+",
      icon: DollarSign,
      color: "sage" as const,
    },
    {
      service: "Monthly Retainers",
      commission: "5% (first month)",
      example: "$250 - $600+",
      icon: TrendingUp,
      color: "blue" as const,
    },
    {
      service: "Service Bundles",
      commission: "15%",
      example: "$1,800 - $5,250+",
      icon: Gift,
      color: "amber" as const,
    },
    {
      service: "Enterprise Contracts",
      commission: "Custom (up to 20%)",
      example: "$5,000+",
      icon: Users,
      color: "purple" as const,
    },
  ];

  const benefits = [
    "Earn up to 20% commission on qualified referrals",
    "Fast payouts within 30 days of client payment",
    "Recurring commissions on retainer renewals",
    "Transparent tracking dashboard (coming soon)",
    "No limit on number of referrals",
    "Dedicated referral support team",
    "Marketing materials provided",
    "Early access to new services",
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Register Your Referral",
      description: "Fill out the form below with your contact info and details about the company/person you're referring.",
    },
    {
      step: "2",
      title: "We Make Contact",
      description: "Our sales team reaches out within 24-48 hours to qualify the lead and discuss their security needs.",
    },
    {
      step: "3",
      title: "Deal Closes",
      description: "When your referral becomes a paying client, you earn commission based on the service tier.",
    },
    {
      step: "4",
      title: "Get Paid",
      description: "Receive payment via wire transfer, crypto, or stablecoin within 30 days of client payment.",
    },
  ];

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <ICBoardBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <CSSFade direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                VLN <span className="text-gradient-rainbow">Referral Program</span>
              </h1>
            </CSSFade>

            <CSSFade delay={200} direction="up">
              <p className="text-xl sm:text-2xl md:text-3xl text-vln-gray max-w-3xl mx-auto leading-relaxed">
                Earn up to 20% commission by referring clients who need smart contract security
              </p>
            </CSSFade>

            <CSSFade delay={400} direction="up">
              <p className="text-base sm:text-lg text-vln-gray max-w-2xl mx-auto">
                Know a Web3 project that needs an audit? Refer them to VLN and earn generous commissions with no limits.
              </p>
            </CSSFade>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
              Commission <span className="text-vln-sage">Structure</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {commissionStructure.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                sage: 'border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage bg-vln-sage/10 glow-lift',
                blue: 'border-vln-bluegray/20 hover:border-vln-bluegray/40 text-vln-bluegray bg-vln-bluegray/10 glow-lift-blue',
                amber: 'border-vln-amber/20 hover:border-vln-amber/40 text-vln-amber bg-vln-amber/10 glow-lift-amber',
                purple: 'border-vln-purple/20 hover:border-vln-purple/40 text-vln-purple bg-vln-purple/10 glow-lift-purple',
              };

              const colors = colorClasses[item.color];

              return (
                <div
                  key={index}
                  className={`p-6 rounded-vln border-2 ${colors.split(' ')[0]} ${colors.split(' ')[1]} bg-vln-bg-light transition-all duration-300 ${colors.split(' ').slice(-1)[0]} hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center p-3 rounded-vln ${colors.split(' ')[3]} mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.split(' ')[2]}`} />
                  </div>

                  <h3 className="text-lg font-bold text-vln-white mb-2">
                    {item.service}
                  </h3>

                  <p className={`text-2xl font-bold ${colors.split(' ')[2]} mb-2`}>
                    {item.commission}
                  </p>

                  <p className="text-sm text-vln-gray">
                    Earn: {item.example}
                  </p>
                </div>
              );
            })}
          </StaggerFade>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
              How It <span className="text-vln-bluegray">Works</span>
            </h2>
          </CSSFade>

          <StaggerFade staggerDelay={150} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vln-bluegray text-vln-bg text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-vln-white mb-3">{step.title}</h3>
                <p className="text-vln-gray">{step.description}</p>
              </div>
            ))}
          </StaggerFade>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Why Join Our <span className="text-vln-sage">Referral Program</span>?
            </h2>
          </CSSFade>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <CSSFade key={index} delay={index * 50}>
                  <div className="flex items-start gap-3 p-4 rounded-vln border border-vln-sage/20 bg-vln-bg-light">
                    <Check className="w-5 h-5 text-vln-sage flex-shrink-0 mt-0.5" />
                    <span className="text-vln-gray">{benefit}</span>
                  </div>
                </CSSFade>
              ))}
            </div>
          </div>
        </section>

        {/* Referral Form */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 bg-vln-bg-light">
          <CSSFade>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              Register a <span className="text-vln-purple">Referral</span>
            </h2>
            <p className="text-vln-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Fill out the form below to register your referral. We&apos;ll reach out within 24-48 hours.
            </p>
          </CSSFade>

          {!submitted ? (
            <CSSFade delay={200}>
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="p-8 rounded-vln border-2 border-vln-purple/20 bg-vln-bg space-y-8">
                  {/* Your Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-vln-purple mb-6">Your Information</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="referrerName" className="block text-sm font-medium text-vln-gray mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="referrerName"
                          name="referrerName"
                          required
                          value={formData.referrerName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="referrerEmail" className="block text-sm font-medium text-vln-gray mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="referrerEmail"
                          name="referrerEmail"
                          required
                          value={formData.referrerEmail}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="referrerCompany" className="block text-sm font-medium text-vln-gray mb-2">
                          Your Company
                        </label>
                        <input
                          type="text"
                          id="referrerCompany"
                          name="referrerCompany"
                          value={formData.referrerCompany}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="Acme Corp"
                        />
                      </div>

                      <div>
                        <label htmlFor="referrerPhone" className="block text-sm font-medium text-vln-gray mb-2">
                          Your Phone
                        </label>
                        <input
                          type="tel"
                          id="referrerPhone"
                          name="referrerPhone"
                          value={formData.referrerPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referral Information */}
                  <div className="pt-6 border-t border-vln-gray-dark/20">
                    <h3 className="text-2xl font-bold text-vln-purple mb-6">Referral Information</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="referralName" className="block text-sm font-medium text-vln-gray mb-2">
                          Referral Name *
                        </label>
                        <input
                          type="text"
                          id="referralName"
                          name="referralName"
                          required
                          value={formData.referralName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="Jane Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="referralEmail" className="block text-sm font-medium text-vln-gray mb-2">
                          Referral Email *
                        </label>
                        <input
                          type="email"
                          id="referralEmail"
                          name="referralEmail"
                          required
                          value={formData.referralEmail}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="jane@web3project.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="referralCompany" className="block text-sm font-medium text-vln-gray mb-2">
                          Referral Company *
                        </label>
                        <input
                          type="text"
                          id="referralCompany"
                          name="referralCompany"
                          required
                          value={formData.referralCompany}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                          placeholder="Web3 Project Inc"
                        />
                      </div>

                      <div>
                        <label htmlFor="serviceNeeded" className="block text-sm font-medium text-vln-gray mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="serviceNeeded"
                          name="serviceNeeded"
                          required
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white focus:outline-none focus:border-vln-purple/50"
                        >
                          <option value="">Select a service</option>
                          <option value="audit">Smart Contract Audit</option>
                          <option value="retainer">Monthly Retainer</option>
                          <option value="pentest">Penetration Testing</option>
                          <option value="incident">Incident Response</option>
                          <option value="development">Secure Development</option>
                          <option value="design">Protocol Design</option>
                          <option value="training">VLN University Training</option>
                          <option value="bundle">Service Bundle</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="estimatedDealSize" className="block text-sm font-medium text-vln-gray mb-2">
                          Estimated Deal Size
                        </label>
                        <select
                          id="estimatedDealSize"
                          name="estimatedDealSize"
                          value={formData.estimatedDealSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white focus:outline-none focus:border-vln-purple/50"
                        >
                          <option value="">Select deal size</option>
                          <option value="small">$2K - $5K</option>
                          <option value="medium">$5K - $15K</option>
                          <option value="large">$15K - $50K</option>
                          <option value="enterprise">$50K+</option>
                          <option value="unknown">Not sure</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="relationship" className="block text-sm font-medium text-vln-gray mb-2">
                          Your Relationship
                        </label>
                        <select
                          id="relationship"
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white focus:outline-none focus:border-vln-purple/50"
                        >
                          <option value="">Select relationship</option>
                          <option value="client">Current Client</option>
                          <option value="partner">Business Partner</option>
                          <option value="friend">Friend/Colleague</option>
                          <option value="community">Community Member</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="additionalNotes" className="block text-sm font-medium text-vln-gray mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        rows={4}
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-vln bg-vln-bg-light border border-vln-gray-dark/30 text-vln-white placeholder-vln-gray-dark focus:outline-none focus:border-vln-purple/50"
                        placeholder="Any additional context about the referral, their project, timeline, or specific needs..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-vln-gray-dark/20">
                    <Button variant="primary" size="xl" type="submit" className="w-full sm:w-auto">
                      Submit Referral
                    </Button>
                    <p className="text-xs text-vln-gray-dark mt-4">
                      By submitting this form, you agree to our referral program terms. We&apos;ll contact you and your referral within 24-48 hours.
                    </p>
                  </div>
                </div>
              </form>
            </CSSFade>
          ) : (
            <CSSFade>
              <div className="max-w-2xl mx-auto p-8 rounded-vln border-2 border-vln-sage/40 bg-vln-bg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vln-sage/20 text-vln-sage mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-vln-white mb-4">
                  Referral Submitted Successfully!
                </h3>
                <p className="text-vln-gray mb-6">
                  Thank you for referring <strong>{formData.referralCompany}</strong> to VLN. Our sales team will reach out within 24-48 hours.
                </p>
                <p className="text-sm text-vln-gray-dark mb-8">
                  We&apos;ll send you an email confirmation at <strong>{formData.referrerEmail}</strong> with your unique referral tracking code.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Referral
                </Button>
              </div>
            </CSSFade>
          )}
        </section>

        {/* Terms & Conditions */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <CSSFade>
            <div className="max-w-4xl mx-auto p-8 rounded-vln border border-vln-gray-dark/20 bg-vln-bg-light">
              <h3 className="text-2xl font-bold text-vln-white mb-6">Referral Program Terms</h3>
              <div className="space-y-4 text-sm text-vln-gray">
                <p>
                  <strong className="text-vln-white">Eligibility:</strong> Anyone can participate in the VLN Referral Program. No technical expertise required.
                </p>
                <p>
                  <strong className="text-vln-white">Commission Payment:</strong> Commissions are paid within 30 days of client payment. Payouts available via wire transfer, cryptocurrency, or stablecoin (minimum $100).
                </p>
                <p>
                  <strong className="text-vln-white">Qualified Referrals:</strong> A referral is qualified when: (1) the referred client has not previously contacted VLN, (2) the referral becomes a paying client, and (3) the client completes payment.
                </p>
                <p>
                  <strong className="text-vln-white">Self-Referrals:</strong> You cannot refer yourself or your own company. Referrals must be third-party businesses or individuals.
                </p>
                <p>
                  <strong className="text-vln-white">Commission Structure:</strong> Standard audits (10%), retainers (5% first month, 3% renewals), bundles (15%), enterprise contracts (custom, up to 20%).
                </p>
                <p>
                  <strong className="text-vln-white">Disputes:</strong> In case of multiple referrals for the same client, the first registered referral receives credit. Timestamp on form submission is final.
                </p>
                <p>
                  <strong className="text-vln-white">Termination:</strong> VLN reserves the right to modify or terminate the referral program at any time. Existing pending commissions will be honored.
                </p>
                <p className="pt-4 border-t border-vln-gray-dark/20">
                  For questions about the referral program, contact us at <a href="mailto:referrals@vln.gg" className="text-vln-purple hover:underline">referrals@vln.gg</a>
                </p>
              </div>
            </div>
          </CSSFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
