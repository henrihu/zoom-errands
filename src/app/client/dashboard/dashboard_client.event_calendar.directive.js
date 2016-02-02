(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .directive('eventCalendar', eventCalendar);

    eventCalendar.$inject = ['$log'];
    function eventCalendar($log){
        var directive = {
            link: link,
            templateUrl: 'app/client/dashboard/dashboard_client.event_calendar.directive.html',
            scope: {
                'calId': '@',
                'events': '='
            },
            //templateUrl: '',
            restrict: 'EA'
        };

        return directive;

        function link(scope, element/*, attrs*/) {
            $log.log('event calendar');
            scope.body = angular.element(element[0]).find('.cal-body');
            scope.element = element;
            scope.nextMonBtn = angular.element(element[0]).find('.next-month');
            scope.prevMonBtn = angular.element(element[0]).find('.prev-month');
            scope.caption = '-';
            scope.monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];


            scope.dt = new Date();

            //scope.build = build;

            build(scope);
            //angular.element('#e-cal').on('click', function(){alert('ok'); });
        }

        function build(scope){
            var col = 1;
            var i, td, _d;
            var DAY = 24 * 60 * 60 * 1000;

            angular.element(scope.element[0]).find('.cal-toolbar .month-name').html(scope.monthNames[scope.dt.getMonth()] + ' ' + scope.dt.getFullYear().toString());

            var prevMonDaysCnt = getPrevMonthDaysCnt(scope.dt);
            var curMonthDaysCnt = getMonthsLastDate(scope.dt);
            var nextMonDaysCnt = getNextMonthDaysCnt(scope.dt);

            initNextMonthButton(scope);
            initPrevMonthButton(scope);

            scope.body.html('');
            scope.body.append('<tr></tr>');
            var tr = scope.body.find('tr:last-child');


            // add prev month dates
            for (i=prevMonDaysCnt; i>0; i--){
                td = angular.element('<td></td>');
                tr.append(td);
                //td = tr.find('td:last-child');
                td.addClass('prev-month');

                _d = new Date(getFirstMonthsDate(scope.dt).getTime() - (DAY * i));
                new Cell(scope, _d, col, td);

                col++;
                if (col == 8){
                    scope.body.append('<tr></tr>')
                    tr = scope.body.find('tr:last-child');
                    col = 1;
                }
            }

            // add cur month dates
            for (i=0; i<curMonthDaysCnt; i++){
                td = angular.element('<td></td>');
                tr.append(td);
                //tr.append('<td></td>');
                //td = tr.find('td:last-child');
                td.addClass('cur-month');

                _d = new Date(scope.dt.getFullYear(), scope.dt.getMonth(), i+1);

                new Cell(scope, _d, col, td);
                col++;
                if (col == 8){
                    scope.body.append('<tr></tr>')
                    tr = scope.body.find('tr:last-child');
                    col = 1;
                }
            }

            // add next moth dates
            for (i=0; i<nextMonDaysCnt; i++){
                td = angular.element('<td></td>');
                tr.append(td);
                //tr.append('<td></td>');
                //td = tr.find('>td:last-child');
                td.addClass('next-month');

                var _monthLastDate = new Date(scope.dt.getFullYear(), scope.dt.getMonth(), getMonthsLastDate(scope.dt));
                _d = new Date(_monthLastDate.getTime() + (DAY * (i+1)));

                new Cell(scope, _d, col, td);

                col++;
                if (col == 8){
                    col = 1;
                }
            }

        }

        function Cell(scope, _d, col, td){
            var _cell = this;
            var i;

            this.isToday = false;
            this.dateStr = _d.getDate()+'-'+(_d.getMonth()+1)+'-'+_d.getFullYear();
            this.dt = _d;
            this.el = null;
            this._selected = false;
            this._dayIdx = col-1;

            td.append('<div class="inner"></div>');
            var div = td.find('.inner');

            var d = new Date();

            if (_cell.dateStr == (d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear())) {
                td.addClass('today');
                _cell.isToday = true;
                div.addClass("today");
            }
            div.html(_cell.dt.getDate().toString());

            if (scope.events[_cell.dateStr]){
                var events = scope.events[_cell.dateStr];
                var event = '';
                td.addClass('has-event');
                var tooltip = angular.element(
                    '<div class="cal-tooltip">' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div class="wrap"></div>' +
                    '</div>');
                var wrap = tooltip.find('.wrap');

                event = angular.element('<div class="event"></div>')
                event.append('<table class="events-table"></table>')

                for (i=0; i<events.length; i++){
                    var _e = events[i];
                    var tr = angular.element('<tr></tr>');
                    tr.append('<td class="event-avatar"><img src="' + _e.avatar + '"></td>');
                    tr.append('<td class="event-name">' + _e.name + '</td>');
                    tr.append('<td class="event-message">' +
                                    '<span class="event-time">' + _e.time + '</span> ' +
                                    _e.message +
                               '</td>');
                    event.find('.events-table:last-child').append(tr);
                }
                wrap.append(event);
                div.append(tooltip);

                // center tooltip
                tooltip.css('top', tooltip.height()/2*-1 + 30);
            }

            td.attr('data-date-str', _cell.dateStr);
        }

        // dt's month's first day of week
        function getFirstMonthsDay(dt){
            return new Date(dt.getFullYear(), dt.getMonth(), 1).getDay();
            //return new Date((dt.getMonth()+1).toString()+'-01-'+dt.getFullYear().toString()).getDay();
        }

        // dt's month's first date
        function getFirstMonthsDate(dt){
            return new Date(dt.getFullYear(), dt.getMonth(), 1);
        }

        // dt's month's last day of week
        function getLastMonthsDay(dt){
            return new Date(new Date(dt.getFullYear(), dt.getMonth()+1, 1) - 1).getDay();
        }

        // last date in dt's month
        function getMonthsLastDate(dt){
            return new Date(new Date(dt.getFullYear(), dt.getMonth()+1, 1) - 1).getDate();
        }

        function getPrevMonthDaysCnt(dt){
            return (6 +  getFirstMonthsDay(dt)) % 7;
        }

        function getNextMonthDaysCnt(dt){
            return (7 - getLastMonthsDay(dt)) % 7;
        }

        function initNextMonthButton(scope){
            scope.nextMonBtn.off().on('click', function(){
                var d = scope.dt;
                d.setMonth(d.getMonth()+1);
                scope.dt = d;
                build(scope);
                return false;
            });
        }

        function initPrevMonthButton(scope){
            scope.prevMonBtn.off().on('click', function(){
                var d = scope.dt;
                d.setMonth(d.getMonth()-1);
                scope.dt = d;
                build(scope);
                return false;
            });
        }

    }


})();
