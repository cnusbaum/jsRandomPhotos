//NonMobile Device Functionality for Dropdowns
jQuery(document).ready(function () {	
	jQuery('#divDemos').bind("dialogclose", function (event, ui) {
		var ddlPersonal = $find('ctl00_ctl10_ddlPersonalBankingDemos');
		var ddlBusiness = $find('ctl00_ctl10_ddlBusinessBankingDemos');		
		ddlPersonal.findItemByValue(-1)._select();
		ddlBusiness.findItemByValue(-1)._select();
		if (ddlPersonal.get_dropDownVisible()) {
			ddlPersonal._hideDropDown();
		}
		if (ddlBusiness.get_dropDownVisible()) {
			ddlBusiness._hideDropDown();
		}
	});
});			
function SelectedOnlineBankingDemo(sender, args) {
	var valueSelected = sender._value;
	if (valueSelected != -1) {

		if (sender.get_id() == 'ctl00_ctl10_ddlBusinessBankingDemos') {
			$find('ctl00_ctl10_ddlBusinessBankingDemos').findItemByValue(-1)._select();    		
    	}
    	else {
    		$find('ctl00_ctl10_ddlPersonalBankingDemos').findItemByValue(-1)._select();    		
    	}    	
    	GetOnlineDemo(valueSelected);
    }    
}
