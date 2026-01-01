import * as React from 'react';

interface EmailTemplateProps {
  payment_intent?: string;
  amount?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  date?: string;
  notes?: string;
}

export function EmailTemplate({ payment_intent, amount, firstName, lastName, email, phone, address, service, date, notes }: EmailTemplateProps) {
  return (
    <html>
      <body style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
          <h1 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '24px' }}>Booking Confirmed! ❄️</h1>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '16px' }}>Thank you for choosing FrostGreenPro</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ color: '#111827', marginTop: '0', marginBottom: '20px', fontSize: '20px' }}>Booking Details</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Customer Name</p>
            <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{firstName || ''} {lastName || ''}</p>
          </div>

          {email && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Email</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{email}</p>
            </div>
          )}

          {phone && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Phone</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{phone}</p>
            </div>
          )}

          {service && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Service</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{service}</p>
            </div>
          )}

          {date && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Scheduled Date</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{date}</p>
            </div>
          )}

          {address && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Service Address</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{address}</p>
            </div>
          )}

          {amount && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Amount Paid</p>
              <p style={{ color: '#059669', margin: '0', fontSize: '20px', fontWeight: 'bold' }}>${parseFloat(amount || '0').toFixed(2)} CAD</p>
            </div>
          )}

          {notes && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Special Instructions</p>
              <p style={{ color: '#111827', margin: '0', fontSize: '16px' }}>{notes}</p>
            </div>
          )}

          {payment_intent && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', margin: '0', fontSize: '12px' }}>Payment ID: {payment_intent}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ color: '#1e40af', marginTop: '0', marginBottom: '12px', fontSize: '16px' }}>What's Next?</h3>
          <p style={{ color: '#1e3a8a', margin: '0', fontSize: '14px', lineHeight: '1.6' }}>
            Our team will contact you shortly to confirm the details and schedule. If you have any questions or need to make changes, please don't hesitate to reach out to us.
          </p>
        </div>

        <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px', padding: '20px 0' }}>
          <p style={{ margin: '0 0 8px 0' }}>Thank you for your business!</p>
          <p style={{ margin: '0' }}>FrostGreenPro Team</p>
        </div>
      </body>
    </html>
  );
}