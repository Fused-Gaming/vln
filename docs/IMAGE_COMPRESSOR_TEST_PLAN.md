# Image Compressor Tool - Testing & Verification Plan

## Overview
This document outlines the complete testing workflow for the VLN Image Compressor tool located at `/images`. The tool allows users to upload multiple images, compress them with adjustable quality settings, and download results individually or as a batch ZIP file.

---

## Test Environment Setup

### Prerequisites
- Dev server running: `pnpm dev`
- Access to: `http://localhost:3000/images`
- Test images (JPEG, PNG, or WebP format)
- Browser with developer tools

### Test Images
Recommended test files:
- **Small image**: <100 KB
- **Medium image**: 500 KB - 2 MB
- **Large image**: 5-10 MB
- **Mixed formats**: JPEG, PNG, WebP

---

## Test Plan

### Phase 1: UI & Navigation

#### 1.1 Navigation Menu
- [ ] Open vln.gg in browser
- [ ] Verify "Tools" menu item appears in header
- [ ] Verify "Tools" uses wrench icon (Lucide Icons)
- [ ] Click "Tools" - should navigate to `/images`
- [ ] Verify menu item highlights with sage green color on active state
- [ ] Check mobile menu (viewport < 768px) - Tools should appear in hamburger menu
- [ ] Verify Tools menu item works on both desktop and mobile

#### 1.2 Page Load & Styling
- [ ] Page loads without errors (check console)
- [ ] Title: "Image Compressor" displays correctly
- [ ] Subtitle describes functionality
- [ ] Page uses VLN color palette (sage green, blue-gray, charcoal)
- [ ] All buttons have glow-lift hover effects
- [ ] Responsive design works at: 375px, 768px, 1024px, 1280px breakpoints

---

### Phase 2: Upload Functionality

#### 2.1 Drag & Drop Upload
- [ ] Hover over drop zone - border changes to sage green with subtle background
- [ ] Drag valid image file over drop zone
- [ ] Drop file - upload begins immediately
- [ ] Invalid file type (PDF, SVG, etc.) - shows error toast: "Invalid file! Please upload only JPG, JPEG, PNG, or WEBP files."
- [ ] Multiple files can be dropped at once
- [ ] Drop zone returns to normal state after upload

#### 2.2 Click to Upload
- [ ] Click "Select Images" button
- [ ] File browser opens with image MIME type filters
- [ ] Select single image - uploads and begins compression
- [ ] Select multiple images via Ctrl+Click or Shift+Click
- [ ] Cancel file browser - no changes to page state

#### 2.3 Supported Formats
Test each format separately:
- [ ] **JPEG** (.jpg, .jpeg) - compresses successfully
- [ ] **PNG** (.png) - converts to WebP, compresses successfully
- [ ] **WebP** (.webp) - compresses successfully
- [ ] **Unsupported** (.gif, .bmp, .svg, .pdf) - rejected with error message

---

### Phase 3: Upload Progress

#### 3.1 Upload Progress Bar
- [ ] Upload begins, stage changes to "uploading"
- [ ] Progress bar appears with blue-gray color
- [ ] Progress bar fills from 0-100% smoothly
- [ ] Percentage text updates in real-time (0-100%)
- [ ] Status shows: "Uploading files..."
- [ ] Spinner icon animates while uploading
- [ ] After upload complete (100%), transitions to compression stage

#### 3.2 Upload Edge Cases
- [ ] Very small file (<1 KB) - progress still shows 0-100%
- [ ] Large file (50 MB+) - upload handles gracefully without freezing
- [ ] Multiple files (5+) - shows correct count in status

---

### Phase 4: Quality Slider

#### 4.1 Quality Control
- [ ] Quality slider appears after file upload starts
- [ ] Slider ranges from 1-100
- [ ] Default value is 60
- [ ] Slider label updates with current value: "Compression Quality: {value}%"
- [ ] Tip text: "Higher quality = larger file size. Lower quality = smaller file size but less detail."
- [ ] Slider disabled during compression (can't change mid-process)
- [ ] Slider re-enables after compression completes

#### 4.2 Quality Impact
- **Quality 100% (highest)**
  - Largest output file
  - Best image quality
  - Minimal compression
- **Quality 50% (medium)**
  - Balanced compression
  - Noticeable quality loss
  - 40-60% size reduction typical
- **Quality 10% (lowest)**
  - Maximum compression
  - Visible artifacts
  - 70-90% size reduction typical

---

### Phase 5: Compression Progress

#### 5.1 Compression Progress Bar
- [ ] Compression begins, stage changes to "compressing"
- [ ] Status shows: "Compressing {N} image(s)..."
- [ ] Progress bar appears with sage green → amber gradient
- [ ] Bar fills smoothly from 0-100%
- [ ] Percentage text updates in real-time
- [ ] Spinner icon animates during compression
- [ ] For multiple files, progress reflects overall completion

#### 5.2 Compression Performance
**Test each scenario:**

| File Size | Quality | Expected Time | Note |
|-----------|---------|----------------|------|
| <500 KB | 60% | <1s | Single image |
| 1 MB | 60% | 1-2s | Medium image |
| 5 MB | 60% | 3-5s | Large image |
| Multiple (total 10 MB) | 60% | 5-10s | 3-5 files |

---

### Phase 6: Completed State

#### 6.1 Success Notification
- [ ] After compression, stage changes to "completed"
- [ ] Green checkmark icon appears
- [ ] Status message: "Compression complete!"
- [ ] Subtitle: "{N} image(s) ready for download"
- [ ] Results section appears with compressed images

#### 6.2 Results Display
- [ ] All compressed images listed in a grid
- [ ] Each image shows:
  - ✅ Filename: `{original-name}-compressed.{ext}`
  - ✅ Original size: "{X.XX} KB"
  - ✅ Compressed size: "{Y.YY} KB"
  - ✅ Compression percentage: "↓ 45.5%" (or "↑ X%" if larger)
- [ ] Compression percentage is red (↑) if file grew, green (↓) if shrunk
- [ ] Download button per image
- [ ] Download All as ZIP button at top

---

### Phase 7: Download Functionality

#### 7.1 Individual Image Download
- [ ] Click "Download" button on any compressed image
- [ ] Browser downloads file with correct name: `{name}-compressed.{ext}`
- [ ] File saves to Downloads folder
- [ ] File size matches displayed compressed size
- [ ] Downloaded image is valid (opens in image viewer)
- [ ] Downloaded image has correct compression applied

#### 7.2 Batch ZIP Download
- [ ] Click "Download All as ZIP" button
- [ ] Browser downloads `compressed-images.zip`
- [ ] ZIP file size is reasonable (all images + minimal overhead)
- [ ] Extract ZIP - contains all compressed images
- [ ] Filenames in ZIP are correct: `{name}-compressed.{ext}`
- [ ] All images in ZIP are valid

#### 7.3 Download State Management
- [ ] Can download multiple times (button re-clickable)
- [ ] Downloaded images don't remove from list
- [ ] Page state persists during downloads
- [ ] Can compress more after downloading

---

### Phase 8: Additional Operations

#### 8.1 Compress More Button
- [ ] Click "Compress More" button (appears after compression)
- [ ] Clears all results and returns to idle state
- [ ] Upload zone re-appears
- [ ] Quality slider resets to 60
- [ ] Allows new file upload immediately

#### 8.2 Multiple Compression Cycles
- [ ] Upload Set A (3 images) → compress → download
- [ ] Click "Compress More"
- [ ] Upload Set B (different images) → compress → download
- [ ] Verify no state collision between cycles

---

### Phase 9: Error Handling

#### 9.1 Invalid File Types
- [ ] Upload PDF file - error: "Invalid file! Please upload only JPG, JPEG, PNG, or WEBP files."
- [ ] Upload SVG file - error shown, file rejected
- [ ] Upload GIF file - error shown, file rejected
- [ ] Upload BMP file - error shown, file rejected
- [ ] Error toast persists for 5 seconds then auto-dismisses
- [ ] Error box has red border and alert icon

#### 9.2 Compression Errors
- [ ] Simulate error by opening DevTools and throttling network
- [ ] Error message displays: "{error message}"
- [ ] Status shows error icon (⚠️) in red
- [ ] Can click "Compress More" to retry

#### 9.3 Edge Cases
- [ ] File deleted after upload starts - graceful error handling
- [ ] Browser tab loses focus during compression - continues in background
- [ ] Multiple files with same name - all processed correctly

---

### Phase 10: Performance Testing

#### 10.1 Single Large File (50 MB)
- [ ] Upload completes without timeout
- [ ] Compression initiates
- [ ] Progress bar updates smoothly
- [ ] Browser remains responsive (not frozen)
- [ ] Download completes successfully

#### 10.2 Multiple Files (10+ files, mixed sizes)
- [ ] All files upload successfully
- [ ] Progress bar shows combined progress
- [ ] All compressed images appear in results
- [ ] ZIP download includes all files
- [ ] No memory leaks (check DevTools Memory tab)

#### 10.3 Rapid Quality Changes
- [ ] While compressing, quickly change quality slider
- [ ] System handles gracefully
- [ ] Only final quality value is used
- [ ] No stale results displayed

---

### Phase 11: Browser Compatibility

#### 11.1 Desktop Browsers
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**For each browser, verify:**
- [ ] Page loads without errors
- [ ] File upload works
- [ ] Progress bars render correctly
- [ ] Download functionality works
- [ ] Responsive design adapts

#### 11.2 Mobile Browsers
- [ ] Chrome Mobile (iOS/Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile (Android)

**For each mobile browser:**
- [ ] Page loads and layout is mobile-responsive
- [ ] Touch-friendly upload zone
- [ ] Buttons are easily tappable
- [ ] Progress bars visible and clear
- [ ] Download saves to device storage

---

### Phase 12: Accessibility

#### 12.1 Keyboard Navigation
- [ ] Tab through page elements in logical order
- [ ] Focus outlines visible on all interactive elements
- [ ] Can upload via keyboard (Tab → Space on button)
- [ ] Can adjust slider with arrow keys
- [ ] Can trigger downloads with Enter key

#### 12.2 Screen Reader Testing
- [ ] Page title readable: "Image Compressor"
- [ ] Section headings are semantic (h1, h2, h3)
- [ ] Progress bars have aria-labels or role="progressbar"
- [ ] Button labels are descriptive: "Download" not "Click Here"
- [ ] Error messages are announced
- [ ] Image alt text provided where applicable

#### 12.3 Color Contrast
- [ ] Text contrast meets WCAG AA (4.5:1 minimum)
- [ ] Progress bars distinguishable without color alone
- [ ] Error state not conveyed by color alone (includes icon)

---

### Phase 13: Integration Testing

#### 13.1 Navigation Integration
- [ ] All other menu items still work
- [ ] Footer links accessible from /images page
- [ ] Breadcrumb or back navigation works
- [ ] No broken links on page

#### 13.2 Design System Compliance
- [ ] VLN colors used consistently (sage, blue-gray, charcoal, white)
- [ ] All buttons use correct variants (primary, secondary, ghost)
- [ ] Border radius is 12px (rounded-vln)
- [ ] Spacing/padding follows 4px grid
- [ ] Typography uses Inter and JetBrains Mono
- [ ] Hover states have glow-lift effect

---

## Test Execution Checklist

### Pre-Test
- [ ] Clear browser cache
- [ ] Close other applications (to isolate network/performance)
- [ ] Open DevTools (Console, Network, Performance tabs)
- [ ] Note browser version
- [ ] Note device/OS

### During Test
- [ ] Record any console errors
- [ ] Screenshot failures
- [ ] Note actual vs expected behavior
- [ ] Test on multiple browsers/devices
- [ ] Monitor network tab for failed requests

### Post-Test
- [ ] Summarize pass/fail results
- [ ] List any bugs found with severity
- [ ] Note performance metrics
- [ ] Clean up test files

---

## Expected Behaviors

### File Compression Results

**PNG Compression**
- PNG uploaded → converted to WebP
- Typical reduction: 40-70%
- Quality 100 might be larger (due to WebP conversion overhead)

**JPEG Compression**
- JPEG uploaded → stays as JPEG
- Typical reduction at Q60: 30-50%
- Quality 100 might be larger than original

**WebP Compression**
- WebP uploaded → stays as WebP
- Typical reduction: 20-40%

### Performance Expectations

| Metric | Expected | Notes |
|--------|----------|-------|
| Upload progress 0→100% | <1 second | Simulated in UI |
| Compression start | <500ms after upload | Processing begins |
| Single 1MB image compression | 1-2 seconds | At quality 60 |
| Multiple image handling | <100ms per image | Processed sequentially |
| Download initiation | <100ms | Triggers browser download |

---

## Known Limitations

1. **File Size Limits**: No hard limit enforced in current implementation; browser memory will limit very large files (>100 MB)
2. **Concurrent Uploads**: Only one compression batch at a time (sequential processing)
3. **PNG to WebP Conversion**: All PNGs convert to WebP regardless of user preference
4. **Quality Slider**: Cannot change quality mid-compression (disabled during process)

---

## Success Criteria

✅ **PASS** if:
- All upload, compression, and download flows complete successfully
- Progress bars display and update smoothly
- Error handling shows user-friendly messages
- UI is responsive and accessible
- Performance is acceptable for files up to 50 MB
- All buttons and links are functional
- Design matches VLN brand standards

❌ **FAIL** if:
- Files fail to upload
- Progress bars don't update
- Compression produces invalid images
- Download functionality broken
- UI not responsive
- Console errors present
- Accessibility issues found

---

## Testing Notes

**Test Date**: May 2, 2026  
**Tester**: Claude  
**Environment**: Next.js 16, React 19, Vercel Dev Server  
**Browser**: [To be filled during test]  
**Status**: [To be filled during test]

---

## Appendix: Manual Testing Guide

### Quick Test Workflow (5 minutes)
1. Navigate to `http://localhost:3000/images`
2. Upload a 1-2 MB JPEG
3. Observe upload progress bar (0-100%)
4. Observe compression progress bar (0-100%)
5. Click "Download" on result
6. Verify file is valid and compressed
7. Click "Compress More"
8. Repeat with PNG file

### Comprehensive Test Workflow (30 minutes)
1. Test all file upload methods (drag-drop, click-select)
2. Test invalid file rejection
3. Test quality slider impact
4. Upload multiple files and verify batch processing
5. Test all download options (individual + ZIP)
6. Test "Compress More" workflow
7. Check UI responsiveness at different viewport sizes
8. Check browser console for errors
9. Verify mobile layout on device

---
