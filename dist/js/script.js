var currency = [ 
	{name : 'USD', symbol: "$"},
	{name : 'EUR', symbol: "€"},
	{name: 'RUB', symbol: "₽"},
	{name: 'GBP', symbol: "£"}];
var cryptoCurrency = ['ETH', 'LTC', 'BTC'];
var periods = ['hour', 'day', 'week', 'month'];
var defaultCurrency = currency[0];

$(document).ready(function() {
	changePrice(defaultCurrency);
	$('select').niceSelect();
	
	$('#currencyDropdown').change(function () {
     	changePrice(getCurrentCurrency());
	});

	$('.item__check .checkbox input').change(function() {
        chagePriceForCryptoCurrency(getCurrentCurrency(), this.value);     
    });
});

function changePrice(currency) {
	for (var i = 0; i < cryptoCurrency.length; i++) {
		chagePriceForCryptoCurrency(currency, cryptoCurrency[i]);
	}
} 

function chagePriceForCryptoCurrency(currency, cryptoCurrency) {
	$.ajax({url: "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + cryptoCurrency + currency.name,  
	    success: function(result) {
	    	var parameter = $('#' + cryptoCurrency.toLowerCase() + '_' + 'percent').is(':checked') ? 'percent' : 'price';
		    $("#" + cryptoCurrency.toLowerCase() + "_price").text(currency.symbol + "" + result.last);
		        for (var i = 0; i < periods.length; i++) {
		        	var priceValue = result.changes[parameter][periods[i]];
		        	var sign = parameter === 'percent' ? '%' : currency.symbol;
		        	var textColor = priceValue < 0 ? 'red' : 'green';
		        	var cryptoCurrencyPeriodElement = $('#' + cryptoCurrency.toLowerCase() + '_' + periods[i]);

		        	cryptoCurrencyPeriodElement.css('color', textColor);
		        	cryptoCurrencyPeriodElement.text(priceValue + '' + sign);
		        }
	    }}); 
}

function getCurrentCurrency() {
	var name = $('#currencyDropdown').find("option:selected").val();
    return currency.filter(c => c.name === name)[0];
}
