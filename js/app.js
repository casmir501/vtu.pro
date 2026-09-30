/* =================================
   VTUPRO PROTOTYPE JAVASCRIPT
================================= */


/* =================================
   DEFAULT USER DATA
================================= */

const S = {

    wallet:
        Number(
            localStorage.getItem("vtu_wallet")
        ) || 0,

    profit:
        Number(
            localStorage.getItem("vtu_profit")
        ) || 0,

    count:
        Number(
            localStorage.getItem("vtu_count")
        ) || 12

};


/* =================================
   MONEY FORMAT
================================= */

function money(amount) {

    return "₦" +
        Number(amount)
            .toLocaleString("en-NG");

}


/* =================================
   SAVE DATA
================================= */

function save() {

    localStorage.setItem(
        "vtu_wallet",
        S.wallet
    );


    localStorage.setItem(
        "vtu_profit",
        S.profit
    );


    localStorage.setItem(
        "vtu_count",
        S.count
    );


    update();

}


/* =================================
   UPDATE UI
================================= */

function update() {

    const wallet =
        document.getElementById(
            "walletBalance"
        );

    if (wallet) {

        wallet.textContent =
            money(S.wallet);

    }


    const wallet2 =
        document.getElementById(
            "walletBalance2"
        );

    if (wallet2) {

        wallet2.textContent =
            money(S.wallet);

    }


    const profit =
        document.getElementById(
            "profitBalance"
        );

    if (profit) {

        profit.textContent =
            money(S.profit);

    }


    const count =
        document.getElementById(
            "transactionCount"
        );

    if (count) {

        count.textContent =
            S.count;

    }

}


/* =================================
   REGISTER
================================= */

function reg(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "fullName"
        ).value;


    const phone =
        document.getElementById(
            "phone"
        ).value;


    const email =
        document.getElementById(
            "email"
        ).value;


    const password =
        document.getElementById(
            "password"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    if (
        password !==
        confirmPassword
    ) {

        message(
            "Passwords do not match."
        );

        return;

    }


    const user = {

        name: name,

        phone: phone,

        email: email,

        password: password

    };


    localStorage.setItem(
        "vtu_user",
        JSON.stringify(user)
    );


    message(
        "Account created successfully. You can now login.",
        "success"
    );


    setTimeout(
        function () {

            window.location.href =
                "login.html";

        },
        1200
    );

}


/* =================================
   LOGIN
================================= */

function login(event) {

    event.preventDefault();


    const user =
        JSON.parse(
            localStorage.getItem(
                "vtu_user"
            ) || "null"
        );


    const id =
        document.getElementById(
            "loginId"
        ).value;


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    if (!user) {

        message(
            "No account found. Please register first."
        );

        return;

    }


    const correctID =
        id === user.email ||
        id === user.phone;


    if (
        !correctID ||
        password !== user.password
    ) {

        message(
            "Invalid login details."
        );

        return;

    }


    localStorage.setItem(
        "vtu_logged_in",
        "true"
    );


    window.location.href =
        "dashboard.html";

}


/* =================================
   MESSAGE
================================= */

function message(
    text,
    type = "error"
) {

    const element =
        document.getElementById(
            "msg"
        );


    if (!element) {

        alert(text);

        return;

    }


    element.textContent = text;


    element.className =
        "msg show " +
        (
            type === "success"
                ? "successmsg"
                : "errormsg"
        );

}


/* =================================
   NETWORK SELECTION
================================= */

function pick(button) {

    const parent =
        button.parentElement;


    const buttons =
        parent.querySelectorAll(
            "button"
        );


    buttons.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    button.classList.add(
        "active"
    );

}


/* =================================
   DATA PURCHASE
================================= */

function buy(
    amount,
    profitRate = 0.10
) {

    if (S.wallet < amount) {

        alert(
            "Insufficient wallet balance."
        );

        return;

    }


    S.wallet -= amount;


    S.profit +=
        Math.round(
            amount * profitRate
        );


    S.count++;


    save();


    alert(
        "Purchase successful in prototype mode."
    );

}


/* =================================
   FUND WALLET
================================= */

function fund() {

    /*
        This is only a simulation.

        In the real website,
        this will connect to a payment
        gateway such as Paystack or
        Flutterwave.
    */


    S.wallet += 5000;


    save();


    alert(
        "₦5,000 added in prototype mode."
    );

}


/* =================================
   AIRTIME
================================= */

function airtime() {

    const amount =
        Number(
            document.getElementById(
                "airtimeAmount"
            ).value
        );


    if (!amount) {

        alert(
            "Please select an amount."
        );

        return;

    }


    buy(
        amount,
        0.05
    );

}


/* =================================
   ELECTRICITY
================================= */

function electricity() {

    const amount =
        Number(
            document.getElementById(
                "electricityAmount"
            ).value
        );


    if (!amount) {

        alert(
            "Please select an amount."
        );

        return;

    }


    buy(
        amount,
        0.03
    );

}


/* =================================
   LOGOUT
================================= */

function logout() {

    localStorage.removeItem(
        "vtu_logged_in"
    );


    window.location.href =
        "index.html";

}


/* =================================
   PAGE LOAD
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        update();

    }
);