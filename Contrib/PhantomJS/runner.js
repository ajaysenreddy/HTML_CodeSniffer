var HTMLCS_RUNNER = new function() {
    this.run = function(standard, callback) {
        var self = this;

        // At the moment, it passes the whole DOM document.
        HTMLCS.process(standard, document, function() {
            var messages = HTMLCS.getMessages();
            var length   = messages.length;
            var msgCount = {};
            msgCount[HTMLCS.ERROR]   = 0;
            msgCount[HTMLCS.WARNING] = 0;
            msgCount[HTMLCS.NOTICE]  = 0;

            for (var i = 0; i < length; i++) {
                self.output(messages[i]);
                msgCount[messages[i].type]++;
            }
            console.log('Errors: ' + msgCount[HTMLCS.ERROR] + ', Warnings: ' + msgCount[HTMLCS.WARNING] +
             ', Notices: ' + msgCount[HTMLCS.NOTICE]);
            console.log('done');
        }, function() {
            console.log('Something in HTML_CodeSniffer failed to parse. Cannot run.');
            console.log('done');
        });
    };

    this.output = function(msg) {
        // Simple output for now.
        var typeName = 'UNKNOWN';
        switch (msg.type) {
            case HTMLCS.ERROR:
                typeName = 'ERROR';
            break;

            case HTMLCS.WARNING:
                typeName = 'WARNING';
            break;

            case HTMLCS.NOTICE:
                typeName = 'NOTICE';
            break;
        }//end switch

        var nodeName = '';
        if (msg.element) {
            nodeName = msg.element.nodeName.toLowerCase();
        }

        var elementId = '';
        if (msg.element.id && (msg.element.id !== '')) {
            elementId = '#' + msg.element.id;
        }
        console.log(typeName + '|' + msg.code + '|' + nodeName + '|' + elementId + '|' + msg.msg);
    };

};