Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40dentioapp.herokuapp.com:ef7d769e1e9df49e4eb8604b8c8fc741@smtp.mailgun.org:587';

    Accounts.emailTemplates.siteName = 'Dentio for Gentle Dental Care Clinic';
});