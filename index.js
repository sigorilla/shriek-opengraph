var ogs = require('open-graph-scraper');

function getUrl(text) {
  var urlRegex = /(https?:\/\/[^\s<\[]+)/g;
  var url = '';

  if ((urlArr = urlRegex.exec(text)) !== null) {
    url = urlArr[0];
  }

  return url;
}

function getMeta(messages, callback) {
  try {
    messages.reduce(function (prev, message) {
      return prev.then(function (data) {
        return new Promise(function (resolve, reject) {
          message.meta = message.meta || {};
          if ((url = getUrl(message.text)) === '') {
            resolve(message);
          } else {
            var options = {
              url: url,
              timeout: 2000
            };
            ogs(options, function (err, meta) {
              if (!err) {
                message.meta = meta;
                message.text += '<blockquote><pre>' +
                  '<a href="' +
                  (meta.data.ogUrl || url) +
                  '" target="_blank"><img align="right" src="'+
                  (meta.data.ogImage.url || '') +
                  '" height="' +
                  (meta.data.ogImage.height || '100') + '"></a>' +
                  '<p><a href="' +
                  (meta.data.ogUrl || url) +
                  '" target="_blank"><strong>' +
                  (meta.data.ogTitle || url) +
                  '</strong></a></p>' +
                  '<p>' + (meta.data.ogDescription || '') + '</p>' +
                  '</pre></blockquote>';
              }
              resolve(message);
            });
          }
        });
      });
    }, Promise.resolve())
      .then(function (data) {
        callback(null, messages);
      })
      .catch(function (err) {
        callback(err, null);
      });
  } catch (err) {
    callback(err, null);
  }
};

module.exports = getMeta;
module.exports.forEvent = 'channelGet';
