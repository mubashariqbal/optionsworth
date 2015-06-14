var vm = new Vue({
	el: '#calculator',
	data: {
		value_of_company: 25000000,
		shares_you_get: '10000',
		total_shares: '1000000',
		price_you_pay: '0.50',
		years_to_vest: '4',

		options_worth: '',
		profit: '',
		profit_per_year: '',
		could_buy: '',
		pct_ownership: '',
		noProfit: false
	},

    ready: function(){
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

		  sign = '';
		  var s = Math.floor(Math.abs(value)).toString(),
		    i = s.length % 3,
		    h = i > 0
		      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
		      : '',
		    v = Math.abs(parseInt((value * 100) % 100, 10)),
		    f = '.' + (v < 10 ? ('0' + v) : v)
		  return (value < 0 ? '-' : '') +
		    sign + h + s.slice(i).replace(digitsRE, '$1,') + f
		}
	},

	methods: {
		calculateValue: function(e) {
			if (e) e.preventDefault();

			// reset
			this.profit = '';
			this.profit_per_share = '';

			if (this.shares_you_get == '' || this.total_shares == '') {
				this.options_worth = '';
				return;
			}

			this.options_worth = this.value_of_company * (this.shares_you_get / this.total_shares);
			this.pct_ownership = (this.shares_you_get / this.total_shares) * 100;

			if (this.price_you_pay != '') {
				this.profit = this.options_worth - (this.price_you_pay * this.shares_you_get);
				if (this.profit > 0) {
					this.noProfit = false;

					this.profit_per_year = this.profit / this.years_to_vest;
				} else {
					this.noProfit = true;
				}

				this.could_buy = '';
				if (this.profit >= 30000000) { // > 30 million
					this.could_buy = '<i class="fa fa-futbol-o"></i> You could buy your favorite sports team';
				} else if (this.profit >= 20000000) { // > 20 million
					this.could_buy = '<i class="fa fa-plane"></i> You could buy a jet plane';
				} else if (this.profit >= 10000000) { // > 10 million
					this.could_buy = '<i class="fa fa-university"></i> You could buy an degree';
				} else if (this.profit >= 1000000) { // > 1 million
					this.could_buy = '<i class="fa fa-building"></i> You could buy an office building';
				} else if (this.profit >= 500000) { // > 500K
					this.could_buy = '<i class="fa fa-home"></i> You could buy a big house';
				} else if (this.profit >= 250000) { // > 250K
					this.could_buy = '<i class="fa fa-ship"></i> You could buy a fancy yacht';
				} else if (this.profit >= 100000) { // > 100K
					this.could_buy = '<i class="fa fa-car"></i> You could buy a speedy sports car';
				} else if (this.profit >= 50000) { // > 50K
					this.could_buy = '<i class="fa fa-diamond"></i> You could buy a sparkling diamond';
				} else if (this.profit >= 1000) { // > 1000
					this.could_buy = '<i class="fa fa-cutlery"></i> You could buy a great meal';
				} else if (this.profit >= 100) { // > 100
					this.could_buy = '<i class="fa fa-glass"></i> You could buy a round of drinks';
				} else {
					this.could_buy = '';
				}
			}
		}
	}

})

