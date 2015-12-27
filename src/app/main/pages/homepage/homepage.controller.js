(function ()
{
    'use strict';

    angular
        .module('app.pages.homepage')
        .controller('HomepageController', HomepageController);

    /** @ngInject */
    function HomepageController()
    {
        var vm = this;

        // Data
        vm.carousel = [
          {
            'image': 'assets/images/zoom/carousel1.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          },
          {
            'image': 'assets/images/zoom/carousel2.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          },
          {
            'image': 'assets/images/zoom/carousel3.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          },
          {
            'image': 'assets/images/zoom/carousel1.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          },
          {
            'image': 'assets/images/zoom/carousel2.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          },
          {
            'image': 'assets/images/zoom/carousel3.png',
            'title': 'Lorem ipsum dolor',
            'content': 'imperdiet lier in vestielib scelerielcique' 
          }

        ];

        vm.steps = [
          {
            'image': 'assets/images/zoom/step1.png',
            'title': 'What can we do for you?',
            'content': 'Send your errand needs by website or phone.' 
          },
          {
            'image': 'assets/images/zoom/step2.png',
            'title': 'Our team is on the job',
            'content': 'Our service providers are dispatched to do your errands.' 
          },
          {
            'image': 'assets/images/zoom/step3.png',
            'title': 'You gain FREE time',
            'content': 'Your errand is done.  Our services are 100% guarenteed.' 
          }
        ];

        vm.testimonials = [
          {
            'image': 'assets/images/zoom/testimonial1.png',
            'title': 'Melissa Riey',
            'commenter': 'General Manager, Le Pain Quotidien',
            'content': '\"I run the Calabasas location of Le Pain Quotidien, and I use ' + 
                      'Zoom Errands for all of my catering deliveries. I\'ve tried serveral ' + 
                      'other services, and I had problems with them all... until I found ' +
                      'Zoom Errands. They are timely and efficient, and they take great care of ' +
                      'our beautiful, organic food. I can always count on Zoom.\"' 
          },
          {
            'image': 'assets/images/zoom/testimonial2.png',
            'title': 'Stacey Jackson',
            'commenter': 'Owner NV-DA Juice Bar and Market',
            'content': '\"As an organic vegan juice bar and market owner, I sometimes need grocery ' + 
                       'shopping done for hard to find items. I can rely on Zoom Errands as a ' + 
                       'professional service that will pick them up even when they are outside ' + 
                       'of the L.A. area. It\'s a totally awesome service to have in my list of contacts.' +
                       ' I\'m glad I found them!\"'
          }
        ];

        vm.whyuses = [
          {
            'image': 'assets/images/zoom/whyus1.png',
            'title': 'Get Things Done',
            'content': 'Zoom Errands is your team around town in your home or at your office.' 
          },
          {
            'image': 'assets/images/zoom/whyus2.png',
            'title': 'Trusted Service Providers',
            'content': 'Every service provider is interviewed in-person, signs a letter of commitment,' +
                        ' and is background checked.' 
          },
          {
            'image': 'assets/images/zoom/whyus3.png',
            'title': 'People Focused Company',
            'content': 'We can always be reached by phone during office hours, to schedule errands,' +
                        ' answer question, or just to say hello!' 
          },
          {
            'image': 'assets/images/zoom/whyus4.png',
            'title': 'Payments Made Simple',
            'content': 'We securely accept all major credit cards. Product purchase can be ' +
                        'made on your behalf through the use of escrow funds.' 
          },
          {
            'image': 'assets/images/zoom/whyus5.png',
            'title': 'Easy To Use',
            'content': 'Create an account, pick a pricing package, and start posting jobs to get done.' 
          },
          {
            'image': 'assets/images/zoom/whyus6.png',
            'title': 'Satisfaction Guarenteed',
            'content': 'Our commitment is to provide you with a great experience, backed with' + 
                        ' a guarentee to do so' 
          }
        ];

        vm.team = [
          {
            'image': 'assets/images/zoom/provider1.png',
            'title': 'Andrea',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider2.png',
            'title': 'Emily',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider3.png',
            'title': 'Matt',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider4.png',
            'title': 'Kobi',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider1.png',
            'title': 'Andrea',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider2.png',
            'title': 'Emily',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider3.png',
            'title': 'Matt',
            'content': 'Service Provider' 
          },
          {
            'image': 'assets/images/zoom/provider4.png',
            'title': 'Kobi',
            'content': 'Service Provider' 
          }         
        ];

        vm.logos1 = [
          {
            'image': 'assets/images/zoom/logo1.png',
            'alt': 'SCORE'
          },
          {
            'image': 'assets/images/zoom/logo2.png',
            'alt': 'Patch'
          }
        ];
        
        vm.logos2 = [          
          {
            'image': 'assets/images/zoom/logo3.png',
            'alt': 'The Weekend Mom'
          },
          {
            'image': 'assets/images/zoom/logo4.png',
            'alt': 'examiner.com'
          }
        ];

        vm.breakpointStep = [
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  arrows: false
              }
          }, {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false
              }
          }
        ];

        vm.breakpointTeam = [
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  arrows: false
              }
          }, {
              breakpoint: 480,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  arrows: false
              }
          }
        ];

        // Methods
        // vm.closeAlert = function(index) {
        //     $scope.alerts.splice(index, 1);
        // };

        //////////
    }
})();