jQuery(document).ready(function($) {
    (function checkVersion()
    {
        $.getJSON('gitversion.php', {}, function(json, textStatus) {
            if (json) {
                if (json.gitversion != currentgitversion) {
                    window.location.reload();
                    window.location.href=window.location.href;
                }
            }
        });
        setTimeout(function() {
            checkVersion();
        }, 3000);
    })();
});
