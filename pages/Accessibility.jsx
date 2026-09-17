import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function Accessibility() {
  return (
    <LegalLayout
      eyebrow="Support"
      title="Accessibility"
      description="We are building EchelisAudio to be usable by as many people as possible. This is an early commitment, not a finished one."
      lastUpdated="2026-09-01"
    >
      <LegalSection heading="Our commitment">
        <p>We aim to meet recognized accessibility standards and to keep improving. Sound is for everyone, and so should be the experience of learning about it.</p>
      </LegalSection>
      <LegalSection heading="What we are doing">
        <p>We design with contrast, keyboard navigation, readable type, and clear structure in mind. We test across devices and continue to refine as the site grows.</p>
      </LegalSection>
      <LegalSection heading="Known limitations">
        <p>This is an early-stage site. Some interactive elements may not yet be fully optimized for all assistive technologies. We welcome reports of anything that gets in your way.</p>
      </LegalSection>
      <LegalSection heading="Feedback">
        <p>If you encounter a barrier, please tell us through the contact page. We take accessibility feedback seriously and will work to address it.</p>
      </LegalSection>
    </LegalLayout>
  );
}