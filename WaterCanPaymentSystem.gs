/**
 * Water Can Payment Reminder System
 * Free Google Apps Script for local water delivery business
 * No paid APIs required - uses WhatsApp wa.me links
 */

// Run this function once after setup to create custom menu
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('💧 Water Can System')
    .addItem('📱 Send Reminders to All Unpaid', 'sendRemindersToAllUnpaid')
    .addItem('📊 Generate Payment Summary', 'generatePaymentSummary')
    .addItem('🔄 Refresh Conditional Formatting', 'applyConditionalFormatting')
    .addItem('ℹ️ Help & Instructions', 'showHelp')
    .addToUi();
}

// Apply conditional formatting for paid/unpaid status
function applyConditionalFormatting() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Customer Data');
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data found. Please add customer records first.');
    return;
  }
  
  const range = sheet.getRange(2, 1, lastRow - 1, 9);
  
  // Clear existing rules
  sheet.clearConditionalFormatRules();
  
  // Red for unpaid (Paid Status = "No")
  const unpaidRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$G2="No"')
    .setBackground('#ffcdd2')
    .setRanges([range])
    .build();
  
  // Green for paid (Paid Status = "Yes")
  const paidRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$G2="Yes"')
    .setBackground('#c8e6c9')
    .setRanges([range])
    .build();
  
  sheet.setConditionalFormatRules([unpaidRule, paidRule]);
  
  SpreadsheetApp.getUi().alert('✅ Conditional formatting applied successfully!');
}

// Generate WhatsApp reminder link for a single customer
function generateWhatsAppLink(phoneNumber, customerName, totalAmount) {
  // Clean phone number - remove spaces, dashes, and add country code if missing
  let cleanPhone = phoneNumber.toString().replace(/[\s\-\(\)]/g, '');
  
  // Add India country code if not present
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  
  // Create reminder message
  const message = `Dear ${customerName}, your pending water can payment is ₹${totalAmount}. Kindly make payment. Thank you.`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create wa.me link
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

// Send reminders to all unpaid customers
function sendRemindersToAllUnpaid() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Customer Data');
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No customer data found!');
    return;
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  const reminderSheet = getOrCreateReminderSheet();
  
  let unpaidCount = 0;
  let reminderLinks = [];
  
  data.forEach((row, index) => {
    const customerName = row[0];
    const phoneNumber = row[1];
    const paidStatus = row[6];
    const totalAmount = row[5];
    const lastReminderDate = row[8];
    
    // Check if unpaid
    if (paidStatus === 'No' && customerName && phoneNumber) {
      const today = new Date();
      const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      
      // Check if reminder already sent today
      const lastReminderStr = lastReminderDate ? Utilities.formatDate(new Date(lastReminderDate), Session.getScriptTimeZone(), 'yyyy-MM-dd') : '';
      
      if (lastReminderStr !== todayStr) {
        const whatsappLink = generateWhatsAppLink(phoneNumber, customerName, totalAmount);
        reminderLinks.push({
          name: customerName,
          phone: phoneNumber,
          amount: totalAmount,
          link: whatsappLink
        });
        
        // Update last reminder date
        sheet.getRange(index + 2, 9).setValue(today);
        unpaidCount++;
      }
    }
  });
  
  if (unpaidCount === 0) {
    SpreadsheetApp.getUi().alert('✅ No pending reminders! All customers either paid or already reminded today.');
    return;
  }
  
  // Create reminder links sheet
  reminderSheet.clear();
  reminderSheet.appendRow(['Customer Name', 'Phone Number', 'Amount Due', 'WhatsApp Reminder Link']);
  
  reminderLinks.forEach(reminder => {
    reminderSheet.appendRow([
      reminder.name,
      reminder.phone,
      '₹' + reminder.amount,
      reminder.link
    ]);
  });
  
  // Format the reminder sheet
  reminderSheet.getRange(1, 1, 1, 4).setBackground('#4285f4').setFontColor('#ffffff').setFontWeight('bold');
  reminderSheet.setColumnWidth(4, 400);
  reminderSheet.autoResizeColumns(1, 3);
  
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(reminderSheet);
  
  SpreadsheetApp.getUi().alert(
    `📱 Generated ${unpaidCount} reminder links!\n\n` +
    `Click on each WhatsApp link in the "Reminder Links" sheet to send reminders.\n\n` +
    `The links will open WhatsApp with pre-filled messages.`
  );
}

// Get or create reminder links sheet
function getOrCreateReminderSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Reminder Links');
  
  if (!sheet) {
    sheet = ss.insertSheet('Reminder Links');
  }
  
  return sheet;
}

// Generate payment summary
function generatePaymentSummary() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Customer Data');
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No customer data found!');
    return;
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  let totalCustomers = 0;
  let paidCustomers = 0;
  let unpaidCustomers = 0;
  let totalRevenue = 0;
  let pendingAmount = 0;
  let collectedAmount = 0;
  
  data.forEach(row => {
    const customerName = row[0];
    const totalAmount = row[5];
    const paidStatus = row[6];
    
    if (customerName) {
      totalCustomers++;
      totalRevenue += totalAmount || 0;
      
      if (paidStatus === 'Yes') {
        paidCustomers++;
        collectedAmount += totalAmount || 0;
      } else if (paidStatus === 'No') {
        unpaidCustomers++;
        pendingAmount += totalAmount || 0;
      }
    }
  });
  
  const summarySheet = getOrCreateSummarySheet();
  summarySheet.clear();
  
  // Add summary data
  summarySheet.appendRow(['📊 PAYMENT SUMMARY REPORT']);
  summarySheet.appendRow(['Generated on:', new Date()]);
  summarySheet.appendRow([]);
  summarySheet.appendRow(['Metric', 'Value']);
  summarySheet.appendRow(['Total Customers', totalCustomers]);
  summarySheet.appendRow(['Paid Customers', paidCustomers]);
  summarySheet.appendRow(['Unpaid Customers', unpaidCustomers]);
  summarySheet.appendRow([]);
  summarySheet.appendRow(['Total Revenue', '₹' + totalRevenue]);
  summarySheet.appendRow(['Collected Amount', '₹' + collectedAmount]);
  summarySheet.appendRow(['Pending Amount', '₹' + pendingAmount]);
  summarySheet.appendRow([]);
  summarySheet.appendRow(['Collection Rate', Math.round((paidCustomers / totalCustomers) * 100) + '%']);
  
  // Format summary sheet
  summarySheet.getRange(1, 1, 1, 2).merge().setBackground('#4285f4').setFontColor('#ffffff').setFontWeight('bold').setFontSize(14);
  summarySheet.getRange(4, 1, 1, 2).setBackground('#f4b400').setFontWeight('bold');
  summarySheet.getRange(9, 1, 1, 2).setBackground('#0f9d58').setFontColor('#ffffff').setFontWeight('bold');
  summarySheet.setColumnWidth(1, 200);
  summarySheet.setColumnWidth(2, 150);
  
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(summarySheet);
  
  SpreadsheetApp.getUi().alert('✅ Payment summary generated successfully!');
}

// Get or create summary sheet
function getOrCreateSummarySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Payment Summary');
  
  if (!sheet) {
    sheet = ss.insertSheet('Payment Summary');
  }
  
  return sheet;
}

// Show help instructions
function showHelp() {
  const helpText = `
💧 WATER CAN PAYMENT REMINDER SYSTEM - HELP

📋 HOW TO USE:

1. CUSTOMER DATA SHEET:
   - Enter customer details in each row
   - Total Amount calculates automatically
   - WhatsApp Link generates automatically
   - Click WhatsApp Link to send individual reminders

2. SEND BULK REMINDERS:
   - Go to: Water Can System → Send Reminders to All Unpaid
   - Opens "Reminder Links" sheet with all unpaid customers
   - Click each link to send WhatsApp reminders
   - Prevents duplicate reminders on same day

3. PAYMENT SUMMARY:
   - Go to: Water Can System → Generate Payment Summary
   - Shows total revenue, pending amount, collection rate

4. PAID STATUS:
   - Type "Yes" when customer pays
   - Type "No" for unpaid customers
   - Rows turn GREEN for paid, RED for unpaid

5. PHONE NUMBER FORMAT:
   - Enter 10-digit mobile: 9876543210
   - Or with country code: 919876543210

📱 WHATSAPP REMINDERS:
   - Completely FREE - no SMS charges
   - Uses wa.me links
   - Opens WhatsApp with pre-filled message
   - Works on mobile and desktop

💡 TIPS:
   - Update Paid Status regularly
   - Use Payment Date to track when paid
   - Refresh formatting if colors don't show

Need more help? Contact your system administrator.
  `;
  
  SpreadsheetApp.getUi().alert(helpText);
}
