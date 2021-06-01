const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
const alertBox = document.getElementById('alert-box')

const handleAlerts = (type, msg) =>
{
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
        `
}

Dropzone.autoDiscover = false;
const myDropzone = new Dropzone('#my-dropzone', {
    url: '/reports/upload/',
    init: function() {
        this.on('sending', function file(file, xhr, formData){
            console.log('sending')
            formData.append('csrfmiddlewaretoken', csrf)
        });
        this.on('success', function(file, response){
            const ex = response.ex
            console.log(ex)
            if(ex) {
                handleAlerts('danger', 'This file name already exist, did not upload')
            }
            else {
                handleAlerts('success', 'File uploaded')
            }
        });
    },
    maxFiles: 3,
    maxFilesize: 3,
    acceptedFiles: '.csv'
});