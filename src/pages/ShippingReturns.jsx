import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function ShippingReturns() {
  return (
    <LegalLayout
      eyebrow="Support"
      title="Shipping & Returns"
      description="We plan to ship carefully and take returns fairly. Full rates and regions will be published before orders open."
      lastUpdated="2026-09-01"
    >
      <LegalSection heading="Shipping">
        <p>
          We intend to offer domestic and international shipping at launch. Transit times, carriers, and rates will be confirmed closer to availability and shown at checkout.
        </p>
      </LegalSection>
      <LegalSection heading="Duties and taxes">
        <p>
          International orders may be subject to duties and import taxes in your country. Any such charges are typically the responsibility of the recipient unless otherwise stated at checkout.
        </p>
      </LegalSection>
      <LegalSection heading="Returns">
        <p>
          We are designing a fair return window for in-ear monitors, with hygiene-safe handling for worn tips and earpieces. Exact return eligibility, windows, and restocking rules will be published before orders open.
        </p>
      </LegalSection>
      <LegalSection heading="Damaged or incorrect items">
        <p>
          If something arrives damaged or incorrect, contact us with your order details and photos. We will arrange a replacement or resolution as appropriate.
        </p>
      </LegalSection>
      <LegalSection heading="Note">
        <p>
          Echelis One is still in development. Shipping and return policies are subject to refinement and will be finalized before pre-orders begin.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
