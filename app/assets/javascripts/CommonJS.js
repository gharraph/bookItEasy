var lArrMonth = new Array(
new Array("Jan", "01"),
new Array("Feb", "02"),
new Array("Mar", "03"),
new Array("Apr", "04"),
new Array("May", "05"),
new Array("Jun", "06"),
new Array("Jul", "07"),
new Array("Aug", "08"),
new Array("Sep", "09"),
new Array("Oct", "10"),
new Array("Nov", "11"),
new Array("Dec", "12"));
			
var lArrDay = new Array(
new Array("Mon", "Mon"),
new Array("Tue", "Tue"),
new Array("Wed", "Wed"),
new Array("Thu", "Thu"),
new Array("Fri", "Fri"),
new Array("Sat", "Sat"),
new Array("Sun", "Sun"));

var ChildAgeArray = new Array(
new Array("1", "01"),
new Array("2", "02"),
new Array("3", "03"),
new Array("4", "04"),
new Array("5", "05"),
new Array("6", "06"),
new Array("7", "07"),
new Array("8", "08"),
new Array("9", "09"),
new Array("10", "10"),
new Array("11", "11"),
new Array("12", "12"));

var StayDateArray = new Array(
new Array("01", "01"),
new Array("02", "02"),
new Array("03", "03"),
new Array("04", "04"),
new Array("05", "05"),
new Array("06", "06"),
new Array("07", "07"),
new Array("08", "08"),
new Array("09", "09"),
new Array("10", "10"),
new Array("11", "11"),
new Array("12", "12"),
new Array("13", "13"),
new Array("14", "14"),
new Array("15", "15"),
new Array("16", "16"),
new Array("17", "17"),
new Array("18", "18"),
new Array("19", "19"),
new Array("20", "20"),
new Array("21", "21"),
new Array("22", "22"),
new Array("23", "23"),
new Array("24", "24"),
new Array("25", "25"),
new Array("26", "26"),
new Array("27", "27"),
new Array("28", "28"),
new Array("29", "29"),
new Array("30", "30"),
new Array("31", "31")
);

var lLoadRegionXMLObject;
var lBrowName   = navigator.appName;
var lBrowNo=parseInt(navigator.appVersion); 


///============================================================================
/// Function: ShowUrl1
///
/// Loads a URL.
///============================================================================
function ShowUrl1(xiUrl, xiCaption, xiWidth, xiHeight, xiAllowScroll)
{  
  window.location.href= xiUrl;
}
            
///============================================================================
/// Function: GetURL
///
/// Formats the search request to roomsXML.
/// This method should be modified with caution
///============================================================================
function GetURL()
{
			var url = "http://134.213.18.81/SearchFrame/ASPX/Customer/Availability/SearchResults.aspx?";
            var url = "http://134.213.18.81/Hotels/PleaseWaitPage.htm?";

			var ltotal=0;

			//UrlFormat parameter which should be 1.
			var lQueryString = "UrlFormat=1";
			
			//Destination paramter 
			var lRegionId = document.getElementById("Regionhidden").value;
			lQueryString = lQueryString + '&Destination=' + lRegionId;
			
			//StarRate parameter
			var Rating = document.getElementById('StarRating').selectedIndex; 
			lQueryString = lQueryString + '&StarRate=' + Rating;
			
            var CurrVal = 3;
            
			//Currency Paramter
			lQueryString = lQueryString + '&Currency=' + CurrVal;
			
			var Date = document.getElementById("CheckInDateControl1_SelectDD").selectedIndex; 
			var DateVal= document.getElementById("CheckInDateControl1_SelectDD").options[Date].value;
			
			var Month = document.getElementById("CheckInDateControl1_SelectMM").selectedIndex;
			var MonthVal = document.getElementById("CheckInDateControl1_SelectMM").options[Month].value; 
			
			var Year = document.getElementById("CheckInDateControl1_SelectYY").selectedIndex;
			var YearVal = document.getElementById("CheckInDateControl1_SelectYY").options[Year].value;   
			
			var FinalMonth = MonthVal;
			var FinalYear  = YearVal;
			var PassDate = FinalMonth + "/" + DateVal + "/" + FinalYear; 
			//Check In Date paramter
			lQueryString = lQueryString + '&CheckInDate=' + PassDate;
			
			var Nights = document.getElementById("NoOfNightsControl1_SelectNN").selectedIndex;
			var NightsVal = document.getElementById("NoOfNightsControl1_SelectNN").options[Nights].value; 
			
			if(NightsVal == "")
			{
				var lNightObject = document.getElementById('Nighthidden');
				 
    			if(lNightObject.value > 0)
    			{      
    			    // NoOfNights paramter
		            lQueryString = lQueryString + '&NoOfNghts=' + lNightObject.value;
			}
			}
			else
			{
			    lQueryString = lQueryString + '&NoOfNghts=' + NightsVal; 
			}
			
			
			var NoRooms = document.getElementById("CustomerPageLayout_RoomDropDown").selectedIndex;
			var NoRoomsVal = document.getElementById("CustomerPageLayout_RoomDropDown").options[NoRooms].value;
 
			//Total rooms paramter
			lQueryString = lQueryString + '&Rooms=' + NoRoomsVal;
			if(NoRoomsVal==1 || NoRoomsVal==2 || NoRoomsVal==3)
			{var NoAdult = document.getElementById("CustomerPageLayout_AdultsDropDown1").selectedIndex;
			var NoAdultVal= document.getElementById("CustomerPageLayout_AdultsDropDown1").options[NoAdult].value;
			//R1Ad paramter
			lQueryString = lQueryString + '&R1Ad=' + NoAdultVal;var NoChild = document.getElementById("CustomerPageLayout_ChildDropDown1").selectedIndex;
			var NoChildVal= document.getElementById("CustomerPageLayout_ChildDropDown1").options[NoChild].value;
			//R1Ch parameter
			lQueryString = lQueryString + '&R1Ch=' + NoChildVal;
			 
			if(NoChildVal==1||NoChildVal==2)
			{
			var NoChild1Age = document.getElementById("CustomerPageLayout_ChildAgedown11").selectedIndex;
			var NoChild1AgeVal= document.getElementById("CustomerPageLayout_ChildAgedown11").options[NoChild1Age].value;

			//R1Ch1Age parameter
			lQueryString = lQueryString + '&R1Ch1Age=' + NoChild1AgeVal;
			}
			if(NoChildVal==2)
			{
			var NoChild2Age = document.getElementById("CustomerPageLayout_ChildAgedown12").selectedIndex;
			var NoChild2AgeVal= document.getElementById("CustomerPageLayout_ChildAgedown12").options[NoChild2Age].value;

			//R1Ch2Age parameter
			lQueryString = lQueryString + '&R1Ch2Age=' + NoChild2AgeVal;
			}
			}
			if(NoRoomsVal==2|| NoRoomsVal==3)
			{
			var NoAdult2 = document.getElementById("CustomerPageLayout_AdultsDropDown2").selectedIndex;
			var NoAdult2Val= document.getElementById("CustomerPageLayout_AdultsDropDown2").options[NoAdult2].value;
			//R2Ad parameter
			lQueryString = lQueryString + '&R2Ad=' + NoAdult2Val;
			var NoChild2 = document.getElementById("CustomerPageLayout_ChildDropDown2").selectedIndex;
			var NoAdult2 = document.getElementById("CustomerPageLayout_AdultsDropDown2").selectedIndex;	
			var NoChildVal2= document.getElementById("CustomerPageLayout_ChildDropDown2").options[NoChild2].value;
			//R2Ch paramter
			lQueryString = lQueryString + '&R2Ch=' + NoChildVal2;
		
			if(NoChildVal2==1 || NoChildVal2==2)
			{
			var NoChild1Age2 = document.getElementById("CustomerPageLayout_ChildAgedown21").selectedIndex;
			var NoChild1AgeVal2= document.getElementById("CustomerPageLayout_ChildAgedown21").options[NoChild1Age2].value;
			//R2Ch1 paramter
			lQueryString = lQueryString + '&R2Ch1Age=' + NoChild1AgeVal2;
			}
			if(NoChildVal2==2)
			{
			var NoChild2Age3 = document.getElementById("CustomerPageLayout_ChildAgedown22").selectedIndex;
			var NoChild2AgeVal3= document.getElementById("CustomerPageLayout_ChildAgedown22").options[NoChild2Age3].value;
			//R2Ch2 parameter
			lQueryString = lQueryString + '&R2Ch2Age=' + NoChild2AgeVal3;
			}
			}
			if(NoRoomsVal==3)
			{
			var NoAdult3 = document.getElementById("CustomerPageLayout_AdultsDropDown3").selectedIndex;
			var NoAdult3Val= document.getElementById("CustomerPageLayout_AdultsDropDown3").options[NoAdult3].value;
			//R3Ad parameter
			lQueryString = lQueryString + '&R3Ad=' + NoAdult3Val;
			var NoChild3 = document.getElementById("CustomerPageLayout_ChildDropDown3").selectedIndex;
			var NoChildVal3= document.getElementById("CustomerPageLayout_ChildDropDown3").options[NoChild3].value;
			//R3Ch paramter
			lQueryString = lQueryString + '&R3Ch=' + NoChildVal3;
			if(NoChildVal3==1 || NoChildVal3==2)
			{
			var NoChild1Age3 = document.getElementById("CustomerPageLayout_ChildAgedown31").selectedIndex;
			var NoChild1AgeVal3= document.getElementById("CustomerPageLayout_ChildAgedown31").options[NoChild1Age3].value;
			//R3Ch1Age parameter
			lQueryString = lQueryString + '&R3Ch1Age=' + NoChild1AgeVal3;
			}
			if(NoChildVal3==2)
			{
			var NoChild2Age4 = document.getElementById("CustomerPageLayout_ChildAgedown32").selectedIndex;
			var NoChild2AgeVal4= document.getElementById("CustomerPageLayout_ChildAgedown32").options[NoChild2Age4].value;
			//R3Ch2Age parameter
			lQueryString = lQueryString + '&R3Ch2Age=' + NoChild2AgeVal4;
			}
			}	

			var lHotelName = '';
                        
			//HotelName paramter
			//var lHotelName = "";
			lQueryString = lQueryString + '&HotelName=' + lHotelName;
			//PartnerID parameter

            var lPartnerId = document.getElementById("hidPartnerId").value;
			lQueryString = lQueryString + '&PartnerId=' + lPartnerId;

			//Hotel ID parameter
			var lHotelID = "-1";
			lQueryString = lQueryString + '&HotelId=' + lHotelID;
			lQueryString = lQueryString + '&NationalityCode=' + document.getElementById("CustomerPageLayout_CountryCodesDropdown1_CountryCodes").options[document.getElementById("CustomerPageLayout_CountryCodesDropdown1_CountryCodes").selectedIndex].value;
			 
			var lFinalUrl = url + lQueryString;

            ShowUrl1(lFinalUrl,"SearchResult", 850, 650, true);
}


///============================================================================
/// Function: chk
///
/// Validates the search box.
///============================================================================
function chk()
{
              var DateText          = document.getElementById('CheckInDateControl1_SelectDD').selectedIndex;
		      var MonthText         = document.getElementById('CheckInDateControl1_SelectMM').selectedIndex;
		      var YearText          = document.getElementById('CheckInDateControl1_SelectYY').selectedIndex;
      			    
		      var lCheckInDateText  = document.getElementById('CheckInDateControl1_SelectDD').options[DateText];
		      var lCheckInMonthText = document.getElementById('CheckInDateControl1_SelectMM').options[MonthText];
	 	      var lCheckInYearText  = document.getElementById('CheckInDateControl1_SelectYY').options[YearText];
        
		      var lCkeckInDateString        = lCheckInDateText.value;
		      var lCkeckInMonthString       = lCheckInYearText.value + lCheckInMonthText.value;
		      //var lCkeckInMonthString       = lCheckInMonthText.value;	
		      var lDateObjectForCurrentDate = new Date();	
    
             lDateObjectForCurrentDate.setDate(lDateObjectForCurrentDate.getDate() + 3);// Add 3 days to todays's  date
  			
              var lMonthFromCheckInDate     = lCkeckInMonthString.substr(5, (parseInt(lCkeckInMonthString.length) - 5));
	          var lYearFromCheckInDate      = lCkeckInMonthString.substr(0, 4);
		      var lArrayValueForCheckInDate = lCheckInMonthText.value;
		      var lMonthNo                  = parseInt(lArrayValueForCheckInDate, 10);
  				
		      var lDateObjectForCheckInDate = new Date(parseInt(lYearFromCheckInDate, 10), (parseInt(lMonthNo, 10) - 1), parseInt(lCkeckInDateString, 10));
		      lDateObjectForCheckInDate.setDate(lDateObjectForCheckInDate.getDate());	

 var lIsValidDaysInMonth = IsValidDaysInMonth(lCkeckInDateString, lMonthNo, lYearFromCheckInDate, 'CustomerPageLayout_DisplayDateControl1');

if (lIsValidDaysInMonth == false)
{
  alert("Please select valid dates!");
  return false;
}
	
      				
      		  var lNationalityIndex = document.getElementById('CustomerPageLayout_CountryCodesDropdown1_CountryCodes').selectedIndex;
	 	      var lNationalityVal   = document.getElementById('CustomerPageLayout_CountryCodesDropdown1_CountryCodes').options[lNationalityIndex].value;
			  
			  if(lNationalityVal <= 0)
			  {
			      alert("Please select a Nationality!");
			      return false;
			  }	 
      				
              var lRegionId = document.getElementById("Regionhidden").value;

			  if(lRegionId > 0)
			  { 
			      GetURL();
			  }
			  else
			  {
			      alert("Please select a Country and Destination!");
			  }
		 }

///============================================================================
/// Function: GetCountry
/// Load the DropDown with the Country List
///============================================================================
function GetCountry()
{
	DisplayDate();

      //  AssignCheckOutDate();

	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 
	var lCountryCode = -1;
	var lCityCode = -1;  
	var lObj = document.getElementById("CountryDropDown");

	lObj.length = 1;
	lObj.options[0].value=-1;
	lObj.options[0].text="Select Country";
	var sortcountryArray = new Array(CountryListArray.length);

	for(var i=0;i<CountryListArray.length;i++)
	{  
		lObj.length++;
		sortcountryArray[i]=new Array(2);
		sortcountryArray[i][0]=CountryListArray[i][0];
		sortcountryArray[i][1]=CountryListArray[i][1];
	}
	sortcountryArray.sort();
	for(var i=1;i<lObj.length ;i++)
	{  
		lObj.options[i].value=sortcountryArray[i-1][1];
		lObj.options[i].text=sortcountryArray[i-1][0];
	}

	var lObj = document.getElementById("CityDropDown");
	lObj.length = 1;
	lObj.options[0].value=-1;
	lObj.options[0].text="Select City";
	lObj.selectedIndex = 0;

  //Set the default value
				
  var lCountryId = -1;

  if (document.getElementById("CountryId") != null)
  {
    lCountryId = document.getElementById("CountryId").value;
  }

  var lObj = document.getElementById("CountryDropDown");   
			 
  for(var i=0;i<lObj.length;i++)
  {
    if(lObj.options[i].value == lCountryId) 
    {
      lObj.selectedIndex = i;
      GetCity();
    }			
  }		
}

///============================================================================
/// Function: GetCity
/// Load the DropDown with the Destination List
///============================================================================
function GetCity()
{
   var lObj = document.getElementById("CountryDropDown");   
   var lCountryCode = lObj[lObj.selectedIndex].value;			                        
   var lCityCode = -1;  
   var lBrowName   = navigator.appName;
   var lBrowNo=parseInt(navigator.appVersion); 

   var lObj = document.getElementById("CityDropDown");
   lObj.length = 1;
   lObj.options[0].value=-1;
   lObj.options[0].text="Select City";
						
   var SortCityArray = new Array(RegionListArray.length);
					 
   for(var i=0;i< RegionListArray.length;i++)
   {  
     if(RegionListArray[i][0] == lCountryCode)
     {
        lObj.length++;
        SortCityArray[i]=new Array(2);
        SortCityArray[i][0]=RegionListArray[i][2];
        SortCityArray[i][1]=RegionListArray[i][1];
     }
   }

   SortCityArray.sort();
				
   for(var i=1;i<lObj.length ;i++)
   {  
      lObj.options[i].value=SortCityArray[i-1][1];
      lObj.options[i].text=SortCityArray[i-1][0];
   }
   
   var lRegionObject = document.getElementById('Regionhidden');
   lRegionObject.value = lCountryCode;
}

///============================================================================
/// Function: GetDistrict
/// Sets the region id on the hidden variables
///============================================================================
function GetDistrict()
{
	var lObj = document.getElementById("CountryDropDown");   
	var lCountryCode = lObj[lObj.selectedIndex].value;
	var lObj = document.getElementById("CityDropDown");   
	var lCityCode = lObj[lObj.selectedIndex].value;
	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 

	var lObj = document.getElementById("CountryDropDown");   
	var lCountryCode = lObj[lObj.selectedIndex].value;
	var lObj = document.getElementById("CityDropDown");   
	var lCityCode = lObj[lObj.selectedIndex].value;
  
	var lRegionObject = document.getElementById('Regionhidden');
	lRegionObject.value = lCityCode;
}

///============================================================================
/// Function: GetNationality
/// Load the DropDown with the Nationaility List
///============================================================================
function GetNationality()
{
      //  AssignCheckOutDate();

	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 
	var lCountryCode = -1;
	var lCityCode = -1;  
	var lObj = document.getElementById("CustomerPageLayout_CountryCodesDropdown1_CountryCodes");

	lObj.length = 1;
	lObj.options[0].value=-1;
	lObj.options[0].text="Select Nationality";
	var sortcountryArray = new Array(NationalityListArray.length);

	for(var i=0;i<NationalityListArray.length;i++)
	{  
		lObj.length++;
		sortcountryArray[i]=new Array(2);
		sortcountryArray[i][0]=NationalityListArray[i][0];
		sortcountryArray[i][1]=NationalityListArray[i][1];
	}
	sortcountryArray.sort();
	for(var i=1;i<lObj.length ;i++)
	{  
		lObj.options[i].value=sortcountryArray[i-1][1];
		lObj.options[i].text=sortcountryArray[i-1][0];
	}
}

///============================================================================
/// Function: GetDates
/// Load the DropDown with the Dates List
///============================================================================
function GetDates()
{
	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 

	var lObj = document.getElementById("CheckInDateControl1_SelectDD");

	var sortcountryArray = new Array(StayDateArray.length);

	for(var i=0;i<StayDateArray.length;i++)
	{  
		lObj.length++;
		sortcountryArray[i]=new Array(2);
		sortcountryArray[i][0]=StayDateArray[i][0];
		sortcountryArray[i][1]=StayDateArray[i][1];
	}
	sortcountryArray.sort();
	for(var i=0;i<lObj.length -1  ;i++)
	{  
		lObj.options[i].value=sortcountryArray[i][1];
		lObj.options[i].text=sortcountryArray[i][0];
		
		if (i ==1)
		{
		  lObj.selected = true;
		}
	}
}
function GetMonth()
{
	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 

	var lObj = document.getElementById("CheckInDateControl1_SelectMM");

	var sortcountryArray = new Array(lArrMonth.length);

	for(var i=0;i<lArrMonth.length;i++)
	{  
		lObj.length++;
		sortcountryArray[i]=new Array(2);
		sortcountryArray[i][0]=lArrMonth[i][0];
		sortcountryArray[i][1]=lArrMonth[i][1];
	}

	for(var i=0;i<lObj.length -1 ;i++)
	{  
		lObj.options[i].value=sortcountryArray[i][1];
		lObj.options[i].text=sortcountryArray[i][0];
	}
}

function GetChildAge()
{
	var lBrowName   = navigator.appName;
	var lBrowNo=parseInt(navigator.appVersion); 

	var lObj2 = document.getElementById("CustomerPageLayout_ChildAgedown32");
    var lObj3 = document.getElementById("CustomerPageLayout_ChildAgedown31");
	var lObj4 = document.getElementById("CustomerPageLayout_ChildAgedown22");
	var lObj5 = document.getElementById("CustomerPageLayout_ChildAgedown21");
	var lObj6 = document.getElementById("CustomerPageLayout_ChildAgedown12");
	var lObj7 = document.getElementById("CustomerPageLayout_ChildAgedown11");

	var sortcountryArray = new Array(ChildAgeArray.length);

	for(var i=0;i<ChildAgeArray.length;i++)
	{  
		lObj2.length++;		
		lObj3.length++;		
		lObj4.length++;		
		lObj5.length++;		
		lObj6.length++;		
		lObj7.length++;		
		sortcountryArray[i]=new Array(2);
		sortcountryArray[i][0]=ChildAgeArray[i][0];
		sortcountryArray[i][1]=ChildAgeArray[i][1];
	}

	for(var i=0;i<lObj2.length-1 ;i++)
	{  
		lObj2.options[i].value=sortcountryArray[i][1];
		lObj2.options[i].text=sortcountryArray[i][0];
		lObj3.options[i].value=sortcountryArray[i][1];
		lObj3.options[i].text=sortcountryArray[i][0];
		lObj4.options[i].value=sortcountryArray[i][1];
		lObj4.options[i].text=sortcountryArray[i][0];
		lObj5.options[i].value=sortcountryArray[i][1];
		lObj5.options[i].text=sortcountryArray[i][0];
		lObj6.options[i].value=sortcountryArray[i][1];
		lObj6.options[i].text=sortcountryArray[i][0];
		lObj7.options[i].value=sortcountryArray[i][1];
		lObj7.options[i].text=sortcountryArray[i][0];												
	}
	
		if (i ==0)
		{
		  lObj2.options[i].selected = true;
		  lObj3.options[i].selected = true;
		  lObj4.options[i].selected = true;
		  lObj5.options[i].selected = true;
		  lObj6.options[i].selected = true;
		  lObj7.options[i].selected = true;		  		  		  		  		  
		}
}

