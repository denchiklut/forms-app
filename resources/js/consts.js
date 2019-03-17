export const tinyMceKEY = "njxv7t3qzqkd3a7tmtvc697vlwm5aixy0mu356hxoguyzmc1"
export const tinyConfig = {
    height: 250,
    plugins: [
        'print preview noneditable searchreplace autolink directionality visualblocks visualchars fullscreen',
        'image link media template codesample table charmap hr pagebreak nonbreaking anchor',
        'toc insertdatetime advlist lists wordcount imagetools textpattern ',
        // 'powerpaste'
    ],
    toolbar: ' bold italic forecolor | align | bullist numlist | table ',
    language: 'ru',
    mobile: {
        theme: 'mobile',
        plugins: [ 'autosave', 'lists', 'autolink' ],
        toolbar: [ 'undo', 'bold', 'italic', 'styleselect' , 'forecolor']
    }
}
