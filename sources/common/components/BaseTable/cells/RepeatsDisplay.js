// @flow
import React from 'react';
import { grey500 } from 'material-ui/styles/colors';
import RepeatOptions from 'common/defs/repeatOptions';

export default function RepeatsDisplay({ item }) {
    const repeatsText = item.repeat
        ? RepeatOptions.filter((each) => each[0] === item.repeat)[0][1]
        : '';
    const repeatsDisplay = (
        <span style={{ fontSize: 14, color: grey500 }}>
            {screen.isLarge
                ? repeatsText
                : repeatsText
                    ? `Repeats ${repeatsText}`
                    : 'Does not repeat'}
        </span>
    );

    return repeatsDisplay;
}
