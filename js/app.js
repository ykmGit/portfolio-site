fetch("header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#header").innerHTML = data);


document.addEventListener("DOMContentLoaded", () => {
  async function instaAPI() {
    // 子要素<ul>を追加
    document.querySelector('#insta').insertAdjacentHTML('beforeend', '<ul></ul>');

    let cards = 12; // insta投稿の表示件数を指定
    const response = await fetch(`https://graph.facebook.com/v9.0/【ビジネスアカウントID】?fields=name,media.limit(${cards}){ caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=【アクセストークン】`);

    if (response.status === 200) {
      const resObjects = await response.json();
      // console.log(resObjects.media);
      //（挙動への影響は一切無いものの）オブジェクト{resObjects.media}内のプロパティ{paging}のせいで「instaItems[1]が無いというエラー」が出るので削除して以降の処理を進めていく 
      delete (resObjects.media.paging);

      Object.entries(resObjects.media).forEach(instaItems => {
        // console.log(instaItems);
        instaItems[1].forEach(eachItem => {
          if (eachItem.media_url !== null) {
            // 投稿が動画か否かを判定して{media}を変更
            if (eachItem.media_type === 'VIDEO') {
              eachItem.media = eachItem.thumbnail_url;
            } else {
              eachItem.media = eachItem.media_url;
            }

            const eachItemCaption = eachItem.caption;
            if (eachItemCaption) {
              const captions = eachItem.caption.slice(0, 80);
              const captionTxt = `${captions}……`;

              // 追加した子要素<ul>に各アイテム<li>を生成
              document.querySelector('#insta ul').insertAdjacentHTML('beforeend', `<li><a href="${eachItem.permalink}" target="_blank" rel="noopener"><img src="${eachItem.media}"><span class="captionTxt">${captionTxt}</span><span class="like_count">${eachItem.like_count}</span></a></li>`);
            } else {
              // 追加した子要素<ul>に各アイテム<li>を生成（<span class="captionTxt">${captionTxt}</span>が無い形）
              document.querySelector('#insta ul').insertAdjacentHTML('beforeend', `<li><a href="${eachItem.permalink}" target="_blank" rel="noopener"><img src="${eachItem.media}"><span class="like_count">${eachItem.like_count}</span></a></li>`);
            }
          }
        });
      });
    } else {
      document.querySelector('#insta ul').insertAdjacentHTML('beforeend', `<p style="text-align:center;width:100%;">読み込めませんでした</p>`);
    }
  }
  instaAPI(); // 関数の実行
});


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
