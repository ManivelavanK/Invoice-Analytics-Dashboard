import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, '../../../data/Analytics_Test_Data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const invoiceData = JSON.parse(rawData);

  console.log('Starting seed process...');

  for (const item of invoiceData) {
    // Create or find vendor
    const vendor = await prisma.vendor.upsert({
      where: { name: item.vendor || 'Unknown Vendor' },
      update: {},
      create: { name: item.vendor || 'Unknown Vendor' }
    });

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: item.invoice_number || `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        vendorId: vendor.id,
        invoiceDate: new Date(item.invoice_date || Date.now()),
        dueDate: item.due_date ? new Date(item.due_date) : null,
        totalAmount: parseFloat(item.total_amount || item.amount || '0'),
        status: item.status === 'paid' ? 'PAID' : item.status === 'overdue' ? 'OVERDUE' : 'PENDING',
        category: item.category || null,
        description: item.description || null
      }
    });

    // Create line items if available
    if (item.line_items && Array.isArray(item.line_items)) {
      for (const lineItem of item.line_items) {
        await prisma.lineItem.create({
          data: {
            invoiceId: invoice.id,
            description: lineItem.description || 'Line item',
            quantity: parseInt(lineItem.quantity || '1'),
            unitPrice: parseFloat(lineItem.unit_price || '0'),
            totalPrice: parseFloat(lineItem.total_price || lineItem.amount || '0'),
            category: lineItem.category || null
          }
        });
      }
    }

    // Create payment if invoice is paid
    if (invoice.status === 'PAID') {
      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.totalAmount,
          paymentDate: item.payment_date ? new Date(item.payment_date) : invoice.invoiceDate,
          paymentMethod: 'BANK_TRANSFER',
          reference: item.payment_reference || null
        }
      });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });