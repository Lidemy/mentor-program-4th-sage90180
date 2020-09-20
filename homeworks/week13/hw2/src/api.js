/* eslint-disable no-shadow */
/* eslint-disable no-undef */
export function getComments(apiUrl, siteKey, before, limit, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}&limit=${limit}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    url,
    success: (data) => {
      cb(data);
    },
  });
}
export function addComments(apiUrl, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
    success: (data) => {
      cb(data);
    },
  });
}
