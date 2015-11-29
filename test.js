﻿(function(ext) {
	ext._ip = "0.0.0.0";

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
			alert(msg_r);
			//this.callback();
		});
		
	};
	
	
	// shutdown時に呼ばれる
	ext._shutdown = function() {};

	// statusを返してやる。デバイスとつながってない時とかここで色々返せる。
	ext._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};

	// blockが呼び出された時に呼ばれる関数を登録する。
	// 下にあるdescriptorでブロックと関数のひも付けを行っている。
	ext.do_domething = function(str) {
	};
	
	//停止ブロック
	ext.stop = function() {
		send_msg("#M0");
		
	};
	
	//moveブロック
	ext.move = function(token) {
		if (token == "前"){
			send_msg("#M1");
		}
		else{
			send_msg("#M2");
		}
	};
	
	//turnブロック
	ext.turn = function(token) {
		if (token == "右"){
			send_msg("#M3");
		}
		else{
			send_msg("#M4");
		}
	};
	
	//waveブロック
	ext.wave = function(token) {
		if (token == "右"){
			send_msg("#M6");
		}
		else if (token == "左"){
			send_msg("#M8");
		}
		else{
			send_msg("#M5");
		}
	};
	
	//grabブロック
	ext.grab = function() {
		send_msg("#M7");
	};
	
	//stretchブロック
	ext.stretch = function() {
		send_msg("#M9");
	};
	
	//eyeブロック
	ext.stretch = function(token) {
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
			this.callback();
		});
	};
	
	//ip設定
	ext.ip = function(num1,num2,num3,num4) {
		ext._ip = num1 + "." + num2 + "." + num3 + "." + num4;
		alert(ext._ip);
	};
	
	
	// ブロックと関数のひも付け
	var descriptor = {
		blocks: [
			[' ', 'do_something %s', 'do_something', 'sample text'],
			[' ', 'IPアドレスの設定 %n . %n . %n . %n', 'ip','0','0','0','0'],
			[' ', '停止する', 'stop'],
			[' ', '%m.way に歩く', 'move', '前'],
			[' ', '%m.direction に曲がる', 'turn', '左'],
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
			['R', '%m.color 色のボールがある', 'ball_c', '赤'],
			['R', 'ボールがある', 'ball'],
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