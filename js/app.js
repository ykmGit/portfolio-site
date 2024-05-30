fetch("header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#header").innerHTML = data);

// //===============================================================
// // スムーススクロール（※バージョン2024-1）※通常タイプ
// //===============================================================
// $(function () {
//   // ページ上部へ戻るボタンのセレクター
//   var topButton = $('.pagetop');
//   // ページトップボタン表示用のクラス名
//   var scrollShow = 'pagetop-show';

//   // スムーススクロールを実行する関数
//   // targetにはスクロール先の要素のセレクターまたは'#'（ページトップ）を指定
//   function smoothScroll(target) {
//     // スクロール先の位置を計算（ページトップの場合は0、それ以外は要素の位置）
//     var scrollTo = target === '#' ? 0 : $(target).offset().top - 25;
//     // アニメーションでスムーススクロールを実行
//     $('html, body').animate({ scrollTop: scrollTo }, 500);
//   }

//   // ページ内リンクとページトップへ戻るボタンにクリックイベントを設定
//   $('a[href^="#"], .pagetop').click(function (e) {
//     e.preventDefault(); // デフォルトのアンカー動作をキャンセル
//     var id = $(this).attr('href') || '#'; // クリックされた要素のhref属性を取得、なければ'#'
//     smoothScroll(id); // スムーススクロールを実行
//   });

//   // スクロールに応じてページトップボタンの表示/非表示を切り替え
//   $(topButton).hide(); // 初期状態ではボタンを隠す
//   $(window).scroll(function () {
//     if ($(this).scrollTop() >= 300) { // スクロール位置が300pxを超えたら
//       $(topButton).fadeIn().addClass(scrollShow); // ボタンを表示
//     } else {
//       $(topButton).fadeOut().removeClass(scrollShow); // それ以外では非表示
//     }
//   });

//   // ページロード時にURLのハッシュが存在する場合の処理
//   if (window.location.hash) {
//     // ページの最上部に即時スクロールする
//     $('html, body').scrollTop(0);
//     // 少し遅延させてからスムーススクロールを実行
//     setTimeout(function () {
//       smoothScroll(window.location.hash);
//     }, 10);
//   }
// });


// //===============================================================
// // 汎用開閉処理
// //===============================================================
// $(function () {
//   $('.openclose').next().hide();
//   $('.openclose').click(function () {
//     $(this).next().slideToggle();
//     $('.openclose').not(this).next().slideUp();
//   });
// });


// //===============================================================
// // 背景切り替え
// //===============================================================
// $(document).ready(function () {
//   function checkVisibility() {
//     const viewportHeight = $(window).height(); // ビューポートの高さ
//     const scrollTop = $(window).scrollTop(); // 現在のスクロール位置

//     $(".section").each(function () {
//       const sectionTop = $(this).offset().top; // セクションの上端位置
//       const sectionHeight = $(this).outerHeight(); // セクションの高さ

//       // セクションの位置をチェックして画像を切り替える
//       if (sectionTop < scrollTop + viewportHeight * 0.6 && sectionTop + sectionHeight > scrollTop + viewportHeight * 0.4) {
//         $(this).addClass("active").removeClass("inactive"); // フェードイン
//       } else {
//         $(this).addClass("inactive").removeClass("active"); // フェードアウト
//       }
//     });
//   }

//   // スクロールイベントでチェック
//   $(window).on("scroll", checkVisibility);

//   // 初期チェック
//   checkVisibility();
// });
