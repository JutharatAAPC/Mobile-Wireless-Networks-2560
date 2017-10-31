var express = require('express'); 
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var db = require('./db');
var app = express(); 


const bodyParser = require('body-parser'); 
// parse application/json 
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
    extended: true 
}));


/* Routing (scraping lottery)*/
app.post('/', (req,res) => {
    res.send('Web Scrapping Succes!!!');
    //res.writeHead(200,{'content-Type':'test/plain'});
        request('http://lottery.kapook.com/',function(err,res,body){

            if(!err && res.statusCode==200){
                var $ = cheerio.load(body);
                var prize,money,lottery;
                var obj = [];
                
                //Day_Month_Year
                $('hgroup span').each(function(){
                    var day_month_year = $(this).text();  //16 ตุลาคม 2560
                    obj.push({day_month_year:day_month_year});
                });

                // first-prize : รางวัลที่ 1
                $('.bigprize article .first-prize header ').filter(function(){
                    a = $(this).text().split(" ");   //ตรวจสลากกินแบ่งรัฐบาล รางวัลที่ 1 413494 รางวัลละ 6,000,000
                    prize = a[1]+" "+a[2];  //รางวัลที่ 1 รางวัลละ 6,000,000
                    lottery = $(this).next().text(); //413494
                    a = $(this).next().next().text().split(" "); //รางวัลละ 6,000,000 
                    money = a[1]; //6,000,000
                    obj.push({prize:prize, lottery:lottery, money:money}); 
                });

                //prize front-back3
                $('.front-back3').each(function(){
                    //front3
                    for(var i=1;i<3;i++){
                        prize = $(this).find('h3').first().text(); //เลขหน้า 3 ตัว
                        if(i==1)
                            lottery = $(this).find('.front3').children().first().text(); //180
                        else
                            lottery = $(this).find('.front3').children().last().text();  //971  

                        a = $(this).find('footer').first().text().split(" "); //2 รางวัล รางวัลละ 4,000 บาท
                        money = a[3];  //4,000
                        obj.push({prize:prize, lottery:lottery, money:money});
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
                        obj.push({prize:prize, lottery:lottery, money:money});

                    }
                });

                //back2
                $('.back2 header').each(function(){
                    a = $(this).text().split(" "); // ตรวจสลากกินแบ่งรัฐบาล เลขท้าย 2 ตัว 86 รางวัลละ 2,000 บาท
                    prize = a[1]+" "+a[2]+" "+a[3]; //เลขท้าย 2 ตัว
                    lottery = $(this).parent().find('p').text(); //86
                    a = $(this).parent().find('footer').text().split(" "); //รางวัลละ 2,000 บาท
                    money = a[1]; //2,000
                    obj.push({prize:prize, lottery:lottery, money:money});
                });

                //near : รางวัลข้างเคียงรางวัลที่ 1
                $('.nearby').each(function(){
                    for(var i=1;i<3;i++){
                        prize = $(this).find('h3').text(); //รางวัลข้างเคียงรางวัลที่ 1
                        if(i==1)
                            lottery = $(this).find('p').first().text(); //413493
                        else
                            lottery = $(this).find('p').last().text(); //413495

                        a = $(this).parent().find('footer').text().split(" "); //2 รางวัลๆละ 100,000 บาท
                        money = a[2]; //100,000
                        obj.push({prize:prize, lottery:lottery, money:money});
                    }
                });

                //second-prize :  รางวัลที่ 2
                $('.second-prize').each(function(){
                    a = $(this).find('p').text(); //113700192717523302626487846800
                    for(var i=1;i<6;i++){
                        prize = $(this).find('h3').text(); //รางวัลที่ 2
                        lottery = a.substring(0+(i-1)*6,i*6); //113700 192717 523302 626487 846800
                        var b = $(this).find('header').text().split(" "); //ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล รางวัลที่ 2 มี 5 รางวัลๆละ 200,000 บาท
                        money = b[7]; //200,000
                        obj.push({prize:prize, lottery:lottery, money:money});
                    }
                });

                //third-prize
                $('.third-prize').each(function(){
                    a = $(this).find('p').text();
                    for(var i=1;i<11;i++){
                        prize = $(this).find('h3').text();
                        lottery = a.substring(0+(i-1)*6,i*6);
                        var b = $(this).find('header').text().split(" ");//ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล รางวัลที่ 3 มี 10 รางวัลๆละ 80,000 บาท
                        money = b[7]; // 80,000
                        obj.push({prize:prize, lottery:lottery, money:money});
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
                        obj.push({prize:prize, lottery:lottery, money:money});
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
                        obj.push({prize:prize, lottery:lottery, money:money});
                    }
                });
            }
            fs.writeFile('db.json',JSON.stringify(obj)); // เขียนลงไฟล์ db.json โดย แปลง JSON Object เป็น JSON String 
        });

    });

    //input ค่า บน URL  เช่น localhost:8080/search เเล้วใส่ค่า id 
    app.post('/search', function(req,res){
        var c=0,money,prize="";
        var a =[],j=[];
        a = req.body.id;
        if(!Array.isArray(a)){
            for (var i=0; i<db.length; i++){
                if(db[i].prize == "เลขท้าย 2 ตัว" && a.substring(4,6)== db[i].lottery){
                    prize = db[i].prize;
                    money = " เงินรางวัล "+db[i].money+" บาท";
                }else if(db[i].prize == "เลขหน้า 3 ตัว" && a.substring(0,3)== db[i].lottery){
                    prize = db[i].prize;
                    money = " เงินรางวัล "+db[i].money+" บาท";
                }else if(db[i].prize == "เลขท้าย 3 ตัว" && a.substring(3,6)== db[i].lottery){
                    prize = db[i].prize;
                    money = " เงินรางวัล "+db[i].money+" บาท";
                }else if(db[i].lottery == a){
                    prize = db[i].prize;
                    money = " เงินรางวัล "+db[i].money+" บาท";
                    c=0;
                    break;
                }else c++;
            }
            if(c == 174){
                money = " เงินรางวัล 0 บาท";
                prize="ไม่ถูกรางวัล";
                c=0;
            }
        j.push({id:a,prize:prize,money:money});
        }else{
            a.forEach(function(element){
                for (var i=0; i<db.length; i++){
                    if(db[i].prize == "เลขท้าย 2 ตัว" && element.substring(4,6)== db[i].lottery){
                        prize = db[i].prize;
                        money = " เงินรางวัล "+db[i].money+" บาท";
                    }else if(db[i].prize == "เลขหน้า 3 ตัว" && element.substring(0,3)== db[i].lottery){
                        prize = db[i].prize;
                        money = " เงินรางวัล "+db[i].money+" บาท";
                    }else if(db[i].prize == "เลขท้าย 3 ตัว" && element.substring(3,6)== db[i].lottery){
                        prize = db[i].prize;
                        money = " เงินรางวัล "+db[i].money+" บาท";
                    }else if(db[i].lottery == element){
                        prize = db[i].prize;
                        money = " เงินรางวัล "+db[i].money+" บาท";
                        c=0;
                        break;
                    }else c++;
                }
                if(c == 174){
                    money = " เงินรางวัล 0 บาท";
                    prize="ไม่ถูกรางวัล";
                    c=0;
                }
                j.push({id:element,prize:prize,money:money});
            });
        }
        res.json(j);
    });
app.listen(8000);

