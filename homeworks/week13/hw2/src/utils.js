export function getTime() {
  const now = new Date();
  const year = now.getFullYear(); // yyyy
  const month = now.getMonth() + 1; // mm
  const day = now.getDate(); // dd
  const hh = now.getHours(); // hh
  const mm = now.getMinutes(); // mm
  const ss = now.getSeconds(); // ss
  let clock = `${year}-`;
  if (month < 10) { clock += '0'; }
  clock += `${month}-`;
  if (day < 10) { clock += '0'; }
  clock += `${day} `;
  if (hh < 10) { clock += '0'; }
  clock += `${hh}:`;
  if (mm < 10) { clock += '0'; }
  clock += `${mm}:`;
  if (ss < 10) { clock += '0'; }
  clock += ss;
  return clock;
}

export function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function appendCommentToDom(container, comment, isPrepend) {
  const html = `
    <div class="col-12 board-list-group">
      <div class="row board-list-group-item d-flex justify-content-between align-items-start pb-3 pt-3">
        <div class="col-md-8 col-12 pb-2 d-flex align-items-center board-list-name">
          <span class="badge mr-2">訪客</span>${escape(comment.nickname)}
        </div>
        <div class="board-list-date col-md-4 col-12 text-right pb-2">
          ${comment.created_at}
        </div>
        <div class="col-12 board-list-message">
          ${escape(comment.content)}
        </div>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}
