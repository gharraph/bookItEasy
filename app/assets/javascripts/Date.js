//=======================================================================
// Date computation
//=======================================================================
function DateDifferenceForCheckInOption(xiCheckInDate, xiCheckInMonth, xiCheckInYear, xiNoOfNights, xiDisplayDate)
{
  //===================================================================
  // Get The Object.
  //===================================================================
  var NoOfNightsText    = document.getElementById(xiNoOfNights).selectedIndex;
  var DateText          = document.getElementById(xiCheckInDate).selectedIndex;
  var MonthText         = document.getElementById(xiCheckInMonth).selectedIndex;
  var YearText          = document.getElementById(xiCheckInYear).selectedIndex;
  var lCheckInDateText  = document.getElementById(xiCheckInDate).options[DateText];
  var lCheckInYearText  = document.getElementById(xiCheckInYear).options[YearText]
  var lCheckInMonthText = document.getElementById(xiCheckInMonth).options[MonthText];
  var lNoOfNightsText   =   document.getElementById(xiNoOfNights).options[NoOfNightsText];
  var lNoOfNightsString = lNoOfNightsText.text;
					 
 //===================================================================
 // Displaying Current Date on Page.
 //===================================================================
 var lDateObjectForCurrentDate = new Date();
					
 //===================================================================
 // Check If User Select 'Other' Option
 //===================================================================
 if (lNoOfNightsText.text == "More")
 {
   //=================================================================
   // Take the value from prompt.
   //=================================================================
   var lValueFromPrompt = window.prompt("Please enter your choice",0);

   //=================================================================
   // Check value is numeric or not.
   //=================================================================
  if (IsNumeric(lValueFromPrompt) && lValueFromPrompt != "" && lValueFromPrompt != "0" && (parseInt(lValueFromPrompt, 10) < 365))
  {
      //=============================================================
      // If it is no. add in the dropdown set as select.
     //=============================================================
    var lNightObject = document.getElementById('Nighthidden');
    lNightObject.value = lValueFromPrompt;
    document.getElementById(xiNoOfNights).options[document.getElementById(xiNoOfNights).length-1] = new Option(lValueFromPrompt);
    document.getElementById(xiNoOfNights).options[document.getElementById(xiNoOfNights).length]   = new Option('More');
    document.getElementById(xiNoOfNights).selectedIndex = parseInt(document.getElementById(xiNoOfNights).length) - 2;
    var NoOfNightsTextAgain  = document.getElementById(xiNoOfNights).selectedIndex;
    var lNoOfNightsTextAgain = document.getElementById(xiNoOfNights).options[NoOfNightsTextAgain];
    lNoOfNightsString = lNoOfNightsTextAgain.text;							
   }
   else
   {
      //=============================================================
      // Set selected index of NoOfNights dropdown in error condition.
      //=============================================================
     document.getElementById(xiNoOfNights).selectedIndex = 0;
     lNoOfNightsString = "1";
   }
 }
 else
 {
   var lNightObject = document.getElementById('Nighthidden');
   lNightObject.value = "-1";
 }
					
 //===================================================================
 // Get The value.
 //===================================================================
 var lCkeckInDateString        = lCheckInDateText.value;
 var lCkeckInMonthString       = lCheckInYearText.value + lCheckInMonthText.value;
 var lMonthFromCheckInDate     = lCheckInMonthText.value;
 var lYearFromCheckInDate      =  lCheckInYearText.value;
 var lArrayValueForCheckInDate = lCheckInMonthText.value;
 var lMonthNo                  = parseInt(lArrayValueForCheckInDate, 10);

 var lIsValidDaysInMonth = IsValidDaysInMonth(lCkeckInDateString, lMonthNo, lYearFromCheckInDate, xiDisplayDate);

if (lIsValidDaysInMonth == false)
{
  return;
}				 
 //===================================================================
 // Displaying Date on Page.
 //===================================================================
 var lDateObjectForCheckInDate = new Date(parseInt(lYearFromCheckInDate, 10), (parseInt(lMonthNo, 10) - 1), parseInt(lCkeckInDateString, 10));
 lDateObjectForCheckInDate.setDate(lDateObjectForCheckInDate.getDate() + parseInt(lNoOfNightsString, 10));	

 //===================================================================
 // Check if selected date less than current date if it then set error.
 //===================================================================
 if (lDateObjectForCheckInDate > lDateObjectForCurrentDate)
 {
   document.getElementById(xiDisplayDate).innerHTML = GetDateAsPerLanguage(lDateObjectForCheckInDate.toDateString());

  var element = document.forms[0]['HiddenDate'];

  if (element)
  {
    element.value = '';
  }

  var element = document.forms[0]['HiddenDatevalue'];

  if (element)
  {						
    element.value = lDateObjectForCheckInDate.toDateString();
  }
 }
 else
 {  
   document.getElementById(xiDisplayDate).innerHTML = "Please enter a valid arrival date from today's date.";
   var element = document.forms[0]['HiddenDate'];

   if (element)
   {
      element.value = "Please Select Valid Date";
   }

   var element = document.forms[0]['HiddenDatevalue'];

   if (element)
   {
     element.value = '';
   }
 }
}
 

function ChkDuration()
{
				//=============================================================
				// Take Object of Control To retrive value.
				//=============================================================
				var lCheckInDateIndex   = document.getElementById('CheckInDateControl1_SelectDD').selectedIndex;
				var lCheckInMonthIndex  = document.getElementById('CheckInDateControl1_SelectMM').selectedIndex;
				var lCheckInYearIndex   = document.getElementById('CheckInDateControl1_SelectYY').selectedIndex;
				
				var lCheckOutDateIndex  = document.getElementById('CheckOutDateControl1_SelectDDOut').selectedIndex;
				var lCheckOutmonthIndex = document.getElementById('CheckOutDateControl1_SelectMMOut').selectedIndex;
				var lCheckOutYearIndex  = document.getElementById('CheckOutDateControl1_SelectYYOut').selectedIndex;
				
				var lCheckInDate        = document.getElementById('CheckInDateControl1_SelectDD').options[lCheckInDateIndex];
				var lCheckInMonth       = document.getElementById('CheckInDateControl1_SelectMM').options[lCheckInMonthIndex];
				var lCheckInYear        = document.getElementById('CheckInDateControl1_SelectYY').options[lCheckInYearIndex];
				
				var lCheckOutDate       = document.getElementById('CheckOutDateControl1_SelectDDOut').options[lCheckOutDateIndex];
				var lCheckOutMonth      = document.getElementById('CheckOutDateControl1_SelectMMOut').options[lCheckOutmonthIndex];
				var lCheckOutYear       = document.getElementById('CheckOutDateControl1_SelectYYOut').options[lCheckOutYearIndex];


				//=============================================================
				// Take value from object.
				//=============================================================
				var lCheckInDateText    = lCheckInDate.value;
				var lCheckInMonthText   = lCheckInMonth.value;
				var lCheckInYearText    = lCheckInYear.value;
				
				var lCheckOutDateText   = lCheckOutDate.value;
				var lCheckOutMonthText  = lCheckOutMonth.value;
				var lCheckOutYearText   = lCheckOutYear.value;
			
				//=============================================================
				//  Take Out your Required value.
				//=============================================================
				var lNoInCheckInMonth   = lCheckInMonthText;
				var lNoInCheckInYear    = lCheckInYearText;
				var lNoInCheckOutMonth  = lCheckOutMonthText;
				var lNoInCheckOutYear   = lCheckOutYearText; 
				
				var lMonthNoOfCheckInDate  = parseInt(lNoInCheckInMonth, 10);
				var lMonthNoOfCheckOutDate = parseInt(lNoInCheckOutMonth, 10);
				
				var lDateObjectForCheckInDate  = new Date(parseInt(lNoInCheckInYear, 10), (parseInt(lMonthNoOfCheckInDate, 10) - 1), parseInt(lCheckInDateText, 10));
				var lDateObjectForCheckOutDate = new Date(parseInt(lNoInCheckOutYear, 10), (parseInt(lMonthNoOfCheckOutDate, 10) - 1), parseInt(lCheckOutDateText, 10));
				var lDisplayDateTime           = (lDateObjectForCheckOutDate.getTime() - lDateObjectForCheckInDate.getTime());
				var lDisplayDate               = (parseInt(lDisplayDateTime, 10)/(24*60*60*1000));
				
                var lDate = setdate();
                var lDateObjectForServerDate  = new Date(parseInt(lDate.substring(6,10), 10), (parseInt(lDate.substring(3,5), 10) - 1), parseInt(lDate.substring(0,2), 10));
                 
				if ((lDateObjectForCheckInDate <= lDateObjectForServerDate) || (lDisplayDate <= 0))
				{
				   	alert('Please Select Valid Dates');
				 	return false;
				}
				else
				{
				   	return true;
				      
				}
 
}			

//==========Checkout finish==============================================
//==========Assign Check Out Date=========================
function AssignCheckOutDate()
{
	var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 12);
	var valueofcurrentDate=currentDate.valueOf()+(24*60*60* 1000);
	var newDate =new Date(valueofcurrentDate);
	var lCheckOutMonth= newDate.getMonth() + 1;
	if (lCheckOutMonth <= 9 )
	{
		lCheckOutMonth = '0' + lCheckOutMonth;
	}
	 
	AssignDefaultValueToDropDownControl('CheckOutDateControl1_SelectDDOut',newDate.getDate());
	AssignDefaultValueToDropDownControl('CheckOutDateControl1_SelectMMOut',lCheckOutMonth);
	AssignDefaultValueToDropDownControl('CheckOutDateControl1_SelectYYOut',newDate.getFullYear());
	
	document.getElementById('DisplayDateControl1').innerHTML = "1";
}

function AssignDefaultValueToDropDownControl(xiDropDownList, xiDefaultValue)
			{
				if (xiDefaultValue != null && xiDefaultValue != 0 && xiDefaultValue != '')
				{
					for(var i=0; i<=document.getElementById(xiDropDownList).length; i++)
					{

						if(xiDefaultValue == document.getElementById(xiDropDownList)[i].value)
						{
						document.getElementById(xiDropDownList)[i].selected = true; 
						break;
						}

					}
				}
			}
//=======================================================================
// Convert The Input Date as per language option.
//=======================================================================
function GetDateAsPerLanguage(xiRawDate)
{
	var lCount = 0;
	var lDayFromCheckInDate   = xiRawDate.substr(0, 3);
	var lMonthFromCheckInDate = xiRawDate.substr(4, 3);

	for (lCount = 0 ; lCount < lArrDay.length ; lCount++ )
	{

		if (lArrDay[lCount][0] == lDayFromCheckInDate)
		{
			xiRawDate = xiRawDate.replace(lDayFromCheckInDate, lArrDay[lCount][1]);
		}

	}
				
	for (lCount = 0; lCount < lArrMonth.length; lCount++)
	{

		if (lArrMonth[lCount][0] == lMonthFromCheckInDate)
		{
			xiRawDate = xiRawDate.replace(lMonthFromCheckInDate, lArrMonth[lCount][0]);
		}

	}
	return xiRawDate;
}

				//=============================================================
				// function to check LeapYear.It will take one parameter year.
				//=============================================================
				function CheckLeapYear(xiYear)
				{
					xiYear = parseInt(xiYear, 10);

					if (xiYear%4 == 0)
					{

						if (xiYear%100 != 0)
						{
							return true;
						}
						else
						{ 
							if(xiYear%400 == 0)
							return true;
							else
							return false;
						}

					}

					return false;
				}


//=======================================================================
// Check Input No. is numeric or not.if it is numeric return true
// else return false.
//=======================================================================
function IsValidDaysInMonth(xiDay, xiMonth, xiYear, xiDisplayDate)
{
    var lNumberOfDaysInMonth = 31;

    if (xiMonth == 2)
    {                        
       var lLeapYearForCheckInDate = CheckLeapYear(xiYear);
       lNumberOfDaysInMonth  = 28;

       if (lLeapYearForCheckInDate)
       { 
          lNumberOfDaysInMonth = 29; 
       } 
    }

    if ((xiMonth == 4 || xiMonth == 6 || xiMonth == 9 || xiMonth == 11))
    {
       lNumberOfDaysInMonth = 30;
    }

   //===============================================================
   // Check Date in the Month
   //===============================================================
   if (parseInt(xiDay) > lNumberOfDaysInMonth)
   {
	document.getElementById(xiDisplayDate).innerHTML = "Invalid number of days!";
	var element = document.forms[0]['HiddenDate'];

	if (element)
	{
             element.value = "Please Select Valid Date";
	}

	var element = document.forms[0]['HiddenDatevalue'];


	if (element)
	{
	  // element.value = '';
	}

	return false;
    }
                         
    return true;
}

///============================================================================
/// Function: DisplayDate
/// Displays the date
///============================================================================
function DisplayDate()
{
  //===========================================================================	
  //For Current Date
  //===========================================================================
  var lCurrentDate = new Date();
  var lYear	   = lCurrentDate.getFullYear();
  
  lCurrentDate.setDate(lCurrentDate.getDate() + 12);
  var lCheckInYear = document.getElementById('CheckInDateControl1_SelectYY')
  
  lCheckInYear.length = 0;
	
  // Auto compute the years for 2 years from the current date			
  for (var i=0; i<=1; i++)
  {
    lCheckInYear.length++;
    lCheckInYear.options[i].text  = lYear + i; 
    lCheckInYear.options[i].value = lYear + i; 	
  }
	
	   
  var lCurrentMonth = lCurrentDate.getMonth();
  var lCurrentYear = lCurrentDate.getFullYear();

  document.getElementById('CheckInDateControl1_SelectDD').selectedIndex= lCurrentDate.getDate()- 1;	
  document.getElementById('CheckInDateControl1_SelectMM').selectedIndex = lCurrentMonth;
  document.getElementById('CheckInDateControl1_SelectYY').selectedIndex = 0; 


  var lNoOfNightsText = document.getElementById('NoOfNightsControl1_SelectNN').value;
  var lCheckOutDate   = new Date();

  lCheckOutDate.setDate(lCurrentDate.getDate() + parseInt(lNoOfNightsText));

  document.getElementById('CustomerPageLayout_DisplayDateControl1').innerHTML = GetDateAsPerLanguage(lCheckOutDate.toDateString());
}