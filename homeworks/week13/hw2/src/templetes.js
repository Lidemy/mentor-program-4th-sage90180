export const loadMoreBtnHTML = `
  <div class="board-footer-more col-md-2 col-sm-3 col-12">
    載入更多 <i class="fas fa-arrow-circle-down"></i>
  </div>
`;

export function getForm(classname) {
  return `
  <div class="${classname} container board">
    <div class="row mt-4 text-center justify-content-center board-header">
      Hello Board (${classname})
    </div>
    <div class="col-12 board-alert">
      <div class="alert text-center col-12 board-alert" role="alert">
        <i class="fas fa-exclamation-triangle"></i> 請輸入內容
      </div>
    </div>
    <form class="row board-form pt-4 pb-2" method="POST" action="./api_add_comments.php">
      <div class="col-12 col-sm-12">
        <div class="form-group">
          <textarea type="text" name="content" rows="3" placeholder="請輸入留言" class="form-control"></textarea>
        </div>
      </div>
      <div class="col-12 col-sm-8">
        <div class="form-group">
          <input type="text" name="nickname" placeholder="請輸入暱稱" class="form-control">
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <button type="submit" class="btn btn-block board-add-btn"><i class="fas fa-plus mr-2"></i>新增</button>
      </div>
    </form>
    <div class="row board-list">
    </div>
    <div class="row board-footer justify-content-center text-center">
  
    </div>
  </div>
  `;
}
