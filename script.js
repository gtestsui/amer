$(document).ready(function () {
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');

    // Delete preview.jpg on page reload
    window.addEventListener('beforeunload', function () {
        $.ajax({
            url: 'http://127.0.0.1:3000/delete',
            type: 'POST',
            data: { filename: 'preview.jpg' },
            success: function (response) {
                console.log('Preview image deleted successfully');
            },
            error: function (xhr, status, error) {
                console.error('Error deleting preview image:', error);
            }
        });
    });

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            $.ajax({
                url: 'http://127.0.0.1:3000/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    previewImage.src = 'preview.jpg';
                    console.log('File uploaded successfully');
                },
                error: function (xhr, status, error) {
                    console.error('Error uploading file:', error);
                }
            });
        }
    });
});