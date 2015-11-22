(function(ext) {
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
		  }).done(function(msg) {
			alert(msg);
			//this.callback();
		});
		
	}	
	
	
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
		/*
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "#M0"
			},
			dataType: "text"
			
			
			headers: {
			  "Authorization": "Bearer " + token
			},
			context: {
			  callback: callback
			}
			
		  }).done(function(msg) {
			alert(msg);
			//this.callback();
		});
		*/
	
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
	}
	
	//stretchブロック
	ext.stretch = function() {
		send_msg("#M9");
	}
	
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
			[' ', 'ポーズ %n の %m.servo のサーボを %n 度にする', 'setServoAtPose', 0, '頭', 90],
			[' ', 'ポーズ %n の %m.led 色LEDの明るさを %n にする', 'setLedAtPose', 0, '赤', 50],
			[' ', 'ポーズ %n をリセットする', 'resetPose', 0, '赤', 50],
			[' ', '%n 秒かけてポーズ %n にする', 'sendPose', 1.0, 0],
			['r', 'ポーズ %n の時の %m.servo のサーボの角度', 'getServoAtPose', 0, '頭'],
			['r', 'ポーズ %n 時の %m.led 色LEDの明るさ', 'getLedAtPose', 0, '赤'],
			['R', '%m.color 色のボールがある', 'ball_c', '赤'],
			[' ', 'ボールを見つける', 'ball'],
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