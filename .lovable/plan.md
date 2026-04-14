

# Fix Plan: Build Error + UI Polish

## 1. Fix Build Error
**File**: `src/components/Onboarding.tsx` line 3  
Add `Loader2` to the lucide-react import (it's used on line 298 but not imported).

## 2. Deploy & Test Edge Function
Deploy `generate-content` edge function and verify it works, since the build error note also flagged it.

## 3. UI Review
The auth screen looks clean. Once the build error is fixed, I'll navigate through onboarding and the main app screens to check for any visual or functional issues.

---

**Changes**: Single line edit in `Onboarding.tsx` imports, then deploy edge function and do a visual walkthrough.

