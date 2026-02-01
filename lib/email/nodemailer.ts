import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

/**
 * Base email template
 */
function getEmailTemplate(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeptideLab</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', Arial, sans-serif;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #0A4D7D 0%, #00B4D8 100%);
          padding: 30px 20px;
          text-align: center;
        }
        .logo {
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .tagline {
          color: #48CAE4;
          font-size: 14px;
          margin: 5px 0 0 0;
        }
        .content {
          padding: 40px 30px;
          color: #023047;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background-color: #00B4D8;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
        }
        .footer {
          background-color: #023047;
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #48CAE4;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">PeptideLab</h1>
          <p class="tagline">Precision Peptides for Advanced Research</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} PeptideLab. All rights reserved.</p>
          <p>
            <a href="#">Unsubscribe</a> | 
            <a href="#">Privacy Policy</a> | 
            <a href="#">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send email
 */
export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const info = await transporter.sendMail({
            from: `"PeptideLab" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            html: getEmailTemplate(html),
        });

        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email error:', error);
        throw error;
    }
}

/**
 * Email Templates
 */
export const emailTemplates = {
    // Welcome email
    welcome: (name: string) => ({
        subject: 'Welcome to PeptideLab!',
        html: `
      <h2>Welcome, ${name}!</h2>
      <p>Thank you for creating an account with PeptideLab. We're excited to have you join our community of researchers and health innovators.</p>
      <p>At PeptideLab, we deliver premium-grade peptide formulations backed by rigorous testing and research.</p>
      <a href="${process.env.AUTH0_BASE_URL}/shop" class="button">Start Shopping</a>
      <p>If you have any questions, our support team is here to help.</p>
    `,
    }),

    // Order confirmation (User)
    orderConfirmation: (orderNumber: string, items: any[], total: number) => ({
        subject: `Order Confirmation #${orderNumber}`,
        html: `
      <h2>Thank You for Your Order!</h2>
      <p>Your order <strong>#${orderNumber}</strong> has been received and is being processed.</p>
      <h3>Order Details:</h3>
      <ul>
        ${items.map((item) => `<li>${item.name} x ${item.quantity} - $${item.price}</li>`).join('')}
      </ul>
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
      <h3>What's Next?</h3>
      <p>You will receive an email with payment details shortly. Once payment is confirmed, we'll prepare your order for shipment.</p>
      <a href="${process.env.AUTH0_BASE_URL}/account/orders" class="button">View Order Status</a>
    `,
    }),

    // Order confirmation (Admin)
    orderNotificationAdmin: (orderNumber: string, customerEmail: string, items: any[], total: number) => ({
        subject: `New Order #${orderNumber}`,
        html: `
      <h2>New Order Received</h2>
      <p><strong>Order Number:</strong> #${orderNumber}</p>
      <p><strong>Customer:</strong> ${customerEmail}</p>
      <h3>Items:</h3>
      <ul>
        ${items.map((item) => `<li>${item.name} x ${item.quantity} - $${item.price}</li>`).join('')}
      </ul>
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
      <a href="${process.env.AUTH0_BASE_URL}/admin/orders/${orderNumber}" class="button">View in Dashboard</a>
    `,
    }),

    // Payment details
    paymentDetails: (orderNumber: string, paymentMethod: string, paymentInstructions: string) => ({
        subject: `Payment Details for Order #${orderNumber}`,
        html: `
      <h2>Payment Instructions</h2>
      <p>Thank you for your order <strong>#${orderNumber}</strong>.</p>
      <p>Please complete your payment using the following method:</p>
      <h3>${paymentMethod}</h3>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${paymentInstructions}
      </div>
      <p><strong>Important:</strong> Please include your order number <strong>#${orderNumber}</strong> in the payment reference.</p>
      <p>Once payment is received, we'll confirm and prepare your order for shipment.</p>
    `,
    }),

    // Order status update
    orderStatusUpdate: (orderNumber: string, status: string, message: string) => ({
        subject: `Order #${orderNumber} - ${status}`,
        html: `
      <h2>Order Status Update</h2>
      <p>Your order <strong>#${orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>
      <p>${message}</p>
      <a href="${process.env.AUTH0_BASE_URL}/account/orders" class="button">View Order</a>
    `,
    }),

    // Contact form response
    contactResponse: (name: string, message: string) => ({
        subject: 'Response to Your Inquiry',
        html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting PeptideLab. Here's our response to your inquiry:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${message}
      </div>
      <p>If you have any further questions, please don't hesitate to reach out.</p>
    `,
    }),
};
