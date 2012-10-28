jQuery.fn.zipsearch = function(options) {
	var plugin = this;
	//オプションなどの設定をオブジェクトにしておきます。デフォルト値も同時に記述しておきます。
	plugin.settings = {
		php: "zipsearch.php",
		error: function() {},
		success: function() {},
		trigger: null,
		loader: "ajax-loader.gif"
	}
	//デフォルト値と引数に渡されたoptionsをマージします。
	jQuery.extend(plugin.settings, options);
	
	var ajax = null;
	function startLoading() {
		jQuery(plugin).css("background","url("+plugin.settings.loader+") no-repeat center right");
	}
	function stopLoading() {
		jQuery(plugin).css("background","");
		if (ajax && ajax.abort) {
			ajax.abort();
		}
	}
	function checkValue(e) {
		var val = jQuery(plugin).val();
		if (val.length !== 0) {
			request(val);
		} else {
			stopLoading();
		}
		e.preventDefault();
	}
	function request(val) {
		if (ajax && ajax.abort) {
			ajax.abort();
		}
		startLoading();
		ajax = jQuery.ajax({
			type: "POST",
			url: plugin.settings.php,
			data: "zip="+val,
			error: function(e) {
				if (e.statusText !== "abort") {
					plugin.settings.error("データの取得に失敗しました");
				}
				stopLoading();
			},
			success: function(data) {
				plugin.settings.success(data);
				stopLoading();
			}
		});
	}
	
	if (plugin.settings.trigger) {
		jQuery(plugin.settings.trigger).bind("click",checkValue);
	} else {
		jQuery(plugin).bind("keyup",checkValue);
	}
}