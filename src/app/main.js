'use strict';

require.config({
    paths: {
        text: '../assets/libs/require-text',
        css: '../assets/libs/require-css'
    },
    deps: ['app']
});


//msg  函数
function msg(text, type, icon) {
  //text  输入的字体  string
  //type  样式类型  number
  //icon  图标  string
  if (icon) {
    var iconHtml = '<span class="msg-icon fa"></span>';
    if (type == 1) {
      $('.msg').html(iconHtml + text).addClass('msg-common').show();
      $('.msg-icon').addClass(icon);
      $('.msg-icon').addClass('msg-icon-common');
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-common');
        $('.msg-icon').removeClass(icon);
        $('.msg-icon').removeClass('msg-icon-common');
      }, 2000)
    } else if (type == 2) {
      $('.msg').html(iconHtml + text).addClass('msg-success').show();
      $('.msg-icon').addClass('msg-icon-success');
      $('.msg-icon').addClass(icon);
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-success');
        $('.msg-icon').removeClass('msg-icon-success');
        $('.msg-icon').removeClass(icon)
      }, 2000)

    }
    else if (type == 3) {
      $('.msg').html(iconHtml + text).addClass('msg-warning').show();
      $('.msg-icon').addClass('msg-icon-warning');
      $('.msg-icon').addClass(icon);
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-warning');
        $('.msg-icon').removeClass('msg-icon-warning');
        $('.msg-icon').removeClass(icon)
      }, 2000)

    }
    else if (type == 4) {
      $('.msg').html(iconHtml + text).addClass('msg-error').show();
      $('.msg-icon').addClass('msg-icon-error');
      $('.msg-icon').addClass(icon);
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-error');
        $('.msg-icon').removeClass('msg-icon-error');
        $('.msg-icon').removeClass(icon)
      }, 2000)

    }
    else if (type == 5) {
      $('.msg').html(iconHtml + text).addClass('msg-info').show();
      $('.msg-icon').addClass('msg-icon-info');
      $('.msg-icon').addClass(icon);
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-info');
        $('.msg-icon').removeClass('msg-icon-info');
        $('.msg-icon').removeClass(icon)
      }, 2000)

    } else {
      $('.msg').html(iconHtml + text).addClass('msg-common').show();
      $('.msg-icon').addClass('msg-icon-common');
      $('.msg-icon').addClass(icon)
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-common');
        $('.msg-icon').removeClass('msg-icon-common');
        $('.msg-icon').removeClass(icon)
      }, 2000)

    }

  } else {
    if (type == 1) {
      $('.msg').html(text).addClass('msg-common').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-common');
      }, 2000)
    } else if (type == 2) {
      $('.msg').html(text).addClass('msg-success').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-success');
      }, 2000)

    }
    else if (type == 3) {
      $('.msg').html(text).addClass('msg-warning').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-warning');
      }, 2000)

    }
    else if (type == 4) {
      $('.msg').html(text).addClass('msg-error').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-error');
      }, 2000)

    }
    else if (type == 5) {
      $('.msg').html(text).addClass('msg-info').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-info');
      }, 2000)

    } else {
      $('.msg').html(text).addClass('msg-common').show();
      setTimeout(function () {
        $('.msg').hide().removeClass('msg-common');
      }, 2000)
    }
  }


}

//分页函数
jQuery.fn.pagination = function (maxentries, opts) {

  opts = jQuery.extend({
    items_per_page: 1,      //每页每页显示的记录条数
    num_display_entries: 4, //最多显示的页码数
    current_page: 0,    // 初始化时选中的页码	数字	0
    num_edge_entries: 3,   //  头部尾部个数
    link_to: "#",
    prev_text: "<",
    next_text: ">",
    ellipse_text: "...",
    prev_show_always: true,
    next_show_always: true,
    callback: function () {
      return false;
    }    //返回函数
  }, opts || {});
  return this.each(function () {
    /**
     * 计算页面的最大数量
     */
    function numPages() {
      return Math.ceil(maxentries / opts.items_per_page);
    }

    /**
     * 计算的开始和结束点
     * @return {Array}
     */
    function getInterval() {
      var ne_half = Math.ceil(opts.num_display_entries / 2);
      var np = numPages();
      var upper_limit = np - opts.num_display_entries;
      var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
      var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
      return [start, end];
    }

    /**
     * 分页链接的事件处理函数。
     * @param {int} page_id The new page number
     */
    function pageSelected(page_id, evt) {
      current_page = page_id;
      drawLinks();
      var continuePropagation = opts.callback(page_id + 1, panel);
      if (!continuePropagation) {
        if (evt.stopPropagation) {
          evt.stopPropagation();
        }
        else {
          evt.cancelBubble = true;
        }
      }
      return continuePropagation;
    }

    /**
     * 这个函数将分页链接插入到容器元素
     */
    function drawLinks() {
      panel.empty();
      var interval = getInterval();
      var np = numPages();
      // This helper function returns a handler function that calls pageSelected with the right page_id
      var getClickHandler = function (page_id) {
        return function (evt) {
          return pageSelected(page_id, evt);
        }
      };
      // Helper function for generating a single link (or a span tag if it's the current page)
      var appendItem = function (page_id, appendopts) {
        page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
        appendopts = jQuery.extend({text: page_id + 1, classes: ""}, appendopts || {});
        if (page_id == current_page) {
          var lnk = jQuery("<span class='current'>" + (appendopts.text) + "</span>");
        }
        else {
          var lnk = jQuery("<a>" + (appendopts.text) + "</a>")
            .bind("click", getClickHandler(page_id))
            .attr('href', opts.link_to.replace(/__id__/, page_id));


        }
        if (appendopts.classes) {
          lnk.addClass(appendopts.classes);
        }
        panel.append(lnk);
      };
      // Generate "Previous"-Link
      if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
        appendItem(current_page - 1, {text: opts.prev_text, classes: "prev"});
      }
      // Generate starting points
      if (interval[0] > 0 && opts.num_edge_entries > 0) {
        var end = Math.min(opts.num_edge_entries, interval[0]);
        for (var i = 0; i < end; i++) {
          appendItem(i);
        }
        if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
          jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
        }
      }
      // Generate interval links
      for (var i = interval[0]; i < interval[1]; i++) {
        appendItem(i);
      }
      // Generate ending points
      if (interval[1] < np && opts.num_edge_entries > 0) {
        if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
          jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
        }
        var begin = Math.max(np - opts.num_edge_entries, interval[1]);
        for (var i = begin; i < np; i++) {
          appendItem(i);
        }

      }
      // Generate "Next"-Link
      if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
        appendItem(current_page + 1, {text: opts.next_text, classes: "next"});
      }
    }

    // Extract current_page from options
    var current_page = opts.current_page;
    // Create a sane value for maxentries and items_per_page
    maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
    opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
    // Store DOM element for easy access from all inner functions
    var panel = jQuery(this);
    // Attach control functions to the DOM element
    this.selectPage = function (page_id) {
      pageSelected(page_id);
    };
    this.prevPage = function () {
      if (current_page > 0) {
        pageSelected(current_page - 1);
        return true;
      }
      else {
        return false;
      }
    };
    this.nextPage = function () {
      if (current_page < numPages() - 1) {
        pageSelected(current_page + 1);
        return true;
      }
      else {
        return false;
      }
    };
    // When all initialisation is done, draw the links
    drawLinks();
    // call callback function
    if (current_page == 0) {
      return;
    }
    opts.callback(current_page + 1, this);
  });
};

function errMsg (error) {
  if (error.status == 0){
    msg('请确认服务是否开着')
  } else if (error.data){
    var err =error.data || '未知错误';
    if (error.status >= 500) {
      msg(error.status+error.statusText+err,3)
    } else if (error.status == 403) {
      msg(error.status+error.statusText+err,5)
    } else {
      msg(error.status+error.statusText+err,4)
    }
  } else {
    if (error.status >= 500) {
      msg(error.status+error.statusText+'服务器超时',3)
    } else {
      msg(error.status+error.statusText+'服务器错误',4)
    }
  }
}