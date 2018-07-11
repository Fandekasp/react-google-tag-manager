import buildParts, {convertToKeyValueString} from './build_parts';
import React from 'react';

function GTMParts(args) {
    const parts = buildParts(args);

    function noScriptAsReact() {
        return <noscript dangerouslySetInnerHTML={{ __html: parts.iframe }}></noscript>;
    }

    function noScriptAsHTML() {
        return `<noscript>${parts.iframe}</noscript>`;
    }

    function scriptAsReact() {
        return <script dangerouslySetInnerHTML={{ __html: parts.script }}></script>;
    }

    function scriptForHead() {
        const { id, dataLayerName = 'dataLayer', additionalEvents = {}, scheme = '', previewVariables = '' } = parts;

        return (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', convertToKeyValueString(additionalEvents)});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=dataLayerName?'&l='+l:'';
            j.async=true;
            j.src=`${scheme}//www.googletagmanager.com/gtm.js?id=${i}${dl}${previewVariables}`};
            f.parentNode.insertBefore(j,f);
        })(window,document,'script',dataLayerName, id);
    }

    function scriptAsHTML() {
        return `<script>${parts.script}</script>`;
    }

    return {
        noScriptAsReact,
        noScriptAsHTML,
        scriptAsReact,
        scriptAsHTML,
        scriptForHead,
    };
}

export default GTMParts;
