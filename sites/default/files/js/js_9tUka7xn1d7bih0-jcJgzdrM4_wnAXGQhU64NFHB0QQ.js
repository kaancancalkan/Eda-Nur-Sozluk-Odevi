Drupal.locale = { 'strings': {"":{"An AJAX HTTP error occurred.":"Bir AJAX HTTP hatas\u0131 olu\u015ftu.","HTTP Result Code: !status":"HTTP Sonu\u00e7 Kodu: !status","An AJAX HTTP request terminated abnormally.":"Bir AJAX HTTP istemi ola\u011fand\u0131\u015f\u0131 sonland\u0131r\u0131ld\u0131.","Debugging information follows.":"Hata ay\u0131klama bilgisi a\u015fa\u011f\u0131da.","Path: !uri":"Yol: !uri","StatusText: !statusText":"Durum Metni: !statusText","ResponseText: !responseText":"Yan\u0131t Metni: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Enable":"Etkinle\u015ftir","Disable":"Devre d\u0131\u015f\u0131 b\u0131rak","Disabled":"Etkin de\u011fil","Enabled":"Etkin","Edit":"D\u00fczenle","Add":"Ekle","Menu":"Men\u00fc","Configure":"Yap\u0131land\u0131r","All":"T\u00fcm\u00fc","Done":"Tamam","This field is required.":"Bu alan zorunludur.","Show":"G\u00f6ster","Select all rows in this table":"Bu tablodaki t\u00fcm sat\u0131rlar\u0131 se\u00e7","Deselect all rows in this table":"Tablodaki sat\u0131r se\u00e7imini iptal et","Not published":"Yay\u0131nlanmam\u0131\u015f","Shortcuts":"K\u0131sayollar","Please wait...":"L\u00fctfen bekleyin...","Hide":"Gizle","Loading":"Y\u00fckleniyor","By @name on @date":"@name taraf\u0131ndan @date tarihinde","By @name":"@name taraf\u0131ndan","Not in menu":"Men\u00fcde yok","Alias: @alias":"Takma ad: @alias","No alias":"Takma ad yok.","New revision":"Yeni s\u00fcr\u00fcm","Drag to re-order":"Yeniden s\u0131ralamak i\u00e7in s\u00fcr\u00fckleyiniz","Changes made in this table will not be saved until the form is submitted.":"Bu tabloda yap\u0131lan de\u011fi\u015fiklikler form g\u00f6nderilenceye dek kaydedilmeyecektir.","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Bloklarda yap\u0131lan de\u011fi\u015fiklikler, \u003Cem\u003EBloklar\u0131 kaydet\u003C\/em\u003E d\u00fc\u011fmesi t\u0131klan\u0131ncaya dek kaydedilmez.","Show shortcuts":"K\u0131sayollar\u0131 g\u00f6ster","This permission is inherited from the authenticated user role.":"Bu izin, kimli\u011fi onaylanm\u0131\u015f kullan\u0131c\u0131 rol\u00fcnden devral\u0131nm\u0131\u015ft\u0131r.","No revision":"S\u00fcr\u00fcm yok","@number comments per page":"sayfa ba\u015f\u0131na yorum say\u0131s\u0131 @number","Requires a title":"Bir ba\u015fl\u0131k gerekiyor","Not restricted":"K\u0131s\u0131tl\u0131 de\u011fil","(active tab)":"(etkin sekme)","Not customizable":"\u00d6zelle\u015ftirilemez","Restricted to certain pages":"Belli sayfalara k\u0131s\u0131tl\u0131","The block cannot be placed in this region.":"Blok bu b\u00f6lgede yer alamaz.","Customize dashboard":"Panoyu \u00f6zelle\u015ftir","Hide summary":"\u00d6zeti gizle","Edit summary":"\u00d6zeti d\u00fczenle","Don\u0027t display post information":"G\u00f6nderim bilgilerini g\u00f6r\u00fcnt\u00fcleme","@title dialog":"@title dialog","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Se\u00e7ilen %filename dosyas\u0131 y\u00fcklenemiyor. Yaln\u0131zca a\u015fa\u011f\u0131daki uzant\u0131lara sahip dosyalara izin verilir: %extensions.","Re-order rows by numerical weight instead of dragging.":"S\u00fcr\u00fcklemek yerine, sat\u0131rlar\u0131 say\u0131sal a\u011f\u0131rl\u0131\u011fa g\u00f6re yeniden s\u0131ralay\u0131n.","Show row weights":"Sat\u0131r a\u011f\u0131rl\u0131klar\u0131n\u0131 g\u00f6ster","Hide row weights":"Sat\u0131r a\u011f\u0131rl\u0131klar\u0131n\u0131 gizle","Autocomplete popup":"Otomatik tamamlama a\u00e7\u0131l\u0131r penceresi","Searching for matches...":"E\u015fle\u015fmeler aran\u0131yor...","Hide shortcuts":"K\u0131sayollar\u0131 gizle"}} };;
/**
 * JavaScript functions for front-end display of webform conditional components
 */
(function ($) {
	
Drupal.behaviors.webform_conditional = Drupal.behaviors.webform_conditional || {};
Drupal.behaviors.webform_conditional.attach = function() {
	// create quasi static var to save perfomance
	Drupal.webform_conditional.wrappers = new Object();
	Drupal.webform_conditional.components = new Object();
  $.each(Drupal.settings, function(key, info) {
    if(key.substring(0, 20) == 'webform_conditional_') {
      $.each(info.fields, function(triggerField_key, triggerField_info) {
        
        var formItemWrapper = Drupal.webform_conditional.getWrapper(triggerField_info);
        if(formItemWrapper.length > 0){
            // Add onclick handler to Parent field
            Drupal.webform_conditional.addOnChange (triggerField_key, triggerField_info, key);
        }
        });
      // after all added - trigger initial
  
      $.each(info.fields, function(triggerField_key, triggerField_info) {
        var formItemWrapper = Drupal.webform_conditional.getWrapper(triggerField_info);
          if(formItemWrapper.length > 0){
            var field_name = Drupal.webform_conditional.escapeId(triggerField_key);
            var components = Drupal.webform_conditional.getComponentsByName(field_name, key);
            if(components.attr('type')=='radio' || components.attr('type')=='checkbox'){
              $(components[0]).triggerHandler('click');
            }else{
              components.triggerHandler('change');
            }
          }
        });
      }
    });
	return;
};
Drupal.webform_conditional = Drupal.webform_conditional || {};
// create quasi static var to save perfomance
Drupal.webform_conditional.getWrapper = function(fieldInfo){
	if(Drupal.webform_conditional.wrappers[fieldInfo['css_id']]){
		return Drupal.webform_conditional.wrappers[fieldInfo['css_id']];
	}
	return Drupal.webform_conditional.wrappers[fieldInfo['css_id']] = $("#" + fieldInfo['css_id']);
};
Drupal.webform_conditional.addOnChange = function(triggerField_key, triggerField_info, key) {
	var monitor_field_name = Drupal.webform_conditional.escapeId(triggerField_key);
	var changeFunction = function() {
		Drupal.webform_conditional.setVisibility(triggerField_key,triggerField_info,key);
	};
	$.each(triggerField_info['dependent_fields'],function(dependent_field_key,dependent_field_info){
		var formItemWrapper = Drupal.webform_conditional.getWrapper(dependent_field_info);
	    if(formItemWrapper.length > 0){
	            formItemWrapper.css("display", "none");
	    }

	});
	var components = Drupal.webform_conditional.getComponentsByName(monitor_field_name, key);
	if(components.attr('type')=='radio' || components.attr('type')=='checkbox'){
		components.click(changeFunction)
	}else{
		components.change(changeFunction);
	}
	
};
Drupal.webform_conditional.setVisibility = function(triggerField_key,triggerField_info,key,monitorField,monitorInfo){
	var monitor_field_name = Drupal.webform_conditional.escapeId(triggerField_key);
	var currentValues = Drupal.webform_conditional.getFieldValue(monitor_field_name); 
	var monitor_visible = true;
	if(monitorField !== undefined){
		monitor_visible = Drupal.webform_conditional.getWrapper(monitorInfo).data('wfc_visible');
	}
	$.each(triggerField_info['dependent_fields'],function(dependentField,dependentInfo){
		if(((dependentInfo['operator'] == "=" && !Drupal.webform_conditional.Matches(currentValues,dependentInfo['monitor_field_value']))
			|| (dependentInfo['operator'] == "!=" && Drupal.webform_conditional.Matches(currentValues,dependentInfo['monitor_field_value']))) 
			|| !monitor_visible){
				// show the hidden div
				// have to set wfc_visible so that you check the visibility of this
				// immediately
			 Drupal.webform_conditional.getWrapper(dependentInfo).hide().data('wfc_visible',false);
		}else {
				// otherwise, hide it
			Drupal.webform_conditional.getWrapper(dependentInfo).show().data('wfc_visible',true);
				// and clear data (using different selector: want the
				// textarea to be selected, not the parent div)
		}
		Drupal.webform_conditional.TriggerDependents(dependentField,dependentInfo,key);
	});
};
Drupal.webform_conditional.getComponentsByName = function (field_name, key){
	// check to save jquery calls
	if(Drupal.webform_conditional.components[field_name]){
		return Drupal.webform_conditional.components[field_name];
	}
	// don't overwrite original name to store for caching
	var css_field_name = "[" + field_name + "]";
	settings = Drupal.settings[key];
	var nid = settings.nid;
	if(nid instanceof Array){
		nid = settings.nid[0];
	}
	return Drupal.webform_conditional.components[field_name] = $("#webform-client-form-" + nid + " *[name*='"+css_field_name+"']");
};
Drupal.webform_conditional.TriggerDependents = function(monitorField,monitorInfo, key){
  settings = Drupal.settings[key];
	$.each(settings.fields, function(triggerField_key, triggerField_info) {
		if(triggerField_key == monitorField){
			Drupal.webform_conditional.setVisibility(triggerField_key, triggerField_info,key,monitorField,monitorInfo);
		};
	});
};
Drupal.webform_conditional.getFieldValue = function(field_name){
	field_name = "[" + field_name + "]";
	var selected = [];
	var vals = [];
	if($('form input[name*="'+field_name+'"]:checked').length >= 1){
		selected =  $('form input[name*="'+field_name+'"]:checked');
	}else if($('form select[name*="'+field_name+'"] option:selected').length >= 1){
		selected = $('form select[name*="'+field_name+'"] option:selected');
	}
	if(selected.length == 0){
		return vals;
	}
	selected.each(function(i){
	     vals[i] = $(this).val();
	    });
	return vals;
};
Drupal.webform_conditional.Matches = function(currentValues,triggerValues){
	var found = false;
	$.each(triggerValues, function(index, value) { 
		  if(jQuery.inArray(value,currentValues)> -1){
			  found = true;
			  return false;
		  }
		});
	return found;
};
// Drupal.webform_conditional.escapeId
Drupal.webform_conditional.escapeId = function(myid) {
	if (typeof myid == 'undefined') {
		return;
	}
	   return  myid.replace(/(:|\.)/g,'\\$1');
};
})(jQuery);;
