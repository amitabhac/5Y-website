
var userDetail = new Object();
var ClientID = '08AD21B8-A8CD-45CF-B8EA-04DF3C0A376A';
//var CLIENT_ID = '827260551295-qcu4l87408eobpj5bop6ml1t8lfg508c.apps.googleusercontent.com'; //5y account
var CLIENT_ID = GoogleClientID; //5y account
var fbAppId = FacebookAppID;
var SCOPES = ["https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email"];
$(document).ready(function () {
    //var appid = "1617225365204598";
    var appid = fbAppId;
    var loggedin = false;
    FB.init({ appId: appid, status: true, cookie: true, xfbml: true });
    //FB.getLoginStatus(function (response) {
    //    if (response.authResponse) {
    //        fbtoken = response.authResponse.accessToken;
    //        fbuserid = response.authResponse.userID;
    //        var eventData = {
    //            "access_token": fbtoken
    //        }
    //        fetchFBUserInfo(fbuserid, eventData, fbtoken);
    //    }
    //    else {

    //    }
    //});
});

// Login through Facebook
$("#btnfacebookLogin").off("click");
$("#btnfacebookLogin").on("click", function (e) {
    e.stopPropagation();
    FB.login(function (response) {
        if (response.authResponse) {
            fbtoken = response.authResponse.accessToken;
            fbuserid = response.authResponse.userID;
            var eventData = {
                "access_token": fbtoken
            }
            fetchFBUserInfo(fbuserid, eventData, fbtoken);

        }
        else {

        }
    }, {
        scope: 'user_events,rsvp_event,user_friends,user_birthday,publish_actions,user_posts,user_photos,user_videos,user_location',
        return_scopes: true
    });
});

// Fetch the Facebook Logged In User Profile
function fetchFBUserInfo(user, eventData, fbtoken) {
    FB.api(
        "/" + user, eventData, { fields: 'id,name,email,birthday,location,first_name,last_name,cover,gender,picture' },
        function (response) {
            if (response && !response.error) {
                createCommonObject(response, "facebook", fbtoken);
            }
        }
    );


}

// Login through G+
$("#btnGoogleLogin").off("click");
$("#btnGoogleLogin").on("click", function (e) {
    e.stopPropagation();
    handleAuthClick();
});

// Check Autherization
function checkAuth() {
    gapi.auth.authorize(
 {
     'client_id': CLIENT_ID,
     'scope': SCOPES.join(' '),
     'immediate': true
 }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        // then load client library.
        gapi.auth.setToken({
            access_token: authResult.access_token
        });
        gapi.client.load('oauth2', 'v2', function () {
            gapi.client.oauth2.userinfo.get()
              .execute(function (resp) {
                  if (!resp.error) {
                      createCommonObject(resp, "google", authResult.access_token)
                  }
              });
        });

        //gapi.client.load('plus', 'v1', function () {
        //    var request = gapi.client.plus.people.get({
        //        'userId': 'me'
        //    });
        //    request.execute(function (resp) {
        //        if (!resp.error) {

        //        }
        //    });
        //});

    } else {


    }
}

function handleAuthClick(event) {
    gapi.auth.authorize(
      { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
      handleAuthResult);
    return false;
}


// Common Object to be passed to Service
function createCommonObject(response, loggedFrom, token) {
    var userProfile = new Object();
    userProfile.ClientID = ClientID;
    userProfile.UserName = response.name;
    userProfile.DisplayName = response.name;
    if (response.gender != undefined) {
        if (response.gender.indexOf("fe") > -1) {
            userProfile.gender = 'f';
        }
        else {
            userProfile.gender = 'm';
        }
    }
    userProfile.Gender = response.gender;
    if (response.email != undefined)
        userProfile.EmailID = response.email;
    userProfile.UserID = response.id;
    userProfile.socialID = response.id;
    userProfile.TokenID = token;
    if (loggedFrom == "google") {
        userProfile.DateOfBirth = "";
        userProfile.PhoneNumber = "";
        if (response.picture != undefined)
            userProfile.UserPhoto = response.picture;
        userProfile.FirstName = response.given_name;
        userProfile.LastName = response.family_name;
    }
    else if (loggedFrom == "facebook") {
        if (response.birthday != undefined)
            userProfile.DateOfBirth = response.birthday;
        userProfile.PhoneNumber = "";
        if (response.picture != undefined)
            userProfile.UserPhoto = response.picture.data.url;
        userProfile.FirstName = response.first_name;
        userProfile.LastName = response.last_name;
    }

    userProfile.LoginTokenId = token;
    userProfile.AccountType = loggedFrom;
    userProfile.IsSocialMediaLogin = true;

    socialMediaLogin(userProfile);
}
var isSocialMediaLogin = false;
var accountType, loginTokenId, socialID;
function socialMediaLogin(userProfile) {
    $.ajax({
        type: "POST",
        url: CommonServices_URL + "/svcUserManagementService.svc/LoginBySocialMediaAccount",
        //url: "http://localhost:2268/svcUserManagementService.svc/LoginBySocialMediaAccount",
        data: '{"dtoObj":' + JSON.stringify(userProfile) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.LoginBySocialMediaAccountResult.RCode == 'first time') {
                //  ClientID = response.LoginBySocialMediaAccountResult.RData.ClientID;
                $("#registrationForm").css("display", "block");
                $("#registrationForm").text("Profile Creation");

                var userphoto = userProfile.UserPhoto;
                $(".user_image").css('background', 'url(' + userphoto + ')');
                $(".user_image").css('-webkit-background-size', 'cover !important');
                $(".user_image").css('-moz-background-size', 'cover !important');
                $(".user_image").css('-o-background-size', ' cover !important');
                $(".user_image").css('background-size', 'cover !important');

                $("#txtemail").val(userProfile.EmailID);

                $("#txtfirstName").val("");
                $("#txtlastName").val("");

                $("#txtdisplayName").val("");
                $("#txtdatetimepicker1").val("");

                $("#divpassword").hide();

                $("#birthDate").val("");

                switch (userProfile.Gender) {
                    case 'm':
                        $("#maleRadio").attr("checked", true);
                        $("#femaleRadio").attr("checked", false);
                        break;
                    case 'f':
                        $("#femaleRadio").attr("checked", true);
                        $("#maleRadio").attr("checked", false);
                        break;
                }
                //$("#country").val(userProfile.Location.trim(' '));
                isSocialMediaLogin = true;
                loginTokenId = userProfile.LoginTokenId;
                accountType = userProfile.AccountType;
                socialID = userProfile.socialID;
                $("#login-modal2").modal('show');
            }
            else if (response.LoginBySocialMediaAccountResult.RCode == 'Existing') {
                userProfile.ClientID = ClientID;//response.LoginBySocialMediaAccountResult.RData.ClientID;
                userProfile.UserID = response.LoginBySocialMediaAccountResult.RData.UserID;
                setdata(userProfile);
                window.location.href = "default.aspx";
            }
        },
        processdata: false, //True or False  
        crossdomain: true,
        failure: function (response) {
            alert("failure in fetch call");
            $("#login-modal2").modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error in fetch call");
        }
    });

    // on Submit of Registration Form
    $("#register").off("click");
    $("#register").on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        alert("clicked");


        $("#firstName").val(userProfile.UserName);
        $("#email").val(userProfile.EmailID);
        $("#birthDate").val(userProfile.DateOfBirth);
        switch (userProfile.Gender) {
            case 'm':
                $("#maleRadio").attr("checked", true);
                $("#femaleRadio").attr("checked", false);
                break;
            case 'f':
                $("#femaleRadio").attr("checked", true);
                $("#maleRadio").attr("checked", false);
                break;
        }
        jQuery.support.cors = true;

    });
}


$('#login-modal2').on('shown', function () {
    $('#txtemail').focus();
})
$('#login-modal2').on('shown.bs.modal', function () {
    $('#txtemail').focus();
})

// Variables declaration end
// Key press or click events start
$(document).on('keypress', function (e) {
    debugger;
    if (e.which === 13) {
        // Check if modal window is opened
        if ($("#loginDiv").hasClass("none")) {
            if (!$("#registerDiv").hasClass("none")) {
                // Registration window is open now check for authentication
                btnRegistrationClicked(e);
            }
            else
                // login window is open now check for authentication
                if (e.target.id == "txtUserName" || e.target.id == "txtPassword") {
                    UserAuthentication();
                }
        }
        else {
            // login window is open now check for authentication
            if (e.target.id == "txtUserName" || e.target.id == "txtPassword") {
                UserAuthentication();
            }
        }
    }
});



$(document).on("click", "#btn_Loginclose", function (e) {
    window.history.back();

});



/// Triggered when user request for registration.
$(document).off("click", "#login_register_btn");
$(document).on("click","#login_register_btn",function (e) {
    isSocialMediaLogin = false;
    $("#loginDiv").hide(function () {

        $("#registerDiv").show(1000);
    });
   
    $('#txtemail').focus();
});

var UserProfileDTO = new Object();

/// This will take registration request, process data and make service calls.
$(document).on("click", "#btnSubmitRegistration",function (e) {
    btnRegistrationClicked(e);
});

//Author:sharat
//Purpose: To close the register pane on click of close button
$(document).on("click", "#btn_registerclose",function (e) {
    $("#registerDiv").hide(function () {
        $("#loginDiv").show(1000);
    });
        
});

function btnRegistrationClicked(e) {
    UserProfileDTO = new Object();
    UserProfileDTO.ClientID = ClientID;
    var isvalid = ValidateRegistrationForm();
    if (isvalid) {

        SubmitRegistration();
    }
    $("#txtpassword").text("");
};

function ValidateRegistrationForm() {
    var gender = $(".genderselect input[type='radio']:checked").val()
    if (gender == 'Male') {
        gender = "m";
    }
    else {
        gender = "f";
    }
    UserProfileDTO.EmailID = $("#txtemail").val();
    if (!isSocialMediaLogin) {
        UserProfileDTO.Password = $("#txtpassword").val();
    }
    else {
        UserProfileDTO.Password = "";
    }
    UserProfileDTO.FirstName = $("#txtfirstName").val();
    UserProfileDTO.LastName = $("#txtlastName").val();
    UserProfileDTO.DisplayName = $("#txtdisplayName").val();
    UserProfileDTO.Gender = gender;
    UserProfileDTO.UserPhoto = "";
    UserProfileDTO.ClientID = "08AD21B8-A8CD-45CF-B8EA-04DF3C0A376A";
    UserProfileDTO.UserID = "";
    UserProfileDTO.UserName = UserProfileDTO.EmailID;
    UserProfileDTO.DateOfBirth = $('#txtdatetimepicker1').val();

    var isvalid = true;
    var message = "";

    if (CheckForEmptyString(UserProfileDTO.EmailID)) {
        isvalid = false;
        message += "E-MailId is mandatory feild\n";
    }
    if (!isSocialMediaLogin) {
        if (CheckForEmptyString(UserProfileDTO.Password)) {
            isvalid = false;
            message += "Password is mandatory feild\n";
        }
        else {
            var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!(pattern.test(UserProfileDTO.Password))) {
                isvalid = false;
                message = 'The password should be in between 7 to 15 characters which contain atleast one numeric digit and a special character';
            }
        }
    }
    if (CheckForEmptyString(UserProfileDTO.FirstName)) {
        isvalid = false;
        message += "FirstName is mandatory feild\n";
    }
    if (CheckForEmptyString(UserProfileDTO.LastName)) {
        isvalid = false;
        message += "LastName is mandatory feild\n";
    }
    if (CheckForEmptyString(UserProfileDTO.DisplayName)) {
        isvalid = false;
        message += "DisplayName is mandatory feild\n";
    }
    if (isvalid) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(UserProfileDTO.EmailID)) {
            isvalid = false;
            message = "Please enter valid email Id";
        }
    }
    if (!isvalid) {
        alert(message);
    }

    return isvalid;
};

function SubmitRegistration() {
    debugger
    jQuery.support.cors = true;
    if (!isSocialMediaLogin) {
        socialID = '';
    }
    //   var socialID = " ";
    $.ajax({
        type: "POST",
        url: CommonServices_URL + "/svcUserManagementService.svc/RegisterUser",
        //url: "http://localhost:2268/svcUserManagementService.svc/RegisterUser",
        data: '{"dtoObj":' + JSON.stringify(UserProfileDTO) + ',"isSocialMediaLogin":"' + isSocialMediaLogin + '","socialID":"' + socialID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != undefined) {
                var result = response.RegisterUserResult;
                if (result != undefined) {
                    if (result.Status == -1) {
                        alert("User with same EmailID already exists!");
                    }
                    else if (result.Status == 1 || result.status == 2) {
                        alert("Error During Registration, Contact Admin!");
                    }
                    else {
                        if (isSocialMediaLogin) {
                            UserProfileDTO.LoginTokenId = loginTokenId;
                            UserProfileDTO.AccountType = accountType;
                            UserProfileDTO.IsSocialMediaLogin = true;
                        }
                        UserProfileDTO.UserID = response.RegisterUserResult.RData;
                        setdata(UserProfileDTO);
                        window.location.href = "index.html";
                    }
                }
            }
        },
        processdata: false, //True or False  
        crossdomain: true,
        failure: function (response) {
            alert("failure in fetch call");
            $("#login-modal2").modal('show');
            // catchException(response, msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("error in fetch call");
            var response = JSON.parse(jqXHR.responseText.split('<')[0]);
            if (response != undefined) {
                var result = response.RegisterUserResult;
                if (result != undefined) {
                    if (result.Status == -1) {
                        alert("User with same EmailID already exists!");
                    }
                    else if (result.Status == 1 || result.status == 2) {
                        alert("Error During Registration, Contact Admin!");
                    }
                    else {
                        if (isSocialMediaLogin) {
                            UserProfileDTO.LoginTokenId = loginTokenId;
                            UserProfileDTO.AccountType = accountType;
                            UserProfileDTO.IsSocialMediaLogin = true;
                        }
                        UserProfileDTO.UserID = response.RegisterUserResult.RData;
                        setdata(UserProfileDTO);
                        window.location.href = "default.aspx";
                    }
                }
            }

        }
    });
};



/// Will submit the authetication requets to service.
$(document).on("click","#btnSubmit1",function (e) {
    UserAuthentication(e);
});




$(document).on("click","#rdbfemaleRadio,#rdbmaleRadio",function (event) {
    if (event.currentTarget.id == 'rdbfemaleRadio') {
        $('#rdbmaleRadio').attr('checked', false);
    }
    else {
        $('#rdbfemaleRadio').attr('checked', false);
    }
});


//$('#txtdatetimepicker1').val(currentDate);


function UserAuthentication(e) {
    var username = $("#txtUserName").val();
    var password = $("#txtPassword").val();
    var isvalid = true;
    var message = "";
    if (CheckForEmptyString(username)) {
        isvalid = false;
        message = "Please provide username!\n";
    }
    if (CheckForEmptyString(password)) {
        isvalid = false;
        message += "Please provide password!";
    }
    if (!isvalid) {
        alert(message);
    }
    else {
        jQuery.support.cors = true;
        var AuthenticationDTO = new Object();
        AuthenticationDTO.UserName = username;
        AuthenticationDTO.Password = password;
        AuthenticationDTO.ClientID = "08AD21B8-A8CD-45CF-B8EA-04DF3C0A376A";
        AuthenticationDTO.IsClientSpecific = "false";
        AuthenticationDTO.PreAuthTokenID = "";

        $.ajax({
            type: "POST",
            url: CommonServices_URL + "/svcUserManagementService.svc/AuthenticateUser",
            // url: "http://localhost:2268/svcUserManagementService.svc/AuthenticateUser",
            data: '{"dtoObj":' + JSON.stringify(AuthenticationDTO) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                UserAuthenticationSuccess(response);
            },
            processdata: false, //True or False  
            crossdomain: true,
            failure: function (response) {
                alert("failure in fetch call");
                $("#login-modal2").modal('show');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var response = JSON.parse(jqXHR.responseText.split('<')[0]);
                UserAuthenticationSuccess(response);
                //alert("error in fetch call");
            }
        });
    }
};


function initDateTimePicker() {

    jQuery("#txtdatetimepicker1").datetimepicker({
        timepicker: false,
        //value: Date(),
        //value: function (e)
        //{ $('#txtuser_DOB').val(Date()); return  Date();},//Date(),
        format: 'm/d/Y',
        //defaultDate:,
        lang: 'en',
        mask: false,
    });

}


function UserAuthenticationSuccess(response) {
    if (response.AuthenticateUserResult.Status == 1) {
        $("#txtPassword").text("");
        alert("Invalid username or password");
    }
    else if (response.AuthenticateUserResult.Status == -1) {
        alert("UserName and Password is mandatory field ")
    }
    else if (response.AuthenticateUserResult.Status == 0) {
        $("#txtPassword").text("");
        $("#txtUserName").text("");
        setdata(response.AuthenticateUserResult.RData);
        authDone();
        //  window.location.href = "default.aspx";
    }
    else {
        alert("Login !");
    }
}
// This function will store data in local storage for future usage.
function setdata(userProfile) {
    debugger
    userDetail.UserID = userProfile.UserID;
    userDetail.UserName = userProfile.UserName;
    userDetail.ClientID = userProfile.ClientID;
    userDetail.TokenID = userProfile.TokenID;
    //userDetail.IsFirstLogin = userDetail.
    userDetail.DisplayName = userProfile.DisplayName;
    userDetail.Gender = userProfile.Gender;
    userDetail.UserPhoto = userProfile.UserPhoto;
    userDetail.EmailID = userProfile.EmailID;
    if (userProfile.IsSocialMediaLogin) {
        userDetail.LoginTokenId = userProfile.LoginTokenId;
        userDetail.AccountType = userProfile.AccountType;
    }
    if (userProfile.IsFirstLogin != undefined) {
        userDetail.IsFirstLogin = userProfile.IsFirstLogin;
    }
    if (userProfile.IsFirstLoginOfDay != undefined) {
        userDetail.IsFirstLoginOfDay = userProfile.IsFirstLoginOfDay;
    }
    userDetail.UserTypeCode = userProfile.UserTypeCode;
    userDetail.UserLastLoginSession = userProfile.UserLastLoginSession;
    window.sessionStorage.removeItem("userDetail");
    window.sessionStorage.setItem("userDetail", JSON.stringify(userDetail));
}

// Will check for empty/null string
function CheckForEmptyString(str) {
    if (str && str != '') return false;
    else return true
}
