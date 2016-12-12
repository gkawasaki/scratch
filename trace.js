(function(ext) {
	ext._ip = "10.30.82.124";
	ext._dist = 0;
	ext._ball = 0;
	
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
	
	//複数メッセージ送信(time)
	function send_msg3_t(command1,time,command2){
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
	
	//複数メッセージ送信(degree)
	function send_msg3_d(command1,degree,command2){
		
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg1 : command1,
				dmsg : degree,
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

/*
	//テストブロック
	ext.test = function() {
		//alert("open");
		//window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "test"
			},
			dataType: "text"
			
			
			headers: {
			  "Authorization": "Bearer " + token
			},
			context: {
			  callback: callback
			}
			
		  }).done(function(msg_r) {
			alert(msg_r);
			//this.callback();
			sleep(1);
		});
		
	};
	
	//テストブロック
	ext.test2 = function() {
		//alert("open");
		//window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
		alert("aaaa");
		alert(descriptor.menus.way);
		descriptor.menus.way.push('真ん中');
		alert(descriptor.menus.way);
		alert("bbbb");
		//window.location.reload();
	};
	
	
	//progブロック
	ext.prog = function() {
		alert("while true:\n    moveForward(4)\n    if obstacle == true:\n        moveBackward(2)\n        turnLeft(90)\n");
		//window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );		
	};
	
	
	//impacrテストブロック
	ext.test_imp = function() {
		//alert("open");
		//window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "test_imp"
			},
			dataType: "text"
			
			
			headers: {
			  "Authorization": "Bearer " + token
			},
			context: {
			  callback: callback
			}
			
		  }).done(function(msg_r) {
			alert(msg_r);
			//this.callback();
			sleep(1);
		});
		
	};
	
	
	//停止ブロック
	ext.stop = function() {
		send_msg("#M00");
		//sleep(3);
	};
	
	//moveブロック
	ext.move = function(time,token) {
		if (token == "前"){
			send_msg3_t("#M01",time*1.5+0.5,"#M00");
		}
		else{
			send_msg3_t("#M02",time*1.5+0.5,"#M00");
		}
		//sleep(time*1.5);
		//sleep(time);
		//send_msg("#M0");
		//sleep(3);
	};
	
	//turnブロック
	ext.turn = function(time,token) {
		if (token == "右"){
			send_msg3_t("#M04",time,"#M00");
		}
		else{
			send_msg3_t("#M03",time,"#M00");
		}
		//sleep(time);
		//send_msg("#M0");
		//sleep(1);
	};
	
	//turn_degブロック
	ext.turn_deg = function(degree,token) {
		if (token == "右"){
			send_msg3_d("#M04",degree,"#M00");
		}
		else{
			send_msg3_d("#M03",degree,"#M00");
		}
		//sleep(time);
		//send_msg("#M0");
		//sleep(1);
	};
	
	
	//waveブロック
	ext.wave = function(token) {
		if (token == "右"){
			//send_msg("#M06");
			send_msg3_t("#M06",5,"#M00");
		}
		else if (token == "左"){
			//send_msg("#M08");
			send_msg3_t("#M08",5,"#M00");
		}
		else{
			//send_msg("#M05");
			send_msg3_t("#M05",5,"#M00");
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
	ext.ball = function() {
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "ball"
			},
			dataType: "text"
			
			context: {
			  callback: callback
			}
			
			
		  }).done(function(msg_r) {
			alert(msg_r);
			//this.callback(msg_r);
			ext._ball = msg_r;
		});
		
		if ( ext._ball > 0){
				alert(ext._dist);
				return true;
			}
		else{
				return false;
			}
		
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
	
	//show_movie
	ext.show_movie = function() {
		//alert("open");
		//window.open( "http://" + ext._ip + "/cgi-bin/img.cgi" , "_blank" );
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
	
	//jsensorブロック
	ext.jsensor = function(callback) {
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "jsensor"
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
	
	
	//物が近くにある
	ext.near = function(){
		$.ajax({
			type: "GET",
			url: "http://" + ext._ip + "/cgi-bin/test.cgi",
			async: false,
			data: {
				msg : "dsensor"
			},
			dataType: "text"
			
			
			context: {
			  callback: callback
			}
			
		  }).done(function(msg_r) {
			//alert(msg_r);
			ext._dist = msg_r;
		});
	
		if ( ext._dist > 500){
				//alert(ext._dist);
				return true;
			}
		else{
				return false;
			}
	
	};
*/
	
	
	// ブロックと関数のひも付け
	var descriptor = {
		blocks: [
			/*
			[' ', 'test_block', 'test'],
			[' ', '変数テスト', 'test2'],
			[' ', 'prog', 'prog'],
			[' ', '衝撃検出テスト', 'test_imp'],
			[' ', 'IPアドレスの設定 %n . %n . %n . %n', 'ip','0','0','0','0'],
			[' ', '停止する', 'stop'],
			[' ', '%n 歩 %m.way に歩く', 'move', '4', '前'],
			[' ', '%n 秒間 %m.direction に曲がる', 'turn', '5', '左'],
			[' ', '%m.degree 度 %m.direction に曲がる', 'turn_deg', '90', '左'],
			[' ', '%n 度 %m.direction に曲がる', 'turn_deg', '90', '左'],
			[' ', '%m.side 手を振る', 'wave', '左'],
			[' ', '両手を握る', 'grab'],
			[' ', '右手を伸ばす', 'stretch'],
			[' ', '目の色を%m.led 色に変える', 'eye','赤'],
			*/

			//[' ', 'ポーズ %n の %m.servo のサーボを %n 度にする', 'setServoAtPose', 0, '頭', 90],
			//[' ', 'ポーズ %n の %m.led 色LEDの明るさを %n にする', 'setLedAtPose', 0, '赤', 50],
			//[' ', 'ポーズ %n をリセットする', 'resetPose', 0, '赤', 50],
			//[' ', '%n 秒かけてポーズ %n にする', 'sendPose', 1.0, 0],
			//['r', 'ポーズ %n の時の %m.servo のサーボの角度', 'getServoAtPose', 0, '頭'],
			//['r', 'ポーズ %n 時の %m.led 色LEDの明るさ', 'getLedAtPose', 0, '赤'],
			//['R', 'ボールの色', 'ball_c'],
			//['R', 'ボールの数', 'ball'],
			/*
			['r', '撮影画像を表示', 'show_img'],
			['r', 'ロボット視点の映像を表示', 'show_movie'],
			['R', '距離センサの値', 'dsensor'],
			['R', '回転角', 'jsensor'],
			['b', '目の前に障害物がある', 'near'],
			['b', '物が近くにくる', 'near'],
			['b', '目の前にボールがある', 'ball'],
			*/
			/*
			[' ', 'プログラムの先頭', 'top'],
			[' ', 'プログラムの末尾', 'end'],
			['r', 'ある', 'exista'],
			['r', 'ない', 'not_exist'],
			[' ', '停止する', 'stop'],
			[' ', '%m.way_m する', 'move_mouse', '前進'],
			[' ', '%n 秒 %m.way_m する', 'move_mouse_time', '1', '前進'],
			[' ', '%n cm %m.way_m する', 'move_mouse_dist', '1', '前進'],
			[' ', '%n 秒間 %m.direction に曲がる', 'turn', '5', '左'],
			[' ', '%m.degree 度 %m.direction に曲がる', 'turn_deg', '90', '左'],
			[' ', '%m.color 色の物を見つける', 'search_color', '赤'],
			['b', '目の前に障害物がある', 'near'],
			['b', '目の前に障害物がくる', 'near'],
			['b', 'スイッチ %m.sw_num が押されている', 'sw', 0],
			['b', '目の前に %m.color 色の物がある', 'color', '赤'],
			['R', '距離センサ %m.led_num の値', 'dsensor_m', 0],
			*/
			[' ', '%m.road_trace まで直進する', 'move_mouse_branch', '分かれ道'],
			//[' ', '曲がり角まで直進する', 'move_mouse_corner'],
			[' ', '%m.direction に曲がる', 'turn_trace', '左'],
			//[' ', '行き止まりまで直進する', 'move_mouse_end'],
			['b', '%m.dir_trace 道があるなら', 'pos_move', '前に'],
			[' ', 'プログラムを終了する', 'kill'],
			/*
			[' ', 'LED %m.led_num を %m.sel する', 'led', '0', '点灯'],
			[' ', '%m.direction の車輪を %n Hzでまわす', 'move_wheel', '左',400],
			[' ', '右の車輪を %n Hz、左の車輪を %n Hzで %n 秒まわす', 'wheel', 400, 400, 1],
			[' ', '%n マス %m.way_m する', 'move_mouse_sect', '1', '前進'],
			*/

		],
		menus: {
		  way: ['前', '後ろ'],
		  way_m: ['前進', '後退'],
		  sel: ['点灯', '消灯'],
		  direction: ['左', '右'],
		  dir_trace: ['前に', '左に', '右に'],
		  road_trace: ['分かれ道', '曲がり角', '行き止まり'],
		  led_num: ['0', '1', '2', '3'],
		  sw_num: ['0', '1', '2'],
		  degree: ['45', '90', '135', '180'],
		  side: ['左', '右', '両'],
		  servo: ['頭', '腰', '右腕(ロール)', '右腕(ピッチ)', '右手', '左腕(ロール)', '左腕(ピッチ)', '左手', '右足(ヨー)', '右足(ピッチ)', '左足(ヨー)', '左足(ピッチ)'],
		  led: ['赤', '緑', '青'],
		  sensor: ['A6', 'A7'],
		  color: ['赤', '緑', '青', '黄'],
		},
	};

	// 最後にExtensionを登録する
	ScratchExtensions.register('Scratchx2mouse', descriptor, ext);
})({});