$(function() {
	$(document).foundation();
	// load all the heros of the user initially
	renderHeros();

	// bind event listeners
	$(document).on('click', '.up-level', function() {
		var heroId = $(this).closest('li').attr('id').split('_'),
			heroType = heroId[0],
			heroId = heroId[1];


		$.post('hero/' + heroId + '/uplevel', function(data) {
			if (data.status) {
				$('#' + heroType + '_' + heroId).replaceWith(getHerosHtml(heroType + 'HerosTpl', {
					heros: [data.data]
				}));
			} else {
				alert(data.msg);
			}
		});
	});

	$(document).on('click', '.add-to-team', function() {
		var heroId = $(this).closest('li').attr('id').split('_')[1];

		$.post('team/hero/' + heroId, function(data) {
			console.log(data);
		});
	});

	$(document).on('click', '.delete-from-team', function() {
		var heroId = $(this).closest('li').attr('id').split('_'),
			heroType = heroId[0],
			heroId = heroId[1];

		$.ajax({
			type: 'delete',
			url: 'team/hero/' + heroId,
			dataType: 'json',
			success: function(data) {
				if (data.status) {
					$('#' + heroType + '_' + heroId).remove();
				}
			}
		});
	});

	$('#tabHero').click(function() {
		renderHeros();
	});

	$('#tabTeam').click(function() {
		renderTeam();
	});

	$('#tabUser').click(function() {
		renderUsers();
	});

	$('#beginFight').click(function() {
		$.post('team/fight', function (data) {
			if (data.status) {
				alert("战斗成功， 新获得英雄" + data.data.length + '个');
			} else {
				alert("战斗失败，" + data.msg );
			}
		});
	});



});

function renderHeros() {
	$.get('user/heros', function(data) {
		$('#heroList').html(getHerosHtml('userHerosTpl', {
			heros: data.data || []
		}));
	});
}

function renderUsers() {
	$.get('users', function(data) {
		$('#userList').html(getHerosHtml('usersTpl', {
			users: data.data || []
		}));
	});
}

function getHerosHtml(id, data) {
	return _.template($('#' + id).html(), data);
}

function renderTeam() {
	$.get('team/heros', function(data) {
		$('#team').html(getHerosHtml('teamHerosTpl', {
			heros: data.data || []
		}));
	});
}
