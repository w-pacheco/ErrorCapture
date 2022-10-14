<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="./Error.Capture.js"></script>
</head>
<body>
    <script>
        window.onload = function(){
            // console.warn('Warning');
            setTimeout(function(){
                throw new Error('Custom 1');
            }, 3000);
            setTimeout(function(){
                throw new Error('Custom 2');
            }, 4000);
            setTimeout(function(){
                throw new Error('Custom 3');
            }, 5000);

            setTimeout(function(){
                // throw new Error('Custom 4');
                setTimeout(function(){
                    throw new Error('Custom 5');
                }, 1000);
                setTimeout(function(){
                    throw new Error('Custom 6');
                }, 2000);
                setTimeout(function(){
                    throw new Error('Custom 7');
                }, 3000);
                setTimeout(function(){
                    throw new Error('unhandledrejection');
                }, 4000);
                
            }, 10000);
        }
    </script>
</body>
</html>