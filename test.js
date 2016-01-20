﻿(function(ext) {
	ext._ip = "0.0.0.0";
	ext._dist = 0;
	
	//ajaxによる通信
	function send_msg(command){
	
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : command
			},
			dataType: "text"
			
			/*
			headers: {
			  "Authorization": "Bearer " + token
			},
			context: {
			  callback: callback
			}
			*/
		  }).done(function(msg_r) {
			//alert(msg_r);
			//this.callback();
			sleep(1);
		});
		
	};
	
	//複数メッセージ送信
	function send_msg3(command1,time,command2){
		//alert(time);
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg1 : command1,
				tmsg : time,
				msg2 : command2
			},
			dataType: "text"
			
			/*
			headers: {
			  "Authorization": "Bearer " + token
			},
			context: {
			  callback: callback
			}
			*/
		  }).done(function(msg_r) {
			//alert(msg_r);
			//this.callback();
			sleep(1);
		});
		
	};
	
	
	
	//スリープ関数
	function sleep(time) {
		var d1 = new Date().getTime();
		var d2 = new Date().getTime();
		while (d2 < d1 + 1000 * time) {
			d2 = new Date().getTime();
		}
		return;
	};
	
	
	// shutdown時に呼ばれる
	ext._shutdown = function() {};

	// statusを返してやる。デバイスとつながってない時とかここで色々返せる。
	ext._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};

	//テストブロック
	ext.test = function(time) {
		alert("open");
		window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
	};
	
	//停止ブロック
	ext.stop = function() {
		send_msg("#M00");
		//sleep(3);
	};
	
	//moveブロック
	ext.move = function(time,token) {
		if (token == "前"){
			send_msg3("#M01",time*1.5+1,"#M00");
		}
		else{
			send_msg3("#M02",time*1.5+1,"#M00");
		}
		//sleep(time*1.5);
		//sleep(time);
		//send_msg("#M0");
		//sleep(3);
	};
	
	//turnブロック
	ext.turn = function(time,token) {
		if (token == "右"){
			send_msg3("#M04",time,"#M00");
		}
		else{
			send_msg3("#M03",time,"#M00");
		}
		//sleep(time);
		//send_msg("#M0");
		//sleep(1);
	};
	
	//waveブロック
	ext.wave = function(token) {
		if (token == "右"){
			send_msg("#M06");
		}
		else if (token == "左"){
			send_msg("#M08");
		}
		else{
			send_msg("#M05");
		}
	};
	
	//grabブロック
	ext.grab = function() {
		send_msg("#M07");
	};
	
	//stretchブロック
	ext.stretch = function() {
		send_msg("#M09");
	};
	
	//eyeブロック
	ext.eye = function(token) {
		if (token == "赤"){
			send_msg("#PR255G000B000T005");
		}
		else if (token == "緑"){
			send_msg("#PR000G255B000T005");
		}
		else{
			send_msg("#PR000G000B255T005");
		}
	};
	
	//ballブロック
	ext.ball = function(callback) {
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "ball"
			},
			dataType: "text",
			context: {
			  callback: callback
			}
			
		  }).done(function(msg_r) {
			alert(msg_r);
			this.callback(msg_r);
		});
	};
	
	//ip設定
	ext.ip = function(num1,num2,num3,num4) {
		ext._ip = num1 + "." + num2 + "." + num3 + "." + num4;
		alert(ext._ip);
	};
	
	
	//show_img
	ext.show_img = function() {
		//alert("open");
		window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
	};
	
	//dsensorブロック
	ext.dsensor = function(callback) {
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "dsensor"
			},
			dataType: "text",
			context: {
			  callback: callback
			}
			
		  }).done(function(msg_r) {
			//alert(msg_r);
			ext._dist = msg_r;
			this.callback(msg_r);
		});
	};
	
	//物が近くにある時
	ext.when_near = function(){
		if(ext._dist > 600){
			return true;
		}
	
		return false;
	
	};
	
	
	
	// ブロックと関数のひも付け
	var descriptor = {
		blocks: [
			[' ', 'test_block', 'test'],
			[' ', 'IPアドレスの設定 %n . %n . %n . %n', 'ip','0','0','0','0'],
			[' ', '停止する', 'stop'],
			[' ', '%n 歩 %m.way に歩く', 'move', '4', '前'],
			[' ', '%n 秒間 %m.direction に曲がる', 'turn', '5', '左'],
			[' ', '%m.side 手を振る', 'wave', '左'],
			[' ', '両手を握る', 'grab'],
			[' ', '右手を伸ばす', 'stretch'],
			[' ', '目の色を%m.led 色に変える', 'eye','赤'],
			[' ', 'ポーズ %n の %m.servo のサーボを %n 度にする', 'setServoAtPose', 0, '頭', 90],
			[' ', 'ポーズ %n の %m.led 色LEDの明るさを %n にする', 'setLedAtPose', 0, '赤', 50],
			[' ', 'ポーズ %n をリセットする', 'resetPose', 0, '赤', 50],
			[' ', '%n 秒かけてポーズ %n にする', 'sendPose', 1.0, 0],
			['r', 'ポーズ %n の時の %m.servo のサーボの角度', 'getServoAtPose', 0, '頭'],
			['r', 'ポーズ %n 時の %m.led 色LEDの明るさ', 'getLedAtPose', 0, '赤'],
			['R', 'ボールの色', 'ball_c'],
			['R', 'ボールの数', 'ball'],
			['r', '撮影画像を表示', 'show_img'],
			['R', '距離センサの値', 'dsensor'],
			['h', '物が近くにある時', 'when_near'],
			//['r', 'ある', 'exista'],
			//['r', 'ない', 'not_exist'],
		],
		menus: {
		  way: ['前', '後ろ'],
		  direction: ['左', '右'],
		  side: ['左', '右', '両'],
		  servo: ['頭', '腰', '右腕(ロール)', '右腕(ピッチ)', '右手', '左腕(ロール)', '左腕(ピッチ)', '左手', '右足(ヨー)', '右足(ピッチ)', '左足(ヨー)', '左足(ピッチ)'],
		  led: ['赤', '緑', '青'],
		  sensor: ['A6', 'A7'],
		  color: ['赤', '緑', '青'],
		},
	};

	// 最後にExtensionを登録する
	ScratchExtensions.register('Simple extension', descriptor, ext);
})({});