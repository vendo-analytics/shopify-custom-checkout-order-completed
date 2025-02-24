<!-- Mixpanel Custom Checkout Code Start -->
{% if first_time_accessed == true and post_purchase_page_accessed == false %}
<script> 
// Retrieves the Shopify anonymous user ID
function getCookieValue(cookieName) {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {let c = ca[i]; while (c.charAt(0) === ' ') {c = c.substring(1);}
  if (c.indexOf(name) === 0) { return c.substring(name.length, c.length);}}
  return '';
}
let shopify_y = getCookieValue('_shopify_y');
console.log('cookie value is ',  shopify_y); // This will log the value of the '_shopify_y' cookie to the console



// Mixpanel JS SDK
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?nMIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);

// Mixpanel Initialise 
mixpanel.init('REPLACE_YOUR_TOKEN',{
  debug: true
});

// Checkout completed event
mixpanel.track("Checkout Completed", {
 "distinct_id": shopify_y,
 "$device_id": shopify_y,
 "$source": "Vendo - Shopify App / Custom Checkout", 
 "$current_url": "{{order.order_status_url}}",
 "currency": "{{order.shop.currency }}",
 "cart_subtotal_amount": {{order.subtotal_price | divided_by: 100.0}},
 "cart_total_amount": {{order.total_price | divided_by: 100.0 }},
 "order_id": "{{order.order_number}}",
 "shipping_amount": {{order.shipping_price | money_without_currency | remove: "," }},
 "tax_amount": {{order.tax_price | divided_by: 100.0 }},
 "checkout_token": "{{order.checkoutToken}}",
 "shipping_address": {
    "address1": "{{order.billing_address.street }}",
    "city": "{{ order.billing_address.city }}",
    "country": "{{ order.billing_address.country }}",
    "countryCode": "{{order.billing_address.country_code }}",
    "firstName": "{{ order.customer.first_name }}",
    "lastName": "{{ order.customer.last_name }}",
    "province": "{{ order.billing_address.province }}",
    "provinceCode": "{{ order.shipping_address.province_code }}",
    "zip": "{{ order.billing_address.zip }}"
  },
 "products": [
  {% for line_item in order.line_items %}  // repeats for each product in cart. 
    {
      "id": "{{line_item.variant.product.id }}",
      "quantity": {{line_item.quantity }},
      "title": "{{line_item.title }}",
      "type": "{{ line_item.product.type }}",
      "untranslated_title": "{{ line_item.product.title }}",
      "variant_currency_code": "{{ line_item.final_line_price | money_without_currency }}",
      "variant_id": "{{ line_item.variant.id }}",
      "variant_image": "{{ line_item.variant.image.src | img_url: "200x200", scale: 2 }}",
      "variant_price": "{{ line_item.final_line_price | divided_by: 100.0}}",
      "variant_sku": "{{ line_item.variant.sku }}",
      "variant_untranslated_title": "{{ line_item.product.title }}",
      "vendor": "{{ line_item.product.vendor }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
   ],

});


  var checkShopflo = setInterval(function() {
    if (window.Shopflo.order.customer.id) {
      console.log(window.Shopflo.order.customer.id);
   
     // Alias anonymous user ID with the Shopify ID. This is only required in Original ID merge.
      console.log("shopify ID",  window.Shopflo.order.customer.id);
      mixpanel.alias(shopify_y, window.Shopflo.order.customer.id);
      
      clearInterval(checkShopflo); // Clear interval once the object is found
    } else {
      console.log("Waiting for window.Shopflo.order.customer.id");
    }
  }, 1000); // Check every 1000 milliseconds (1 second)


</script>


{% endif %}
<!-- Mixpanel Custom Checkout Code End -->
