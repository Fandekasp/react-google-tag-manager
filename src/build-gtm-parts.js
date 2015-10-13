function buildGTMParts(args) {
    const defaultArgs = {
        dataLayerName: 'dataLayer',
        additionalEvents: {}
    };

    const params = Object.assign(defaultArgs, args);

    if (params.id === undefined) {
        throw new Error('No GTM id provided');
    }

    const iframe = `
        <iframe src="//www.googletagmanager.com/ns.html?id=${params.id}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

    const script = `
        (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','${params.dataLayerName}','${params.id}');`;

    return {
        iframe,
        script
    };
}

export default buildGTMParts;