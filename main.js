'use strict';

// モグラ画像の説明
// モグ1.png : モグラAがヒット
// モグ2.png : モグラAの通常モード
const moguraAdefault = "images/moguraAdefault.png";
const moguraAhit = "images/moguraAhit.png";

// ゲームの得点
let gamePoint = 0;
document.getElementById('gamePoint').textContent = '得点 : ' + gamePoint;

// ゲームの制限時間（秒）
let remainingTime = 30;
// ゲーム実行のタイマー
let timerMogura;
let timerTimeLimit;

var moguras = document.querySelectorAll(".mogura");

// ************************************************************************

// モグラを叩くイベントを実装
(function(){
  // モグラが「ぐえー」顔をする時間
  const ouchTime = 1000;

  // 関数 hitMogura を moguraクラスをもつオブジェクトに付与
  moguras.forEach(function(element){
    element.addEventListener('click', hitMogura);
  });
  
  // クリック時に「ぐえー」顔になる ＋ 一定時間後にモグラが引っ込む ＋ 得点加算
  function hitMogura(){
    this.src = moguraAhit;
    document.getElementById('gamePoint').textContent = '得点 : ' + ++gamePoint;
    setTimeout(() => {
      this.src = "";
    }, ouchTime);
  }
})();

// ************************************************************************

// モグラ出現イベントを実装 - timerMogura
(function(){

  // 新たなモグラが出現する間隔時間
  const appearFrequency =700;

  // モグラが顔を出す - 周期：appearFrequency
  timerMogura = setInterval(deruMogura, appearFrequency);

  // モグラが頭をだしつづける時間
  const durationTime = 1000;

  // 一定時間ごとにモグラが出現する処理
  function deruMogura(){
    let random = Math.floor(Math.random() * 9);
    if(moguras[random].src.indexOf("index.html") != -1){
      moguras[random].src = moguraAdefault;
      // setTimeout(関数オブジェクト, 待機時間(ミリ秒), 関数オブジェクトに渡す引数);
      setTimeout((mogura) => {
        if(mogura.src.indexOf(moguraAdefault) != -1){
          mogura.src = "";
        // }else{
        //   console.log(mogura.src);
        }
      }, durationTime, moguras[random]);
    }
  }

})();

// ************************************************************************

// ゲーム制限時間を１秒ずつ減らす - timerTimeLimit
(function(){

  // ゲーム時間を１秒ずつ消費
  timerTimeLimit = setInterval(() => {
    if(remainingTime > 0){
      document.getElementById('remainingTime').textContent = '残り時間 : ' + --remainingTime;
    } 
  }, 1000)

})();


// 30秒たったらゲーム終了 - 残り時間表示が「１」で終わらないように、念のため１秒多く待つ
setTimeout(() => {
  alert('TIME OUT!!');
  const gameScore = gamePoint;
  clearInterval(timerMogura);
  clearInterval(timerTimeLimit);
  console.log('あなたの得点 : ' + gameScore + '点');
}, 1000 * (remainingTime + 1));

// *************************************************************************

