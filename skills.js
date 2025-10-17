/* DO NOT CHANGE THIS FILE. */

window.onload = function () {
    let errors = checkRequirements();
    if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            console.log("<< ERROR: " + errors[i] + " >>");
        }
    } else {
        document
            .querySelector("form")
            .addEventListener("submit", handleSubmission);
    }

    function checkRequirements() {
        let errors = [];

        // check for FORM tag.
        let formElement = document.querySelector("form");
        if (formElement === null) {
            errors.push("There must be a FORM tag.");
            return errors; // return immediately if there's no form tag
        }

        // submit button
        if (formElement.querySelector("button[type='submit']") === null) {
            errors.push("There must be a BUTTON tag with type 'submit'.");
        }

        let fields = document.querySelectorAll("select");
        if (fields.length !== 5) {
            errors.push("There must be exactly 5 SELECT tags.");
        }

        fields = document.querySelectorAll(
            "input:not([type]),input[type='text']"
        );
        if (fields.length !== 5) {
            errors.push("There must be exactly 5 INPUT tags with type 'text'.");
        }

        fields = document.querySelectorAll("input[type='number']");
        if (fields.length !== 5) {
            errors.push(
                "There must be exactly 5 INPUT tags with type 'number'."
            );
        }

        fields = document.querySelectorAll("input[type='range']");
        if (fields.length !== 5) {
            errors.push(
                "There must be exactly 5 INPUT tags with type 'range'."
            );
        }

        fields = document.querySelectorAll("input[type='radio']");
        if (fields.length !== 10) {
            errors.push(
                "There must be exactly 10 INPUT tags with type 'radio'."
            );
        }

        let usedNames = [];
        for (let i = 0; i < fields.length; i += 2) {
            let name1 = fields[i].getAttribute("name");
            let name2 = fields[i + 1].getAttribute("name");
            if (name1 !== name2) {
                errors.push(
                    "Each pair of radio buttons must have the same name."
                );
            } else if (usedNames.includes(name1) || usedNames.includes(name2)) {
                errors.push(
                    "No more than two radio buttons can have the same name."
                );
            } else {
                usedNames.push(fields[i].getAttribute("name"));
            }
        }

        return errors;
    }

    function handleSubmission(e) {
        e.preventDefault();

        let html = "<h2>Your Profile</h2>";
        let fields = document.querySelectorAll("select,input");

        for (let i = 0; i < fields.length; i += 6) {
            let area = fields[i].value;
            let skillName = fields[i + 1].value;
            let years = Number(fields[i + 2].value);
            let level = Number(fields[i + 3].value);
            let cert = fields[i + 4].checked;

            html +=
                `<p>${skillName}, ${area}, ${years} years, level ${level}` +
                (cert ? ", certified" : "") +
                "</p>";
        }
        document.querySelector("#reportArea").innerHTML = html;
    }
};

/* DO NOT CHANGE THIS FILE. */
