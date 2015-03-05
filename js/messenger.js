var sender="s";
var receiver="k";
var t;
$(document).ready(function(){

	$('.container').hide();
	$('.compose.send').on('click',function(){

		var text=$('.compose.content').text();
		var receiver=$('.compose.receiver').text();
		$.ajax({
			type:'POST',
			url:'send_messages.php',
			cache:false,
			datatype:'json',
			data:{sender:sender,receiver:receiver,text:text,time:Date.now()},
			complete:function(){
				$('.compose.send').text('');
			},
			success:function(){
				console.log('d');
			}
		});
	});

	$('.tab.compose').on('click',function(){
		$('.container').hide();
		$('.container.compose').show();
	});

	$('.tab.inbox').on('click',function(){

		getMails();
		$('.container').hide();
		$('.container.inbox').show();

	});

	$('.tab.sent').on('click',function(){
		getSentMails();
		$('.container').hide();
		$('.container.sent').show();

	});

	$('.inbox.container').on('click','.inbox.msg.heading',function(){
		$('.text').hide();
		$(this).parent().children('div').show();
	});

	$('.sent.container').on('click','.sent.msg.heading',function(){
		
		$('.text').hide();
		$(this).parent().children('div').show();
	});


	$('.refresh.inbox').click(function(){
		getMails();

	});

	$('.refresh.sent').click(function(){
		getSentMails();
	});

	$('.delete.inbox').click(function(){
		
		var checked=$('input[class="inbox"]:checked');
		var ids=[];

		for(var i=0;i<checked.length;i++){

			var p=$(checked[i]).parent();

			p.hide();
			
			ids.push(p.attr('id'));
		}
		console.log(ids);
		deleteMails(ids,receiver,'receiver');
	});

	$('.delete.sent').click(function(){
		
		var checked=$('input[class="sent"]:checked');
		var ids=[];

		for(var i=0;i<checked.length;i++){

			var p=$(checked[i]).parent();

			p.hide();
			
			ids.push(p.attr('id'));
		}
		console.log(ids);
		deleteMails(ids,sender,'sender');
	});


});

function deleteMails(ids,user,type){
	$.ajax({
		type:"POST",
		datatype:'json',
		url:'delete_messages.php',
		cache:false,
		data:{id:ids,user:user,type:type},
		success:function(data){r=data;}
	});
}

function getSentMails(){
	$.ajax({
			type:'GET',
			url:'get_sent_messages.php',
			cache:false,
			data:{id:sender},
			success:function(data){
				renderSentMails(data,'.sent.content');
			}
		});
}

function getMails(){
	
	$.ajax({
			type:'GET',
			url:'get_inbox_messages.php',
			cache:false,
			datatype:'json',
			data:{id:sender},
			success:function(data){
				renderMails(data,'.inbox.content');
			}
		});
}

function renderMails(data,container){
	if(data.result==undefined){
		return;
	}
	$(container).html('');
	var mails=data.result;
	for(i=0;i<mails.length;i++){
		$(container).append('<div class="inbox msg" id="'+mails[i].id+'"><p class="heading inbox msg">From: '+mails[i].sender+' Subject: '+mails[i].subject+' Time: '+mails[i].time+'</p><input class="inbox" type="checkbox"><div style="display:none" class="text">'+mails[i].body+'</div></div>');
	}
}

function renderSentMails(data,container){
	if(data.result==undefined){
		return;
	}
	$(container).html('');
	var mails=data.result;
	for(i=0;i<mails.length;i++){
		$(container).append('<div class="sent msg" id="'+mails[i].id+'"><p class="heading sent msg">To: '+mails[i].receiver+' Subject: '+mails[i].subject+' Time: '+mails[i].time+'</p><input class="sent" type="checkbox"><div style="display:none" class="text">'+mails[i].body+'</div></div>');
	}
}