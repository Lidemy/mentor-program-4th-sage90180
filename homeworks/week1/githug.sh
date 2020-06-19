#!/bin/bash

for info in name bio location

do
curl -s https://api.github.com/users/$1 | grep -w $info | cut -d : -f 2| sed 's/"//g'| sed 's/,//g'

done

curl -s https://api.github.com/users/$1 | grep blog | sed 's/",//g'| sed 's/ "blog"://g' | sed 's/ "//g'
