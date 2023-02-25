import React, { useState } from "react";

export const NinjaLiveContext = React.createContext({
    username: "",
    stripeAccount: "",
    from_name: "",
    from_phone_number: "",
    from_email: "",
    from_address_postcode: "",
    from_address_address1: "",
    from_address_country: "",
    removeStripeAccount: () => {},
    loginHandler: (username) => {},
    logoutHandler: () => {},
});

const NinjaLiveContextProvider = (props) => {
    const [username, setUsername] = useState("");
    const [stripeAccount, setStripeAccount] = useState("");
    const [from_name, setFrom_Name] = useState("");
    const [from_phone_number, setFrom_Phone_Number] = useState("");
    const [from_email, setFrom_Email] = useState("");
    const [from_address_postcode, setFrom_Address_Postcode] = useState("");
    const [from_address_address1, setFrom_Address_Address1] = useState("");
    const [from_address_country, setFrom_Address_Country] = useState("");

    const removeStripeAccount = () => {
        setStripeAccount("");
    };

    const loginHandler = (username) => {};

    const logoutHandler = () => {
        setUsername("");
        setStripeAccount("");
        setFrom_Name("");
        setFrom_Phone_Number("");
        setFrom_Email("");
        setFrom_Address_Postcode("");
        setFrom_Address_Address1("");
        setFrom_Address_Country("");
    };

    const contextValue = {
        username: username,
        stripeAccount: stripeAccount,
        from_name: from_name,
        from_phone_number: from_phone_number,
        from_email: from_email,
        from_address_postcode: from_address_postcode,
        from_address_address1: from_address_address1,
        from_address_country: from_address_country,
        removeStripeAccount: removeStripeAccount,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
    };
    return (
        <NinjaLiveContext.Provider value={contextValue}>
            {props.children}
        </NinjaLiveContext.Provider>
    );
};

export default TicketingContextProvider;
