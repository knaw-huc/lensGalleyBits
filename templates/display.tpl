{**
 * plugins/generic/lensGalleyBits/display.tpl
 *
 * Copyright (c) 2014-2018 Simon Fraser University
 * Copyright (c) 2003-2018 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * Embedded viewing of a JATS XML galley.
 *}

<script src="https://www.ub.uni-heidelberg.de/cdn/jquery/3.2.1/jquery.js"></script>
<script src="{$pluginLensPath}/locales.js"></script>
<script src="{$pluginLensPath}/lens.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=MML_HTMLorMML-full"></script>

<script type="text/javascript">{literal}

	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	linkElement.href = "{/literal}{$pluginLensPath|escape:"javascript"}{literal}/lens.css"; //Replace here

	document.head.appendChild(linkElement);
	$(document).ready(function(){
		History.started = false;
		console.log("!");
		let app = new Lens({
			document_url: "{/literal}{$xmlUrl|escape:'javascript'}{literal}"
		});
		app.start();

		window.app = app;
	});
{/literal}</script>
