var UISelect = function (selector) {
		$(selector).each(function (ind, el) {
			var drop_items = '',
				scrollPane = null,
				selectObject = null,
				v = $(el).find('option[selected]').attr('value'),
				text = null;

			var createDropItems = function () {
				var drop_items = '',
					append_icon = $(el).hasClass('iconed');
				$(el).find('option').each(function (num, opt) {
					var icon = '',
						cls = '',
						total_icon = '';
					if (num % 2 == 0) {
						cls = "odd";
					}
					if (v == $(opt).attr('value')) {
						text = $(opt).html();
					}
					if (append_icon) {
						total_icon =
							'<span class="icon" style="background: ' + $(opt).attr('data-color') + ';">' +
							'</span>';
					}
					else {
						total_icon =
							'<span class="spacer"></span>';
					}
					drop_items +=
						'<a class="item ' + cls + '">' +
							total_icon +
							'<span class="value">' +
								$(opt).html() +
							'</span>' +
							'<span class="val">' +
								$(opt).attr('value') +
							'</span>' +
						'</a>';
				});
				return drop_items;
			};

			drop_items = createDropItems();
			$(el).wrap('<div class="ui-select"/>');
			var prompt = text || $(el).attr('prompt');
			if (prompt == undefined || prompt == null) {
				prompt = $(el).find('option').first().html();
			}
			$(el).parents('.ui-select').append(
				'<div class="border">' +
					'<div class="text">' + prompt + '</div>' +
					'<div class="button"></div>' +
				'</div>' +
				'<div class="drop-items">' + 
					'<div class="content">' +
						'<div class="container">' +
							drop_items +
						'</div>' +
					'</div>' +
				'</div>'
			);
			$(el).hide();

			var itemClick = function (ev) {
				ev.preventDefault();
				$(selectObject).find('.text').html($(this).find('.value').html());
				$(selectObject).find('.drop-items').hide();
				$(el).val($(this).find('.val').html());
				$(el).trigger('change');
			};

			el.updateSelect = function () {
				$(el).parents('.ui-select').find('.drop-items').hide();
				$(el).parents('.ui-select').find('.drop-items').html(createDropItems());
				$(el).parents('.ui-select').find('.border .text').html(prompt);
				$(el).parents('.ui-select').first().find('.item').click(itemClick);
			};

			el.enableSelect = function () {
				$(el).parents('.ui-select').removeClass('disabled');
			};

			el.disableSelect = function () {
				$(el).parents('.ui-select').find('.border .text').html(prompt);
				$(el).parents('.ui-select').addClass('disabled');
			};

			selectObject = $(el).parents('.ui-select').first();
			if ($(el).first()[0].disabled) {
				$(selectObject).addClass('disabled');
			}
			$(selectObject).width($(el).width());

			$(selectObject).find('.border').click(function (ev) {
				ev.preventDefault();
				$('.ui-select .drop-items').hide();
				if ($(this).parents('.ui-select').hasClass('disabled')) return;
				$(selectObject).find('.drop-items').toggle();
				if (scrollPane == null) {
					scrollPane = $(selectObject).find('.content').jScrollPane({
						// verticalDragMinHeight: 30,
						// verticalDragMaxHeight: 30,
						verticalGutter: 0
					});
				}
			});

			$(selectObject).find('.item').click(itemClick);
		});

	$(document).click(function(e) {
		if ($(e.target).parents('.ui-select').length > 0 || $(e.target).hasClass('ui-select')) {
			return;
		}
		$('.ui-select .drop-items').hide();
    });
};