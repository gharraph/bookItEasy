///============================================================================
/// This JS contains all script that is used for the working of the room 
/// controls
///============================================================================
function RoomStart( xiRoomControlId,
					xiRoomNoMax,
					xiRoomLabel,
					xiRoomAdultsControlId,
					xiChildControlId,
					xiChildAgeControlId,
					xiChildNoMax,
					xiRoomTypeControlId,
					xiAlternateRoomType,
					xiIsRoomType,
					xiNoOfRoomLabelSet )
{
	/*----public variables-----*/
	
	this.mRoomControlId       = xiRoomControlId;       // RoomDropDown Control Id.
	this.mRoomNo              = xiRoomNoMax;           // Room No. Max.
	this.mRoomLabelId         = xiRoomLabel;           // Room Label Id.
	this.mRoomAdultsControlId = xiRoomAdultsControlId; // Adults DropDown Id.
	this.mChildControlId      = xiChildControlId;      // ChildDropDown Id.
	this.mChildAgeControlId   = xiChildAgeControlId;   // ChildAge Control Id.
	this.mChildNo             = xiChildNoMax;          // Child No. Max.
	this.mRoomTypeControlId   = xiRoomTypeControlId;   // RoomType Control Id.
	this.mAlternateRoomType   = xiAlternateRoomType;   // RoomType Label.
	this.mIsRoomType          = xiIsRoomType;          // RoomType is True or False;
	this.mNoOfRoomLabelSet    = xiNoOfRoomLabelSet;    // No Of Room Label set you want use in The Room Control. 
	/*---- Intial Control SetUp Start ---- */

	var lRoomControl = document.getElementById(xiRoomControlId);
	if (lRoomControl != null)
	{
		addEvent(lRoomControl,'change',RefreshRoomControl);
	}
	
	var lRoomDropDown          = document.getElementById(xiRoomControlId).selectedIndex;
	var lRoomDropDownSelected  = document.getElementById(xiRoomControlId).options[lRoomDropDown];
	
	var lCount = 0;
	for (lCount = 1 ; lCount <= xiRoomNoMax ; lCount++)
	{
		ShowRoomLabel(lCount, 'none');
		
		var lRoomAdultsControl = document.getElementById(mRoomAdultsControlId + lCount);
		if(lRoomAdultsControl != null)
		{
			lRoomAdultsControl.style.display = 'none';
			addEvent(lRoomAdultsControl,'change',RefreshRoomControl);
		}
		
		var lChildControl = document.getElementById(mChildControlId + lCount);
		if(lChildControl != null)
		{
			lChildControl.style.display = 'none';
			addEvent(lChildControl,'change',RefreshRoomControl);
		}
		
		var lRoomTypeControl = document.getElementById(mRoomTypeControlId + lCount);
		if(lRoomTypeControl != null)
		{
			addEvent(lRoomTypeControl, 'change', ValidationForRoomType);
		}
		
		var lChildCount = 0;
		for (lChildCount = 1 ; lChildCount <= xiChildNoMax ; lChildCount++)
		{
			var lChildAgeControl = document.getElementById(mChildAgeControlId + lCount + lChildCount );
			if (lChildAgeControl != null)
			{
				lChildAgeControl.style.display = 'none';
			}
		}
	}
	for (lCount = 1 ; lCount <= lRoomDropDownSelected.value ; lCount++)
	{
		ShowRoomLabel(lCount, '');
		
		ShowAdultsDropDwon(lCount, '');
		
		ShowChildDropDwon(lCount, '');
		//HideAndShowRoomTypeExtra(lCount);
	}
	HideAndShowChildAgeSection();
	ShowHeader();
	if (mIsRoomType)
	{
		HideAndShowRoomType();
	}
	//ValidationForRoomType();
	
	/* ---- Intial Control SetUp End ---- */
}

function RefreshRoomControl(evt)
{
	if (!evt) evt = event;

	ShowControl();
	HideControl();
	HideAndShowChildAgeSection();
	ShowHeader();
	if (mIsRoomType)
	{
		HideAndShowRoomType();
	}
	
	var lBrowName   = (navigator.appName);
	var lBrowNo     = parseInt(navigator.appVersion);
	
	if (lBrowNo <= 4)
	{
		var lEventId = evt.srcElement.id;
	}
	else
	{
		var lEventId = evt.target.id;
	}
	
	if (lEventId.search(/Adult/) != -1)
	{
	if (mIsRoomType)
	{
		HideAndShowRoomTypeExtra(lEventId.substr(mRoomAdultsControlId.length, lEventId.length));
		}
	}
	else if(lEventId.search(/Child/) != -1)
	{
	if (mIsRoomType)
	{
		HideAndShowRoomTypeExtra(lEventId.substr(mChildControlId.length, lEventId.length));
		}
	}
	/*else if(lEventId.search(/RoomDropDown/) != -1)
	{
		var lRoomDropDown          = document.getElementById(mRoomControlId).selectedIndex;
		var lRoomDropDownSelected  = document.getElementById(mRoomControlId).options[lRoomDropDown];
		if (lRoomDropDownSelected.value > 1)
		{
			HideAndShowRoomTypeExtra(lRoomDropDownSelected.value);
		}
	}*/
	if (mIsRoomType)
	{
	ValidationForRoomType();
	}
}

function ShowControl()
{
	var lRoomDropDown          = document.getElementById(mRoomControlId).selectedIndex;
	var lRoomDropDownSelected  = document.getElementById(mRoomControlId).options[lRoomDropDown];
	/* --- Adults,Chid,ChildAge and RoomType DropDown Display Starts Here --- */
	
	for (lCount = 1 ; lCount <= lRoomDropDownSelected.value ; lCount++)
	{
		ShowRoomLabel(lCount, '');
		
		ShowAdultsDropDwon(lCount, '');
		
		var lChildControl = document.getElementById(mChildControlId + lCount);
		if (lChildControl != null)
		{
			lChildControl.style.display = '';
		}
		
		var lChildDropDown          = lChildControl.selectedIndex;
		var lChildDropDownSelected  = lChildControl.options[lChildDropDown];
		
		var lChildCount = 0;
		for (lChildCount = 1 ; lChildCount <= lChildDropDownSelected.value ; lChildCount++)
		{
			var lChildAgeControl = document.getElementById(mChildAgeControlId + lCount + lChildCount );
			if (lChildAgeControl != null)
			{
				lChildAgeControl.style.display = '';
			}
		}
	}
}

function HideControl()
{
	var lRoomDropDown          = document.getElementById(mRoomControlId).selectedIndex;
	var lRoomDropDownSelected  = document.getElementById(mRoomControlId).options[lRoomDropDown];

	var lNextCount = parseInt(lRoomDropDownSelected.value) + 1;
	for (lCount = lNextCount ; lCount <= mRoomNo ; lCount++)
	{
		
		ShowRoomLabel(lCount, 'none');
		
		ShowAdultsDropDwon(lCount, 'none');
		
		var lChildControl = document.getElementById(mChildControlId + lCount);
		if (lChildControl != null)
		{
			lChildControl.style.display = 'none';
		}
	}
}

function HideAndShowChildAgeSection()
{
	for (lCount = 1 ; lCount <= mRoomNo ; lCount++)
	{
		var lChildControl = document.getElementById(mChildControlId + lCount);
		if(lChildControl != null)
		{
			if(lChildControl.style.display == '')
			{
				var lChildDropDown          = lChildControl.selectedIndex;
				var lChildDropDownSelected  = lChildControl.options[lChildDropDown];
				
				if(lChildDropDownSelected.value > 0)
				{
					for (lChildCount = 1 ; lChildCount <= lChildDropDownSelected.value ; lChildCount++)
					{
						var lChildAgeControl = document.getElementById(mChildAgeControlId + (lCount) + lChildCount );
						if (lChildAgeControl != null)
						{
							lChildAgeControl.style.display = '';
						}
					}
					for (lChildCount = parseInt(lChildDropDownSelected.value) + 1 ; lChildCount <= mChildNo ; lChildCount++)
					{
						var lChildAgeControl = document.getElementById(mChildAgeControlId + (lCount) + lChildCount );
						if (lChildAgeControl != null)
						{
							lChildAgeControl.style.display = 'none';
						}
					}
					
				}
				else
				{
					for (lChildCount = 1 ; lChildCount <= mChildNo ; lChildCount++)
					{
						var lChildAgeControl = document.getElementById(mChildAgeControlId + (lCount) + lChildCount );
						if (lChildAgeControl != null)
						{
							lChildAgeControl.style.display = 'none';
						}
					}
				}
			}
			else
			{
				for (lChildCount = 1 ; lChildCount <= mChildNo ; lChildCount++)
				{
					var lChildAgeControl = document.getElementById(mChildAgeControlId + (lCount) + lChildCount );
					if (lChildAgeControl != null)
					{
						lChildAgeControl.style.display = 'none';
					}
				}
			}
		}
	}
}

function HideAndShowRoomType()
{
	for (lCount = 1 ; lCount <= mRoomNo ; lCount++)
	{
		var lAdultsDropDown          = document.getElementById(mRoomAdultsControlId + lCount).selectedIndex;
		var lAdultsDropDownSelected  = document.getElementById(mRoomAdultsControlId + lCount).options[lAdultsDropDown];
	
		var lChildDropDown           = document.getElementById(mChildControlId + lCount).selectedIndex;
		var lChildDropDownSelected   = document.getElementById(mChildControlId + lCount).options[lChildDropDown];
		
		var lTotal = parseInt(lAdultsDropDownSelected.value + lChildDropDownSelected.value);
		var lRoomTypeControl            = document.getElementById(mRoomTypeControlId + lCount);
		var lAlternateRoomTypeControl   = document.getElementById(mAlternateRoomType + lCount);
		if(document.getElementById(mRoomAdultsControlId + lCount).style.display == '' ||
		 document.getElementById(mChildControlId + lCount).style.display == '')
		 {
			switch(lTotal)
			{
				case 10:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[1], lRoomTypeForValue[1]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[1];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 11:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 12:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 20:
				{
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 21:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 22:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 30:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[4], lRoomTypeForValue[4]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[4];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break;
				}
				case 31:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[5], lRoomTypeForValue[5]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[5];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 32:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[13], lRoomTypeForValue[13]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[13];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 40:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[5], lRoomTypeForValue[5]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[5];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 41:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[13], lRoomTypeForValue[13]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[13];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 42:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[14], lRoomTypeForValue[14]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[14];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				default:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.innerHTML = '';
						lAlternateRoomTypeControl.style.display = 'none';
					}
				}
			}
		}
		else
		{
			if(lRoomTypeControl != null)
			{
				lRoomTypeControl.style.display        = 'none';
			}
			if(lAlternateRoomTypeControl != null)
			{
				lAlternateRoomTypeControl.innerHTML = '';
				lAlternateRoomTypeControl.style.display = 'none';
			}
		}
	}
}

function ShowHeader()
{
	var lCount      = 0;
	var lChildCount = 0;
	document.getElementById('ChildAgeHeader').style.display = 'none';
	for (lCount = 1 ; lCount <= mRoomNo ; lCount++)
	{
		for (lChildCount = 1 ; lChildCount <= mChildNo ; lChildCount++)
		{
			var lChildAgeControl = document.getElementById(mChildAgeControlId + (lCount) + lChildCount );
			if (lChildAgeControl != null)
			{
				if(lChildAgeControl.style.display == '')
				{
					document.getElementById('ChildAgeHeader').style.display = '';
				}
			}
		}
	}
}


// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
function addEvent(obj,event_name,func_name)
{
	if (obj.attachEvent)
	{
		obj.attachEvent("on"+event_name, func_name);
	}
	else if(obj.addEventListener)
	{
		obj.addEventListener(event_name,func_name,true);
	}
	else
	{
		obj["on"+event_name] = func_name;
	}
}

function ClearDropDown(xiDropDown)
{
    var lCityCount = 0;
    var lDropDownLength = xiDropDown.options.length;
    
    for( lCityCount = 0 ; lCityCount < lDropDownLength ; lCityCount++ )
    {
      xiDropDown.options[0] = null;
    }
}

function HideAndShowRoomTypeExtra(xiCount)
{
	//for (lCount = 1 ; lCount <= mRoomNo ; lCount++)
	//{
		var lCount = xiCount;
		var lAdultsDropDown          = document.getElementById(mRoomAdultsControlId + lCount).selectedIndex;
		var lAdultsDropDownSelected  = document.getElementById(mRoomAdultsControlId + lCount).options[lAdultsDropDown];
	
		var lChildDropDown           = document.getElementById(mChildControlId + lCount).selectedIndex;
		var lChildDropDownSelected   = document.getElementById(mChildControlId + lCount).options[lChildDropDown];
		
		var lTotal = parseInt(lAdultsDropDownSelected.value + lChildDropDownSelected.value);
		var lRoomTypeControl           = document.getElementById(mRoomTypeControlId + lCount);
		
		var lAlternateRoomTypeControl   = document.getElementById(mAlternateRoomType + lCount);
		if(document.getElementById(mRoomAdultsControlId + lCount).style.display == '' ||
		 document.getElementById(mChildControlId + lCount).style.display == '')
		 {
			switch(lTotal)
			{
				case 10:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[1], lRoomTypeForValue[1]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[1];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 11:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[15], '0');
						lRoomTypeControl.options[1] = new Option(lRoomTypeForText[3], lRoomTypeForValue[3]);
						lRoomTypeControl.options[2] = new Option(lRoomTypeForText[11], lRoomTypeForValue[11]);
						lRoomTypeControl.options[3] = new Option(lRoomTypeForText[12], lRoomTypeForValue[12]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 12:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[15], '0');
						lRoomTypeControl.options[1] = new Option(lRoomTypeForText[4], lRoomTypeForValue[4]);
						lRoomTypeControl.options[2] = new Option(lRoomTypeForText[12], lRoomTypeForValue[12]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 20:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[15], '0');
						lRoomTypeControl.options[1] = new Option(lRoomTypeForText[2], lRoomTypeForValue[2]);
						lRoomTypeControl.options[2] = new Option(lRoomTypeForText[3], lRoomTypeForValue[3]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 21:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
						
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[15], '0');
						lRoomTypeControl.options[1] = new Option(lRoomTypeForText[11], lRoomTypeForValue[11]);
						lRoomTypeControl.options[2] = new Option(lRoomTypeForText[10], lRoomTypeForValue[10]);
						lRoomTypeControl.options[3] = new Option(lRoomTypeForText[4], lRoomTypeForValue[4]);
						lRoomTypeControl.options[4] = new Option(lRoomTypeForText[12], lRoomTypeForValue[12]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 22:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = '';
					
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[15], '0');
						lRoomTypeControl.options[1] = new Option(lRoomTypeForText[5], lRoomTypeForValue[5]);
						lRoomTypeControl.options[2] = new Option(lRoomTypeForText[12], lRoomTypeForValue[12]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = 'none';
					}
					break
				}
				case 30:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[4], lRoomTypeForValue[4]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[4];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break;
				}
				case 31:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[5], lRoomTypeForValue[5]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[5];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 32:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[13], lRoomTypeForValue[13]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[13];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 40:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForText[5], lRoomTypeForValue[5]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[5];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 41:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[13], lRoomTypeForValue[13]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[13];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				case 42:
				{
					if(lRoomTypeControl != null)
					{
						lRoomTypeControl.style.display = 'none';
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.options[0] = new Option(lRoomTypeForValue[14], lRoomTypeForValue[143]);
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.style.display = '';
						lAlternateRoomTypeControl.innerHTML = lRoomTypeForText[14];
					}
					else
					{
						lRoomTypeControl.style.display = '';
					}
					break
				}
				default:
				{
					if(lRoomTypeControl != null)
					{
						ClearDropDown(lRoomTypeControl);
						lRoomTypeControl.style.display = 'none';
					}
					if(lAlternateRoomTypeControl != null)
					{
						lAlternateRoomTypeControl.innerHTML = '';
						lAlternateRoomTypeControl.style.display = 'none';
					}
				}
			}
		}
		else
		{
			if(lRoomTypeControl != null)
			{
				ClearDropDown(lRoomTypeControl);
				lRoomTypeControl.style.display        = 'none';
			}
			if(lAlternateRoomTypeControl != null)
			{
				lAlternateRoomTypeControl.innerHTML = '';
				lAlternateRoomTypeControl.style.display = 'none';
			}
		}
}

function ShowRoomLabel(xiCurrentRoomIndex, xiDisplayText)
{
	for (var lCount = 1; lCount <= mNoOfRoomLabelSet; lCount++)
	{
		var lIdIndex = String(xiCurrentRoomIndex) + String(lCount);
		var llRoomLabelControl = document.getElementById(mRoomLabelId + lIdIndex);
		if(llRoomLabelControl != null)
		{
			llRoomLabelControl.style.display = xiDisplayText;
		}
	}
}

function ShowAdultsDropDwon(xiCurrentAdultsIndex, xiDisplayText)
{
	var lRoomAdultsControl = document.getElementById(mRoomAdultsControlId + xiCurrentAdultsIndex);
	if (lRoomAdultsControl != null)
	{
		lRoomAdultsControl.style.display = xiDisplayText;
	}
}

function ShowChildDropDwon(xiCurrentChildIndex, xiDisplayText)
{
	var lChildControl = document.getElementById(mChildControlId + xiCurrentChildIndex);
	if (lChildControl != null)
	{
		lChildControl.style.display = xiDisplayText;
	}
}

function ValidationForRoomType()
{
	var lRoomDropDown          = document.getElementById(mRoomControlId).selectedIndex;
	var lRoomDropDownSelected  = document.getElementById(mRoomControlId).options[lRoomDropDown];
	var element = document.forms[0]['lHiddenFieldRoomType'];
	if (element) 
	{
		element.value = '';
	}
	
	for (var lCount = 1 ; lCount <= lRoomDropDownSelected.value ; lCount++)
	{
		var lRoomTypeDropDownControl = document.getElementById(mRoomTypeControlId + lCount);
		if (lRoomTypeDropDownControl.style.display == '')
		{
			var lRoomTypeDropDown          = lRoomTypeDropDownControl.selectedIndex;
			if (lRoomTypeDropDown >= -1)
			{
				var lRoomTypeDropDownSelected  = lRoomTypeDropDownControl.options[lRoomTypeDropDown];
				
				if (lRoomTypeDropDownSelected.value == '0')
				{
					element.value = lRoomTypeForText[16];
				}
			}
			else
			{
				element.value = lRoomTypeForText[16];
			}
		}
	}
}

