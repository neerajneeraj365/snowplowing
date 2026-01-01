"use server";

import { EmailTemplate } from "@/components/globals/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCustomer(amount: string, redirect_status: string) {
  return await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["nikatwork365@gmail.com"],
    subject: "FrostGreenPro - Booking Confirmation",
    html: `<body style={{ margin: 0, padding: 0, fontFamily: "'Helvetica', 'Arial', sans-serif", backgroundColor: "#f5f5f5" }}>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}>
            <tbody>
              <tr>
                <td align="center">
                  <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <tbody>
                      {/* Header */}
                      <tr>
                        <td style={{ backgroundColor: "#10b981", padding: "20px", textAlign: "center" }}>
                          <h1 style={{ color: "#fff", margin: 0, fontSize: "24px" }}>Booking Confirmed!</h1>
                        </td>
                      </tr>
  
                      {/* Body */}
                      <tr>
                        <td style={{ padding: "30px" }}>
                          <p style={{ fontSize: "16px", color: "#333" }}>
                            Hi <strong>{firstName} {lastName}</strong>,
                          </p>
                          <p style={{ fontSize: "16px", color: "#333" }}>
                            Your booking has been successfully confirmed. Here are your booking details:
                          </p>
  
                          <table width="100%" style={{ marginTop: "20px", marginBottom: "20px", borderCollapse: "collapse" }}>
                            <tbody>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Service</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{service}</td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Date</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{date.toDateString()}</td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Address</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{address}</td>
                              </tr>
                              <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Phone</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{phone}</td>
                              </tr>
                              {notes && (
                                <tr>
                                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Notes</td>
                                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{notes}</td>
                                </tr>
                              )}
                              <tr>
                                <td style={{ padding: "8px", fontWeight: "bold" }}>Amount Paid</td>
                                <td style={{ padding: "8px", fontWeight: "bold", color: "#10b981" }}>${amount}</td>
                              </tr>
                            </tbody>
                          </table>
  
                          <p style={{ fontSize: "16px", color: "#333" }}>
                            Thank you for choosing <strong>FrostGreenPro</strong>. We look forward to serving you!
                          </p>
  
                          <p style={{ fontSize: "14px", color: "#999", marginTop: "20px" }}>
                            This is an automated confirmation email. Please do not reply.
                          </p>
                        </td>
                      </tr>
  
                      {/* Footer */}
                      <tr>
                        <td style={{ backgroundColor: "#f0f0f0", textAlign: "center", padding: "20px", fontSize: "12px", color: "#888" }}>
                          &copy; {new Date().getFullYear()} FrostGreenPro. All rights reserved.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>`,
  });
}


    
   
  

