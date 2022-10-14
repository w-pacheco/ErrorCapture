/**
 * Error.Capture.js
 * @description Used to reveal errors when the console is not available;
 * @author Wilfredo Pacheco, Logan A. Bunker
 */
(function(){

    // const { href, pathname, origin } = location;
    var href = window.location.href;
    var pathname = window.location.pathname;
    var origin = window.location.origin;
    var windowConsole = null;

    /** This needs to point to a blank aspx/html page in order to render the errors; */
    var url = origin + '/personal/pachecowi/Workshop/SiteAssets/App/src/pages/Error.Console.aspx';
    
    document.ERRORS = new Array();

    var ReportErrors = function ReportErrors(){
        var target = 'console';
        var windowFeatures = '';
        if (windowConsole === null || windowConsole.closed)
        {
            windowConsole = CreateConsoleWindow(url, target, windowFeatures);
        }

        var errors = document.ERRORS;
        errors.forEach((e, index) => {
            var msg = e.msg;
            var url = e.url;
            var lineNo = e.lineNo;
            var columnNo = e.columnNo;
            var Created = e.Created;
            windowConsole.document.write('' +
            '<div><p>Line: ' + lineNo + '</p></div>' +
            '<div><p>Column: ' + columnNo + '</p></div>' +
            '<div><p>Error: ' + msg + '</p></div>' +
            '<div><p>Created: ' + Created + '</p></div>' +
            '<div><p>URL: ' + url + '</p></div><hr>');
        });
    }

    var onerror = function onerror(msg, url, lineNo, columnNo){
        document.ERRORS.push({
            msg: msg,
            url: url,
            lineNo: lineNo,
            columnNo: columnNo,
            Created: new Date().toISOString(),
        });
    }

    var CreateConsoleWindow = function CreateConsoleWindow(url, target, windowFeatures){
        return window.open(url, target, windowFeatures);
    }

    window.addEventListener('unhandledrejection', onerror);
    window.addEventListener('error', function error(msg){
        var colno = msg.colno;
        var error = msg.error;
        var lineno = msg.lineno;
        var message = msg.message;
        var type = msg.type;
        onerror(message, location.href, lineno, colno);
        // console.info({ error, type });
    });

    // window.addEventListener('warn', function warn(msg){
    //     var colno = msg.colno;
    //     var error = msg.error;
    //     var lineno = msg.lineno;
    //     var message = msg.message;
    //     var type = msg.type;
    //     onerror(message, location.href, lineno, colno);
    // });

    window.addEventListener('keydown', function(event){
        var ctrlKey = event.ctrlKey;
        var shiftKey = event.shiftKey;
        var key = event.key;
        var keyCode = event.keyCode;
        if (ctrlKey 
        && shiftKey 
        && (keyCode === 69 || key === "E")) ReportErrors();
    });
})();