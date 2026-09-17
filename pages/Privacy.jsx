import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      description="How EchelisAudio handles the information you share with us. We collect what we need to run the early access list and, eventually, the shop — nothing more."
      lastUpdated="2026-09-01"
    >
      <LegalSection heading="What we collect">
        <p>When you join the early access list, we collect your email address and an optional note about your interests. When you contact us, we collect the details you provide in the form. At launch, checkout will collect the information needed to fulfill orders.</p>
      </LegalSection>
      <LegalSection heading="How we use it">
        <p>We use your information to send development updates, respond to your messages, and — at launch — process and ship orders. We do not sell your data.</p>
      </LegalSection>
      <LegalSection heading="Email communications">
        <p>You can unsubscribe from non-essential emails at any time using the link in each message. Transactional messages related to orders will still be sent when relevant.</p>
      </LegalSection>
      <LegalSection heading="Data storage">
        <p>Your data is stored on secure infrastructure provided by our platform. We take reasonable measures to protect it, but no system is perfectly secure.</p>
      </LegalSection>
      <LegalSection heading="Your rights">
        <p>You may request access to, correction of, or deletion of your personal data by contacting us through the contact page.</p>
      </LegalSection>
      <LegalSection heading="Changes">
        <p>We may update this policy as we approach launch. Material changes will be communicated through our usual channels.</p>
      </LegalSection>
    </LegalLayout>
  );
}