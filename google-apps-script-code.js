const SHEET_NAME = '予約一覧';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getSheet_();
    ensureHeader_(sheet);

    sheet.appendRow([
      new Date(),
      payload.managementSystemId || '',
      payload.company || '',
      payload.name || '',
      payload.date || '',
      payload.time || '',
      payload.therapist || '',
      payload.plan || '',
      Array.isArray(payload.bodyParts) ? payload.bodyParts.join('、') : '',
      payload.firstVisit || '',
      Array.isArray(payload.options) ? payload.options.join('、') : '',
      payload.request || '',
      payload.createdAt || ''
    ]);

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

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    '受信日時',
    '管理システムID',
    '企業名',
    '氏名',
    '来訪日',
    '指定時間',
    'セラピスト',
    '施術プラン',
    '施術部位',
    '初回利用',
    '追加希望',
    '要望',
    'フォーム登録日時'
  ]);
}
