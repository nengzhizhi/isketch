'undefined'==typeof(sketch)||sketch={}
(function(g){
	g.registerToolkit = function(f,d){
		g.module.toolkit[f] = d;
	}

	g.registerToolkit('brush', function(){
		this.enable = function(){}
		this.disable = function(){}

	})
})(sketch);