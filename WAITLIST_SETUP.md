# Waitlist wiring (Option A)

1. In Apps Script project `Oriaya Waitlist Receiver` (jillrencoaching@gmail.com), paste the prepared Code.gs, save, Deploy > New deployment > Web app, Execute as Me, Who has access: Anyone. Copy the `/exec` URL.
2. In `index.html`, find `WAITLIST_ENDPOINT` and replace the empty string with that `/exec` URL.
3. The form then POSTs `{name, email, source: 'landing-page'}` as JSON. On `{ok:true}` it shows the success state. On failure it shows an error and does not fake success.
4. Test: submit a test signup, verify a row appears in the Oriaya Waitlist Sheet. Do not announce the waitlist works before that row test passes.

Prepared Code.gs (same as agreed 2026-10-13):

```javascript
var SHEET_ID = '1ZlPdK46CeJo9dPuQRvHvyPrpIogKEH75PwTHThsc6wQ';
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = (data.name || '').toString().slice(0, 200);
    var email = (data.email || '').toString().slice(0, 200);
    var source = (data.source || 'landing-page').toString().slice(0, 200);
    if (!email || email.indexOf('@') === -1) {
      return ContentService.createTextOutput(JSON.stringify({ok:false, error:'invalid email'})).setMimeType(ContentService.MimeType.JSON);
    }
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');
    sheet.appendRow([new Date(), name, email, source, '']);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
```
