var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var db = require('./file/test.json');
var app = express();
var obj = [],a = [];


//scraping lottery 
app.post('/', (req,res) => {
    request('http://lottery.kapook.com/',function(err,resp,body){

        if(!err && resp.statusCode==200){
            var $ = cheerio.load(body);
            var prize,money,lottery;
            
            //Day_Month_Year
            $('hgroup span').each(function(){
                var day_month_year = $(this).text();
                a.push({day_month_year:day_month_year});
            });

            var day = a[0].day_month_year;
            if(db[0].day_month_year != day){
                // first-prize
                $('article .bigprize .first-prize header ').filter(function(){
                    a = $(this).text().split(" ");
                    prize = a[1]+" "+a[2];
                    lottery = $(this).next().text();
                    a = $(this).next().next().text().split(" ");
                    money = a[1];
                    obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                });
                //prize front-back3
                $('.front-back3').each(function(){
                    //front3
                    for(var i=1;i<3;i++){
                        prize = $(this).find('h3').first().text();
                        if(i==1)
                            lottery = $(this).find('.front3').children().first().text();
                        else
                            lottery = $(this).find('.front3').children().last().text(); 
                        a = $(this).find('footer').first().text().split(" ");
                        money = a[3];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                    //back3
                    for(var i=1;i<3;i++){
                        prize = $(this).find('h3').last().text();
                        if(i==1)
                            lottery = $(this).find('.back3').children().first().text();
                        else
                            lottery = $(this).find('.back3').children().last().text();
                        a = $(this).find('footer').first().text().split(" ");
                        money = a[3];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});                    
                    }
                });
                 //back2
                 $('.back2 header').each(function(){
                    a = $(this).text().split(" ");
                    prize = a[1]+" "+a[2]+" "+a[3];
                    lottery = $(this).parent().find('p').text();
                    a = $(this).parent().find('footer').text().split(" ");
                    money = a[1];
                    obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}}); 
                });

                //near
                $('.nearby').each(function(){
                    for(var i=1;i<3;i++){
                        prize = $(this).find('h3').text();
                        if(i==1)
                            lottery = $(this).find('p').first().text();
                        else
                            lottery = $(this).find('p').last().text();
                        a = $(this).parent().find('footer').text().split(" ");
                        money = a[2];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                });

                //second-prize
                $('.second-prize').each(function(){
                    a = $(this).find('p').text();
                    for(var i=1;i<6;i++){
                        prize = $(this).find('h3').text();
                        lottery = a.substring(0+(i-1)*6,i*6);
                        var b = $(this).find('header').text().split(" ");
                        money = b[7];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                });

                //third-prize
                $('.third-prize').each(function(){
                    a = $(this).find('p').text();
                    for(var i=1;i<11;i++){
                        prize = $(this).find('h3').text();
                        lottery = a.substring(0+(i-1)*6,i*6);
                        var b = $(this).find('header').text().split(" ");
                        money = b[7];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                });

                //four-prize
                $('.four-prize').each(function(){
                    a = $(this).find('p').text();
                    for(var i=1;i<51;i++){
                        prize = $(this).find('h3').text();
                        lottery = a.substring(0+(i-1)*6,i*6);
                        var b = $(this).find('header').text().split(" ");
                        money = b[7];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                });

                //five-prize
                $('.five-prize').each(function(){
                    a = $(this).find('p').text();
                    for(var i=1;i<101;i++){
                        prize = $(this).find('h3').text();
                        lottery = a.substring(0+(i-1)*6,i*6);
                        var b = $(this).find('header').text().split(" ");
                        money = b[7];
                        obj.push({day:day,lottery_number:lottery,prize:{prize_name:prize, money:money}});
                    }
                });
                var json = JSON.parse(obj);
                db.data.insert(json, function(err, doc) {
                    console.log("Heeloo");
                if(err) throw err;
                });
            }
        }   
    });
});
app.listen(8000);