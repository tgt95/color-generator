<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Proxima Nova</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App css -->
    <link href="proxima-nova.css" rel="stylesheet" type="text/css" />
</head>
<style>
    body{
        /*font-family: 'Proxima Nova';*/
    }
</style>

<body>
    <div style="width: 1140px; margin-left: auto; margin-right: auto;">
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
            <div>
            <?php for ($i=1; $i <= 9; $i++) {  
                echo '<div style="font-weight: '. $i .'00; font-size: 48px; font-family: Proxima Nova;"> Font Weight '. $i .'00</div>';
            } ?>
            </div>
            <div>
            <?php for ($i=1; $i <= 9; $i++) { 
                echo '<div style="font-weight: '. $i .'00; font-size: 48px; font-family: Arial;"> Font Weight '. $i .'00</div>';
            } ?>
            </div>
        </div>
        <div style="font-size: 48px; font-family: Proxima Nova; word-break: break-all; letter-spacing: 6px;">
            ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽ <br> abcčćdđefghijklmnopqrsštuvwxyzž <br> АБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*
        </div>
    </div>
</body>
</html>
