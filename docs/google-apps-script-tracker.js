const SHEET_NAME = "MAPS_Tracking_Events";
const HEADERS = [
  "received_at",
  "event",
  "page_location",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "source",
  "service",
  "package",
  "audit_score",
  "recommendation",
  "record_type",
  "name",
  "business_name",
  "business_type",
  "main_need",
  "budget",
  "link",
  "message",
  "audit_status",
  "audit_answers",
  "client_timestamp",
  "raw_payload"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  const acquired = lock.tryLock(5000);

  if (!acquired) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Tracker is busy. Retry shortly." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const sheet = getSheet();
    const payload = parsePayload(e);
    const record = payload.record || {};
    const row = [
      new Date(),
      payload.event || "",
      payload.page_location || "",
      payload.utm_source || "",
      payload.utm_medium || "",
      payload.utm_campaign || "",
      payload.utm_term || "",
      payload.utm_content || "",
      payload.source || "",
      payload.serviceInterest || payload.service || "",
      payload.package_name || payload.packageName || "",
      payload.auditScore || payload.score || record.score || "",
      payload.recommendation || "",
      record.source || "",
      record.name || "",
      record.businessName || "",
      record.businessTypeResolved || record.businessType || "",
      record.mainNeed || "",
      record.budget || "",
      record.link || "",
      record.message || "",
      record.status || "",
      record.answers ? JSON.stringify(record.answers) : "",
      payload.timestamp || "",
      JSON.stringify(payload)
    ];
    sheet.appendRow(row.map(safeCell));

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function safeCell(value) {
  if (typeof value === "string" && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "MAPS tracker" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  if (currentHeaders.join("|") !== HEADERS.join("|")) {
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return { raw: e.postData.contents };
  }
}
