/* 
    Created on : Nov 13, 2018, 3:12:49 PM
    Author     : Zuayed Hassan
*/
"use strict";

function InitializeNumberSpinner(spinner) {
    if ((spinner !== null) || (spinner !== undefined)) {
        let inputTextBox = spinner.querySelectorAll("input[type='text']")[0];
        let stepUpButton = spinner.querySelectorAll("button")[0];
        let stepDownButton = spinner.querySelectorAll("button")[1];
        let min = parseFloat(inputTextBox.getAttribute("data-min").trim());
        let max = parseFloat(inputTextBox.getAttribute("data-max").trim());
        let step = parseFloat(inputTextBox.getAttribute("data-step").trim());

        inputTextBox.addEventListener("input", (event) => {
            let text = _getValue();
            let modifiedOutput = "";

            if (_isFloat(text)) {
                modifiedOutput = text;
            }
            else {
                for (let i = text.length - 1; i >= 0; i--) {
                    let modifiedText = text.substr(0, i);

                    if (_isFloat(modifiedText)) {
                        modifiedOutput = modifiedText;
                        break;
                    }
                }
            }

            _setText(modifiedOutput);
        });

        function _isFloat(input) {
            let regex = /^[+-]?\d+(\.)?(\d+)?$/;
            let isFloat = (input.match(regex) !== null);

            return isFloat;
        }

        function _getValue() {
            return inputTextBox.value.trim();
        }

        function _setText(text) {
            inputTextBox.value = text;
        }

        function _getFormatText(text) {
            if (text.endsWith(".")) {
                text += "0";
            }
            else if (text.startsWith(".")) {
                text = "0" + text;
            }

            return text;
        }

        function _isWithinRange(value) {
            return ((value >= min) && (value <= max));
        }

        stepUpButton.addEventListener("click", (event) => {
             let text = _getFormatText(_getValue());
             let output = parseFloat(text) + step;

             if (_isWithinRange(output)) {
                 _setText(output);
             }
        });

        stepDownButton.addEventListener("click", (event) => {
             let text = _getFormatText(_getValue());
             let output = parseFloat(text) - step;

             if (_isWithinRange(output)) {
                 _setText(output);
             }
        });
    }
    else {
        console.error("[!] Error: Spinner is not defined");
    }
}

function InitializeAllNumberSpinners() {
    let spinners = document.querySelectorAll(".number-spinner");

    for (let i = 0; i < spinners.length; i++) {
        let spinner = spinners[i];

        InitializeNumberSpinner(spinner);
    }
}