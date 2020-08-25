import React from 'react';
import { DatePicker } from 'antd';
import "./index.less"


export interface HelloWorldProps {
    userName: string;
    lang: string;
}

export const App = (props: HelloWorldProps): JSX.Element => (
    <div>
        <h1 className="abc">
            Hi {props.userName} from React! Welcome to {props.lang}!、
        </h1>
        <DatePicker />
        <span className="asd">aaaaaaaaaaaaa</span>
    </div>
);
