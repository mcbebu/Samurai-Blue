import React, { useState } from "react";
import { BACKEND_DOMAIN } from "./util/api";

export const NinjaLiveContext = React.createContext({
    username: "",
    stripeAccount: "",
    from_name: "",
    from_phone_number: "",
    from_email: "",
    from_address_postcode: "",
    from_address_address1: "",
    from_address_country: "",
    paynow: false,
    creditcard: false,
    products: [],
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
    const [paynow, setPayNow] = useState(false);
    const [creditcard, setCreditCard] = useState(false);

    const removeStripeAccount = () => {
        setStripeAccount("");
    };

    const loginHandler = async (username) => {
        const response = await fetch(BACKEND_DOMAIN + `username/${username}`);
        const body = await response.json();
        console.log(body);
        if (body !== null) {
            setUsername(username);
            setStripeAccount(body.stripeAccount);
            setFrom_Name(body.from_name);
            setFrom_Phone_Number(body.from_phone_number);
            setFrom_Email(body.from_email);
            setFrom_Address_Postcode(body.from_address_postcode);
            setFrom_Address_Address1(body.from_address_address1);
            setFrom_Address_Country(body.from_address_country);
            setPayNow(body.paynow);
            setCreditCard(body.creditcard);
            // console.log(username);
            // console.log(stripeAccount);
            // console.log(from_email);
        } else {
            console.log("invalid account");
        }
    };

    const logoutHandler = () => {
        setUsername("");
        setStripeAccount("");
        setFrom_Name("");
        setFrom_Phone_Number("");
        setFrom_Email("");
        setFrom_Address_Postcode("");
        setFrom_Address_Address1("");
        setFrom_Address_Country("");
        setPayNow(false);
        setCreditCard(false);
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
        creditcard: creditcard,
        paynow: paynow,
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

export default NinjaLiveContextProvider;
