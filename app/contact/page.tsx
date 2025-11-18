'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { Header } from '@/components/vln/header';
import { Footer } from '@/components/vln/footer';
import { Hero } from '@/components/vln/hero';
import { Container, Section } from '@/components/vln';
import { Card } from '@/components/ui/card';
import { Button, Input, Textarea, Select, FormField } from '@/components/ui';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
    privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formState);
  };

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Get in Touch"
          description="Request a security audit or get in touch with our team"
        />

        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Form Section - 2 columns on large screens */}
              <div className="lg:col-span-2">
                <Card>
                  <h2 className="mb-6 text-2xl font-bold text-vln-sage">
                    Request an Audit
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField label="Name" required>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          required
                        />
                      </FormField>

                      <FormField label="Email" required>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </FormField>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField label="Service Type" required>
                        <Select
                          value={formState.service}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              service: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select a service</option>
                          <option value="platform">Platform Security</option>
                          <option value="rng">RNG Analysis</option>
                          <option value="smart-contracts">
                            Smart Contract Audit
                          </option>
                          <option value="wallet">Wallet Flow Analysis</option>
                          <option value="other">Other</option>
                        </Select>
                      </FormField>

                      <FormField label="Budget Range">
                        <Select
                          value={formState.budget}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              budget: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a range</option>
                          <option value="5k-10k">$5k - $10k</option>
                          <option value="10k-25k">$10k - $25k</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k+">$50k+</option>
                          <option value="custom">Custom / Enterprise</option>
                        </Select>
                      </FormField>
                    </div>

                    <FormField
                      label="Message"
                      required
                      hint="Tell us about your project and security needs"
                    >
                      <Textarea
                        placeholder="Describe your project, timeline, and specific security concerns..."
                        rows={6}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        required
                      />
                    </FormField>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={formState.privacy}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            privacy: e.target.checked,
                          })
                        }
                        className="mt-1 h-4 w-4 rounded border-vln-bluegray/20 bg-vln-bg text-vln-sage focus:ring-2 focus:ring-vln-sage"
                        required
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-vln-gray-200"
                      >
                        I agree to the privacy policy and terms of service
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Submit Request
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Contact Info Section - 1 column on large screens */}
              <div className="space-y-6">
                <Card>
                  <h3 className="mb-4 text-xl font-bold text-vln-sage">
                    Contact Information
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="mb-1 font-medium text-vln-gray-200">
                        Email
                      </p>
                      <a
                        href="mailto:security@vln.gg"
                        className="text-vln-bluegray transition-colors hover:text-vln-sage"
                      >
                        security@vln.gg
                      </a>
                    </div>

                    <div>
                      <p className="mb-1 font-medium text-vln-gray-200">
                        GitHub
                      </p>
                      <a
                        href="https://github.com/Fused-Gaming"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vln-bluegray transition-colors hover:text-vln-sage"
                      >
                        Fused-Gaming
                      </a>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="mb-4 text-xl font-bold text-vln-sage">
                    Response Time
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    We typically respond to all inquiries within 48 hours during
                    business days.
                  </p>
                </Card>

                <Card>
                  <h3 className="mb-4 text-xl font-bold text-vln-sage">
                    Security
                  </h3>
                  <p className="text-sm text-vln-bluegray">
                    All communications are encrypted and handled with the
                    highest level of confidentiality.
                  </p>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
