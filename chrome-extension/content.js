(function(){
    // Convert array to object
    var convArrToObj = function(array){
        var thisEleObj = new Object();
        if(typeof array == "object"){
            for(var i in array){
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        }else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function(input){
        if(oldJSONStringify(input) == '[]')
            return oldJSONStringify(convArrToObj(input));
        else
            return oldJSONStringify(input);
    };
})();

let username = '';

const getCurrentTabUrl = (callback) => {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    const tab = tabs[0];
    const url = tab.url;
    console.assert(typeof url === 'string', 'tab.url should be a string');

    callback(url);
  });
};

const renderStatus = (statusText) => {
  //document.getElementById('status').textContent = statusText;
};

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    //renderStatus(url);
  });
  
  addSearch();
  loginLoaded();
});

const addSearch = () => {
  const findBtn = document.getElementById('find');
  findBtn.addEventListener('click', () => {
    const value = document.getElementById('search').value;
    const searchName = document.getElementById('searchName').value;
    console.log(value);
    $.ajax({
      url: 'https://lead-coaster.herokuapp.com/api/v1/adddata',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        username:username,
        urlSearch:value,
        searchName:searchName
      },
      success: function(response) {
        console.log(response);
        $('.add-status').text('');
        if(response.successfully_updated){
          $('.add-status').text('url added');
        }
        else if(response.successfully_created){
           $('.add-status').text('url added');
        }
        else {
          $('.add-status').text('failed');
        }
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  });
}

const loginLoaded = () => {
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    $('#loginBtn').attr('disabled',true);
    $('#loginBtn').text('wait');
    $.ajax({
      url: 'https://lead-coaster.herokuapp.com/login-chrome',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        console.log(response);
        $('#loginBtn').attr('disabled',false);
        $('#loginBtn').text('login');
        $('.login-status').text('');
        if(response.login === 'success'){
          username = email;
          $('.loginField').hide();
          $('.searchField').show();
        } else {
          $('.login-status').text('username/password wrong')
        }
        // if(response.data.length === 0){
        //   console.log('zero')
        //   $('.login-status').text('username/password wrong')
        // }else{
        //   console.log('ada');
        //   username = email;
        //   //const profileVisit = JSON.parse(response.data[0].profileVisit);
        //   $('.loginField').hide();
        //   $('.searchField').show();
        // }
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  });
}
