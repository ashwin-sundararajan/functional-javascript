const CDN = s => 'https://cdnjs.cloudflare.com/ajax/libs/' + s;
const ramda = CDN('ramda/0.26.1/ramda.min');
const jquery = CDN('jquery/3.4.1/jquery.min');

requirejs.config({ paths: { ramda, jquery } });
requirejs(['jquery', 'ramda'], ($, { compose, curry, map, prop }) => {
  // Utils
  const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHtml: curry((sel, html) => $(sel).html(html)),
    trace: curry((tag, x) => {
      console.log(tag, x);
      return x;
    })
  };

  // Pure
  const host = 'api.flickr.com';
  const path = '/services/feeds/photos_public.gne';
  const query = t => `?tags=${t}&format=json&jsoncallback=?`;
  const url = t => `https://${host}${path}${query(t)}`;
  const img = src => $('<img />', { src });
  const mediaUrl = compose(
    prop('m'),
    prop('media')
  );
  const mediaToImg = compose(
    img,
    mediaUrl
  );
  const images = compose(
    map(mediaToImg),
    prop('items')
  );

  // Impure
  const render = compose(
    Impure.setHtml('#js-main'),
    images
  );
  const app = compose(
    Impure.getJSON(render),
    url
  );
  app('cats');
});
