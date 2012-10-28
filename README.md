jQuery ZipSearch
======================
住所から郵便番号を検索するjQueryプラグイン

デモ
------
<a href="http://dev.creatorish.com/demo/zipsearch/" target="_blank">http://dev.creatorish.com/demo/zipsearch/</a>

動作環境
------

PHP5.0以上

使い方
------
住所を入力するinputと検索を開始するためのボタンを用意します。

    <input id="address" type="text" name="address" value="" />
    <input id="search-btn" type="button" value="検索" />

続いて/bodyタグの前に以下のように記述します。

    $("#address").zipsearch({
        trigger: "#search-btn",
        success: function(result) {
            var data = result;
            var htm = "";
            for (var i = 0; i < data.length; i++) {
               htm += "<li>" + data[i].zip + "：" + data[i].address + "</li>";
            }
            $("#result").html(htm);
        },
        error: function(message) {
            alert(message);
        }
    });

### オプション ###

+    php: "zipsearch.php" : zipsearch.phpのパスです。場所を変更した場合は、変更先のパスを指定します。
+    error: function(){} : エラー時に行う処理です。
+    success: function(result){} : 検索に成功した時に行う処理です。第一引数には検索結果が配列が格納されます。
+    trigger: null : jQueryのセレクタを使って要素を指定してください。triggerに指定した要素がクリックされたときに検索を開始します。
+    loader: "ajax-loader.gif" : 郵便番号検索中に表示する読み込みイメージのパスです。

successで格納されるresultには以下のような配列&オブジェクトになっています。

    [
        {
            zip: 郵便番号,
            address: 住所
        },
        {
            zip: 郵便番号,
            address: 住所
        },
        ....
    ]

住所情報について
------

JP提供のKEN_ALL.csvを使っています。  
<a href"http://www.post.japanpost.jp/zipcode/download.html" target="_blank">http://www.post.japanpost.jp/zipcode/download.html</a>

ライセンス
--------
[MIT]: http://www.opensource.org/licenses/mit-license.php
Copyright &copy; 2012 creatorish.com
Distributed under the [MIT License][mit].

作者
--------
creatorish yuu  
Weblog: <http://creatorish.com>  
Facebook: <http://facebook.com/creatorish>  
Twitter: <http://twitter.jp/creatorish>