var vm = new Vue({
	el: '#calculator',
	data: {
		value_of_company: 25000000,
		shares_you_get: '10000',
		total_shares: '1000000',
		price_you_pay: '0.50',

		options_worth: '',
		profit: '',
		pct_ownership: '',
		noProfit: false
	},

    ready: function(){
    	console.log("ready");
        this.calculateValue();
    },

	computed: {
		value_of_company_in_millions: function() {
			return vm.$$.value_of_company.value;
		}
	},

	filters: {
		numberFormat: function(value, sign) {
		  digitsRE = /(\d{3})(?=\d)/g;

		  if (!isFinite(value) || (!value && value !== 0)) return ''

		  value = value * 1000000;
		  sign = '';
		  var s = Math.floor(Math.abs(value)).toString(),
		    i = s.length % 3,
		    h = i > 0
		      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
		      : '',
		    v = Math.abs(parseInt((value * 100) % 100, 10)),
		    f = '.' + (v < 10 ? ('0' + v) : v)
		  return (value < 0 ? '-' : '') +
		    sign + h + s.slice(i).replace(digitsRE, '$1,')
		}
	},

	methods: {
		calculateValue: function(e) {
			if (e) e.preventDefault();

			this.options_worth = this.value_of_company * (this.shares_you_get / this.total_shares);
			this.pct_ownership = (this.shares_you_get / this.total_shares) * 100;

			if (this.price_you_pay != '') {
				this.profit = this.options_worth - (this.price_you_pay * this.shares_you_get);
				if (this.profit > 0) {
					this.noProfit = false;
				} else {
					this.noProfit = true;
				}
			}
		}
	}

})

