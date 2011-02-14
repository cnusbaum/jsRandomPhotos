var keepLocationSearchOpen = false;
var navMenuSearch = false;
var loginSystems = [
    { name: "Personal Banking", url: "" },
    { name: "Credit Card", url: "http://www.directcardaccess.com/" },
    { name: "Payroll Cards Employee", url: "https://www.onlinepaycard.com/opc/midfirstbank/payroll/employee/login_head.jsp" },
    { name: "IdentitySecure", url: "https://www.identitysecure.com/" },   
	{ name: "Virtual Cash Cardholder", url: "https://www.familyprepaiddebit.com/familycard/mfbvirtualcash/login" },
    { name: "Virtual Cash Gift Giver", url: "https://www.familyprepaiddebit.com/familycard/mfbvirtualcash/gg_start" },
    { name: "Virtual Cash Sponsor", url: "https://www.familyprepaiddebit.com/familycard/mfbvirtualcash/login" },
    { name: "Business Banking", url: "" },
    { name: "Business Express Banking", url: "" },
    { name: "Images", url: ""  },
    { name: "Images Plus", url: "/TreasuryManagementServices/ImagesPlusLogin.aspx" },
    { name: "Positive Pay", url: "" },
    { name: "Remote Deposit",  url: "" },
    { name: "Payroll Cards Employer", url: "https://www.paycardsolutions.com/midfirstbank" },
    { name: "Portfolio Online", url: "https://portfolioonline.metavante.com/mpo/main/UserLogon?bankNumber=68&subProduct=MFTC" },
    { name: "Investment Services", url: "http://midfirst.automatedfinancial.com/" }
      
];
    jQuery(document).ready(function () {    	
    	jQuery('#location_popup').dialog({
    		modal: true,
    		overlay: {
    			opacity: 0.50,
    			background: 'black'
    		},
    		width: 250,
    		height: 140,
    		minHeight: 100,
    		resizable: false,
    		draggable: false,
    		autoOpen: false,
    		title: 'Enter Address, City, or Zip Code'
    	});
    	jQuery("#lnkDemos").click(function () {
    		jQuery('#divDemos').dialog({
    			modal: true,
    			overlay: {
    				opacity: 0.50,
    				background: 'black'
    			},
    			width: 390,
    			height: 160,
    			minHeight: 100,
    			resizable: false,
    			draggable: false,
    			autoOpen: false,
    			title: 'Online Banking Demos'
    		});
    		TrackAction('Sign In Box', 'Online Banking Demos');
    		jQuery('#divDemos').dialog("open");
    	});
    	jQuery("#forgotpass").click(function () {
    		jQuery('#divForgotpasscontent').dialog({
    			modal: true,
    			overlay: {
    				opacity: 0.50,
    				background: 'black'
    			},
    			width: 360,
    			height: 300,
    			minHeight: 100,
    			resizable: false,
    			draggable: false,
    			autoOpen: false,
    			title: 'Password Assistance'
    		});
    		jQuery('#divForgotpasscontent').dialog("open");
    	});
    	jQuery("#lnkLocateUs").click(function () {
    		TrackAction('Header Navigation', 'Locate Us');
    		jQuery('#location_popup').dialog("open");
    	});
    	jQuery("#lnkLocateUsFooter").click(function () {
    		jQuery('#location_popup').dialog("open");
    	});
    	jQuery("#lnkEmaiLearnMore").click(function () {
    		jQuery('#divEmailInfo').dialog({
    			modal: true,
    			overlay: {
    				opacity: 0.50,
    				background: 'black'
    			},
    			width: 360,
    			height: 166,
    			minHeight: 100,
    			resizable: false,
    			draggable: false,
    			autoOpen: false,
    			title: 'Receive important information and updates'
    		});
    		TrackAction('Footer Navigation', 'Email Learn More');
    		jQuery('#divEmailInfo').dialog("open");
    	});
    	jQuery("#ctl00_btnNewsletterSignUp").click(NewsletterSignup);
    	jQuery("div#options input:radio").click(function () {
    		jQuery("#ctl00_ctl00_pnlOLBSystemAjaxPanel").css("height", "140px");
    		var elementValue = jQuery(this).val();
    		jQuery("#ctl00_ExternalHostLogin1_pnlExternalLogin").hide();
    		jQuery("#ctl00_PersonalLogin1_pnlPersonalSignIn").hide();
    		jQuery("#ctl00_BusinessLogin1_pnlBusinessSignIn").hide();
    		jQuery("#ctl00_EVisionLogin1_pnlEVisionSignIn").hide();
    		jQuery("#ctl00_PosPayLogin1_pnlPosPaySignIn").hide();
    		jQuery("#ctl00_MerchDirectLogin1_pnlMerchDirectSignIn").hide();
    		jQuery("#ctl00_BusinessExpressLogin1_pnlBusinessSignIn").hide();
    		if (IsPersonalBanking(elementValue)) {
    			jQuery("#ctl00_ctl00_pnlOLBSystemAjaxPanel").css("height", "97px");
    			jQuery("#ctl00_PersonalLogin1_pnlPersonalSignIn").show();
    			jQuery("#ctl00_PersonalLogin1_txtPersonalBankingID").focus();

    		} else if (IsEVision(elementValue)) {
    			jQuery("#ctl00_EVisionLogin1_pnlEVisionSignIn").show();    			
    			jQuery("#ctl00_ctl00_pnlOLBSystemAjaxPanel").css("height", "200px");
    			jQuery("#ctl00_EVisionLogin1_txtUserName").focus();
    		} else if (IsPosPay(elementValue)) {
    			jQuery("#ctl00_PosPayLogin1_pnlPosPaySignIn").show();
    			jQuery("#ctl00_PosPayLogin1_txtUserName").focus();
    		} else if (IsMerchDirect(elementValue)) {
    			jQuery("#ctl00_MerchDirectLogin1_pnlMerchDirectSignIn").show();
    			jQuery("#ctl00_MerchDirectLogin1_txtUserName").focus();
    		} else if (IsBusinessBanking(elementValue)) {
    			jQuery("#ctl00_BusinessLogin1_pnlBusinessSignIn").show();
    			jQuery("#ctl00_BusinessLogin1_txtCompanyID").focus();
    		} else if (IsBusinessExpressBanking(elementValue)) {
    			jQuery("#ctl00_BusinessExpressLogin1_pnlBusinessSignIn").show();
    			jQuery("#ctl00_BusinessExpressLogin1_txtCompanyID").focus();
    		} else {
    			jQuery("#ctl00_ctl00_pnlOLBSystemAjaxPanel").css("height", "97px");
    			var loginSystem = GetLoginSystemObj(elementValue);
    			var url = loginSystem.url;
    			jQuery("#ctl00_ExternalHostLogin1_btnSignInExternal").unbind('click');
    			jQuery("#ctl00_ExternalHostLogin1_btnSignInExternal").click(function () {
    				OpenExternalLogin(elementValue, url);
    			});
    			jQuery("#ctl00_ExternalHostLogin1_lblSignExternal").html(elementValue);
    			jQuery("#ctl00_ExternalHostLogin1_pnlExternalLogin").show();
    		}

    		jQuery.cookie('OLBOption', elementValue, {
    			expires: 90,
    			path: '/'
    		});
    	});
    	var cookievalue = jQuery.cookie('OLBOption');
    	if (cookievalue != null) {
    		var index = GetLoginSystemIndex(cookievalue);
    		var loginSystem = loginSystems[index];
    		var url = loginSystem.url;
    		var element = jQuery('#options input:radio:nth(' + index + ')');
    		element.attr('checked', 'checked');
    		if (!IsInteralLogin(cookievalue)) {
    			jQuery("#ctl00_ExternalHostLogin1_btnSignInExternal").click(function () {
    				OpenExternalLogin(cookievalue, url);
    			});
    		}
    	} else {
    		var element = jQuery('#options input:radio:nth(0)');
    		element.attr('checked', 'checked');
    	}
    	jQuery('h3.header_sub_options').click(function () {
    		jQuery('div#sign_in_wrap').toggleClass('sign_in_ready_border').toggleClass('sign_in_active_border');
    		jQuery('div#options').slideToggle("fast");
    		jQuery(this).toggleClass("options_active");
    	});
    	jQuery('span.locate').click(function () {
    		jQuery('div#location_dropdown').slideToggle("fast");
    		jQuery(this).toggleClass("location_active");
    		TrackAction('Nav Menu Click', 'Find an Banking Center or ATM');
    	});
    	var locationMenuConfig = {
    		sensitivity: 3,
    		interval: 100,
    		over: openLocationMenu,
    		timeout: 10000,
    		out: closeLocationMenu
    	};
    		
    	AddMasterWaterMarks();
    	jQuery("div#location_dropdown").hoverIntent(locationMenuConfig);
    	jQuery("span.locate").hoverIntent(locationMenuConfig);
    	jQuery('ul.sf-menu li').mouseover(function () {
    		try { jQuery("input:textbox").blur(); } catch (exc) { }
    	});
    	jQuery(".sf-with-ul:last").css({ borderRight: 'none' });
    	jQuery('ul.sf-menu').superfish({});
    });
    jQuery(window).unload(function() {
    	try {
    		GUnload();
    	}
    	catch (e) { }
    });
    function AddMasterWaterMarks() {
    	jQuery("#ctl00_txtAddress").waterMarker("Watermark", "", "Enter Address, City, or Zip Code");
    	jQuery("#ctl00_txtFindLocation").waterMarker("Watermark", "", "Enter Address, City, or Zip Code");
    	jQuery("#ctl00_txtNewsLetterEmail").waterMarker("Watermark", "", "Enter Email Address");   

	}	
    function NewsletterSignup()
	{	
		var email = jQuery("#ctl00_txtNewsLetterEmail").val();
		if (email != "Enter Email Address") {
			window.location.href = "/InsideMidFirst/NewsletterSignup.aspx?emailAddress=" + email;
		}
		else {
			window.location.href = "/InsideMidFirst/NewsletterSignup.aspx";
		}
	}
    function NewsletterKeydown(e) {
    	var keynum;
    	if (window.event) {
    		keynum = e.keyCode;
    	}
    	else if (e.which) {
    		keynum = e.which;
    	}
    	if (13 == keynum) {
    		NewsletterSignup();
    	}
    }
    //This function is called by MobileFunctions.js and NonMobileFunctions.js
	// to Select and Track online demo viewing.
    function GetOnlineDemo(demoValue) {
    	var selectedDemoURL;
    	switch (demoValue) {
    		case 'Personal Banking':
    			selectedDemoURL = 'https://www.midfirst.com/PersonalBanking/Demo/';
    			break;
    		case 'Mobile Banking':
    			selectedDemoURL = 'http://www.mshift.com/demo.jsp?dDest=http://www.mshift.com/midfirstdemo/midfirstdemo.jsp';
    			break;
    		case 'Business Express':
    			selectedDemoURL = 'https://www.midfirst.com/TreasuryManagementServices/Demo/ExpressBanking/';
    			break;
    		case 'Business Banking':
    			selectedDemoURL = 'https://www.midfirst.com/TreasuryManagementServices/Demo/BusinessBanking/';
    			break;
    		case 'Remote Deposit':
    			selectedDemoURL = 'https://www.midfirst.com/TreasuryManagementServices/ReceivablesServices.aspx?RemoteDepositVideo=true';
    			break;
    	}
    	TrackAction('Demo', demoValue);    	
    	if (demoValue == 'Remote Deposit') {
    		setTimeout('window.location.href ="' + selectedDemoURL+'";', 500);
    	}
    	else {
    		window.open(selectedDemoURL);
    	}
    	jQuery('#divDemos').dialog("close");
    }   

	function TrackAction(category, eventName) {
	try {		  	
        pageTracker._trackEvent(category, eventName);
       } catch (err) {             
    }
   }
   function TrackActionLabel(category, eventName,label) {
	try {
		pageTracker._trackEvent(category, eventName, label);		
       } catch (err) {             
    }
}
function TrackVirtualPage(url) {
	try {
		pageTracker._trackPageview(url);
	} catch (err) {
	}
}
function DoSiteSearch() {
	var searchTerm = jQuery("#ctl00_txtSearch").val();
	if (searchTerm != "") {
		TrackActionLabel('Site Search', searchTerm, 'Header');		
		setTimeout("window.location.href = '/InsideMidFirst/SearchContent.aspx?searchQuery=" + searchTerm + "';", 500);
	}
}
function CloseDropDown() {
    TrackAction('Set Location', 'Closed');
   try{
    var combo = $find('ctl00_pnlSetLocation_ctlSetLocation_ctl00_ddlStateList');
    if (combo.get_dropDownVisible()) {
        combo._hideDropDown();
    }
   }
   catch(CurError){}
      }
function GetLoginSystemIndex(selectedItem) {
    for (var i = 0; i < loginSystems.length; i++) {
        if (loginSystems[i].name == selectedItem) {
            return i;
        }
    }
    return 0;
}
function GetLoginSystemObj(selectedItem) {
    for (var i = 0; i < loginSystems.length; i++) {
        if (loginSystems[i].name == selectedItem) {
        	return loginSystems[i];
        }
    }
}
function OpenExternalLogin(value, url) {
	TrackAction("Online Banking Login", value);
	if (value == "Images Plus") {		
		setTimeout('window.location.href ="' + url + '";', 500);
	}
	else {
		window.open(url);  
	}     
}
function IsInteralLogin(value) {
    var val = IsPersonalBanking(value) || IsEVision(value) || IsPosPay(value) || IsMerchDirect(value) ||
        IsBusinessBanking(value) || IsBusinessExpressBanking(value);
    return val;
}
function IsPersonalBanking(value) {var val = value == "Personal Banking";return val;}
function IsBusinessBanking(value) {var val = value == "Business Banking";return val;}
function IsBusinessExpressBanking(value) {  var val = value == "Business Express Banking"; return val;}
function IsEVision(value) { var val = value == "Images"; return val;}
function IsPosPay(value) { var val = value == "Positive Pay"; return val;}
function IsMerchDirect(value) {var val = value == "Remote Deposit"; return val;}
function openLocationMenu() {	
    var locationDropdown = jQuery('div#location_dropdown');
    var thisElement = jQuery(this)[0];
    if (thisElement.tagName == "DIV") {
        keepLocationSearchOpen = true;
    } else if (thisElement.tagName == "SPAN") {
        if (locationDropdown.css("display") == "block") {
            keepLocationSearchOpen = true;
        }
    }
}
function closeLocationMenu() {
    var locationDropdown = jQuery('div#location_dropdown');
    var thisElement = jQuery(this)[0];
    if (locationDropdown.css("display") == "block") {
        if (!keepLocationSearchOpen) {
            locationDropdown.slideToggle("fast");
            jQuery('span.locate').toggleClass("location_active");
        }
        keepLocationSearchOpen = false;
    }
}
function AnimateCollapse(divToToggle) { animatedcollapse.toggle(divToToggle);}
function AnimateCollapseTrackAction(divToToggle, trackIt, category, eventName, lnkName, type) {
    var enableTracking = false;
    var lowerType = type.toLowerCase();  
    if (lowerType == 'disclosure') {
        var element = jQuery('#' + lnkName);
        element.toggleClass('toggle_hide_disclosure');
        var lowerHTML = element.html().toLowerCase();
        if (lowerHTML == "show disclosure") {
            element.html('hide disclosure');
            if (trackIt == 'true') {
                enableTracking = true;
            }
        } else {
            element.html('show disclosure');
        }       
        if (enableTracking && lowerHTML == "show disclosure") {
            TrackAction(category, eventName);
        }
    } else if (lowerType == 'detail') {
        var element = jQuery('#' + lnkName);
        element.toggleClass('toggle_hide');
        var lowerHTML = element.html().toLowerCase();
        if (lowerHTML == "show details") {
            element.html('hide details');
            if (trackIt == 'true') {
                enableTracking = true;
            }
        } else {
            element.html('show details');
        }        
        if (enableTracking && lowerHTML == "show details") {
            TrackAction(category, eventName);
        }
    } else if (lowerType == 'contact information') {
        var element = jQuery('#' + lnkName);
        element.toggleClass('toggle_hide_contact_information');
        var lowerHTML = element.html().toLowerCase();
        if (lowerHTML == "show contact information") {
            element.html('hide contact information');
            if (trackIt == 'true') {
                enableTracking = true;
            }
        } else {
            element.html('show contact information');
        }       
        if (enableTracking && lowerHTML == "show contact information") {
            TrackAction(category, eventName);
        }
    }
    try {
    	animatedcollapse.toggle(divToToggle);    	
    	hideAll.attr('href', 'javascript:hideAll()');    	
    	expandAll.attr('href', 'javascript:expandAll()');    	
    }
    catch (Error) {    
    }  
}
function loadMaps(isNav) {
	navMenuSearch = isNav;
	var txtAddress;
	var addressInput;
	if (navMenuSearch) {
		txtAddress = jQuery("#ctl00_txtFindLocation");
		addressInput = txtAddress.val();
		jQuery("#ctl00_btnFindLocation").attr("disabled", true);
	} else {
		txtAddress = jQuery("#ctl00_txtAddress");
		addressInput = jQuery("#ctl00_txtAddress").val();
		jQuery("#ctl00_btnSearchLocations").attr("disabled", true);
	}
	if (addressInput == "" || addressInput == "Enter Address, City, or Zip Code") {
		if (navMenuSearch) {
			jQuery("#lblLatLngSearchError").html("Address Required");
			jQuery("#lblLatLngSearchError").css("visibility", "visible");
			jQuery("#ctl00_btnFindLocation").attr("disabled", false);
		} else {
			jQuery("#lblLatLngSearchError2").html("Address Required");
			jQuery("#lblLatLngSearchError2").css("visibility", "visible");
			jQuery("#ctl00_btnSearchLocations").attr("disabled", false);
		}
		txtAddress.focus();
		return;
	}

	try {
		if (google) {
			google.load('maps', '2', { callback: GetLocationLatLng, 'other_params': 'client=gme-midfirst&sensor=false' });
			return;
		}
	}
	catch (err) {
	}
	RedirectUser();
}
function RedirectUser() {
	if (navMenuSearch) {
		txtAddress = jQuery("#ctl00_txtFindLocation");
		addressInput = txtAddress.val();
		TrackActionLabel('Location Search', addressInput, "Navigation DropDown");		
	}
	else {
		txtAddress = jQuery("#ctl00_txtAddress");
		addressInput = jQuery("#ctl00_txtAddress").val();
		TrackActionLabel('Location Search', addressInput, "Locate Us Popup");
	}
	setTimeout(SubmitMapSearch, 500);
}

function SubmitMapSearch() {
	window.location.href = "/InsideMidFirst/Maps.aspx?address=" + addressInput;
}

function GetLocationLatLng() {	
		var geocoder = new GClientGeocoder();
		if (navMenuSearch) {
			txtAddress = jQuery("#ctl00_txtFindLocation");
			addressInput = txtAddress.val();
			TrackActionLabel('Location Search', addressInput, "Navigation DropDown");			
		}
		else {
			txtAddress = jQuery("#ctl00_txtAddress");
			addressInput = jQuery("#ctl00_txtAddress").val();
			TrackActionLabel('Location Search', addressInput, "Locate Us Popup");			
		}
		geocoder.getLatLng(addressInput, function (latlng) {
			if (!latlng) {
				if (navMenuSearch) {
					jQuery("#lblLatLngSearchError").html("Invalid Address Provided");
					jQuery("#lblLatLngSearchError").css("visibility", "visible");
					jQuery("#ctl00_btnFindLocation").attr("disabled", false);
				} else {
					jQuery("#lblLatLngSearchError2").html("Invalid Address Provided");
					jQuery("#lblLatLngSearchError2").css("visibility", "visible");
					jQuery("#ctl00_btnSearchLocations").attr("disabled", false);
				}
				TrackActionLabel('No Data Found', 'Location Search', userAddress);
				txtAddress.focus();
				return;
			} else {
				if (navMenuSearch) {
					jQuery("#lblLatLngSearchError").css("visibility", "hidden");
					TrackActionLabel('Location Search', addressInput, "Navigation DropDown");
				} else {
					jQuery("#lblLatLngSearchError2").css("visibility", "hidden");
					TrackActionLabel('Location Search', addressInput, "Locate Us Popup");
				}
				setTimeout(SubmitMapSearch, 500);
			}
		});
	}
	//This plugin gives you a watermark for your text boxes - Created by Bobby Johnson 10-20-2010
	(function ($) {
		$.fn.waterMarker = function (watermarkcssclass, normalcssclass, watermarktext) {
			var curSelector = $(this);
			var defwatermarktext = (watermarktext) ? watermarktext : "Enter a value..";
			curSelector.blur(function () {
				if (curSelector.val() == "") {
					curSelector.val(defwatermarktext).removeClass(normalcssclass).addClass(watermarkcssclass);
				}
			});
			curSelector.focus(function () {
				if (curSelector.val() == defwatermarktext) {
					curSelector.val("").removeClass(watermarkcssclass).addClass(normalcssclass);
				}
			});
			curSelector.val(defwatermarktext).addClass(watermarkcssclass);
		};
	})(jQuery);