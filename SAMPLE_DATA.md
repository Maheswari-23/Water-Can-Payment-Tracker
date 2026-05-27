# 📊 Sample Data for Testing

## Use this sample data to test your Water Can Payment System

---

## 🧪 TEST DATA SET

Copy and paste this data into your **Customer Data** sheet (starting from Row 2):

| Customer Name | Phone Number | Address | Number of Cans | Price Per Can | Paid Status | Payment Date |
|---------------|--------------|---------|----------------|---------------|-------------|--------------|
| Ramesh Kumar | 9876543210 | Shop No. 5, MG Road, Mumbai | 5 | 20 | No | |
| Priya Sharma | 9123456789 | House 12, Sector 15, Delhi | 3 | 25 | Yes | 2026-05-20 |
| Amit Patel | 9988776655 | Flat 201, Sunrise Apartments, Ahmedabad | 10 | 18 | No | |
| Sunita Devi | 9765432108 | Village Road, Near Temple, Patna | 2 | 20 | No | |
| Rajesh Gupta | 9456789012 | Office Complex, Park Street, Kolkata | 8 | 22 | Yes | 2026-05-22 |
| Meena Reddy | 9334455667 | Plot 45, Banjara Hills, Hyderabad | 4 | 20 | No | |
| Vijay Singh | 9876501234 | Shop 7, Market Area, Jaipur | 6 | 20 | Yes | 2026-05-18 |
| Lakshmi Iyer | 9123450987 | House 89, Anna Nagar, Chennai | 5 | 25 | No | |
| Suresh Yadav | 9988001122 | Apartment 3B, Koramangala, Bangalore | 7 | 20 | No | |
| Kavita Joshi | 9765000111 | Bungalow 12, Shivaji Nagar, Pune | 3 | 22 | Yes | 2026-05-25 |

---

## 📋 EXPECTED RESULTS AFTER SETUP

### **Total Amount Column (F)**
Should automatically calculate:
- Ramesh Kumar: ₹100 (5 × 20)
- Priya Sharma: ₹75 (3 × 25)
- Amit Patel: ₹180 (10 × 18)
- Sunita Devi: ₹40 (2 × 20)
- Rajesh Gupta: ₹176 (8 × 22)
- Meena Reddy: ₹80 (4 × 20)
- Vijay Singh: ₹120 (6 × 20)
- Lakshmi Iyer: ₹125 (5 × 25)
- Suresh Yadav: ₹140 (7 × 20)
- Kavita Joshi: ₹66 (3 × 22)

**Total Revenue**: ₹1,102

---

### **Color Coding**
After applying conditional formatting:

**🔴 RED ROWS (Unpaid - 6 customers)**:
- Ramesh Kumar
- Amit Patel
- Sunita Devi
- Meena Reddy
- Lakshmi Iyer
- Suresh Yadav

**🟢 GREEN ROWS (Paid - 4 customers)**:
- Priya Sharma
- Rajesh Gupta
- Vijay Singh
- Kavita Joshi

---

### **WhatsApp Links (Column J)**
Should generate for unpaid customers only:

**Ramesh Kumar**:
```
https://wa.me/919876543210?text=Dear%20Ramesh%20Kumar%2C%20your%20pending%20water%20can%20payment%20is%20%E2%82%B9100.%20Kindly%20make%20payment.%20Thank%20you.
```

**Amit Patel**:
```
https://wa.me/919988776655?text=Dear%20Amit%20Patel%2C%20your%20pending%20water%20can%20payment%20is%20%E2%82%B9180.%20Kindly%20make%20payment.%20Thank%20you.
```

*(Links for other unpaid customers will be similar)*

---

### **Payment Summary Report**
When you generate summary, you should see:

```
📊 PAYMENT SUMMARY REPORT
Generated on: [Current Date]

Metric                  Value
─────────────────────────────
Total Customers         10
Paid Customers          4
Unpaid Customers        6

Total Revenue           ₹1,102
Collected Amount        ₹437
Pending Amount          ₹665

Collection Rate         40%
```

---

## 🧪 TESTING SCENARIOS

### **Test 1: Add New Customer**
Add this customer in Row 12:
- **Name**: Anil Verma
- **Phone**: 9876000111
- **Address**: Street 5, Lucknow
- **Cans**: 4
- **Price**: 20
- **Paid Status**: No

**Expected**:
- Total Amount: ₹80 (auto-calculated)
- Row turns RED
- WhatsApp link generates automatically

---

### **Test 2: Mark Customer as Paid**
Change Ramesh Kumar's Paid Status to "Yes" and add Payment Date: 2026-05-26

**Expected**:
- Row turns GREEN
- WhatsApp link disappears
- Pending amount decreases by ₹100

---

### **Test 3: Send Bulk Reminders**
1. Go to: 💧 Water Can System → Send Reminders to All Unpaid
2. Check "Reminder Links" sheet

**Expected**:
- Shows 6 unpaid customers (or 5 if you marked Ramesh as paid)
- Each has clickable WhatsApp link
- Last Reminder Date updates in Customer Data sheet

---

### **Test 4: Click WhatsApp Link**
Click on Ramesh Kumar's WhatsApp link

**Expected**:
- Opens WhatsApp Web or App
- Shows pre-filled message:
  ```
  Dear Ramesh Kumar, your pending water can payment is ₹100. Kindly make payment. Thank you.
  ```
- Phone number: 919876543210

---

### **Test 5: Prevent Duplicate Reminders**
1. Send reminders to all unpaid (Test 3)
2. Immediately try sending again

**Expected**:
- System shows: "No pending reminders! All customers either paid or already reminded today."
- Last Reminder Date prevents duplicates

---

### **Test 6: Payment Summary**
Go to: 💧 Water Can System → Generate Payment Summary

**Expected**:
- New sheet "Payment Summary" opens
- Shows correct totals
- Collection rate calculated
- Formatted with colors

---

## 📱 PHONE NUMBER FORMAT TESTS

### **Valid Formats** (All should work):
```
9876543210          ✅ Standard 10-digit
919876543210        ✅ With country code
98765 43210         ✅ With space (formula cleans it)
98765-43210         ✅ With dash (formula cleans it)
(98765)43210        ✅ With brackets (formula cleans it)
```

### **Invalid Formats** (Won't work):
```
876543210           ❌ Only 9 digits
+919876543210       ❌ Plus sign (remove it)
9876543210x         ❌ Contains letter
```

---

## 🎯 VERIFICATION CHECKLIST

After adding sample data, verify:

- [ ] All Total Amounts calculated correctly
- [ ] 6 rows are RED (unpaid)
- [ ] 4 rows are GREEN (paid)
- [ ] WhatsApp links only show for unpaid customers
- [ ] Clicking WhatsApp link opens with correct message
- [ ] Payment Summary shows correct totals
- [ ] Bulk reminder generates 6 links
- [ ] Changing Paid Status updates row color
- [ ] Last Reminder Date updates after sending reminders
- [ ] No duplicate reminders on same day

---

## 💡 ADDITIONAL TEST SCENARIOS

### **Edge Case 1: Empty Rows**
Leave Row 13 completely empty

**Expected**: No errors, formulas show blank

---

### **Edge Case 2: Partial Data**
Add customer with name but no phone number

**Expected**: 
- Total Amount calculates if cans/price present
- No WhatsApp link generates (missing phone)
- No errors

---

### **Edge Case 3: Zero Cans**
Add customer with 0 cans

**Expected**: Total Amount shows 0

---

### **Edge Case 4: Very Large Order**
Add customer with 100 cans at ₹50 each

**Expected**: 
- Total Amount: ₹5,000
- WhatsApp link works normally
- No formatting issues

---

## 🔄 RESET TEST DATA

To start fresh:
1. Select all data rows (Row 2 onwards)
2. Right-click → Delete rows
3. Re-paste sample data
4. Re-apply conditional formatting

---

## 📊 MONTHLY TEST DATA (Optional)

For testing monthly reports, add dates across different months:

| Customer | Paid Status | Payment Date |
|----------|-------------|--------------|
| Customer A | Yes | 2026-04-15 |
| Customer B | Yes | 2026-04-20 |
| Customer C | Yes | 2026-05-10 |
| Customer D | Yes | 2026-05-15 |
| Customer E | No | |
| Customer F | No | |

This helps test:
- Monthly revenue tracking
- Payment trends
- Overdue calculations

---

## 🎓 LEARNING EXERCISES

### **Exercise 1: Calculate Average Order**
Add formula to calculate average cans per customer:
```excel
=AVERAGE(D:D)
```

### **Exercise 2: Find Highest Order**
Find customer with most cans:
```excel
=MAX(D:D)
```

### **Exercise 3: Count Customers by City**
If you add city column, count customers per city:
```excel
=COUNTIF(C:C, "*Mumbai*")
```

---

## ✅ SAMPLE DATA SETUP COMPLETE

Once all tests pass, you're ready to:
1. Delete sample data
2. Add real customer information
3. Start using the system for actual business

**🎉 Your Water Can Payment System is fully tested and ready!**
