import React from 'react';
import { mount } from 'enzyme';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import RatingDisplay from './RatingDisplay';


describe('#UI #Rating #Display', function() {
    it('should render the appropriate range.', function() {
        const wrapper = mount(<RatingDisplay
            value={ 6 }
            range={ 10 }
            selectedIcon={ solidStar }
            unselectedIcon={ emptyStar }
        />);

        expect(wrapper.find('FontAwesomeIcon')).toHaveLength(10);
    });

    it('should render the appropriate rating.', function() {
        const wrapper = mount(<RatingDisplay
            value={ 8 }
            range={ 20 }
            selectedIcon={ solidStar }
            unselectedIcon={ emptyStar }
        />);
        let solidStarsCount = 0;
        let emptyStarsCount = 0;
        const checkIcon = function(icon) {
            if (icon.prop('icon') === solidStar) {
                solidStarsCount++;
            }
            if (icon.prop('icon') === emptyStar) {
                emptyStarsCount++;
            }
        };

        wrapper.find('FontAwesomeIcon').forEach(checkIcon);
        expect(solidStarsCount).toEqual(8);
        expect(emptyStarsCount).toEqual(12);
    });

    it('should accept 0 as a value.', function() {
        const wrapper = mount(<RatingDisplay
            value={ 0 }
            range={ 20 }
            selectedIcon={ solidStar }
            unselectedIcon={ emptyStar }
        />);
        let solidStarsCount = 0;
        let emptyStarsCount = 0;
        const checkIcon = function(icon) {
            if (icon.prop('icon') === solidStar) {
                solidStarsCount++;
            }
            if (icon.prop('icon') === emptyStar) {
                emptyStarsCount++;
            }
        };

        wrapper.find('FontAwesomeIcon').forEach(checkIcon);
        expect(solidStarsCount).toEqual(0);
        expect(emptyStarsCount).toEqual(20);
    });
    it('should accept the range max as a value.', function() {
        const wrapper = mount(<RatingDisplay
            value={ 20 }
            range={ 20 }
            selectedIcon={ solidStar }
            unselectedIcon={ emptyStar }
        />);
        let solidStarsCount = 0;
        let emptyStarsCount = 0;
        const checkIcon = function(icon) {
            if (icon.prop('icon') === solidStar) {
                solidStarsCount++;
            }
            if (icon.prop('icon') === emptyStar) {
                emptyStarsCount++;
            }
        };

        wrapper.find('FontAwesomeIcon').forEach(checkIcon);
        expect(solidStarsCount).toEqual(20);
        expect(emptyStarsCount).toEqual(0);
    });
});