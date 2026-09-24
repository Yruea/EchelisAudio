import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms that govern your use of EchelisAudio. Final commercial terms will be published before orders open."
      lastUpdated="2026-09-01"
    >
      <LegalSection heading="Using this site">
        <p>You may browse, join the early access list, and contact us. We ask that you use the site lawfully and do not misuse any forms or communication channels.</p>
      </LegalSection>
      <LegalSection heading="Conceptual content">
        <p>While Echelis One is in development, imagery is concept render and specifications may change. Nothing on this site constitutes a binding offer until orders officially open.</p>
      </LegalSection>
      <LegalSection heading="Early access list">
        <p>Joining the early access list does not create an obligation to purchase, nor a guarantee of availability. It grants you early visibility and priority access as described.</p>
      </LegalSection>
      <LegalSection heading="Intellectual property">
        <p>All content on this site — including the EchelisAudio name, marks, designs, and writing — is our property or used with permission. Please do not copy or redistribute it without consent.</p>
      </LegalSection>
      <LegalSection heading="Orders">
        <p>At launch, orders will be governed by additional terms presented at checkout. Until then, no purchases are available.</p>
      </LegalSection>
      <LegalSection heading="Changes">
        <p>We may update these terms as we approach launch. Continued use of the site after changes constitutes acceptance.</p>
      </LegalSection>
    </LegalLayout>
  );
}