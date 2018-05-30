window["adrum-start-time"] = new Date().getTime();
(function(config) {
  config.appKey = "EUM-AAB-AUM";
  config.adrumExtUrlHttp = "http://jsagent.adeo.no";
  config.adrumExtUrlHttps = "https://jsagent.adeo.no";
  config.beaconUrlHttp = "http://eumgw.adeo.no";
  config.beaconUrlHttps = "https://eumgw.adeo.no";
  config.xd = { enable: false };
})(window["adrum-config"] || (window["adrum-config"] = {}));

if ("https:" === document.location.protocol) {
  document.write(
    unescape("%3Cscript") +
      " src='https://jsagent.adeo.no/adrum/adrum.js' " +
      " type='text/javascript' charset='UTF-8'" +
      unescape("%3E%3C/script%3E")
  );
} else {
  document.write(
    unescape("%3Cscript") +
      " src='http://jsagent.adeo.no/adrum/adrum.js' " +
      " type='text/javascript' charset='UTF-8'" +
      unescape("%3E%3C/script%3E")
  );
}
