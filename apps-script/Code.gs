/**
 * Portfolio contact form -> Google Sheet + email notification
 * -----------------------------------------------------------
 * Paste this whole file in Extensions > Apps Script of your Google Sheet.
 * Then run setup() once, and deploy as a Web app (see README, step 3).
 *
 * Every message becomes one row in the "Messages" tab.
 * You also get an email; press "Reply" in Gmail to answer the sender directly.
 */

var NOTIFY_EMAIL = 'inousasimpore226@gmail.com'; // where you receive the alerts
var SHEET_NAME = 'Messages';
var HEADERS = ['Received', 'Name', 'Email', 'Company', 'Subject', 'Message', 'Page', 'Status', 'Notes'];

/** Run once from the editor: creates the "Messages" tab with headers and formatting. */
function setup() {
  var sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#0f2a44').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 150); sheet.setColumnWidth(2, 160); sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(6, 420); sheet.setColumnWidth(8, 110);
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(['New', 'Replied', 'Closed'], true).build();
  sheet.getRange('H2:H').setDataValidation(rule);
}

/** Receives the form. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var p = (e && e.parameter) || {};

    if (p.website) return json_({ result: 'success' }); // spam bot filled the hidden field

    var name = clean_(p.name, 100);
    var email = clean_(p.email, 150);
    var message = clean_(p.message, 2000);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
      return json_({ result: 'error', error: 'Invalid fields' });
    }
    var company = clean_(p.company, 120);
    var subject = clean_(p.subject, 80) || 'Other';
    var page = clean_(p.page, 300);

    var sheet = getSheet_();
    if (sheet.getLastRow() === 0) setup();
    sheet.appendRow([new Date(), name, email, company, subject, message, page, 'New', '']);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'Portfolio message: ' + subject + ' — ' + name,
      htmlBody:
        '<p><b>' + html_(name) + '</b> (' + html_(email) + ')' + (company ? ' · ' + html_(company) : '') + '</p>' +
        '<p><b>Subject:</b> ' + html_(subject) + '</p>' +
        '<p style="white-space:pre-wrap;border-left:3px solid #0b7d77;padding-left:12px">' + html_(message) + '</p>' +
        '<p style="color:#777;font-size:12px">Press Reply to answer ' + html_(name) + ' directly. All messages are saved in your Google Sheet.</p>'
    });

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Open the Web app URL in a browser to check it is live. */
function doGet() {
  return json_({ result: 'ok', message: 'Contact form endpoint is running.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
function clean_(v, max) {
  var s = String(v == null ? '' : v).trim().slice(0, max);
  // stop spreadsheet formulas being injected through the form
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
function html_(s) {
  return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
