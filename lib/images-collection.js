Images = new FilesCollection({
    collectionName: 'images',
    allowClientCode: false, // client cannot modify data
    onBeforeUpload: function (file) {
        if ( file.size <= 10485760 && /png|jpg|jpeg|bmp|gif/i.test(file.extension) ) {
            return true;
        } else if ( file.size > 10485760 ) {
            return 'Please upload an image with equal or less size than 10MB';
        } else if ( !(/png|jpg|jpeg|bmp/i.test(file.extension)) ) {
            return 'You can only upload .png, .jpg, .jpeg, .gif or .bmp images';
        } else {
            return 'Something went wrong. Please try again later.'
        }
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    // equivalent to specifying all the deny permissions individually
    Images.denyClient();

    Meteor.publish('files.images.all', function () {
        return Images.find().cursor;
    });
}