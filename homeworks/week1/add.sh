#!/bin/bash
read -p "你要幾個檔案? " n
echo "你要 $n 個檔"
i=1
while [ $i -le $n ] # 要用空白隔開
do
        touch "$i.js"
        echo "$i.js"
        ((i++))
done

echo "都建好了喔！"
