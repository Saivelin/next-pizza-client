"use client"

import { store } from "../../redux/index";
import { Provider } from "react-redux";
import { ReactNode } from "react";

const ProviderForLayout = ({children}: {children: ReactNode}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ProviderForLayout;