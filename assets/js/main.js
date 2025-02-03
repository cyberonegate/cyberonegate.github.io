$(document).ready(function() {
    $("#btn-getTotp").click(function(event) {
        event.preventDefault();

        let token = $("#token").val().trim();
        if (!token) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a token!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        let apiUrl = `https://api.2hglobalstore.com/Home/GetTOTP/${token}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Server error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                $("#totp").val(data);
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch TOTP. Please try again!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    });

    $("#btn-copy-totp").click(function(event) {
        event.preventDefault();
        let totpText = $("#totp").val();
        navigator.clipboard.writeText(totpText);
    });

    $("#btn-transform").click(function(event) {
        event.preventDefault();
        let inputData = $("#data").val();
        let jsonData = JSON5.parse(inputData);

        $("#json-result").val(jsonData);
        $('#json').jsonViewer(jsonData);

        try {


        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid JSON format. Please enter valid JSON data!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    $("#btn-copy-json").click(function(event) {
        event.preventDefault();
        let jsonResult = $("#json-result").val();
        jsonResult = JSON5.stringify(jsonResult, null, 4);
        navigator.clipboard.writeText(jsonResult);
    });
});
