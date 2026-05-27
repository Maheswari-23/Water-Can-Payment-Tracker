# 📐 Google Sheets Formulas Reference

## Complete Formula Guide for Water Can Payment System

---

## 🔢 COLUMN FORMULAS

### **Column F: Total Amount (Cell F2)**

```excel
=IF(AND(D2<>"", E2<>""), D2*E2, "")
```

**Purpose**: Automatically calculate total payment amount

**Breakdown**:
- `D2<>""` - Checks if Number of Cans is not empty
- `E2<>""` - Checks if Price Per Can is not empty
- `AND()` - Both conditions must be true
- `D2*E2` - Multiply Number of Cans × Price Per Can
- `""` - Return blank if any field is empty

**Example**:
- Number of Cans (D2): 5
- Price Per Can (E2): 20
- Total Amount (F2): **100**

**Copy this formula down** from F2 to F100 (or more rows as needed)

---

### **Column J: WhatsApp Link (Cell J2)**

```excel
=IF(AND(A2<>"", B2<>"", G2="No"), "https://wa.me/91"&SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B2," ",""),"-",""),"(","")&"?text="&ENCODEURL("Dear "&A2&", your pending water can payment is ₹"&F2&". Kindly make payment. Thank you."), "")
```

**Purpose**: Generate clickable WhatsApp reminder link with pre-filled message

**Breakdown**:

1. **Condition Check**:
   ```excel
   IF(AND(A2<>"", B2<>"", G2="No"), ...)
   ```
   - Only create link if Customer Name exists
   - AND Phone Number exists
   - AND Paid Status is "No"

2. **WhatsApp Base URL**:
   ```excel
   "https://wa.me/91"
   ```
   - `wa.me` - WhatsApp's official link format
   - `91` - India country code

3. **Clean Phone Number**:
   ```excel
   SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B2," ",""),"-",""),"(","")
   ```
   - Removes spaces: `98765 43210` → `9876543210`
   - Removes dashes: `98765-43210` → `9876543210`
   - Removes brackets: `(98765)43210` → `9876543210`

4. **Message Parameter**:
   ```excel
   "?text="&ENCODEURL("Dear "&A2&", your pending water can payment is ₹"&F2&". Kindly make payment. Thank you.")
   ```
   - `?text=` - WhatsApp parameter for pre-filled message
   - `ENCODEURL()` - Converts message to URL-safe format (spaces become %20, etc.)
   - Concatenates customer name and amount into message

**Example Output**:
```
https://wa.me/919876543210?text=Dear%20Ramesh%20Kumar%2C%20your%20pending%20water%20can%20payment%20is%20%E2%82%B9100.%20Kindly%20make%20payment.%20Thank%20you.
```

**Copy this formula down** from J2 to J100

---

## 🎨 CONDITIONAL FORMATTING RULES

### **Rule 1: Red Background for Unpaid**

**Apply to range**: A2:J100 (or your data range)

**Format rule**:
```
=$G2="No"
```

**Format style**:
- Background color: `#ffcdd2` (Light Red)

**What it does**: Highlights entire row in red when Paid Status is "No"

---

### **Rule 2: Green Background for Paid**

**Apply to range**: A2:J100 (or your data range)

**Format rule**:
```
=$G2="Yes"
```

**Format style**:
- Background color: `#c8e6c9` (Light Green)

**What it does**: Highlights entire row in green when Paid Status is "Yes"

---

## 📊 ADDITIONAL USEFUL FORMULAS

### **Count Unpaid Customers**

```excel
=COUNTIF(G:G, "No")
```
Place this in a summary cell to count total unpaid customers.

---

### **Count Paid Customers**

```excel
=COUNTIF(G:G, "Yes")
```
Count total paid customers.

---

### **Total Pending Amount**

```excel
=SUMIF(G:G, "No", F:F)
```
Sum all amounts where Paid Status is "No".

---

### **Total Collected Amount**

```excel
=SUMIF(G:G, "Yes", F:F)
```
Sum all amounts where Paid Status is "Yes".

---

### **Collection Rate Percentage**

```excel
=COUNTIF(G:G,"Yes")/(COUNTIF(G:G,"Yes")+COUNTIF(G:G,"No"))*100&"%"
```
Calculate what percentage of customers have paid.

---

### **Days Since Last Payment**

Add this in a new column if you want to track overdue payments:

```excel
=IF(AND(G2="No", H2<>""), TODAY()-H2, "")
```
Shows number of days since payment was due.

---

### **Overdue Indicator**

```excel
=IF(AND(G2="No", TODAY()-H2>7), "OVERDUE", "")
```
Shows "OVERDUE" if payment is pending for more than 7 days.

---

## 🔧 DATA VALIDATION SETUP

### **Paid Status Dropdown (Column G)**

**Steps**:
1. Select range: G2:G100
2. Data → Data validation
3. Criteria: List of items
4. Items: `Yes,No`
5. Show dropdown: ✓
6. Reject input: ✓

**Result**: Users can only select "Yes" or "No" from dropdown

---

### **Phone Number Validation (Optional)**

**Steps**:
1. Select range: B2:B100
2. Data → Data validation
3. Criteria: Text contains
4. Value: (leave blank)
5. Custom formula:
   ```excel
   =AND(LEN(B2)>=10, LEN(B2)<=12, ISNUMBER(VALUE(B2)))
   ```

**Result**: Only accepts 10-12 digit numbers

---

## 📱 WHATSAPP MESSAGE CUSTOMIZATION

### **Change Message Template**

Current message:
```
Dear {{CustomerName}}, your pending water can payment is ₹{{TotalAmount}}. Kindly make payment. Thank you.
```

**To customize**, modify this part in the formula:
```excel
"Dear "&A2&", your pending water can payment is ₹"&F2&". Kindly make payment. Thank you."
```

**Example variations**:

**Friendly tone**:
```excel
"Hi "&A2&"! Just a reminder about your water can payment of ₹"&F2&". Please pay at your convenience. Thanks!"
```

**Formal tone**:
```excel
"Dear "&A2&", this is a payment reminder for ₹"&F2&" towards water can delivery. Kindly clear the dues. Regards, [Your Business Name]"
```

**With payment options**:
```excel
"Dear "&A2&", your pending amount is ₹"&F2&". Pay via UPI: yourname@paytm or Cash. Thank you!"
```

**With due date**:
```excel
"Dear "&A2&", payment of ₹"&F2&" is pending. Please pay by "&TEXT(H2+7,"DD-MMM")&". Thank you!"
```

---

## 🎯 FORMULA TROUBLESHOOTING

### **Problem: Formula shows #ERROR**

**Solution**: Check if:
- Formula starts with `=` sign
- All parentheses are balanced
- Column references are correct (A2, B2, etc.)

---

### **Problem: Total Amount shows 0**

**Solution**: 
- Ensure Number of Cans and Price Per Can have numeric values
- Check if cells are formatted as "Number" not "Text"

---

### **Problem: WhatsApp link doesn't work**

**Solution**:
- Phone number must be 10 digits
- Paid Status must be exactly "No" (case-sensitive)
- Customer Name must not be empty

---

### **Problem: Conditional formatting not applying**

**Solution**:
- Check if Paid Status column has exact values "Yes" or "No"
- Re-run: 💧 Water Can System → Refresh Conditional Formatting
- Ensure formula uses absolute column reference: `=$G2` (note the $ before G)

---

## 💡 ADVANCED FORMULA TIPS

### **Auto-increment Customer ID**

Add in Column A (shift other columns right):
```excel
=IF(B2<>"", ROW()-1, "")
```
Automatically numbers customers: 1, 2, 3...

---

### **Payment Due Date (7 days from delivery)**

If you add a "Delivery Date" column:
```excel
=IF(I2<>"", I2+7, "")
```
Calculates due date as 7 days after delivery.

---

### **Discount Calculation**

If you add a "Discount %" column:
```excel
=IF(AND(D2<>"", E2<>""), (D2*E2)-(D2*E2*K2/100), "")
```
Applies discount percentage to total amount.

---

### **GST Calculation (18%)**

```excel
=IF(F2<>"", F2*1.18, "")
```
Adds 18% GST to total amount.

---

## 📋 FORMULA COPY-PASTE GUIDE

### **Quick Setup - Copy These Formulas**

1. **F2** (Total Amount):
   ```
   =IF(AND(D2<>"", E2<>""), D2*E2, "")
   ```

2. **J2** (WhatsApp Link):
   ```
   =IF(AND(A2<>"", B2<>"", G2="No"), "https://wa.me/91"&SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B2," ",""),"-",""),"(","")&"?text="&ENCODEURL("Dear "&A2&", your pending water can payment is ₹"&F2&". Kindly make payment. Thank you."), "")
   ```

3. **Drag both formulas down** to row 100

4. **Apply conditional formatting** using Apps Script menu

---

## 🔄 FORMULA MAINTENANCE

### **When Adding New Rows**

Formulas automatically extend when you:
- Insert rows between existing data
- Copy-paste rows with formulas

### **When Deleting Rows**

- Formulas adjust automatically
- No manual updates needed

### **When Adding Columns**

- Update column references in formulas
- Example: If you insert column before F, change F2 to G2

---

## ✅ FORMULA CHECKLIST

- [ ] Total Amount formula in F2
- [ ] WhatsApp Link formula in J2
- [ ] Both formulas copied down to row 100+
- [ ] Data validation on Paid Status column
- [ ] Conditional formatting applied
- [ ] Tested with sample data
- [ ] All formulas calculating correctly

---

**💡 Pro Tip**: Always test formulas with sample data before using with real customers!

**🎓 Learning**: Google Sheets formulas are similar to Excel. Most Excel formulas work in Sheets too!
