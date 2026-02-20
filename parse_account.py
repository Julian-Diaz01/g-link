import re

# Read the PDF file
with open('public/account.pdf', 'r', encoding='latin-1', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
periods = []

i = 0
while i < len(lines):
    line = lines[i]
    
    # Look for "Sollstellung MM.YYYY" pattern (can be on same line or next line)
    period_match = None
    if 'Sollstellung' in line:
        # Try to find period on current line
        period_match = re.search(r'Sollstellung\s+(\d{2})\.(\d{4})', line)
        # If not found, check next line
        if not period_match and i + 1 < len(lines):
            period_match = re.search(r'Sollstellung\s+(\d{2})\.(\d{4})', lines[i + 1])
            if period_match:
                i += 1  # Move to next line
    
    if period_match:
        month, year = period_match.groups()
        period = f'{month}.{year}'
        
        # Look ahead for Periodensumme and laufender Saldo
        j = i
        expected = None
        paid = None
        balance = None
        
        while j < len(lines) and j < i + 30:
            l = lines[j]
            
            # Find Periodensumme line
            if 'Periodensumme' in l and not expected:
                # Extract numbers from Periodensumme line - look for pattern like "1.206,00 €"
                nums = re.findall(r'([\d.]+,\d+)\s*€', l)
                if len(nums) >= 2:
                    expected = nums[0].replace('.', '').replace(',', '.')
                    paid = nums[1].replace('.', '').replace(',', '.')
            
            # Find laufender Saldo line (usually right after Periodensumme)
            if 'laufender Saldo' in l and balance is None:
                # Look for the last number in the line (the balance)
                bal_nums = re.findall(r'([\d.-]+,\d+)\s*€', l)
                if bal_nums:
                    balance_str = bal_nums[-1].replace('.', '').replace(',', '.')
                    try:
                        balance = float(balance_str)
                    except:
                        pass
            
            # If we found all values, we're done with this period
            if expected and paid and balance is not None:
                try:
                    periods.append({
                        'period': period,
                        'expected': float(expected),
                        'paid': float(paid),
                        'balance': balance
                    })
                except:
                    pass
                break
            
            j += 1
    
    i += 1

# Print results for debugging
print(f"Extracted {len(periods)} periods\n")
print('Period,Expected (EUR),Paid (EUR),Total Credit (EUR)')
for p in periods:
    print(f"{p['period']},{p['expected']:.2f},{p['paid']:.2f},{p['balance']:.2f}")
