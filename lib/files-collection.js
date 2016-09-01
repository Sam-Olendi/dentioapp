Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: false, // client cannot modify data
    onBeforeUpload: function (file) {
        if ( file.size <= 10485760 && /png|jpg|jpeg|bmp/i.test(file.extension) ) {
            return true;
        } else if ( file.size > 10485760 ) {
            return 'Please upload an image with equal or less size than 10MB';
        } else if ( !(/png|jpg|jpeg|bmp/i.test(file.extension)) ) {
            return 'You can only upload .png, .jpg, .jpeg or .bmp files';
        } else {
            return 'Something went wrong. Please try again later.'
        }
    }
});

if (Meteor.isServer) {
    // equivalent to specifying all the deny permissions individually
    Images.denyClient();
}