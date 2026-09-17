import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function Warranty() {
  return (
    <LegalLayout
      eyebrow="Support"
      title="Warranty"
      description="We build monitors to be kept, not replaced. Our warranty will reflect that. Full terms will be published before orders open."
      lastUpdated="2026-09-01"
    >
      <LegalSection heading="Coverage">
        <p>We intend to cover defects in materials and workmanship under normal use for a defined period from delivery. The exact term and scope will be confirmed before launch.</p>
      </LegalSection>
      <LegalSection heading="What is not covered">
        <p>Damage from misuse, unauthorized modification, normal wear, or loss is generally not covered. Detachable cables are considered serviceable components and may be covered separately.</p>
      </LegalSection>
      <LegalSection heading="Serviceability">
        <p>Echelis One is designed with a detachable cable and serviceable architecture. Our goal is to offer replacement parts and repair options so a single failure does not end the product's life.</p>
      </LegalSection>
      <LegalSection heading="Making a claim">
        <p>To start a warranty claim, contact us with your order details and a description of the issue. We will guide you through next steps.</p>
      </LegalSection>
      <LegalSection heading="Note">
        <p>Echelis One is still in development. Warranty terms are subject to refinement and will be finalized before orders open.</p>
      </LegalSection>
    </LegalLayout>
  );
}